import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { addNewComment, deleteAComment, getAllComments, updateComment } from "../../store/comments";
import { getAllPosts } from "../../store/posts";
import PageNotFound from "../PageNotFound";
import './onePost.css'


const OnePost = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const id = +useParams().postId;
    console.log("@@@@@@@@", id)
    // const posts = useSelector(state => Object.values(state.post).filter(post => post.id === +id))
    // const posts = useSelector(state => state.post.filter(post => post.id === +id))
    const posts = useSelector(state => state.post.list.filter(post => post.id === id));
    console.log("@@@@@@", posts)
    const user = useSelector(state => state.session.user)
    const comment = useSelector(state => Object.values(state.comments))
    
    const [showCommentForm, setShowCommentForm] = useState(false)
    const [showCommentEditForm, setShowCommentEditForm] = useState(false)
    const [newComment, setNewComment] = useState('')
    const [commentToEdit, setCommentToEdit] = useState('')
    const [showBtns, setShowBts] = useState(true)
    const [commentId, setCommentId] = useState(0)
    const [errors, setErrors] = useState([])
    const [errorsEdit, setErrorsEdit] = useState([])
    console.log("(((((((((((((((", commentId)
    
    // const [editedComment, setEditedComment] = useState('')
    
    useEffect(() => {
        const err = []
        if (newComment.length > 250 || newComment.length < 5) {
            err.push("Your comment cannot be longer than 250 characters or shorter than 5 characters.")
        }
        // if (title.length > 50 || title.length < 3) {
            //     err.push("Your post must have a title and cannot be longer than 50 characters.")
            // }
            
            setErrors(err)
            
    }, [newComment])
    
    useEffect(() => {
        const err = []
        if (commentToEdit.length > 250 || commentToEdit.length < 5) {
            err.push("Your comment cannot be longer than 250 characters or shorter than 5 characters.")
        }
        // if (title.length > 50 || title.length < 3) {
            //     err.push("Your post must have a title and cannot be longer than 50 characters.")
            // }
            
            setErrorsEdit(err)
            
        }, [commentToEdit])
        
        useEffect(() => {
            dispatch(getAllComments(id))
    }, [dispatch, id])
    
    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch, id])
    

    const handleShowCommentForm = (e) => {
        e.preventDefault();
        if (showCommentForm === false || showCommentEditForm === true) {
            setShowCommentForm(true)
            setShowCommentEditForm(false)
        } else {
            setShowCommentForm(false)
        }
    }

    const handleNewComment = (e) => {
        e.preventDefault();
        dispatch(getAllComments(+id))
        const brandNewComment = {
            "userId": user.id,
            "postId": id,
            "comment": newComment
        }
        dispatch(addNewComment(brandNewComment))
        setShowCommentForm(false)
        setNewComment("")
    }

    const handleEditedComment = (e) => {
        e.preventDefault();
        const editComment = {
            "id": +commentId,
            'userId': user.id,
            'postId': id,
            "comment": commentToEdit
        }
        console.log("EEEEEEEEEEEEEE", +commentId)
        dispatch(updateComment(editComment))
        dispatch(getAllComments(+id))
        setShowCommentEditForm(false)
        setShowBts(true)
    }


    const handleCommentDelete = (e) => {
        e.preventDefault();
        const commentId = +e.target.id;
        const idData = {
            "postId": id,
            "id": commentId
        }
        dispatch(getAllComments(id))
        dispatch(deleteAComment(idData))
    }

    const handleHome = () => {
        history.push('/posts/main')
    }

    const handleEditComment = (body, commId) => async (e) => {
        e.preventDefault();
        setCommentId(commId)
        if (showCommentEditForm === false || showCommentForm === true) {
            setShowCommentEditForm(true)
            setShowCommentForm(false)
        } else {
            setShowCommentEditForm(false)
        }
        console.log("########", body)
        setCommentToEdit(body)
        setShowBts(false)
        // if (showCommentEditForm === true) {
        //     setShowCommentForm(false)
        // }else {
        //     setShowCommentForm(true)
        // }
        // setShowCommentEditForm(false)
    }

    // const hideEditBtns = (e) => {
    //     if (showBtns === true){
    //         setShowBts(false)
    //     }else {
    //         setShowBts(true)
    //     }
    // }

    if (!posts) {
        return (
          <PageNotFound />
        )
    }

    return (
        <div className="page">
            <div className="main-feed-containers" >
                <div className="posts" >
                    <div className="left-post">
                        {/* <button>
                            <img src="https://icons.veryicon.com/png/o/miscellaneous/cloud-platform/up-arrow-9.png" alt="upvote" />
                        </button>
                        <button>
                            <img src="https://icons.veryicon.com/png/o/miscellaneous/cloud-platform/down-arrow-10.png" alt="downvote" />
                        </button> */}
                    </div>
                    <div className="right-post">
                        <div>
                            {posts[0]?.title}
                        </div>
                        <div className="img-tage">
                            <img className='img-tag' src={`${posts[0]?.image}`} alt="" 
                            onError={(e) => { e.target.src = 'https://learn.getgrav.org/user/pages/11.troubleshooting/01.page-not-found/error-404.png'; e.target.onError = null; }}/>
                        </div>
                        <div className="post-body">
                            {posts[0]?.body}
                        </div>
                        <div className="button-div">
                            <button id="post-btn" onClick={handleHome}>Home</button>
                            <button id="post-btn" onClick={handleShowCommentForm}>Comment</button>
                            {/* <button id="post-btn" onClick={hideEditBtns}>Hide Edit & Delete</button> */}
                        </div>
                    </div>
                </div>
                <div className="newCommentEditForm">
                    {showCommentForm && (
                        <div className="comment-form">
                            <form onSubmit={handleNewComment}>
                                <label htmlFor="comment">New Comment</label>
                                <textarea
                                    type="text"
                                    name="comment"
                                    value={newComment}
                                    onChange={e => setNewComment(e.target.value)}
                                    required
                                />
                                <button
                                    disabled={errors.length > 0 ? true : false}
                                    // id="post-btn" 
                                    id="post-btnsss"
                                    onClick={handleNewComment}
                                >Submit</button>
                                <ul className="errors">
                                    {errors.length > 0 && errors.map(error => {
                                        return <li className="li" key={error}>
                                            <div className="error-div">
                                                {error}
                                            </div>
                                        </li>
                                    })}
                                </ul>
                            </form>
                        </div>
                    )}
                    {showCommentEditForm && (
                        <div className="comment-form">
                            <form onSubmit={handleEditComment}>
                                <label htmlFor="editComment">Edit Comment</label>
                                <textarea
                                    type="text"
                                    name="editComment"
                                    value={commentToEdit}
                                    onChange={e => setCommentToEdit(e.target.value)}
                                    required
                                />
                                <button
                                    disabled={errorsEdit.length > 0 ? true : false}
                                    id="post-btnsss" onClick={handleEditedComment}
                                >Submit</button>
                                <ul className="errors">
                                    {errorsEdit.length > 0 && errors.map(error => {
                                        return <li className="li" key={error}>
                                            <div className="error-div">
                                                {error}
                                            </div>
                                        </li>
                                    })}
                                </ul>
                            </form>
                        </div>
                    )}
                </div>
                <div className="comments">
                    <h3>Comments:</h3>
                    {comment?.map(comment => (
                        <div key={comment?.id}>
                            <div className="comment">
                                <div className="comm">
                                    {comment?.comment}
                                </div>
                                {user?.id === comment?.userId && (
                                    <div>
                                        {showBtns && (
                                            <div className="btnsDiv">
                                                <button id={comment?.id} className="btnsss" onClick={handleCommentDelete}>Delete</button>
                                                <button id={comment?.id} className='btnsss' onClick={handleEditComment(comment?.comment, comment?.id)}>Edit</button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))?.reverse()}
                </div>
            </div>
            <div className="right-container">
                <div className="communities">
                    <div className="comm">
                        <h1>WELCOME TO PETIT!</h1>
                    </div>
                </div>

                <div className="create">
                    <h4>Developed by:</h4>
                    <h4>Kenneth Dodson-Knapp</h4>
                    <div className="links">
                        <a href='https://github.com/k-dodsonknapp'>GitHub</a>
                        <a href="https://www.linkedin.com/in/kenneth-dodson-knapp-97029022a/">LinkedIn</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OnePost;