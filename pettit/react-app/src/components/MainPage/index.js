import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllComments } from "../../store/comments";
import { deleteAPost, getAllPosts } from "../../store/posts";
import { addPostVote, deleteVotes, getPostVotes } from "../../store/votes";
import Votes from "../Votes";
import './post.css';

const MainPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const posts = useSelector(state => state?.post?.list);
    const user = useSelector(state => state?.session);
    const [postId, setPostId] = useState();
    const votes = useSelector(state => state?.votes?.post_votes);
    // const session = useSelector(state => state.session)
    useEffect(() => {
        dispatch(getAllPosts());
        dispatch(getPostVotes());
    }, [dispatch]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    const handleDelete = (postId) => async (e) => {
        setPostId(postId);
        e.preventDefault();
        const id = { "id": +postId };
        dispatch(deleteAPost(id));
        dispatch(getAllPosts());
        dispatch(getAllComments(id.id));
    };

    const handleEdit = (postId) => async (e) => {
        e.preventDefault();
        history.push(`/posts/${postId}/edit`);
    };

    const upvote = (postId) => async (e) => {
        const voteObj =
            votes[0].votes.find(vote =>
                vote.post_id === postId &&
                vote?.user_id === user.user.id
            );

        if (!voteObj || voteObj.user_id !== user.user.id) {
            e.preventDefault();
            const vote = {
                "user_id": user?.user?.id,
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
                vote?.user_id === user.user.id
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
        <div className="page">
            <div className="main-feed-container" >
                {posts?.map(post => (
                    <div className="post" key={post.id}>
                        <div className="left-post">
                            {/* <button className="votess" id={post.id} onClick={upvote(post.id)}>
                                <img id="upvotee" style={{backgroundColor: "white"}} src="https://icons.veryicon.com/png/o/miscellaneous/cloud-platform/up-arrow-9.png" alt="upvote" />
                            </button>
                            <div className="votesss">
                                {votes && votes[0]?.votes?.filter(vote => vote?.post_id === post?.id)?.length}
                            </div>
                            <button className="votess" onClick={downvote(post?.id)}>
                                <img src="https://icons.veryicon.com/png/o/miscellaneous/cloud-platform/down-arrow-10.png" alt="downvote" />
                            </button> */}
                            <Votes postId={post.id}/>
                        </div>
                        <div className="right-post">
                            <div className="post-title">
                                {post?.title}
                            </div>
                            <a href={`/posts/${post?.id}`}>
                                <div>
                                    <div>
                                        <img className='main-page-image' src={`${post.image}`} alt="post"
                                            onError={(e) => { e.target.src = 'https://learn.getgrav.org/user/pages/11.troubleshooting/01.page-not-found/error-404.png'; e.target.onError = null; }}
                                        />
                                    </div>
                                </div>
                            </a>
                            {post?.userId === user?.user?.id && (
                                <div className="button-div">
                                    <div className="edit-btn">
                                        <i onClick={handleEdit(post?.id)} className="fa-solid fa-pen-to-square"> <span> Edit </span> </i>
                                    </div>
                                    <div className="delete-btn">
                                        <i onClick={handleDelete(post?.id)} className="fa-solid fa-trash"> <span> Delete </span> </i>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )).reverse()}
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
                        <div className="rows"><i style={{ color: "red" }} class="fa-solid fa-angle-down"></i>p/Cats</div>
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
        </div >
    )
}

export default MainPage