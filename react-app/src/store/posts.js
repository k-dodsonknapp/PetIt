import { getCookie, csrfFetch } from "./utils";

const GET_ALL_POSTS = "/posts/";

const ADD_POST = "/posts/new";
const UPDATE_POST = "/posts/edit";
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

export const getAllPosts = () => async (dispatch) => {
  const res = await fetch("/api/posts/main", { credentials: "include" });
  if (res.ok) {
    const data = await res.json();
    dispatch(getPosts(data));
    return data;
  }
};

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

  if (res.ok) {
    const post = await res.json();
    dispatch(updatePost(post));
    return post;
  }
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

  if (res.ok) {
    const id = await res.json();
    dispatch(deletePost(id));
    return "Post successfully delete";
  }
};

const initialState = {
  list: [],
};

export default function postReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_ALL_POSTS:
      return {
        ...state,
        list: [...action.posts.posts],
      };

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
