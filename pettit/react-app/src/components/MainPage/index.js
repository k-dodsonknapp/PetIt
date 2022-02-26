import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllComments } from "../../store/comments";
import { deleteAPost, getAllPosts } from "../../store/posts";
// import { getPostVotes } from "../../store/votes";
import './post.css'

const MainPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const posts = useSelector(state => state.post.list)
    const user = useSelector(state => state.session)
    const [postId, setPostId] = useState()

    useEffect(() => {
        dispatch(getAllPosts());
    }, [dispatch])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])


    const handleDelete = (postId) => async (e) => {
        setPostId(postId)
        e.preventDefault();
        const id = { "id": +postId }
        dispatch(deleteAPost(id))
        dispatch(getAllPosts())
        dispatch(getAllComments(id.id))
    }

    const handleEdit = (postId) => async (e) => {
        e.preventDefault();
        history.push(`/posts/${postId}/edit`)
    }

    return (
        <div className="page">
            <div className="main-feed-container" >
                {posts?.map(post => (
                    <div className="post" key={post.id}>
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
                                {post.title}
                            </div>
                            <a href={`/posts/${post?.id}`}>
                                <div>
                                    <div>
                                        <img className='img-tage' src={`${post.image}`} alt="post" />
                                    </div>
                                </div>
                            </a>
                            {post.userId === user.user.id && (
                                <div className="button-div">
                                    <div className="edit-btn">
                                        <i onClick={handleEdit(post?.id)} className="fa-solid fa-pen-to-square"> <span> Edit </span> </i>
                                    </div>
                                    <div className="delete-btn">
                                        <i onClick={handleDelete(post?.id)} className="fa-solid fa-trash"> <span> Delete </span> </i>
                                    </div>
                                </div>
                            )}
                            {post.userId !== user.user.id && (
                                <div>

                                </div>
                            )}
                        </div>
                    </div>
                )).reverse()}
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
        </div >
    )
}

export default MainPage