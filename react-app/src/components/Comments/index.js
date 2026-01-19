import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCommentOnComment,
  getAllComments,
  updateComment,
} from "../../store/comments";
import CommentOnComment from "../CommentOnComment";
import EditComment from "../EditComment";
import LoginAlert from "../LoginAlert";
import { BiMessage } from "react-icons/bi";
import "./comments.css";

const Comments = ({ comment, postId }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.session?.user);
  const getCommentsOnComment = useSelector((state) => state.comments);
  const [showCommentEditForm, setShowCommentEditForm] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [commentToEdit, setCommentToEdit] = useState("");
  const [showCommentOnCommentForm, setShowCommentOnCommentForm] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const commentsOnComment = useMemo(() => {
    return Object.values(getCommentsOnComment).filter(
      (comm) => comm?.parentId === comment.id
    )
  }, [getCommentsOnComment, comment]);

  useEffect(() => {
    dispatch(getAllCommentOnComment(comment.id));
  }, [comment.id, dispatch]);

  const handleEditComment = (body, commId) => async (e) => {
    e.preventDefault();
    if (showCommentEditForm === false || showCommentForm === true) {
      setShowCommentEditForm(true);
      setShowCommentForm(false);
    } else {
      setShowCommentEditForm(false);
    }
    setCommentToEdit(body);
  };

  const handleCommentDelete = (e) => {
    e.preventDefault();
    const deletedComment = {
      id: comment.id,
      userId: user.id,
      postId: postId,
      comment: "deleted",
      parentId: null,
    };
    dispatch(updateComment(deletedComment));
    dispatch(getAllComments(postId));
  };

  const handleCommentOnComment = () => async (e) => {
    e.preventDefault();
    if (!user) {
      setShowLoginModal(true);
    } else {
      if (showCommentOnCommentForm === false) {
        setShowCommentOnCommentForm(true);
      } else {
        setShowCommentOnCommentForm(false);
      }
    }
  };

  return (
    <>
      <div key={comment?.id}>
        <div className="comment">
          <div className="username-profile-pic">
            <div className="on-comment-username">
              {comment.comment === "deleted" ? (
                <h5>Deleted</h5>
              ) : (
                <h5>{comment?.username}</h5>
              )}
            </div>
          </div>
          <div className="commm">
            <div className="comment-reply-div">
              <p>{comment?.comment}</p>
              <div className="one-post-btn-div">
                <button
                  id={comment?.id}
                  className="reply-to-comment"
                  onClick={handleCommentOnComment(comment?.id)}
                >
                  <BiMessage id="reply-icon" />
                  Reply
                </button>
                {user?.id === comment?.userId && (
                  <>
                    {comment.comment !== "deleted" && (
                      <>
                        <button
                          id={comment?.id}
                          className="reply-to-comment"
                          onClick={handleCommentDelete}
                        >
                          Delete
                        </button>
                        <button
                          id={comment?.id}
                          className="reply-to-comment"
                          onClick={handleEditComment(
                            comment?.comment,
                            comment?.id
                          )}
                        >
                          Edit
                        </button>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
            <>
              {showCommentEditForm && (
                <EditComment
                  commentId={comment.id}
                  id={postId}
                  setShowCommentEditForm={setShowCommentEditForm}
                  commentToEdit={commentToEdit}
                  setCommentToEdit={setCommentToEdit}
                />
              )}
            </>
            {showCommentOnCommentForm && (
              <>
                <CommentOnComment
                  comment={comment}
                  id={postId}
                  setShowCommentOnCommentForm={setShowCommentOnCommentForm}
                  showCommentOnCommentForm={showCommentOnCommentForm}
                  onClose={() => setShowCommentOnCommentForm(false)}
                />
              </>
            )}
            <div>
              {commentsOnComment.map((comment) => (
                <Comments key={comment.id} comment={comment} postId={postId} />
              ))}
            </div>
          </div>
        </div>
        {showLoginModal && (
          <LoginAlert
            setShowLoginModal={setShowLoginModal}
            showLoginModal={showLoginModal}
          />
        )}
      </div>
    </>
  );
};

export default Comments;
