import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllComments } from "../../store/comments";
import { deleteAPost, getAllPosts } from "../../store/posts";
import { addPostVote, deleteVotes, getCommentVotes, getPostVotes } from "../../store/votes";
// import { getPostVotes } from "../../store/votes";
import './post.css'

const MainPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const posts = useSelector(state => state?.post?.list)
    const user = useSelector(state => state?.session)
    console.log(user)
    const [postId, setPostId] = useState()
    // const votes = useSelector(state => state?.votes?.post_votes[0]?.votes)
    const votes = useSelector(state => state?.votes?.post_votes)
    const [disableUpvote, setDisableUpvote] = useState(false);
    const [disableDownvote, setDisableDownvote] = useState(false);
    // console.log("@@@@@@@@@@", votes[0].votes)


    useEffect(() => {
        dispatch(getAllPosts());
        dispatch(getPostVotes());
    }, [dispatch])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])


    const handleDelete = (postId) => async (e) => {
        setPostId(postId)
        e.preventDefault();
        const id = { "id": +postId }
        dispatch(deleteAPost(id))
        dispatch(getAllPosts())
        dispatch(getAllComments(id.id))
    }

    const handleEdit = (postId) => async (e) => {
        e.preventDefault();
        history.push(`/posts/${postId}/edit`)
    }

    const upvote = (postId) => async (e) => {
        console.log("************", postId)
        // const idfk = votes[0].votes.find(vote => vote.post_id === postId && vote?.user_id === user.user.id)
        // if (!idfk && idfk.length === 0) {
            e.preventDefault();
            const vote = {
                "user_id": user?.user?.id,
                "post_id": postId,
                "comment_id": null,
            }
            console.log(vote)
            await dispatch(addPostVote(vote))
            // console.log("@@@@@@@@@", +e.target.id + 1)
            await dispatch(getPostVotes())
        // }
    }

    const downvote = (postId) => async (e) => {
        e.preventDefault();
        console.log("PPPPPPPP", postId)
        // const idfk = votes[0].votes.find(vote => vote.post_id === postId && vote?.user_id === user.user.id)
        // if (idfk && idfk.length === 1) {
            const voteId = votes[0].votes.find(vote => vote.post_id === postId && vote?.user_id === user.user.id).id
            const vote = {
                'id': voteId,
            }
            await dispatch(deleteVotes(vote))
            await dispatch(getPostVotes())
        // }

    }
    // const deleteLike = (postId) => async (e) => {
    //     e.preventDefault();
    //     const likeId = likes.find(like => like.post_id === postId && like?.user_id === sessionUser?.id)?.id
    //     let data = await dispatch(removeLike(likeId));
    //     await dispatch(getAllLike())
    //     setUnlike(false)
    //     setLikeBtn(true)

    // };

    return (
        <div className="page">
            <div className="main-feed-container" >
                {posts?.map(post => (
                    <div className="post" key={post.id}>
                        <div className="left-post">
                            <button id={post.id} onClick={upvote(post.id)}>
                                <img src="https://icons.veryicon.com/png/o/miscellaneous/cloud-platform/up-arrow-9.png" alt="upvote" />
                            </button>
                            <div className="votesss">
                                {votes && votes[0]?.votes?.filter(vote => vote?.post_id === post?.id)?.length}
                            </div>
                            <button onClick={downvote(post?.id)}>
                                <img src="https://icons.veryicon.com/png/o/miscellaneous/cloud-platform/down-arrow-10.png" alt="downvote" />
                            </button>
                        </div>
                        <div className="right-post">
                            <div>
                                {post.title}
                            </div>
                            <a href={`/posts/${post?.id}`}>
                                <div>
                                    <div>
                                        <img className='img-tage' src={`${post.image}`} alt="post"
                                            onError={(e) => { e.target.src = 'https://learn.getgrav.org/user/pages/11.troubleshooting/01.page-not-found/error-404.png'; e.target.onError = null; }}
                                        />
                                    </div>
                                </div>
                            </a>
                            {post.userId === user.user.id && (
                                <div className="button-div">
                                    <div className="edit-btn">
                                        <i onClick={handleEdit(post?.id)} className="fa-solid fa-pen-to-square"> <span> Edit </span> </i>
                                    </div>
                                    <div className="delete-btn">
                                        <i onClick={handleDelete(post?.id)} className="fa-solid fa-trash"> <span> Delete </span> </i>
                                    </div>
                                </div>
                            )}
                            {post.userId !== user.user.id && (
                                <div>

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
                        <div className="rows">1</div>
                        <div className="rows">2</div>
                        <div className="rows">3</div>
                        <div className="rows">4</div>
                        <div className="rows">5</div>
                        <div className="rows">6</div>
                        <div className="rows">7</div>
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