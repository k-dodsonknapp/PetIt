import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewComment, deleteAComment, getAllCommentOnComment, getAllComments } from "../../store/comments";
import CommentOnComment from "../CommentOnComment";
import EditComment from "../EditComment";
import LoginAlert from "../LoginAlert";
import { BiMessage } from "react-icons/bi";
import './comments.css';
import CommentOnCommentFormToggle from "../CommentOnCommentToggle";

const Comments = ({ comment, postId }) => {
    console.log(comment)

    const dispatch = useDispatch();
    const commentsOnComment = useSelector(state => Object.values(state?.comments).filter(commentt => commentt?.parentId === comment.id));
    const user = useSelector(state => state?.session?.user);
    const [showBtns, setShowBts] = useState(true);
    const [commentId, setCommentId] = useState(0);
    const [showCommentEditForm, setShowCommentEditForm] = useState(false);
    const [showCommentForm, setShowCommentForm] = useState(false);
    const [commentToEdit, setCommentToEdit] = useState('');
    const [showCommentOnCommentForm, setShowCommentOnCommentForm] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

    useEffect(() => {
        dispatch(getAllCommentOnComment(comment.id))
    }, [])

    const handleEditComment = (body, commId) => async (e) => {
        e.preventDefault();
        setCommentId(commId);
        if (showCommentEditForm === false || showCommentForm === true) {
            setShowCommentEditForm(true);
            setShowCommentForm(false);
        } else {
            setShowCommentEditForm(false);
        }
        setCommentToEdit(body);
        setShowBts(false);
    }

    const handleCommentDelete = (e) => {
        e.preventDefault();
        const idData = {
            "postId": postId,
            "id": comment.id
        };
        console.log("LLLLLLL", idData)
        dispatch(getAllComments(postId));
        dispatch(deleteAComment(idData));
    };

    const handleCommentOnComment = () => async (e) => {
        e.preventDefault();
        if (!user) {
            setShowLoginModal(true)
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
            <div key={comment?.id}>
                <div className="comment">
                    <div>
                        <h5>{comment?.username}</h5>
                    </div>
                    <div className="commm">
                        {comment?.comment}
                        {/* <CommentOnCommentFormToggle comment={comment} showLoginModal={showLoginModal} postId={postId} handleCommentOnComment={handleCommentOnComment} /> */}
                        <button id={comment?.id} className='reply-to-comment' onClick={handleCommentOnComment(comment?.id)} >Reply <BiMessage id="reply-icon" /></button>
                            {showCommentOnCommentForm && (
                                <>
                                    <CommentOnComment
                                        comment={comment}
                                        id={postId}
                                        setShowCommentOnCommentForm={setShowCommentOnCommentForm}
                                        showCommentOnCommentForm={showCommentOnCommentForm}
                                    />
                                </>
                            )}
                        <div>
                            {commentsOnComment.map(comment => (
                                <Comments comment={comment} postId={postId} />
                            ))}
                        </div>
                    </div>
                    {user?.id === comment?.userId && (
                        <div className="edit-comment">
                            <div className="btnsDiv">
                                {/* <button id={comment?.id} className="btnsss" onClick={handleCommentDelete}>Delete</button>
                                <button id={comment?.id} className='btnsss' onClick={handleEditComment(comment?.comment, comment?.id)}>Edit</button> */}
                            </div>
                        </div>
                    )}
                </div>
                <>
                    {showCommentEditForm && (
                        <EditComment
                            setShowCommentEditForm={setShowCommentEditForm}
                            setShowBts={setShowBts}
                            commentToEdit={commentToEdit}
                            setCommentToEdit={setCommentToEdit}
                            commentId={comment.id}
                            id={postId} />
                    )}
                </>
                {showLoginModal && (
                    <LoginAlert setShowLoginModal={setShowLoginModal} showLoginModal={showLoginModal} />
                )}
            </div>
        </>

    )
};

export default Comments;