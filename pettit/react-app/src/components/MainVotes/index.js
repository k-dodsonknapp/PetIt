import React, { useEffect } from 'react'
import { BiDownvote, BiUpvote } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { addPostVote, deleteVotes, getPostVotes } from '../../store/votes';

function MainVotes({postId}) {
    const dispatch = useDispatch();
    const user = useSelector(state => state?.session?.user);
    const votes = useSelector(state => state?.votes?.post_votes);
    const posts = useSelector(state => state?.post?.list?.filter(post => post?.id === postId));

    useEffect(() => {
        dispatch(getPostVotes())
    }, [dispatch]);

    const upvote = (postId) => async (e) => {
        const voteObj =
            votes[0]?.votes?.find(vote =>
                vote?.post_id === postId &&
                vote?.user_id === user?.id
            );

        if (!voteObj || voteObj?.user_id !== user?.id) {
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
                vote?.post_id === postId &&
                vote?.user_id === user?.id
            );

        if (voteObj) {
            const vote = {
                'id': voteObj?.id,
            };
            await dispatch(deleteVotes(vote));
            await dispatch(getPostVotes());
        };
    };
  return (
    <div>
    <button id="main-upvote-btn" onClick={upvote(postId)}>
        {/* <img src="https://icons.veryicon.com/png/o/miscellaneous/cloud-platform/up-arrow-9.png" alt="upvote" /> */}
        <BiUpvote id="main-upvote" style={{color:`${""}`}} />
    </button>
    <div className="votesss">
        {votes && votes[0]?.votes?.filter(vote => vote?.post_id === postId)?.length}
    </div>
    <button id="main-downvote-btn" onClick={downvote(postId)}>
        {/* <img src="https://icons.veryicon.com/png/o/miscellaneous/cloud-platform/down-arrow-10.png" alt="downvote" /> */}
        <BiDownvote id="main-downvote" />
    </button>
</div>
  )
}

export default MainVotes;