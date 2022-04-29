import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllComments, updateComment } from "../../store/comments";

const EditComment = ({commentId, id, setShowCommentEditForm, setShowBts, setCommentToEdit, commentToEdit}) => {

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
        console.log("DDDDDDDD", editComment)
        dispatch(updateComment(editComment));
        dispatch(getAllComments(+id));
        setShowCommentEditForm(false);
        setShowBts(true);
    };

    return (
        <>
            <div className="comment-form">
                <form onSubmit={handleEditComment}>
                    <label htmlFor="editComment">Edit Comment</label>
                    <textarea
                        type="text"
                        name="editComment"
                        value={commentToEdit}
                        onChange={e => setCommentToEdit(e.target.value)}
                        required
                    />
                    <button
                        disabled={errorsEdit.length > 0 ? true : false}
                        id="post-btnsss" onClick={handleEditedComment}
                    >Submit</button>
                    <button id="post-btnsss" onClick={handleECancel}>Cancel</button>
                    <ul className="errors">
                        {/* {errorsEdit.length > 0 && errors.map(error => {
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
}

export default EditComment;