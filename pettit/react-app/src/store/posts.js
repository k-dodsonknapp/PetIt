const GET_ALL_POSTS = '/posts/';

const ADD_POST = '/posts/new';
const UPDATE_POST = '/posts/edit';
const DELETE_POST = '/posts/delete';

const getPosts = (posts) => ({
    type: GET_ALL_POSTS,
    posts,
});


const addPost = (post) => ({
    type: ADD_POST,
    post,
});

const updatePost = (post) => ({
    type: UPDATE_POST,
    post,
});

const deletePost = (post) => ({
    type: DELETE_POST,
    post,
});

export const getAllPosts = () => async (dispatch) => {
    const res = await fetch('/api/posts/main');
    if (res.ok) {
        const data = await res.json();
        console.log("$$$$$$$$$$", data)
        dispatch(getPosts(data));
        return data;
    };
};

// export const getAPost = (id) => async (dispatch) => {
//     // console.log("*********", id)
//     const res = await fetch(`/api/posts/${id}`);
//     if (res.ok) {
//         const data = await res.json();
//         // console.log("{{{{{{{{{", data)
//         // if (data.errors) {
//         //     return;
//         // };
//         dispatch(getOnePost(data));
//         // return data;
//     };
// };

export const addAPost = (data) => async (dispatch) => {
    const res = await fetch('/api/posts/new', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (res.ok) {
        const post = await res.json();
        dispatch(addPost(post));
        return post;
    };
};

export const updateAPost = (data) => async (dispatch) => {
    // console.log("IDIDIDDD", data)
    const res = await fetch(`/api/posts/${data.id}/edit`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (res.ok) {
        const post = await res.json();
        dispatch(updatePost(post));
        return post;
    };
};

export const deleteAPost = (data) => async (dispatch) => {
    const res = await fetch('/api/posts/delete', {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (res.ok) {
        const id = await res.json()
        dispatch(deletePost(id));
        return "Post successfully delete"
    };
};

const initialState = {
    list: []
};

export default function postReducer(state = initialState, action) {

    let newState;
    switch (action.type) {
        case GET_ALL_POSTS:
            // console.log("I am really lost", action.payload.posts)
            // console.log({
            //     ...state,
            //     list: [...action.payload.posts]
            // })
            // console.log("$$$$$$$", action.posts.posts)
            return {

                ...state,
                list: [...action.posts.posts],
            }

        // case GET_ONE_POST:
        //     return {
        //         // ...state,
        //         // list : [...action.post]
        //     }

        case UPDATE_POST:
            console.log("############", state.list)
            console.log("44444444444444", action.post)
            newState = {}
            let newwArr = [...state.list]
            newwArr.forEach(post => {
                if (post.id === action.post.id) {
                    newState[action.post.id] = action.post
                }
            })
            // console.log("111111111", newState)
            // newState = {
            //     ...state,
            //     [action.id]: action.post
            // }
            return newState
        case ADD_POST:
            console.log("555555555555",state)
            console.log("000000000000",action)
            newState = {
                ...state,
                [action.post.id]: {
                    ...state[action.post.id],
                }
            }
            return newState

        case DELETE_POST:
            newState = { ...state };
            let newArr = [...newState.list]
            let index = newArr.indexOf(action.post)
            newArr.splice(index, 1)
            newState.list = newArr
            return newState;

        default:
            return state;
    }
}
