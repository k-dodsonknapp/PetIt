import React, { useEffect } from 'react'
import { BiMessage } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAllComments } from '../../store/comments';
import './numOfComments.css';

function NumOfComments({ postId, comments }) {
    
    const history = useHistory();
    const dispatch = useDispatch();
    // const comments = useSelector(state => state?.comments);
    // console.log("comments", comments)
    const postComments = Object.values(comments).filter(comment => comment?.postId === postId)
    // const postComments = useSelector(state => Object.values(state?.comments)?.filter(comment => comment?.postId === postId))
    console.log("GGGGGGGGG", postComments)
    useEffect(() => {
        dispatch(getAllComments(postId))
    }, [dispatch]);

    const redirectToPost = (e) => {
        // e.preventDefault();
        history.push(`/posts/${postId}`)
    }

    return (
        <button onClick={redirectToPost} className="main-feed-comment-btn"><span><BiMessage id="comment-count-icon" />  </span>
            <span className="main-comment-btn-label"> 
                <span className='comment-count'>{postComments?.length}</span> Comments
            </span>
        </button>
    )
}

export default NumOfComments;