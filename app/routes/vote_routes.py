from flask import Blueprint, request
from app.model import Vote, Post
from app.extensions import db
from app.utils.csrf import require_csrf

votes_bp = Blueprint("votes", __name__)


@votes_bp.route("/")
def get_all_votes_posts():
    votes = Vote.query.all()
    return {"votes": [vote.to_dict() for vote in votes]}


@votes_bp.route("/add", methods=["POST"])
@require_csrf
def add_vote():

    data = request.json

    post_id = data["post_id"]
    user_id = data["user_id"]
    voted = Vote.query.filter_by(user_id=user_id, post_id=post_id).first()

    if not voted:
        post = Post.query.get(post_id)

        post.votes += 1

        post_id = data["post_id"]
        comment_id = data["comment_id"]

        new_like = Vote(
            user_id=user_id,
            post_id=post_id,
            comment_id=comment_id,
        )
        db.session.add(new_like)
        db.session.add(post)
        db.session.commit()
        return new_like.to_dict()
    else:
        return "User already voted", 304



@votes_bp.route("/delete", methods=["DELETE"])
@require_csrf
def delete_vote():
    data = request.json
    user_id = data["user_id"]
    post_id = data["post_id"]

    voted = Vote.query.filter_by(user_id=user_id, post_id=post_id).first()

    if voted is not None:
        post = Post.query.get(post_id)
        post.votes -= 1

        db.session.delete(voted)
        db.session.commit()
        return {"message": "delete successful"}
    else:
        return {"No vote to delete": "deleted"}, 304
