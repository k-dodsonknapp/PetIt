import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewComment, deleteAComment, getAllCommentOnComment, getAllComments } from "../../store/comments";
import CommentOnComment from "../CommentOnComment";
import CommOnComm from "../CommOnComm";
import EditComment from "../EditComment";
import './comments.css';

const Comments = ({ comment, id }) => {

    const dispatch = useDispatch();
    console.log("asdfasdfasdf", comment)

    const commentsOnComment = useSelector(state => Object.values(state?.comments).filter(commentt => commentt?.parentId === comment.id));
    // console.log("yuioyuioyuio", commentsOnComment)
    // const comments = useSelector(state => Object.values(state?.comments));
    // console.log("rtyurtyu",comments)
    const user = useSelector(state => state?.session?.user);
    const [showBtns, setShowBts] = useState(true);
    const [commentId, setCommentId] = useState(0);
    const [showCommentEditForm, setShowCommentEditForm] = useState(false);
    const [showCommentForm, setShowCommentForm] = useState(false);
    const [commentToEdit, setCommentToEdit] = useState('');
    const [showCommentOnCommentForm, setShowCommentOnCommentForm] = useState(false);
    const [showCommOnCommForm, setShowCommOnCommForm] = useState(false);
    // const [newComment, setNewComment] = useState('');
    // const [newCommentOnComment, setNewCommentOnComment] = useState('');

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
        // const commentId = +e.target.id;
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
        if (showCommentOnCommentForm === false) {
            setShowCommentOnCommentForm(true);
        } else {
            setShowCommentOnCommentForm(false);
        };
        if (showCommentOnCommentForm === true) {
            setShowCommentOnCommentForm(false);
        } else {
            setShowCommentOnCommentForm(true);
        };
    };

    const handleCommOnComm = (index, commentId) => async (e) => {
        e.preventDefault();
        if (showCommOnCommForm === false) {
            setShowCommOnCommForm(true);
        } else {
            setShowCommOnCommForm(false);
        };
        if (showCommOnCommForm === true) {
            setShowCommOnCommForm(false);
        } else {
            setShowCommOnCommForm(true);
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
                        <div>

                        </div>
                        <button id={comment?.id} className='reply-to-comment' onClick={handleCommentOnComment(comment?.id)}><div><i class="fa-solid fa-message-dots"></i></div> Reply</button>
                        {/* <CommentsOnComment commentsOnComment={commentsOnComment} id ={id}/> */}
                        {commentsOnComment.map(comment => (
                            <div className="commOnComm">
                                {comment.comment}
                                <div>
                                    {showCommOnCommForm && (
                                        <>
                                            <CommentOnComment
                                                comment={comment}
                                                id={id}
                                                setShowCommOnCommForm={setShowCommOnCommForm}
                                                showCommOnCommForm={showCommOnCommForm} />
                                        </>

                                    )}
                                </div>
                                    <button id={comment?.id} className='btnsss' onClick={handleCommOnComm(comment?.id)}>Reply</button>
                            </div>
                        ))}

                    </div>
                    {user?.id === comment?.userId && (
                        <div>
                            {showBtns && (
                                <div className="btnsDiv">
                                    <button id={comment?.id} className="btnsss" onClick={handleCommentDelete}>Delete</button>
                                    <button id={comment?.id} className='btnsss' onClick={handleEditComment(comment?.comment, comment?.id)}>Edit</button>
                                </div>
                            )}
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
            </div>
        </>
    )
};

export default Comments;