import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { addNewComment, deleteAComment, getAllComments } from "../../store/comments";
import { getAPost } from "../../store/posts";
import './onePost.css'


const OnePost = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const id = useParams().postId;
    // console.log(">>>>>>>>>>>", id)
    const posts = useSelector(state => state.post)
    const user = useSelector(state => state.session.user)
    console.log(")))))))))))",user)
    const comment = useSelector(state => Object.values(state.comments))
    // console.log("##########", comment)
    // console.log("$$$$$$$$$$$", posts)

    const [showCommentForm, setShowCommentForm] = useState(false)
    const [newComment, setNewComment] = useState('')
    console.log(newComment)

    
    const handleShowCommentForm = (e) => {
        e.preventDefault();
        if (showCommentForm === false) {
            setShowCommentForm(true)
        } else {
            setShowCommentForm(false)
        }
    }
    
    const handleNewComment = (e) => {
        e.preventDefault();
        dispatch(getAllComments(id))
        const brandNewComment = {
            "userId": user.id, 
            "postId": id,
            "comment": newComment
        }
        dispatch(addNewComment(brandNewComment))
        setShowCommentForm(false)
        setNewComment("")
    }
    useEffect(() => {
        // dispatch(getAPost(id))
        dispatch(addNewComment())
        dispatch(getAllComments(id))
    }, [dispatch])

    const handleCommentDelete = (e) => {
        e.preventDefault();
        const id = +e.target.id;
        const idData = {
            "id": id
        }
        console.log("@@@@@@@@@", id)
        dispatch(deleteAComment(id))

    }

    const handleHome = () => {
        history.push('/posts/home')
    }

    return (
        <div className="page">
            <div className="main-feed-container" >
                <div className="posts" >
                    <div className="left-post">
                    </div>
                    <div className="right-post">
                        <div>
                            {posts.title}
                        </div>
                        <div>
                            {posts.image}
                        </div>
                        <div className="button-div">
                            <button id={posts.id} onClick={handleHome}>Home</button>
                            <button id={posts.id} onClick={handleShowCommentForm}>Comment</button>
                        </div>
                    </div>
                </div>
                {showCommentForm && (
                    <div>
                        <label>Comment</label>
                        <textarea
                            type="text"
                            name="comment"
                            value={newComment}
                            onChange={e => setNewComment(e.target.value)}
                        />
                        <button onClick={handleNewComment}>Submit</button>
                    </div>
                )}
                <div className="comments">
                    {comment.map(comment => (
                        <div key={comment.id}>
                            {comment.comment}
                            {user.id === comment.userId && (
                            <button id={comment.id} onClick={handleCommentDelete}>delete</button>
                            )}
                        </div>
                    )).reverse()}
                </div>

            </div>
            <div className="right-container">
                <div className="communities">

                </div>

                <div className="create"></div>
            </div>
        </div>
    )
}

export default OnePost;