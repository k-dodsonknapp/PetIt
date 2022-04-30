import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewComment, deleteAComment, getAllCommentOnComment, getAllComments } from "../../store/comments";
import CommentOnComment from "../CommentOnComment";
import EditComment from "../EditComment";
import LoginAlert from "../LoginAlert";
import { FaAlignJustify, BiMessage } from "react-icons/bi";
import './comments.css';

const Comments = ({ comment, id }) => {

    const dispatch = useDispatch();
    console.log("asdfasdfasdf", comment)

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
            "postId": id,
            "id": comment.id
        };
        console.log("LLLLLLL", idData)
        dispatch(getAllComments(id));
        dispatch(deleteAComment(idData));
    };

    const handleCommentOnComment = (index, commentId) => async (e) => {
        e.preventDefault();
        if (!user) {
            setShowLoginModal(true)
        } else {

            if (showCommentOnCommentForm === false) {
                setShowCommentOnCommentForm(true);
            } else {
                setShowCommentOnCommentForm(false);
            };
            if (showCommentOnCommentForm === true) {
                setShowCommentOnCommentForm(false);
            } else {
                setShowCommentOnCommentForm(true);
            }
        };
    };

    return (
        <>
            <div key={comment?.id}>
                <div className="comment">
                    <div>
                        {comment?.username}
                    </div>
                    <div className="commm">
                        {comment?.comment}
                        {showCommentOnCommentForm && (
                            <>
                                <CommentOnComment
                                    comment={comment}
                                    id={id}
                                    setShowCommentOnCommentForm={setShowCommentOnCommentForm}
                                    showCommentOnCommentForm={showCommentOnCommentForm}
                                />
                            </>
                        )}
                        <button id={comment?.id} className='reply-to-comment' onClick={handleCommentOnComment(comment?.id)} >Reply <BiMessage id="reply-icon"/></button>
                        {commentsOnComment.map(comment => (
                            <Comments comment={comment} id={id} />
                        ))}
                    </div>
                    {user?.id === comment?.userId && (
                        <div className="edit-comment">
                            <div className="btnsDiv">
                                <button id={comment?.id} className="btnsss" onClick={handleCommentDelete}>Delete</button>
                                <button id={comment?.id} className='btnsss' onClick={handleEditComment(comment?.comment, comment?.id)}>Edit</button>
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
                            id={id} />
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