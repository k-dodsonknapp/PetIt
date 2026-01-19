import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllComments, updateComment } from "../../store/comments";

const EditComment = ({
  commentId,
  id,
  setShowCommentEditForm,
  setShowBts,
  setCommentToEdit,
  commentToEdit,
}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.session?.user);

  const handleECancel = (e) => {
    e.preventDefault();
    setShowCommentEditForm(false);
    // setShowBts(true);
  };

  const handleEditedComment = (e) => {
    e.preventDefault();
    const editComment = {
      id: +commentId,
      userId: user.id,
      postId: id,
      comment: commentToEdit,
      parentId: null,
    };
    dispatch(updateComment(editComment));
    dispatch(getAllComments(+id));
    setShowCommentEditForm(false);
    // setShowBts(true);
  };

  return (
    <>
      <div className="comment-on-comment-form">
        <form>
          <h5>
            Edit Comment as{" "}
            <span className="comment-form-username">{user.username}</span>
          </h5>
          <div className="comment-on-comment-textarea">
            <textarea
              type="text"
              name="editComment"
              value={commentToEdit}
              onChange={(e) => setCommentToEdit(e.target.value)}
              required
            />
          </div>
          <div className="comment-on-comment-textarea-bottom">
            <button id="one-post-comment-btn" onClick={handleEditedComment}>
              Submit
            </button>
            <button id="one-post-comment-btn" onClick={handleECancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditComment;
