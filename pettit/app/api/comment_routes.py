from flask import Blueprint, request
from app.models import Comment, db

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/')
def get_all_comments():

    data = request.json
    print(data)
    id = data["postId"]

    comment = Comment.query.filter(Comment.postId == id).all()
    print(comment)
    return {"comment" : comment}
    # return {"sent":"message"}
