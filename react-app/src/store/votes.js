const GET_POST_VOTES = "/votes/post/:id";

const getVotesForPosts = (votes) => ({
  type: GET_POST_VOTES,
  votes,
});

export const getPostVotes = () => async (dispatch) => {
  const res = await fetch(`/api/votes/`);
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
  const res = await fetch("/api/votes/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (res.ok) {
    const vote = await res.json();
    dispatch(addVotesForPosts(vote));
    return vote;
  }
};

// Delete a vote
const DELETE_VOTE = "/votes/delete";

const deleteVote = (vote) => ({
  type: DELETE_VOTE,
  vote,
});

export const deleteVotes = (id) => async (dispatch) => {
  const res = await fetch(`/api/votes/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(id),
  });
  if (res.ok) {
    const vote = await res.json();
    dispatch(deleteVote(vote));
    return vote;
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
