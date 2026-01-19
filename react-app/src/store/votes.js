import { getOnePost } from "./posts";
import { csrfFetch, getCookie } from "./utils";

const GET_POST_VOTES = "/votes/post/:id";

const getVotesForPosts = (votes) => ({
  type: GET_POST_VOTES,
  votes,
});

export const getPostVotes = () => async (dispatch) => {
  const res = await fetch(`/api/votes/`, { credentials: "include" });
  const data = await res.json();
  if (res.ok) {
    dispatch(getVotesForPosts(data));
    return data;
  }
};

const ADD_POST_VOTES = "/votes/post/:id";

const addVotesForPosts = (vote) => ({
  type: ADD_POST_VOTES,
  vote,
});

export const addPostVote = (data) => async (dispatch) => {
  const csrf = getCookie("csrf_token");
  try {
    const response = await csrfFetch("/api/votes/add", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrf
      },
      body: JSON.stringify(data),
    });

    dispatch(addVotesForPosts(response));

    await dispatch(getOnePost(response.post_id))
    return response;
  }
  catch (err) {
    return err;
  }
};

// Delete a vote
const DELETE_VOTE = "/votes/delete";

const deleteVote = (vote) => ({
  type: DELETE_VOTE,
  vote,
});

export const deleteVotes = (id) => async (dispatch) => {
  const csrf = getCookie();
  try {
    const response = await csrfFetch(`/api/votes/delete`, {
      credentials: "include",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrf,
      },
      body: JSON.stringify(id),
    });

    dispatch(deleteVote(response));
    await dispatch(getOnePost(id.post_id));
    return response;
  } catch (err) {
    return err;
  }
};

export default function votesReducer(state = [], action) {
  let newState;

  switch (action.type) {
    case GET_POST_VOTES:
      return {
        ...state,
        post_votes: [action.votes],
      };

    case ADD_POST_VOTES:
      return {
        ...state,
        post_votes: [action.vote],
      };

    case DELETE_VOTE:
      newState = { ...state };
      delete newState[action.vote];
      return newState;

    default:
      return state;
  }
}
