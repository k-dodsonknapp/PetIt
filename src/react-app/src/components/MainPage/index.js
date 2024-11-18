import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { getAllComments } from "../../store/comments";
import { deleteAPost, getAllPosts } from "../../store/posts";
import { addPostVote, deleteVotes, getPostVotes } from "../../store/votes";
// import Votes from "../Votes";
// import { BiMessage } from "react-icons/bi";
import './post.css';
import NumOfComments from "../NumOfComments";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin2Line } from "react-icons/ri";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import Communities from "../Communities";
// import { addNewCommunity, deleteACommunity, getAllCommunities, updateACommunity } from "../../store/communities";
import LoginAlert from "../LoginAlert";



const MainPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const posts = useSelector(state => state?.post?.list);
    const user = useSelector(state => state?.session);
    const comments = useSelector(state => state?.comments);
    const votes = useSelector(state => state?.votes?.post_votes);
    // console.log(votes)
    // const postComments = Object.values(comments).filter(comment => comment?.postId === postId)
    // const [voted, setVoted] = useState("black")
    // const communities = useSelector(state => state.communities);
    const [showLoginModal, setShowLoginModal] = useState(false);


    useEffect(() => {
        dispatch(getAllPosts());
        dispatch(getPostVotes());
        // dispatch(getAllCommunities());
        // dispatch(deleteACommunity({'id': 12}))
        // dispatch(getAllComments(postId))
    }, [dispatch]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleDelete = (postId) => async (e) => {
        e.preventDefault();
        const id = { "id": +postId };
        dispatch(deleteAPost(id));
        dispatch(getAllPosts());
    };

    const handleEdit = (postId) => async (e) => {
        e.preventDefault();
        navigate(`/posts/${postId}/edit`);
    };

    useEffect(() => {
        fetch('/api/auth/test')
            .then(response => response.json())
            .then(data => console.log(data))
            .then(error => console.error("Error:", error))
    }, [])

    const upvote = (postId) => async (e) => {

        // setVoted("red")
        if (!user.user) {
            // if user is not logged in modal will show
            setShowLoginModal(true);
        } else {
            const voteObj =
                votes[0]?.votes?.find(vote =>
                    vote?.post_id === postId &&
                    vote?.user_id === user?.user?.id
                );

            if (!voteObj || voteObj?.user_id !== user?.user.id) {
                e.preventDefault();
                const vote = {
                    "user_id": user?.user?.id,
                    "post_id": postId,
                    "comment_id": null,
                    "upvote": null,
                };
                await dispatch(addPostVote(vote));
                await dispatch(getPostVotes());
            };
        };
    };

    const downvote = (postId) => async (e) => {
        e.preventDefault();
        if (!user.user) {
            // if user is not logged in modal will show
            setShowLoginModal(true);
        } else {
            const voteObj =
                votes[0].votes.find(vote =>
                    vote?.post_id === postId &&
                    vote?.user_id === user?.user?.id
                );
            if (voteObj) {
                const vote = {
                    'id': voteObj?.id,
                };
                await dispatch(deleteVotes(vote));
                await dispatch(getPostVotes());
            }
        };
    };

    return (
        <div className="page">
            <div className="main-feed-container" >
                {posts?.map(post => (
                    <div className="post" key={post?.id}>
                        <div className="left-post">
                            <div className='main-votes-div'>
                                <button id="main-upvote-btn" onClick={upvote(post.id)}>
                                    <BiUpvote id="main-upvote" style={{ color: `${''}` }} />
                                </button>
                                <div className="votesss">
                                    {votes && votes[0]?.votes?.filter(vote => vote?.post_id === post.id)?.length}
                                </div>
                                <button id="main-downvote-btn" onClick={downvote(post.id)}>
                                    <BiDownvote id="main-downvote" />
                                </button>
                            </div>
                            {showLoginModal && (
                                <LoginAlert setShowLoginModal={setShowLoginModal} showLoginModal={showLoginModal} />
                            )}
                        </div>
                        <div className="right-post">
                            <h2 className="post-username">
                                Posted by <span className="username-span">u/{post?.username}</span>
                            </h2>
                            <div className="post-title">
                                {/* {post?.username} */}
                                {post?.title}
                            </div>
                            <a href={`/posts/${post?.id}`}>
                                <img className='main-page-image' src={`${post.image}`} alt="post"
                                    onError={(e) => { e.target.src = 'https://learn.getgrav.org/user/pages/11.troubleshooting/01.page-not-found/error-404.png'; e.target.onError = null; }}
                                />
                            </a>
                            <div className="right-bottom-post">
                                <NumOfComments comments={comments} postId={post?.id} />
                                {post?.userId === user?.user?.id && (
                                    <>
                                        <div className="edit-btn">
                                            <button onClick={handleEdit(post?.id)}><FiEdit id="main-edit-btn-icon" />Edit</button>
                                        </div>
                                        <div className="delete-btn">
                                            <button onClick={handleDelete(post?.id)}><RiDeleteBin2Line id="main-delete-btn-icon" />Delete</button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ))?.reverse()}
            </div>
            <Communities className="main-container-communities" />
        </div >
    )
}

export default MainPage