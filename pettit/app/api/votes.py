from flask import Blueprint
from app.models import Vote

vote_routes = Blueprint('votes', __name__)


@vote_routes.route("/posts/<int:id>")
def get_all_votes_posts(id):
    votes = Vote.query.filter(Vote.comment.is_(None)).all()
    print("PPPPPPPP", votes)

    return {"post_votes": [vote.to_dict() for vote in votes]}