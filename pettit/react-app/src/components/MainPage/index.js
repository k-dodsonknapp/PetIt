import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getAllComments } from "../../store/comments";
import { deleteAPost, getAllPosts, updateAPost } from "../../store/posts";
import './post.css'

const MainPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const posts = useSelector(state => Object.values(state.post))
    // console.log("$$$$$$$$$$$$$",posts)
    const user = useSelector(state => state.session)
    // const comments = useSelector(state => state.comments)
    // console.log("@@@@@@@@", user)

    useEffect(() => {
        dispatch(getAllPosts());
    }, [dispatch])

    const handleDelete = (e) => {
        e.preventDefault();
        const id = { "id": +e.target.id }
        dispatch(deleteAPost(id))
        dispatch(getAllPosts())
        dispatch(getAllComments(id.id))
    }

    const handleEdit = (e) => {
        const id = e.target.id
        // dispatch(getAPost(id))
        history.push(`/posts/${id}/edit`)
    }

    return (
        <div className="page">
            <div className="main-feed-container" >
                {posts?.map(post => (
                    <div className="post" key={post.id}>
                        <div className="left-post">
                        </div>
                        <div className="right-post">
                            <div>
                                {post.title}
                            </div>
                            <a href={`/posts/${post.id}`}>
                                <div>
                                    {post.image} <br />
                                    {post.id}kldsfajlsdkfj
                                </div>
                            </a>
                            {post.userId === user.user.id && (
                                <div className="button-div">
                                    <button id={post.id} onClick={handleEdit}>Edit</button>
                                    <button id={post.id} onClick={handleDelete}>Delete</button>
                                </div>
                            )}
                        </div>
                    </div>
                )).reverse()}
            </div>
            <div className="right-container">
                <div className="communities">

                </div>

                <div className="create"></div>
            </div>
        </div >
    )
}

export default MainPage