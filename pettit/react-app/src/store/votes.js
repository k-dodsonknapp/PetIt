const GET_POST_VOTES = '/votes/post/:id';

const getVotesForPosts = (votes) => ({
    type: GET_POST_VOTES,
    votes
});

export const getPostVotes = (id) => async (dispatch) => {
    const res = await fetch(`/api/votes/post/${id}`);
    const data = await res.json();
    if (res.ok) {
        dispatch(getVotesForPosts(data));
        return data;
    }
}

export default function votesReducer (state = [], action) {
    let newState;

    switch(action.type) {
        case GET_POST_VOTES:
            newState = {...state}
            action.votes.post_votes.map(vote => {
                newState[vote.post_id] = vote
            })
            return newState
        default:
            return state;
    }
}