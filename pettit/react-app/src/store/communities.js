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

export const updateACommunity = (data) => async (dispatch) => {
    console.log(data)
    const res = await fetch(`/api/communities/edit/${data.id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    if (res.ok) {
        const community = await res.json();
        dispatch(updateCommunity(community));
        return community;
    }
}

const DELETE_COMMUNITY = '/communities/delete'

const deleteCommunity = (community) => ({
    type: DELETE_COMMUNITY,
    community
});

export const deleteACommunity = (data) => async (dispatch) => {
    const res = await fetch ('/api/communities/delete', {
        method: "DELETE", 
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(data)
    });
    if (res.ok) {
        const id = await res.json();
        dispatch(deleteCommunity(id));
        return "Community Delete Successfully"
    }
}

export default function communitiesReducer(state = [], action) {
    let newState;
    switch(action.type) {
        case GET_ALL_COMMUNITIES:
            newState = {...state}
            action.communities.communities.map(community => (
                newState[community.id] = community
            ))
            return newState;

            case UPDATE_COMMUNITY:
                newState = {...state}
                let newArr = Object.values(newState);
                newArr.forEach(community => {
                    if (community.id === action.community.id) {
                        newState[action.community.id] = action.community
                    };
                });
                // console.log("state", state)
                // console.log("actionnnnn", action.community)
                console.log("PPPPPPPPPPP",newState)
                return newState;
            
            case ADD_COMMUNITY:
                newState = {
                    ...action.community, 
                    ...state
                };
                return newState;

            case DELETE_COMMUNITY:
                console.log("DELETE",action)
                newState = {...state};
                delete newState[action.community]
                return newState;
        default:
            return state ;
    }
};