import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewComment, getAllCommentOnComment, getAllComments } from "../../store/comments";

const CommentOnComment = ({ setShowCommentOnCommentForm, showCommentOnCommentForm, comment, id }) => {

    const dispatch = useDispatch();
    const user = useSelector(state => state?.session?.user);
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
        };
        console.log(brandNewComment)
        if (showBtns === false) {
            setShowBts(true);
        };
        dispatch(addNewComment(brandNewComment));
        setShowCommentOnCommentForm(false);
        setNewCommentOnComment("");
    };

    return (
        <>
            <div className={`comment-on-comment-form-${comment.id}`}>
                <form onSubmit={handleNewCommentOnComment}>
                    <label htmlFor="comment">Reply</label>
                    <textarea
                        placeholder="What are you thoughts?"
                        type="text"
                        name="comment"
                        value={newCommentOnComment}
                        onChange={e => setNewCommentOnComment(e.target.value)}
                        required
                    />
                    <button
                        id="post-btnsss"
                        onClick={handleNewCommentOnComment}
                    >Submit</button>
                    <button id="post-btnsss" onClick={handleCancel}>Cancel</button>
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
        </>
    )
};

export default CommentOnComment;