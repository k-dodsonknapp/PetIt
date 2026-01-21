from flask import Blueprint, request
from app.model import Post, Comment
from app.extensions import db
from app.utils.csrf import require_csrf
from sqlalchemy import func


post_bp = Blueprint("posts", __name__)


@post_bp.route("/main")
def get_all_posts():
    """
    This route will return all of the posts in the database.
    """
    posts_with_counts = (
        db.session.query(Post, func.count(Comment.id).label("comment_count"))
        .outerjoin(Comment, Comment.postId == Post.id)
        .group_by(Post.id)
        .order_by(Post.created_at.desc())
        .all()
    )

    result = []
    for post, comment_count in posts_with_counts:
        d = post.to_dict()
        d["commentCount"] = comment_count
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

    """
        This route passes in userId, title, body, image for posts
    """

    new_post = Post(
        userId=userId,
        title=title,
        body=body,
        image=image,
        username=username,
    )
    db.session.add(new_post)
    db.session.commit()

    return new_post.to_dict()


@post_bp.route("/<int:id>/edit", methods=["PUT"])
@require_csrf
def edit_post(id):
    data = request.json

    """
    data = {
        "id": <int>, 
        "userId": <int>,
        "title": "A post title",
        "body": "A post body",
        "image": "An image is required",
        "username": "username",
        "votes": "num of votes",
    }
    """

    post = Post.query.get(id)  # need the id from one post

    post.title = data["title"]
    post.body = data["body"]
    post.image = data["image"]
    post.updated_at = data["updated_at"]
    post.votes = data["votes"]
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
