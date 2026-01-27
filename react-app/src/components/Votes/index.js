import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPostVote, deleteVotes } from "../../store/votes";
import { BiUpvote, BiDownvote, BiSolidUpvote, BiSolidDownvote } from "react-icons/bi";
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

  const prevVoteRef = useRef(userVote);

  useEffect(() => {
    prevVoteRef.current = userVote;
  }, [userVote]);

  const prevVote = prevVoteRef.current;
  const isCastingUpvote = prevVote !== true && userVote === true;
  const isCastingDownvote = prevVote !== false && userVote === false;

  const isUpvoted = userVote === true;
  const isDownvoted = userVote === false;

  return (
    <>
      <div className="vote-div">
        <button type="button" id="upvote-btn" onClick={upvote(post?.id)}>
          <span className="voteIcon">
            <BiUpvote id="upvote" />
            {isUpvoted && (
              <div className={`fill-wrapper ${isCastingUpvote ? "active" : "static"}`}>
                <BiSolidUpvote className="fill" />
              </div>
            )}
          </span>
        </button>
        <div className="votesss">
          {post?.votes}
        </div>
        <button id="downvote-btn" onClick={downvote(post?.id)}>
          <span className="downVoteIcon">
            <BiDownvote id="downvote" />
            {isDownvoted && (
              <div className={`down-fill-wrapper ${isCastingDownvote ? "active" : "static"}`}>
                <BiSolidDownvote className="down-fill" />
              </div>
            )}
          </span>
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
