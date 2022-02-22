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


# @comment_routes.route()

@comment_routes.route('/comment/<int:id>')
def comment_on_comment(id):

    comment_on_comment = Comment.query.filter(Comment.comment_id == id).all()

    return {'comment_on_comment': [comment.to_dict() for comment in comment_on_comment]}


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
    print("^^^^^^^^^^", data['postId'])
    comment = Comment.query.get(data['id'])
    # print("((((((((", comment)
    db.session.delete(comment)
    db.session.commit()

    comments = Comment.query.filter(Comment.postId == data['postId']).all()
    return {"comments" : [comment.to_dict() for comment in comments]}
    # return {"success":"suss"}