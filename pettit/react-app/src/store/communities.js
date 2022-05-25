const GET_ALL_COMMUNITIES = '/communities/'; 

const getCommunities = (communities) => ({
    type: GET_ALL_COMMUNITIES,
    communities
});

export const getAllCommunities = () => async (dispatch) => {
    const res = await fetch('/api/communities/');
    if (res.ok) {
        const data = await res.json();
        console.log("data",data)
        dispatch(getCommunities(data));
        return data;
    };
};

export default function communitiesReducer(state = [], action) {
    let newState;
    switch(action.type) {
        case GET_ALL_COMMUNITIES:
            console.log(state)
            console.log("asdfasdfasdf",action.communities.communities)
            newState = {...state}
            action.communities.communities.map(community => (
                newState[community.id] = community
            ))
            return newState
        default:
            return state 
    }
}