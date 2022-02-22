import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { addNewComment, deleteAComment, getAllComments } from "../../store/comments";
import { getAllPosts, getAPost } from "../../store/posts";
import './onePost.css'


const OnePost = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const id = useParams().postId;
    console.log("))))))))))", typeof (+id))
    const posts = useSelector(state => Object.values(state.post).filter(post => post.id === +id))
    console.log("!!!!!!!!!!!!!", posts[0])
    const user = useSelector(state => state.session.user)
    const comment = useSelector(state => Object.values(state.comments))

    const [showCommentForm, setShowCommentForm] = useState(false)
    const [newComment, setNewComment] = useState('')
    const [post, setPost] = useState(posts[0])
    console.log("@@@@@@@@@", post)
    const [title, setTitle] = useState("")
    console.log(newComment)


    const handleShowCommentForm = (e) => {
        e.preventDefault();
        if (showCommentForm === false) {
            setShowCommentForm(true)
        } else {
            setShowCommentForm(false)
        }
    }

    useEffect(() => {
        setPost(posts[0])
    }, [])

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
        dispatch(getAllComments(id))
    }, [dispatch])

    useEffect(() => {
        dispatch(getAPost(id))
        // setTitle(posts[0].title)
    }, [])

    const handleCommentDelete = (e) => {
        e.preventDefault();
        const commentId = +e.target.id;
        const idData = {
            "postId": id,
            "id": commentId
        }
        dispatch(deleteAComment(idData))
        dispatch(getAllComments(id))
    }

    const handleHome = () => {
        history.push('/posts/home')
    }

    return (
        <div className="page">
            <div className="main-feed-container" >
                <div className="posts" >
                    <div className="left-post">
                        <button>
                            <img src="https://icons.veryicon.com/png/o/miscellaneous/cloud-platform/up-arrow-9.png" />
                        </button>
                        <button>
                            <img src="https://icons.veryicon.com/png/o/miscellaneous/cloud-platform/down-arrow-10.png" />
                        </button>
                    </div>
                    <div className="right-post">
                        <div>
                            {posts[0]?.title}
                        </div>
                        <div>
                            <img className='img-tag' src={`${posts[0]?.image}`} alt="" />
                        </div>
                        <div>
                            {posts[0]?.body}
                        </div>
                        <div className="button-div">
                            <button id={"posts.id"} onClick={handleHome}>Home</button>
                            <button id={"posts.id"} onClick={handleShowCommentForm}>Comment</button>
                        </div>
                    </div>
                </div>
                {showCommentForm && (
                    <div className="comment-form">
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
                    {comment?.map(comment => (
                        <div key={comment?.id}>
                            {comment?.comment}
                            {user?.id === comment?.userId && (
                                <button id={comment?.id} onClick={handleCommentDelete}>delete</button>
                            )}
                        </div>
                    ))?.reverse()}
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