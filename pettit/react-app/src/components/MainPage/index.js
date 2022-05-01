import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// import { getAllComments } from "../../store/comments";
import { deleteAPost, getAllPosts } from "../../store/posts";
import { getPostVotes } from "../../store/votes";
import Votes from "../Votes";
// import { BiMessage } from "react-icons/bi";
import './post.css';
import NumOfComments from "../NumOfComments";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin2Line } from "react-icons/ri";


const MainPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const posts = useSelector(state => state?.post?.list);
    const user = useSelector(state => state?.session);
    const comments = useSelector(state => state?.comments);
    // const postComments = Object.values(comments).filter(comment => comment?.postId === postId)


    useEffect(() => {
        dispatch(getAllPosts());
        dispatch(getPostVotes());
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
        history.push(`/posts/${postId}/edit`);
    };

    return (
        <div className="page">
            <div className="main-feed-container" >
                {posts?.map(post => (
                    <div className="post" key={post?.id}>
                        <div className="left-post">
                            <Votes postId={post?.id} />
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
                                <NumOfComments comments={comments} postId={post?.id}/>
                                {post?.userId === user?.user?.id && (
                                    // <div className="button-div">
                                    <>
                                        <div className="edit-btn">
                                            <button  onClick={handleEdit(post?.id)}><FiEdit id="main-edit-btn-icon"/>Edit</button>
                                        </div>
                                        <div className="delete-btn">
                                            <button onClick={handleDelete(post?.id)}><RiDeleteBin2Line id="main-delete-btn-icon"/>Delete</button>
                                        </div>
                                    </>
                                    // </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))?.reverse()}
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