import { useEffect } from 'react'
import { GoCommentDiscussion } from "react-icons/go";

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllComments } from '../../store/comments';
import './numOfComments.css';

function NumOfComments({ postId, comments }) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const postComments = Object.values(comments).filter(comment => comment?.postId === postId)

    useEffect(() => {
        dispatch(getAllComments(postId))
    }, [dispatch, postId]);

    const redirectToPost = (e) => {
        e.preventDefault();
        navigate(`/posts/${postId}`)
    }

    return (
        <button onClick={redirectToPost} className="main-feed-comment-btn"><span><GoCommentDiscussion id="comment-count-icon" />  </span>
            <span className="main-comment-btn-label">
                <span className='comment-count'>
                    {postComments?.length}
                </span>
                <span className='comment-btn-text'>
                    Comments
                </span>
            </span>
        </button>
    )
}

export default NumOfComments;