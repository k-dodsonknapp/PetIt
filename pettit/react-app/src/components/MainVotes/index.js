import React, { useEffect, useState } from 'react'
import { BiDownvote, BiUpvote } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { addPostVote, deleteVotes, getPostVotes } from '../../store/votes';
import LoginAlert from '../LoginAlert';

function MainVotes({ postId }) {
    const dispatch = useDispatch();
    const user = useSelector(state => state?.session?.user);
    const votes = useSelector(state => state?.votes?.post_votes);
    const posts = useSelector(state => state?.post?.list?.filter(post => post?.id === postId));
    const [showLoginModal, setShowLoginModal] = useState(false);


    useEffect(() => {
        dispatch(getPostVotes())
    }, [dispatch]);

    const upvote = (postId) => async (e) => {
        e.preventDefault();
        if (!user) {
            // if user is not logged in modal will show
            setShowLoginModal(true);
        } else {
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
    };

    const downvote = (postId) => async (e) => {
        e.preventDefault();
        if (!user) {
            setShowLoginModal(true);
        } else {
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
    };
    return (
        <>
            <div>
                <button id="main-upvote-btn" onClick={upvote(postId)}>
                    <BiUpvote id="main-upvote" style={{ color: `${""}` }} />
                </button>
                <div className="votesss">
                    {votes && votes[0]?.votes?.filter(vote => vote?.post_id === postId)?.length}
                </div>
                <button id="main-downvote-btn" onClick={downvote(postId)}>
                    <BiDownvote id="main-downvote" />
                </button>
            </div>
            {showLoginModal && (
                <LoginAlert setShowLoginModal={setShowLoginModal} showLoginModal={showLoginModal} />
            )}
        </>
    )
}

export default MainVotes;