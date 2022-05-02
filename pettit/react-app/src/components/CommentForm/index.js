import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewComment, getAllComments } from "../../store/comments";

const CommentForm = ({ postId, showBtns, setShowBts }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state?.session?.user);
    const [newComment, setNewComment] = useState('');

    const handleNewComment = (e) => {
        e.preventDefault();
        dispatch(getAllComments(+postId));
        const brandNewComment = {
            "userId": user.id,
            "postId": postId,
            "comment": newComment,
            "parentId": null
        };
        console.log(brandNewComment)
        if (showBtns === false) {
            setShowBts(true);
        };
        dispatch(addNewComment(brandNewComment));
        // setShowCommentForm(false);
        setNewComment("");
    };

    return (
        <div className="comment-form">
            <h5>Comment as <span className="comment-form-username">{user.username}</span></h5>
            <form onSubmit={handleNewComment}>
                {/* <label htmlFor="comment">New Comment</label> */}
                <textarea
                    placeholder="What are you thoughts?"
                    type="text"
                    name="comment"
                    value={newComment}
                    onChange={e => setNewComment(e.target.value)}
                    required
                >
                </textarea>
                <div className="comment-textarea-bottom">
                    <button id="one-post-comment-btn" onClick={handleNewComment}>Comment</button>

                </div>
                {/* <button
            disabled={errors.length > 0 ? true : false}
            id="post-btnsss"
            onClick={handleNewComment}
        >Submit</button>
        <button id="post-btnsss" onClick={handleCancel}>Cancel</button> */}
                <ul className="errors">
                    {/* {errors.length > 0 && errors.map(error => {
                return <li className="li" key={error}>
                    <div className="error-div">
                        {error}
                    </div>
                </li>
            })} */}
                </ul>
            </form>
        </div>
    )
};

export default CommentForm;