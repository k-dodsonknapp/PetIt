import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewComment, deleteAComment, getAllCommentOnComment, getAllComments } from "../../store/comments";
import CommentOnComment from "../CommentOnComment";
import EditComment from "../EditComment";
import LoginAlert from "../LoginAlert";
import { BiMessage } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin2Line } from "react-icons/ri";
import './comments.css';

const Comments = ({ comment, postId }) => {
    // console.log(comment)

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
                    <div className="username-profile-pic">
                        {/* <div img className="profile-pic"> */}
                            {/* <img className="profile-pic" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8Rrb0PRnlTW2D_oE_pbIigXUsdvHL5LLfJA&usqp=CAU"></img> */}
                        {/* </div> */}
                        <div className="on-comment-username">
                            <h5>{comment?.username}</h5>
                        </div>
                    </div>
                    <div className="commm">
                        <div className="comment-reply-div">
                            <p>{comment?.comment}</p>
                            <div className="one-post-btn-div">
                                <button id={comment?.id} className='reply-to-comment' onClick={handleCommentOnComment(comment?.id)}><BiMessage id="reply-icon" />Reply</button>
                                {user?.id === comment?.userId && (
                                    <>
                                        <button id={comment?.id} className="reply-to-comment" onClick={handleCommentDelete}>Delete</button>
                                        <button id={comment?.id} className='reply-to-comment' onClick={handleEditComment(comment?.comment, comment?.id)}>Edit</button>
                                    </>
                                )}
                            </div>
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
                                <Comments key={comment.id} comment={comment} postId={postId} />
                            ))}
                        </div>
                    </div>

                </div>

                {showLoginModal && (
                    <LoginAlert setShowLoginModal={setShowLoginModal} showLoginModal={showLoginModal} />
                )}
            </div>
        </>

    )
};

export default Comments;