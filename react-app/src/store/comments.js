const GET_COMMENTS_FOR_POST = "/comments/:id";
const ADD_COMMENT = "/comments/new";
const DELETE_COMMENT = "/comments/delete";
const UPDATE_COMMENT = "comments/edit";
const COMMENT_ON_COMMENT = "/comment/:id";

const getCommentOnComment = (comments) => ({
  type: COMMENT_ON_COMMENT,
  comments,
});

export const getAllCommentOnComment = (id) => async (dispatch) => {
  const res = await fetch(`/api/comments/comment/${id}`);
  const data = await res.json();
  if (res.ok) {
    dispatch(getCommentOnComment);

    return data;
  }
};

const getPostComments = (comments) => ({
  type: GET_COMMENTS_FOR_POST,
  comments,
});

export const getAllComments = (id) => async (dispatch) => {
  const res = await fetch(`/api/comments/${id}`);
  const data = await res.json();
  if (res.ok) {
    dispatch(getPostComments(data));
    return data;
  }
};

const addComment = (comment) => ({
  type: ADD_COMMENT,
  comment,
});

export const addNewComment = (data) => async (dispatch) => {
  const res = await fetch("/api/comments/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    const comment = await res.json();
    dispatch(addComment(comment));
    return comment;
  }
};

const deleteComment = (comment) => ({
  type: DELETE_COMMENT,
  comment,
});

export const deleteAComment = (data) => async (dispatch) => {
  const res = await fetch("/api/comments/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    const id = await res.json();
    dispatch(deleteComment(id));
    return "Comment Delete Successfully";
  }
};

const updateAComment = (comment) => ({
  type: UPDATE_COMMENT,
  comment,
});

export const updateComment = (data) => async (dispatch) => {
  const res = await fetch(`/api/comments/edit`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    const comment = await res.json();
    dispatch(updateAComment(comment));
    return comment;
  }
};

export default function commentReducer(state = [], action) {
  let newState;

  switch (action.type) {
    case GET_COMMENTS_FOR_POST:
      newState = { ...state };
      action.comments.comments.map(
        (comment) => (newState[comment.id] = comment)
      );
      return newState;

    case COMMENT_ON_COMMENT:
      newState = { ...state };
      action.comments.comments.map(
        (comment) => (newState[comment.id] = comment)
      );
      return newState;

    case ADD_COMMENT:
      newState = { ...state };

      newState = {
        [action.comment.id]: action.comment,
        ...state,
      };
      return newState;

    case DELETE_COMMENT:
      newState = { ...state };
      delete newState[action.comment.success.id];
      return newState;

    case UPDATE_COMMENT:
      newState = { ...state };
      let newArr = Object.values(newState);
      newArr.forEach((comment) => {
        if (comment.id === action.comment.id) {
          newState[action.comment.id] = action.comment;
        }
      });
      return newState;
    default:
      return state;
  }
}
