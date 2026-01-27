// import { getOnePost } from "./posts";
import { csrfFetch, getCookie } from "./utils";
import { updateOnePost } from "./posts";

// const GET_POST_VOTES = "votes/GET_POST_VOTES";
const ADD_VOTE  = "votes/ADD_VOTE";
const DELETE_VOTE    = "votes/DELETE_VOTE";

// const getPostVotes = (votes) => ({
//   type: GET_POST_VOTES,
//   votes,
// });

const addVotesForPosts = (vote) => ({
  type: ADD_VOTE,
  vote,
});

const deleteVote = (vote) => ({
  type: DELETE_VOTE,
  vote,
});

// export const getPostVotesThunk = () => async (dispatch) => {
//   const res = await fetch("/api/votes", { credentials: "include" });
//   const data = await res.json();              // <-- important
//   dispatch(getPostVotes(data.votes));         // <-- pass the ARRAY
// };

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

    dispatch(addVotesForPosts(response.vote));
    dispatch(updateOnePost(response.post))

    return response;
  }
  catch (err) {
    return err;
  }
};


export const deleteVotes = (payload) => async (dispatch) => {
  const csrf = getCookie("csrf_token");
  try {
    const response = await csrfFetch(`/api/votes/delete`, {
      credentials: "include",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrf,
      },
      body: JSON.stringify(payload),
    });
    dispatch(deleteVote(response.vote));
    dispatch(updateOnePost(response.post));
    return response;
  } catch (err) {
    return err;
  }
};

export default function votesReducer(state = {}, action) {
  let newState;

  // TODO: update the add vote and remove GET_POST_VOTES
  switch (action.type) {
    // case GET_POST_VOTES:
    //   return {
    //     ...state,
    //     post_votes: [action.votes],
    //   };

    case ADD_VOTE:
      const previousVotes = state.votes ? state.votes  : [];
      return {
        ...state,
        votes: [ ...previousVotes, action.vote ],
      };

    case DELETE_VOTE:
      newState = { ...state };
      delete newState[action.vote];
      return newState;

    default:
      return state;
  }
}
