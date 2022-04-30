import { useEffect, useState, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { addNewComment, deleteAComment, getAllComments, updateComment } from "../../store/comments";
import { getAllPosts } from "../../store/posts";
// import { addPostVote, deleteVotes, getPostVotes } from "../../store/votes";
import Comments from "../Comments";
import PageNotFound from "../PageNotFound";
// import { BiUpvote, BiDownvote } from "react-icons/bi";

import './onePost.css'
import Votes from "../Votes";


const OnePost = () => {

    const dispatch = useDispatch();
    const postId = +useParams().postId;
    const posts = useSelector(state => state?.post?.list?.filter(post => post?.id === postId));
    const user = useSelector(state => state?.session?.user);
    const comments = useSelector(state => Object.values(state?.comments).filter(comment => comment.parentId === null && comment.postId === postId));
    console.log("MMMMMMM", comments)
    // const votes = useSelector(state => state?.votes?.post_votes);

    const [showCommentForm, setShowCommentForm] = useState(false);
    const [showCommentEditForm, setShowCommentEditForm] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [commentToEdit, setCommentToEdit] = useState('');
    const [showBtns, setShowBts] = useState(true);
    const [errors, setErrors] = useState([]);
    const [errorsEdit, setErrorsEdit] = useState([]);

    useEffect(() => {
        const err = [];
        if (newComment.length > 250 || newComment.length < 5) {
            err.push("Your comment cannot be longer than 250 characters or shorter than 5 characters.");
        };

        setErrors(err);
    }, [newComment]);

    useEffect(() => {
        const err = [];
        if (commentToEdit.length > 250 || commentToEdit.length < 5) {
            err.push("Your comment cannot be longer than 250 characters or shorter than 5 characters.");
        };
        setErrorsEdit(err);
    }, [commentToEdit]);

    useEffect(() => {
        dispatch(getAllComments(postId));
    }, [dispatch]);

    useEffect(() => {
        dispatch(getAllPosts());
    }, [dispatch]);

    const handleShowCommentForm = (e) => {
        e.preventDefault();
        if (showCommentForm === false || showCommentEditForm === true) {
            setShowCommentForm(true);
            setShowCommentEditForm(false);
        } else {
            setShowCommentForm(false);
        };

        if (showBtns === false) {
            setShowBts(true);
        } else {
            setShowBts(false);
        };
    };

    const handleNewComment = (e) => {
        e.preventDefault();
        dispatch(getAllComments(+postId));
        const brandNewComment = {
            "userId": user.id,
            "postId": postId,
            "comment": newComment,
            "parentId": null
        };
        console.log(brandNewComment)
        if (showBtns === false) {
            setShowBts(true);
        };
        dispatch(addNewComment(brandNewComment));
        setShowCommentForm(false);
        setNewComment("");
    };

    const handleCancel = (e) => {
        e.preventDefault();
        setShowCommentForm(false);
        setShowBts(true);
    };

    if (!posts) {
        return (
            <PageNotFound />
        );
    };

    return (
        <div className="pagee">
            <div className="main-feed-containers" >
                <div className="posts" >
                    <div className="idk">
                        <div className="left-postt">
                            <Votes postId={postId} />
                        </div>
                        <div className="right-postt">
                            <div className="post-title">
                                {posts[0]?.title}
                            </div>
                            <div className="img-tage">
                                <img className='img-tag' src={`${posts[0]?.image}`} alt=""
                                    onError={(e) => { e.target.src = 'https://learn.getgrav.org/user/pages/11.troubleshooting/01.page-not-found/error-404.png'; e.target.onError = null; }} />
                            </div>
                            <div className="post-body">
                                {posts[0]?.body}
                            </div>
                            <div className="button-div">
                                <button id="post-btn" onClick={handleShowCommentForm}>Comment</button>
                            </div>
                        </div>
                        <div className="newCommentEditForm">
                            {showCommentForm && (
                                <div className="comment-form">
                                    <form onSubmit={handleNewComment}>
                                        <label htmlFor="comment">New Comment</label>
                                        <textarea
                                            type="text"
                                            name="comment"
                                            value={newComment}
                                            onChange={e => setNewComment(e.target.value)}
                                            required
                                        />
                                        <button
                                            disabled={errors.length > 0 ? true : false}
                                            id="post-btnsss"
                                            onClick={handleNewComment}
                                        >Submit</button>
                                        <button id="post-btnsss" onClick={handleCancel}>Cancel</button>
                                        <ul className="errors">
                                            {errors.length > 0 && errors.map(error => {
                                                return <li className="li" key={error}>
                                                    <div className="error-div">
                                                        {error}
                                                    </div>
                                                </li>
                                            })}
                                        </ul>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="comments">
                        <h3>Comments:</h3>
                        {comments?.map((comment, index) => (
                            <div key={comment.id}>
                                <Comments comment={comment} postId={postId} />
                            </div>
                        ))?.reverse()}
                    </div>
                    <div>
                    </div>
                </div>
            </div>
            <div className="right-container">
                <div className="communities">
                    <div className="comm">
                        <div className="comm-header">
                            <p>Top Communities</p>
                        </div>
                        <div className="rows"><i style={{ color: "#04eb04" }} class="fa-solid fa-angle-up"></i>p/Crabs</div>
                        <div className="rows"><i style={{ color: "#04eb04" }} class="fa-solid fa-angle-up"></i>p/Armidillos</div>
                        <div className="rows"><i style={{ color: "red" }} class="fa-solid fa-angle-down"></i>p/Sugar_gliders</div>
                        <div className="rows"><i style={{ color: "#04eb04" }} class="fa-solid fa-angle-up"></i>p/Dogs</div>
                        <div className="rows"><i style={{ color: "#04eb04" }} class="fa-solid fa-angle-up"></i>p/Cats</div>
                        <div className="rows"><i style={{ color: "#04eb04" }} class="fa-solid fa-angle-up"></i>p/Giraffe</div>
                        <div className="rows"><i style={{ color: "#04eb04" }} class="fa-solid fa-angle-up"></i>p/Squirrel</div>
                        <button id="view-all">Veiw All</button>
                    </div>
                </div>

                <div className="createe">
                    <div className="links">
                        <h5>Personal Links</h5>
                        <a href='https://github.com/k-dodsonknapp'>GitHub</a>
                        <a href="https://www.linkedin.com/in/kenneth-dodson-knapp-97029022a/">LinkedIn</a>
                        <a href="https://angel.co/u/kenneth-dodson-knapp">AngelList</a>
                    </div>
                    <div className="links">
                        <h5>Previous Projects</h5>
                        <a href='https://notes-takker.herokuapp.com/'>NoteTakker</a>
                        <a href='http://step-by-step-app.herokuapp.com/'>Step-by-Step</a>
                        <a href='https://carra.herokuapp.com/'>Carra</a>
                    </div>
                </div>
                <div className="me">
                    <p>Developed by: Kenneth Dodson-Knapp</p>
                </div>
            </div>
        </div>
    )
}

export default OnePost;