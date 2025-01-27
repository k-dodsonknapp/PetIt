import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPostVote, deleteVotes, getPostVotes } from "../../store/votes";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import LoginAlert from "../LoginAlert";

const Votes = ({ postId }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.session?.user);
  const votes = useSelector((state) => state?.votes?.post_votes);
  const posts = useSelector((state) =>
    state?.post?.list?.filter((post) => post?.id === postId)
  );
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    dispatch(getPostVotes());
  }, [dispatch]);

  const upvote = (postId) => async (e) => {
    e.preventDefault();
    if (!user) {
      setShowLoginModal(true);
    } else {
      const voteObj = votes[0]?.votes?.find(
        (vote) => vote?.post_id === postId && vote?.user_id === user?.id
      );

      if (!voteObj || voteObj?.user_id !== user?.id) {
        e.preventDefault();
        const vote = {
          user_id: user?.id,
          post_id: postId,
          comment_id: null,
        };
        await dispatch(addPostVote(vote));
        await dispatch(getPostVotes());
      }
    }
  };

  const downvote = (postId) => async (e) => {
    e.preventDefault();
    if (!user) {
      setShowLoginModal(true);
    } else {
      const voteObj = votes[0].votes.find(
        (vote) => vote?.post_id === postId && vote?.user_id === user?.id
      );

      if (voteObj) {
        const vote = {
          id: voteObj?.id,
        };
        await dispatch(deleteVotes(vote));
        await dispatch(getPostVotes());
      }
    }
  };

  return (
    <>
      <div className="vote-div">
        <button id="upvote-btn" onClick={upvote(posts[0]?.id)}>
          <BiUpvote id="upvote" />
        </button>
        <div className="votesss">
          {votes &&
            votes[0]?.votes?.filter((vote) => vote?.post_id === posts[0]?.id)
              ?.length}
        </div>
        <button id="downvote-btn" onClick={downvote(posts[0]?.id)}>
          <BiDownvote id="downvote" />
        </button>
        <div className="mobile-votes">
          <span className="votes-label">Votes</span>{" "}
          {votes &&
            votes[0]?.votes?.filter((vote) => vote?.post_id === posts[0]?.id)
              ?.length}
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
