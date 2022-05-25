const GET_ALL_COMMUNITIES = '/communities/'; 

const getCommunities = (communities) => ({
    type: GET_ALL_COMMUNITIES,
    communities
});

export const getAllCommunities = () => async (dispatch) => {
    const res = await fetch('/api/communities/');
    if (res.ok) {
        const data = await res.json();
        dispatch(getCommunities(data));
        return data;
    };
};

export default function communitiesReducer(stat = [], action) {
    
}