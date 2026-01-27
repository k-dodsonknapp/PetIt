import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPostVote, deleteVotes } from "../../store/votes";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import LoginAlert from "../LoginAlert";
import "./index.css"

const Votes = ({ post, comment = { comment_id: null } }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.session?.user);

  const [userVote, setUserVote] = useState(null)

  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const sessionVote = post?.session_user_vote
    if (post?.session_user_vote) {
      setUserVote(sessionVote.vote)
    }
  }, [post])

  const upvote = (postId) => async (e) => {
    e.preventDefault();
    if (!user) {
      setShowLoginModal(true);
    } else {
      const vote = {
        user_id: user?.id,
        post_id: postId,
        comment_id: null,
      };
      await dispatch(addPostVote(vote));
    }
  };

  const downvote = (postId) => async (e) => {
    e.preventDefault();
    if (!user) {
      setShowLoginModal(true);
    } else {
      const vote = {
        user_id: user.id,
        post_id: postId,
        comment_id: comment.comment_id
      };
      await dispatch(deleteVotes(vote));
    }
  };

  return (
    <>
      <div className="vote-div">
        <button type="button" id="upvote-btn" onClick={upvote(post?.id)}>
          <BiUpvote id="upvote" style={user && userVote ? { color: "blue" } : { color: "#929596" }} />
        </button>
        <div className="votesss">
          {post?.votes}
        </div>
        <button id="downvote-btn" onClick={downvote(post?.id)}>
          <BiDownvote id="downvote" style={user && userVote === false ? { color: "red" } : null} />
        </button>
        <div className="mobile-votes">
          <span className="votes-label">Votes</span>{" "}
          {post?.votes}
        </div>
      </div>
      {showLoginModal && (
        <LoginAlert
          setShowLoginModal={setShowLoginModal}
          showLoginModal={showLoginModal}
        />
      )}
    </>
  );
};

export default Votes;
