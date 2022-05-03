import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllComments, updateComment } from "../../store/comments";

const EditComment = ({ commentId, id, setShowCommentEditForm, setShowBts, setCommentToEdit, commentToEdit }) => {

    const dispatch = useDispatch();
    const user = useSelector(state => state?.session?.user)
    const [errorsEdit, setErrorsEdit] = useState([]);

    const handleEditComment = (body, commId) => async (e) => {
        e.preventDefault();
        setShowBts(false);
    };

    const handleECancel = (e) => {
        e.preventDefault();
        setShowCommentEditForm(false);
        setShowBts(true);
    };

    const handleEditedComment = (e) => {
        e.preventDefault();
        const editComment = {
            "id": +commentId,
            'userId': user.id,
            'postId': id,
            "comment": commentToEdit,
            "parentId": null
        };
        dispatch(updateComment(editComment));
        dispatch(getAllComments(+id));
        setShowCommentEditForm(false);
        setShowBts(true);
    };

    return (
        <>
            <div className="comment-on-comment-form">
                <form onSubmit={handleEditComment}>
                    <h5>Edit Comment as <span className="comment-form-username">{user.username}</span></h5>
                    {/* <label htmlFor="editComment">Edit Comment</label> */}
                    <div className="comment-on-comment-textarea">
                        <textarea
                            type="text"
                            name="editComment"
                            value={commentToEdit}
                            onChange={e => setCommentToEdit(e.target.value)}
                            required
                        />
                    </div>
                    <div className="comment-on-comment-textarea-bottom">

                        <button
                            disabled={errorsEdit.length > 0 ? true : false}
                            id="one-post-comment-btn" onClick={handleEditedComment}
                        >Submit</button>
                        <button id="one-post-comment-btn" onClick={handleECancel}>Cancel</button>
                    </div>
                    {/* {errorsEdit.length > 0 && errors.map(error => {
                        <ul className="errors">
                            return <li className="li" key={error}>
                                <div className="error-div">
                                    {error}
                                </div>
                            </li>
                        // })} */}
                    {/* </ul> */}
                </form>
            </div>
        </>
    )
}

export default EditComment;