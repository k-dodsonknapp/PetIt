import { useState } from "react";
import { useSelector } from "react-redux";
import CommentOnComment from "../CommentOnComment";

const CommOnComm = ({ id, comment, setShowCommOnCommForm, showCommOnCommForm}) => {

    // const [showCommOnCommForm, setShowCommOnCommForm] = useState(false);
    const commentsOnComment = useSelector(state => Object.values(state?.comments).filter(commentt => commentt?.parentId === comment.id));


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
            {commentsOnComment.map(comment => (
                <div className="commOnComm">
                    {comment.comment}
                    <div>
                        {/* {showCommOnCommForm && ( */}
                            <>
                                <CommentOnComment
                                    comment={comment}
                                    id={id}
                                    setShowCommOnCommForm={setShowCommOnCommForm}
                                    showCommOnCommForm={showCommOnCommForm} />
                            </>
                        {/* // )} */}
                        <button id={comment?.id} className='btnsss'>Reply</button>
                    </div>
                </div>
            ))}
        </>
    )
};
// handleCommOnComm(comment?.id)
export default CommOnComm;