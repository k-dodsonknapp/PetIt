const GET_COMMENTS_FOR_POST = '/comments/:id'
const ADD_COMMENT = '/comments/new'
const DELETE_COMMENT = '/comments/delete'
// const COMMENT_ON_COMMENT = '/comments/comment/:id'
const UPDATE_COMMENT = 'comments/edit';


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

const updateAComment = (comment) => ({
    type: UPDATE_COMMENT,
    comment,
})

export const updateComment = data => async (dispatch) => {
    const res = await fetch(`/api/comments/edit`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    if (res.ok) {
        const comment = await res.json();
        dispatch(updateAComment(comment));
        return comment;
    }

}

export default function commentReducer(state = {}, action) {
    
    let newState;

    switch(action.type) {
        case GET_COMMENTS_FOR_POST:
            newState = {...state}
            action.comments.comments.map(comment => (
                newState[comment.id] = comment
            ))
            return newState

        // case COMMENT_ON_COMMENT:
        //     newState = {...state}
        //     action.comments.comments_on_comment.map(comment =>(
        //         newState[comment.id] = comment
        //     ))
        //     return newState

        case ADD_COMMENT:
            newState = {...state}

            newState = {
                [action.comment.id]: action.comment,
                ...state,
            }
            return newState
        
        case DELETE_COMMENT:
            // console.log("2222222", state)
            // console.log("!!!!!!!!!", action.comment.success.id)
            newState = {...state};
            // console.log("@@@@@@@@@@", newState)

            // newState = newState.omit(newState, action.comment.success.id);
            delete newState[action.comment.success.id]
            // action.comment.comments.forEach(comment => (
            //     newState[comment.id] = comment
            // ))
            return newState

        case UPDATE_COMMENT:
            console.log("@@@@@@@", state)
            newState = {
                ...state,
                [action.id]: action.comment
            }
            return newState
        default:
            return state;
    }
}