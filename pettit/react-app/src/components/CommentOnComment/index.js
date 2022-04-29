import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewComment, getAllCommentOnComment, getAllComments } from "../../store/comments";

const CommentOnComment = ({
    setShowCommentOnCommentForm,
    showCommentOnCommentForm,
    comment,
    id,
    showCommOnCommForm,
    setShowCommOnCommForm,
 }) => {

    const dispatch = useDispatch();
    const user = useSelector(state => state?.session?.user);
    // const comments = useSelector(state => Object.values(state?.comments).filter(commentt => commentt?.parentId === comment.id));
    // console.log("yuioyuioyuio", comments)
    console.log("VBNMVBNM", comment)
    const [showBtns, setShowBts] = useState(true);
    // const [showCommentOnCommentForm, setShowCommentOnCommentForm] = useState(false);
    // const [newComment, setNewComment] = useState('');
    // const [showCommentForm, setShowCommentForm] = useState(false);
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
        if (showCommOnCommForm === false) {
            setShowCommOnCommForm(true)
        } else {
            setShowCommOnCommForm(false)
        }
        // setShowCommentForm(false);
        setShowBts(true);
    };

    // useEffect(() => {

    //     const input = document.getElementById("post-btnsss");
    //     input.addEventListener("keyup", (e) => {
    //         if (e.key === 13) {
    //             e.preventDefault();
    //             document.getElementById('post-btnsss').click();
    //         }
    //     })
    // },[])

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
            {/* {showCommentOnCommentForm && ( */}

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
                            // disabled={errors.length > 0 ? true : false}
                            // id="post-btn" 
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
            {/* )} */}
        </>
    )
};

export default CommentOnComment;