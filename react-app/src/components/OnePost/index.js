import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getAllComments } from "../../store/comments";
import { getAllPosts } from "../../store/posts";
// import { addPostVote, deleteVotes, getPostVotes } from "../../store/votes";
import Comments from "../Comments";
import PageNotFound from "../PageNotFound";
// import { BiUpvote, BiDownvote } from "react-icons/bi";
import { GoCommentDiscussion } from "react-icons/go";

import "./onePost.css";
import Votes from "../Votes";
import CommentForm from "../CommentForm";

const OnePost = () => {
  const dispatch = useDispatch();
  const postId = +useParams().postId;
  const posts = useSelector((state) =>
    state?.post?.list?.filter((post) => post?.id === postId)
  );
  const user = useSelector((state) => state?.session?.user);
  const comments = useSelector((state) =>
    Object.values(state?.comments).filter(
      (comment) => comment.parentId === null && comment.postId === postId
    )
  );
  const postComments = useSelector((state) =>
    Object.values(state?.comments).filter(
      (comment) => comment?.postId === postId
    )
  );

  // const [showCommentForm, setShowCommentForm] = useState(false);
  // const [newComment, setNewComment] = useState('');
  // const [commentToEdit, setCommentToEdit] = useState('');
  const [showBtns, setShowBts] = useState(true);
  // const [errors, setErrors] = useState([]);
  // const [errorsEdit, setErrorsEdit] = useState([]);

  // useEffect(() => {
  //     const err = [];
  //     if (newComment.length > 250 || newComment.length < 5) {
  //         err.push("Your comment cannot be longer than 250 characters or shorter than 5 characters.");
  //     };

  //     setErrors(err);
  // }, [newComment]);

  // useEffect(() => {
  //     const err = [];
  //     if (commentToEdit.length > 250 || commentToEdit.length < 5) {
  //         err.push("Your comment cannot be longer than 250 characters or shorter than 5 characters.");
  //     };
  //     setErrorsEdit(err);
  // }, [commentToEdit]);

  useEffect(() => {
    dispatch(getAllComments(postId));
  }, [dispatch, postId]);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  useEffect(() => {
    if (!comments) {
      window.scrollTo(0, 0);
    } else {
      window.scrollTo(0, 540);
    }
  }, [comments]);

  const backToTop = (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
  };

  setTimeout(() => {
    if (!posts) {
      return <PageNotFound />;
    }
  }, 2000);

  return (
    <div className="pagee">
      <div className="outer-page">
        <div className="main-feed-containers">
          <div className="posts">
            <div className="idk">
              <div className="left-postt">
                <Votes postId={postId} />
              </div>
              <div className="one-post-main-content">
                <div className="one-post-username">
                  <p>Posted by u/{posts[0]?.username}</p>
                </div>
                <div className="post-title">{posts[0]?.title}</div>
                <div className="post-body">
                  <p className="post-body-text">{posts[0]?.body}</p>
                </div>
                <div className="one-post-image">
                  <img
                    className="img-tag"
                    src={`${posts[0]?.image}`}
                    alt=""
                    onError={(e) => {
                      e.target.src =
                        "https://learn.getgrav.org/user/pages/11.troubleshooting/01.page-not-found/error-404.png";
                      e.target.onError = null;
                    }}
                  />
                </div>
                <div className="one-post-comment-count">
                  <div className="comment-count">
                    <GoCommentDiscussion id="comment-count-icon" />
                    <span id="count">{postComments.length}</span> Comments
                    <div className="mobile-count">
                      <Votes postId={postId} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="newCommentEditForm">
              {user ? (
                <CommentForm
                  postId={postId}
                  showBtns={showBtns}
                  setShowBts={setShowBts}
                />
              ) : (
                <>
                  <p className="not-signed-in-comment">
                    Wanna Leave a comment?{" "}
                    <NavLink to={"/signup"} className="sign-in-or-up">
                      {" "}
                      Sign Up{" "}
                    </NavLink>{" "}
                    or{" "}
                    <NavLink to={"/login"} className="sign-in-or-up">
                      Login
                    </NavLink>{" "}
                  </p>
                </>
              )}
              <div className="comments">
                {comments
                  ?.map((comment) => (
                    <div key={comment.id}>
                      <Comments comment={comment} postId={postId} />
                    </div>
                  ))
                  ?.reverse()}
              </div>
            </div>
          </div>
          <button className="backToTop" onClick={backToTop}>
            Back to Top
          </button>
        </div>
        <div className="right-container">
          <div className="communities">
            <div className="comm">
              <div className="comm-header">
                <p>Top Communities</p>
              </div>
              <div className="rows">
                <i
                  style={{ color: "#04eb04" }}
                  className="fa-solid fa-angle-up"
                ></i>
                p/Crabs
              </div>
              <div className="rows">
                <i
                  style={{ color: "#04eb04" }}
                  className="fa-solid fa-angle-up"
                ></i>
                p/Armidillos
              </div>
              <div className="rows">
                <i
                  style={{ color: "red" }}
                  className="fa-solid fa-angle-down"
                ></i>
                p/Sugar_gliders
              </div>
              <div className="rows">
                <i
                  style={{ color: "#04eb04" }}
                  className="fa-solid fa-angle-up"
                ></i>
                p/Dogs
              </div>
              <div className="rows">
                <i
                  style={{ color: "#04eb04" }}
                  className="fa-solid fa-angle-up"
                ></i>
                p/Cats
              </div>
              <div className="rows">
                <i
                  style={{ color: "#04eb04" }}
                  className="fa-solid fa-angle-up"
                ></i>
                p/Giraffe
              </div>
              <div className="rows">
                <i
                  style={{ color: "#04eb04" }}
                  className="fa-solid fa-angle-up"
                ></i>
                p/Squirrel
              </div>
              <button id="view-all">View All</button>
            </div>
          </div>

          <div className="createe">
            <div className="links">
              <h5>Personal Links</h5>
              <a href="https://github.com/k-dodsonknapp">GitHub</a>
              <a href="https://www.linkedin.com/in/kenneth-dodson-knapp-97029022a/">
                LinkedIn
              </a>
              <a href="https://angel.co/u/kenneth-dodson-knapp">AngelList</a>
            </div>
            <div className="links">
              <h5>Previous Projects</h5>
              <a href="https://notes-takker.herokuapp.com/">NoteTakker</a>
              <a href="https://step-by-stepapp.herokuapp.com/">Step-by-Step</a>
              <a href="https://carra.herokuapp.com/">Carra</a>
            </div>
          </div>
          <div className="me">
            <p>Developed by: Kenneth Dodson-Knapp</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnePost;
