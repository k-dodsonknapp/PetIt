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

const ADD_COMMUNITY = '/communities/new';

const addCommunity = (community) => ({
    type: ADD_COMMUNITY,
    community
});

export const addNewCommunity = (data) => async (dispatch) => {
    const res = await fetch('/api/communities/new', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    if (res.ok) {
        const community = await res.json();
        dispatch(addCommunity(community));
        return community;
    }
}

const UPDATE_COMMUNITY = '/communities/edit/:id'

const updateCommunity = (community) => ({
    type: UPDATE_COMMUNITY,
    community,
});

export const updateACommunity = (data) = async (dispatch) => {
    const res = await fetch(`/api/communities/${data.id}/edit`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    if (res.ok) {
        const community = await res.json();
        dispatch(updateACommunity(community));
        return community;
    }
}

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
            return newState;

            case UPDATE_COMMUNITY:
                newState = {}
                console.log(action)
        default:
            return state 
    }
};