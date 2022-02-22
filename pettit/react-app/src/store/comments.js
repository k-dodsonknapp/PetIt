const GET_COMMENTS_FOR_POST = '/comments/:id'
const ADD_COMMENT = '/comments/new'
const DELETE_COMMENT = '/comments/delete'


const getPostComments = (comments) => ({
    type:GET_COMMENTS_FOR_POST,
    comments
});

export const getAllComments = (id) => async (dispatch) => {
    console.log("^^^^^^", id)
    const res = await fetch(`/api/comments/${id}`);
    const data = await res.json();
    // console.log("%%%%%%%", data)
    if (res.ok) {
        dispatch(getPostComments(data));
        return data;
    }
}

const addComment = (comment) => ({
    type: ADD_COMMENT,
    comment
})

export const addNewComment = (data) => async (dispatch) => {
    const res = await fetch('/api/comments/new', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    if (res.ok) {
        const comment = await res.json();
        dispatch(addComment(comment));
        return comment;
    }
}

const deleteComment = (comment) => ({
    type: DELETE_COMMENT,
    comment
})

export const deleteAComment = (data) => async (dispatch) => {
    console.log("&&&&&&&", data)
    const res = await fetch('/api/comments/delete', {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    if (res.ok) {
        const id = await res.json();
        dispatch(deleteComment(id));
        return 'Comment Delete Successfully'
    }
}

// const initialState = {
//     list: []
// }

export default function commentReducer(state = {}, action) {
    
    let newState;

    switch(action.type) {
        case GET_COMMENTS_FOR_POST:
            newState = {...state}
            action.comments.comments.map(comment => (
                newState[comment.id] = comment
            ))
            return newState

        case ADD_COMMENT:
            newState = {...state}
            // console.log("@@@@@@@@@",action)

            newState = {
                [action.comment.id]: action.comment,
                ...state,
            }
            return newState
        
        case DELETE_COMMENT:
            newState = {};
            console.log("!!!!!!!!!!!!!",action.comment.comments)
            action.comment.comments.forEach(comment => (
                newState[comment.id] = comment
            ))
            return newState
        default:
            return state;
    }
}