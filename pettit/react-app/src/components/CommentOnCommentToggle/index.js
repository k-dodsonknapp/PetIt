import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BiMessage } from "react-icons/bi";
import CommentOnComment from "../CommentOnComment";

const CommentOnCommentFormToggle = ({handleCommentOnComment, comment, setShowLoginModal, postId, showCommentOnCommentForm, setShowCommentOnCommentForm}) => {

    // const user = useSelector(state => state?.session?.user);
    // // const [showCommentOnCommentForm, setShowCommentOnCommentForm] = useState(false);

    // // useEffect(() => {
    // //     if (showCommentOnCommentForm === true) {
    // //         setShowCommentOnCommentForm(false);
    // //     } else {
    // //         setShowCommentOnCommentForm(true);
    // //     }
    // // }, [showCommentOnCommentForm])

    // // const handleCommentOnComment = () => async (e) => {
    // //     e.preventDefault();
    // //     if (!user) {
    // //         setShowLoginModal(true)
    // //     } else {
    // //         if (showCommentOnCommentForm === true) {
    // //             setShowCommentOnCommentForm(false);
    // //         } else {
    // //             setShowCommentOnCommentForm(true);
    // //         }
    // //         if (showCommentOnCommentForm === false) {
    // //             setShowCommentOnCommentForm(true);
    // //         } else {
    // //             setShowCommentOnCommentForm(false);
    // //         };
    // //     };
    // // };

    // return (
    //     <>
    //         <button id={comment?.id} className='reply-to-comment' onClick={handleCommentOnComment(comment?.id)} >Reply <BiMessage id="reply-icon" /></button>
    //         {showCommentOnCommentForm && (
    //             <>
    //                 <CommentOnComment
    //                     comment={comment}
    //                     id={postId}
    //                     setShowCommentOnCommentForm={setShowCommentOnCommentForm}
    //                     showCommentOnCommentForm={showCommentOnCommentForm}
    //                 />
    //             </>
    //         )}
    //     </>
    // )
};

export default CommentOnCommentFormToggle;