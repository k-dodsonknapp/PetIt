import { GoCommentDiscussion } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
import './numOfComments.css';

function NumOfComments({ post }) {
    const navigate = useNavigate();

    const redirectToPost = (e) => {
        e.preventDefault();
        navigate(`/posts/${post.id}`)
    }

    return (
        <button onClick={redirectToPost} className="main-feed-comment-btn"><span><GoCommentDiscussion id="comment-count-icon" />  </span>
            <span className="main-comment-btn-label">
                <span className='comment-count'>
                    {post.commentCount}
                </span>
                <span className='comment-btn-text'>
                    Comments
                </span>
            </span>
        </button>
    )
}

export default NumOfComments;