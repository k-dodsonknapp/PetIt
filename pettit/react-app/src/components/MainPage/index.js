import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteAPost, getAllPosts, updateAPost } from "../../store/posts";
import './post.css'

const MainPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const posts = useSelector(state => state.post)

    useEffect(() => {
        const id = {
            "id": 10,
            "title": "What a wonderful title",
            "body": "A new body",
            "image": "A wonderful image"
        }
        dispatch(updateAPost(id));
        dispatch(getAllPosts());
    }, [dispatch])
    
    useEffect(() => {
        dispatch(deleteAPost())
    }, [dispatch])
    
    const handleDelete = (e) => {
        e.preventDefault();
        const id = { "id": +e.target.id }
        dispatch(deleteAPost(id))
        dispatch(getAllPosts())
    }

    const handleEdit = (e) => {
        const id = e.target.id
        history.push("/posts/edit")
    }

    return (
        <div className="page">
            <div className="main-feed-container" >
                {posts['list']?.map(post => (
                    <div className="post" key={post.id}>
                        <div className="left-post">   
                        </div>
                        <div className="right-post">
                            <h2>Hello!</h2>
                            {post.image} <br />
                            {post.body}
                            <div className="button-div">
                                <button id={post.id} onClick={handleEdit}>Edit</button>
                                <button id={post.id} onClick={handleDelete}>Delete</button>
                            </div>
                        </div>
                    </div>
                )).reverse()}
            </div>
            <div className="right-container">
                <div className="communities">

                </div>

                <div className="create"></div>
            </div>
        </div>
    )
}

export default MainPage