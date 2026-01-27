from flask import Blueprint, request
from sqlalchemy import func
from app.model import Vote, Post, Comment
from app.extensions import db
from app.utils.csrf import require_csrf

votes_bp = Blueprint("votes", __name__)


@votes_bp.route("/")
def get_all_votes_posts():
    votes = Vote.query.all()
    return {"votes": [vote.to_dict() for vote in votes]}


"""
VOTE BEHAVIOR (per user, per post)

Each user can have at most one Vote row per post.
Vote.vote is tri-state:
    True  -> upvote
    False -> downvote
    None  -> no active vote (neutral)

post.votes stores the NET score:
    +1 for each upvote
    -1 for each downvote
    (negative totals are allowed)

--------------------------------
UPVOTE BUTTON BEHAVIOR
--------------------------------
- If no Vote row exists:
    - create Vote
    - set vote = True
    - increment post.votes by 1

- If Vote exists and vote is True (already upvoted):
    - set vote = None (remove upvote)
    - decrement post.votes by 1

- If Vote exists and vote is None (previously cleared):
    - set vote = True
    - increment post.votes by 1

- If Vote exists and vote is False (previously downvoted):
    - set vote = True
    - increment post.votes by 2
      (remove downvote (-1) + add upvote (+1))

--------------------------------
DOWNVOTE BUTTON BEHAVIOR
--------------------------------
- If no Vote row exists:
    - create Vote
    - set vote = False
    - decrement post.votes by 1

- If Vote exists and vote is False (already downvoted):
    - set vote = None (remove downvote)
    - increment post.votes by 1

- If Vote exists and vote is None (previously cleared):
    - set vote = False
    - decrement post.votes by 1

- If Vote exists and vote is True (previously upvoted):
    - set vote = False
    - decrement post.votes by 2
      (remove upvote (+1) + add downvote (-1))

--------------------------------
INVARIANT
--------------------------------
All vote changes MUST update post.votes using:
    delta = score(new_vote) - score(old_vote)

Where:
    score(True)  = +1
    score(False) = -1
    score(None)  =  0
"""


def vote_score(vote):
    if vote is True:
        return 1
    if vote is False:
        return -1
    return 0


def apply_vote(post, voted, new_vote):
    old_vote = voted.vote if voted else None

    delta = vote_score(new_vote) - vote_score(old_vote)
    post.votes += delta

    if voted:
        voted.vote = new_vote
        return voted

    return Vote(vote=new_vote)


@votes_bp.route("/add", methods=["POST"])
@require_csrf
def add_vote():
    data = request.json
    user_id = data["user_id"]
    post_id = data["post_id"]
    post = (
        db.session.query(
            Post,
            func.count(Comment.id).label("comment_count"),
        )
        .outerjoin(Comment, Comment.postId == Post.id)
        .filter(Post.id == post_id)
        .group_by(Post.id)
        .first()
    )

    voted = Vote.query.filter_by(user_id=user_id, post_id=post_id).first()
    old_vote = voted.vote if voted else None
    new_vote = None if old_vote is True else True
    post, comment_count = post

    voted = apply_vote(post, voted, new_vote)

    d = post.to_dict()
    d["session_user_vote"] = voted.to_dict()
    d["commentCount"] = comment_count
    voted.user_id = user_id
    voted.post_id = post_id
    voted.comment_id = None
    db.session.add_all([post, voted])
    db.session.commit()
    return {"vote": voted.to_dict(), "post": d}


@votes_bp.route("/delete", methods=["DELETE"])
@require_csrf
def delete_vote():
    data = request.json
    user_id = data["user_id"]
    post_id = data["post_id"]
    comment_id = data["comment_id"]

    post = (
        db.session.query(
            Post,
            func.count(Comment.id).label("comment_count"),
        )
        .outerjoin(Comment, Comment.postId == Post.id)
        .filter(Post.id == post_id)
        .group_by(Post.id)
        .first()
    )
    voted = Vote.query.filter_by(user_id=user_id, post_id=post_id).first()

    old_vote = voted.vote if voted else None
    new_vote = None if old_vote is False else False
    post, comment_count = post

    voted = apply_vote(post, voted, new_vote)

    voted.user_id = user_id
    voted.post_id = post_id
    voted.comment_id = comment_id
    d = post.to_dict()
    d["session_user_vote"] = voted.to_dict()
    d["commentCount"] = comment_count

    db.session.add_all([post, voted])
    db.session.commit()
    return {"vote": voted.to_dict(), "post": d}
