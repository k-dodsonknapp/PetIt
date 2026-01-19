import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { getAllComments } from "../../store/comments";
import { deleteAPost, getAllPosts } from "../../store/posts";
import { getPostVotes } from "../../store/votes";
// import { BiMessage } from "react-icons/bi";
import "./post.css";
import NumOfComments from "../NumOfComments";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin2Line } from "react-icons/ri";
import Communities from "../Communities";
// import { addNewCommunity, deleteACommunity, getAllCommunities, updateACommunity } from "../../store/communities";
import LoginAlert from "../LoginAlert";
import serveImageError from "../Errors/imageNotFound"
import Votes from "../Votes";

const MainPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const posts = useSelector((state) => state?.post?.list);
  const user = useSelector((state) => state?.session);
  const comments = useSelector((state) => state?.comments);
  // const postComments = Object.values(comments).filter(comment => comment?.postId === postId)
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
    const id = { id: +postId };
    dispatch(deleteAPost(id));
    dispatch(getAllPosts());
  };

  const handleEdit = (postId) => async (e) => {
    e.preventDefault();
    navigate(`/api/posts/${postId}/edit`);
  };

  const redirectToPost = (e, post) => {
    e.preventDefault();
    navigate(`/posts/${post.id}`);
  };

  return (
    <div className="page">
      <div className="main-feed-container">
        {posts
          ?.map((post) => (
            <div className="post" key={post?.id}>
              <div className="left-post">
                <Votes postId={post?.id} />
              </div>
              <div className="right-post">
                <h2 className="post-username">
                  Posted by{" "}
                  <span className="username-span">u/{post?.username}</span>
                </h2>
                <div className="post-title">{post?.title}</div>
                <a href={`/posts/${post.id}`} onClick={(e) => redirectToPost(e, post)}>
                  <img
                    className="main-page-image"
                    src={post.image}
                    alt="post"
                    onError={(e) => {
                      e.currentTarget.src = serveImageError();
                      e.currentTarget.onerror = null;
                    }}
                  />
                </a>
                <div className="right-bottom-post">
                  <NumOfComments comments={comments} postId={post?.id} />
                  {post?.userId === user?.user?.id && (
                    <>
                      <div className="edit-btn">
                        <button onClick={handleEdit(post?.id)}>
                          <FiEdit id="main-edit-btn-icon" />
                          Edit
                        </button>
                      </div>
                      <div className="delete-btn">
                        <button onClick={handleDelete(post?.id)}>
                          <RiDeleteBin2Line id="main-delete-btn-icon" />
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
          ?.reverse()}
      </div>
      <Communities className="main-container-communities" />
      {showLoginModal && (
        <LoginAlert
          setShowLoginModal={setShowLoginModal}
          showLoginModal={showLoginModal}
        />
      )}
    </div>
  );
};

export default MainPage;
