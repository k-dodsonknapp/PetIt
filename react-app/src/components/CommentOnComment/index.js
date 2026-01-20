import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewComment,
  getAllComments,
} from "../../store/comments";
import "./commentOnComment.css";

const CommentOnComment = ({
  setShowCommentOnCommentForm,
  showCommentOnCommentForm,
  comment,
  id,
}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.session?.user);
  const [showBtns, setShowBts] = useState(true);
  const [newCommentOnComment, setNewCommentOnComment] = useState("");

  const handleCancel = (e) => {
    e.preventDefault();
    if (showCommentOnCommentForm === false) {
      setShowCommentOnCommentForm(true);
    } else {
      setShowCommentOnCommentForm(false);
    }
    setShowBts(true);
  };

  const handleNewCommentOnComment = (e) => {
    e.preventDefault();
    dispatch(getAllComments(+id));

    const brandNewComment = {
      userId: user.id,
      postId: id,
      comment: newCommentOnComment,
      parentId: comment.id,
      username: user.username,
    };
    if (showBtns === false) {
      setShowBts(true);
    }
    dispatch(addNewComment(brandNewComment));
    setShowCommentOnCommentForm(false);
    setNewCommentOnComment("");
  };

  return (
    <>
      {showCommentOnCommentForm && (
        <div className="comment-on-comment-form">
          <form onSubmit={handleNewCommentOnComment}>
            {user && (
              <h5>
                Comment as{" "}
                <span className="comment-form-username">{user.username}</span>
              </h5>
            )}
            <div className="comment-on-comment-textarea">
              <textarea
                placeholder="What are you thoughts?"
                type="text"
                name="comment"
                value={newCommentOnComment}
                onChange={(e) => setNewCommentOnComment(e.target.value)}
                required
              />
            </div>
            <div className="comment-on-comment-textarea-bottom">
              <button
                id="one-post-comment-btn"
                onClick={handleNewCommentOnComment}
              >
                Comment
              </button>
              <button id="one-post-comment-btn" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default CommentOnComment;
