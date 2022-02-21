from flask import Blueprint, request
from app.models import Comment, db

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/<int:id>')
def get_all_comments(id):

    # data = request.json
    # print(data)
    # id = data["postId"]

    comments = Comment.query.filter(Comment.postId == id).all()
    print("%%%%%%%%%%%%%%",comments)
    print({"comments" : [comment.to_dict() for comment in comments]})
     
    # return {"comment" : comments}
    # return {"sent":"message"}
    return {"comments" : [comment.to_dict() for comment in comments]}


@comment_routes.route('/new', methods=["POST"])
def new_comment():
    data = request.json

    userId = data["userId"]
    postId = data["postId"]
    comment = data["comment"]

    new_comment = Comment(
        userId=userId,
        postId=postId,
        comment=comment
    )

    db.session.add(new_comment)
    db.session.commit()

    return new_comment.to_dict()


@comment_routes.route('/delete', methods=["DELETE"])
def delete_comment():
    data = request.json
    id = data["id"]
    comment = Comment.query.get(id)
    return {}