import { getCookie, csrfFetch } from "./utils";

const GET_ALL_POSTS = "/posts/GET_ALL_POSTS";
const UPDATE_ONE_POST = "/posts/UPDATE_ONE_POST"
const ADD_POST = "/posts/ADD_POST";
const UPDATE_POST = "/posts/UPDATE_POST";
const DELETE_POST = "/posts/delete";

const getPosts = (posts) => ({
  type: GET_ALL_POSTS,
  posts,
});

const addPost = (post) => ({
  type: ADD_POST,
  post,
});

const updatePost = (post) => ({
  type: UPDATE_POST,
  post,
});

const deletePost = (post) => ({
  type: DELETE_POST,
  post,
});

export const updateOnePost = (post) => ({
  type: UPDATE_ONE_POST,
  post,
})

export const getAllPosts = () => async (dispatch) => {
  const res = await fetch("/api/posts/main", { credentials: "include" });
  const data = await res.json();
  const posts = data.posts;
  const ordered = [...posts].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );
  dispatch(getPosts(ordered));
  return ordered;
};

export const getOnePost = (postId) => async (dispatch) => {
  const res = await fetch(`/api/posts/${postId}`, { credentials: "include" });
  const data = await res.json();
  dispatch(updateOnePost(data.post));
  return data;
}

export const addAPost = (data) => async (dispatch) => {
  const csrf = getCookie("csrf_token");
  const res = await csrfFetch("/api/posts/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrf
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (res.ok) {
    const post = await res.json();
    dispatch(addPost(post));
    return post;
  }
};

export const updateAPost = (data) => async (dispatch) => {
  const csrf = getCookie("csrf_token");
  const res = await csrfFetch(`/api/posts/${data.id}/edit`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrf
    },
    body: JSON.stringify(data),
  });

  dispatch(updatePost(res));
  return res;
};

export const deleteAPost = (data) => async (dispatch) => {
  const csrf = getCookie("csrf_token");
  const res = await csrfFetch("/api/posts/delete", {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrf
    },
    body: JSON.stringify(data),
  });

  dispatch(deletePost(res));
  return "Post successfully delete";
};

const initialState = { list: [] };

export default function postReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_ALL_POSTS:
      return {
        ...state,
        list: [...action.posts],
      };
    case UPDATE_ONE_POST: {
      const updated = action.post;
      return {
        ...state,
        list: state.list.map((p) => (p.id === updated.id ? updated : p)),
      };
    }
    case UPDATE_POST:
      newState = {};
      let newwArr = [...state.list];
      newwArr.forEach((post) => {
        if (post.id === action.post.id) {
          newState[action.post.id] = action.post;
        }
      });
      return newState;

    case ADD_POST:
      newState = {
        ...state,
        [action.post.id]: {
          ...state[action.post.id],
        },
      };
      return newState;

    case DELETE_POST:
      newState = { ...state };
      let newArr = [...newState.list];
      let index = newArr.indexOf(action.post);
      newArr.splice(index, 1);
      newState.list = newArr;
      return newState;

    default:
      return state;
  }
}
