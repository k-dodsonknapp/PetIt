from flask import Blueprint, request
from flask_login import current_user
from app.model import Post, Comment, Vote
from app.extensions import db
from app.utils.csrf import require_csrf
from sqlalchemy import func


post_bp = Blueprint("posts", __name__)


@post_bp.route("/main")
def get_all_posts():
    user_id = current_user.id if current_user.is_authenticated else None

    comment_count_sq = (
        db.session.query(
            Comment.postId.label("post_id"),
            func.count(Comment.id).label("comment_count"),
        )
        .group_by(Comment.postId)
        .subquery()
    )

    post_query = (
        db.session.query(
            Post,
            func.coalesce(comment_count_sq.c.comment_count, 0).label("comment_count"),
        )
        .outerjoin(comment_count_sq, comment_count_sq.c.post_id == Post.id)
        .order_by(Post.created_at.desc())
    )

    if user_id:
        post_query = post_query.add_column(Vote).outerjoin(
            Vote, (Vote.post_id == Post.id) & (Vote.user_id == user_id)
        )

    post_query = post_query.all()

    result = []
    for row in post_query:
        post = row[0]
        comment_count = row[1]
        vote = row[2] if user_id else None
        d = post.to_dict()
        d["commentCount"] = comment_count
        if vote is not None:
            d["session_user_vote"] = vote.to_dict()
        result.append(d)
    return {"posts": result}


@post_bp.route("/<int:id>")
def get_one_post(id):
    post = Post.query.get_or_404(id)
    comments = Comment.query.filter(Comment.postId == id).all()
    post_dict = post.to_dict()
    post_dict["commentCount"] = len(comments)
    return {"post": post_dict}


@post_bp.route("/new", methods=["POST"])
@require_csrf
def create_post():
    data = request.json

    userId = data["userId"]
    title = data["title"]
    body = data["body"]
    image = data["image"]
    username = data["username"]
    community_id = data["community_id"]

    """
        This route passes in userId, title, body, image for posts
    """

    new_post = Post(
        userId=userId,
        title=title,
        body=body,
        image=image,
        username=username,
        community_id=community_id,
        votes=0, # TODO: fix hardcoded value
    )
    db.session.add(new_post)
    db.session.commit()

    return new_post.to_dict()


@post_bp.route("/<int:id>/edit", methods=["PUT"])
@require_csrf
def edit_post(id):
    data = request.json

    post = Post.query.get(id)

    post.title = data["title"]
    post.body = data["body"]
    post.image = data["image"]
    post.updated_at = data["updated_at"]
    db.session.commit()

    return post.to_dict()


@post_bp.route("/delete", methods=["DELETE"])
@require_csrf
def delete_post():
    data = request.json
    id = data["id"]

    post = Post.query.get((id))
    post_comments = Comment.query.filter(Comment.postId == id).all()
    for comment in post_comments:
        db.session.delete(comment)

    db.session.delete(post)
    db.session.commit()
    return post.to_dict()
