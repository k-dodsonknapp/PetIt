import { useEffect, useState, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { addNewComment, deleteAComment, getAllComments, updateComment } from "../../store/comments";
import { getAllPosts } from "../../store/posts";
import { addPostVote, deleteVotes, getPostVotes } from "../../store/votes";
import Comments from "../Comments";
import PageNotFound from "../PageNotFound";
import './onePost.css'


const OnePost = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const id = +useParams().postId;
    const session = useSelector(state => state.session)
    const posts = useSelector(state => state?.post?.list?.filter(post => post?.id === id));
    const user = useSelector(state => state?.session?.user);
    const comments = useSelector(state => Object.values(state?.comments).filter(comment => comment.parentId === null));
    const votes = useSelector(state => state?.votes?.post_votes);

    const [showCommentForm, setShowCommentForm] = useState(false);
    const [showCommentEditForm, setShowCommentEditForm] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [commentToEdit, setCommentToEdit] = useState('');
    const [showBtns, setShowBts] = useState(true);
    const [commentId, setCommentId] = useState(0);
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
        dispatch(getAllComments(id));
        dispatch(getPostVotes())
    }, [dispatch, id]);

    useEffect(() => {
        dispatch(getAllPosts());
    }, [dispatch, id]);


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
        dispatch(getAllComments(+id));
        const brandNewComment = {
            "userId": user.id,
            "postId": id,
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

    const handleHome = () => {
        history.push('/posts/main');
    };

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

    const upvote = (postId) => async (e) => {
        const voteObj =
            votes[0].votes.find(vote =>
                vote.post_id === postId &&
                vote?.user_id === user.id
            );

        if (!voteObj || voteObj.user_id !== user.id) {
            e.preventDefault();
            const vote = {
                "user_id": user?.id,
                "post_id": postId,
                "comment_id": null,
            };
            await dispatch(addPostVote(vote));
            await dispatch(getPostVotes());
        };
    };

    const downvote = (postId) => async (e) => {
        e.preventDefault();
        const voteObj =
            votes[0].votes.find(vote =>
                vote.post_id === postId &&
                vote?.user_id === user.id
            );

        if (voteObj) {
            const vote = {
                'id': voteObj.id,
            };
            await dispatch(deleteVotes(vote));
            await dispatch(getPostVotes());
        };
    };

    return (
        <div className="pagee">
            <div className="main-feed-containers" >
                <div className="posts" >
                    <div className="right-postt">
                        <div>
                            {posts[0]?.title}
                        </div>
                        <div className="idk">
                            <div className="left-postt">
                                <button onClick={upvote(posts[0]?.id)}>
                                    <img src="https://icons.veryicon.com/png/o/miscellaneous/cloud-platform/up-arrow-9.png" alt="upvote" />
                                </button>
                                <div className="votesss">
                                    {votes && votes[0]?.votes?.filter(vote => vote?.post_id === posts[0]?.id)?.length}
                                </div>
                                <button onClick={downvote(posts[0]?.id)}>
                                    <img src="https://icons.veryicon.com/png/o/miscellaneous/cloud-platform/down-arrow-10.png" alt="downvote" />
                                </button>
                            </div>
                            <div className="img-tage">
                                <img className='img-tag' src={`${posts[0]?.image}`} alt=""
                                    onError={(e) => { e.target.src = 'https://learn.getgrav.org/user/pages/11.troubleshooting/01.page-not-found/error-404.png'; e.target.onError = null; }} />
                            </div>
                        </div>
                        <div className="post-body">
                            {posts[0]?.body}
                        </div>
                        <div className="button-div">
                            <button id="post-btn" onClick={handleShowCommentForm}>Comment</button>
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
                            <div>
                                <Comments comment={comment} id={id} />
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