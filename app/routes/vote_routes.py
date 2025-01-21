from flask import Blueprint, request
from app.model import Vote
from app.extensions import db

votes_bp = Blueprint('votes', __name__)


@votes_bp.route("/")
def get_all_votes_posts():
    votes = Vote.query.all()

    return {"votes": [vote.to_dict() for vote in votes]}


@votes_bp.route("/add", methods=["POST"])
def add_vote():
    data = request.json

    user_id = data["user_id"]
    post_id = data["post_id"]
    comment_id = data["comment_id"]

    new_like = Vote(
        user_id=user_id,
        post_id=post_id,
        comment_id=comment_id,
    )
    db.session.add(new_like)
    db.session.commit()

    return new_like.to_dict()


@votes_bp.route("/delete", methods=["DELETE"])
def delete_vote():
    data = request.json
    id = data["id"]

    vote = Vote.query.get(id)
    if (vote): 
        db.session.delete(vote)
        db.session.commit()
    return {'message': "delete successful"}