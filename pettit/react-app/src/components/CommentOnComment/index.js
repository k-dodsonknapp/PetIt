import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewComment, getAllCommentOnComment, getAllComments } from "../../store/comments";
import './commentOnComment.css'

const CommentOnComment = ({ setShowCommentOnCommentForm, showCommentOnCommentForm, comment, id }) => {

    const dispatch = useDispatch();
    const user = useSelector(state => state?.session?.user);
    console.log("asdfasdf", user)
    const [showBtns, setShowBts] = useState(true);
    const [newCommentOnComment, setNewCommentOnComment] = useState('');

    useEffect(() => {
        dispatch(getAllCommentOnComment(comment.id));
    }, [])

    const handleCancel = (e) => {
        e.preventDefault();
        if (showCommentOnCommentForm === false) {
            setShowCommentOnCommentForm(true)
        } else {
            setShowCommentOnCommentForm(false)
        }
        setShowBts(true);
    };

    const handleNewCommentOnComment = (e) => {
        e.preventDefault();
        dispatch(getAllComments(+id));

        const brandNewComment = {
            "userId": user.id,
            "postId": id,
            "comment": newCommentOnComment,
            "parentId": comment.id,
            "username": user.username,
        };
        console.log(brandNewComment)
        if (showBtns === false) {
            setShowBts(true);
        };
        dispatch(addNewComment(brandNewComment));
        setShowCommentOnCommentForm(false);
        setNewCommentOnComment("");
    };

    const handleCommentOnComment = () => async (e) => {
        e.preventDefault();
        if (!user) {
            // setShowLoginModal(true)
        } else {
            if (showCommentOnCommentForm === false) {
                setShowCommentOnCommentForm(true);
            } else {
                setShowCommentOnCommentForm(false);
            };
            // if (showCommentOnCommentForm === true) {
            //     setShowCommentOnCommentForm(false);
            // } else {
            //     setShowCommentOnCommentForm(true);
            // }
        };
    };

    return (
        <>
            {showCommentOnCommentForm && (
                <div className="comment-on-comment-form">
                    <form onSubmit={handleNewCommentOnComment}>
                        <h5>Comment as <span className="comment-form-username">{user.username}</span></h5>
                        {/* <label htmlFor="comment">Reply</label> */}
                        <div className="comment-on-comment-textarea">
                            <textarea
                                placeholder="What are you thoughts?"
                                type="text"
                                name="comment"
                                value={newCommentOnComment}
                                onChange={e => setNewCommentOnComment(e.target.value)}
                                required
                            />
                        </div>
                        <div className="comment-on-comment-textarea-bottom">
                            <button id="one-post-comment-btn" onClick={handleNewCommentOnComment}>Comment</button>
                            {/* <button id="post-btnsss" onClick={handleNewCommentOnComment}>Submit</button> */}
                            <button id="one-post-comment-btn" onClick={handleCancel}>Cancel</button>
                        </div>
                        {/* {errors.length > 0 && errors.map(error => {
                    <ul className="errors">
                                                    return <li className="li" key={error}>
                                                        <div className="error-div">
                                                            {error}
                                                        </div>
                                                    </li>
                                                })} */}
                        {/* </ul> */}
                    </form>
                </div>
            )}
        </>
    )
};

export default CommentOnComment;