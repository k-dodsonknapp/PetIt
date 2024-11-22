from flask import Blueprint, request
from app.models import Comment, db

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/<int:id>')
def get_all_comments(id):

    comments = Comment.query.filter(Comment.postId == id).all()
     
    return {"comments" : [comment.to_dict() for comment in comments]}


# @comment_routes.route()

@comment_routes.route('/comment/<int:id>')
def comment_on_comment(id):
    # print("PPPPPPPP", id)
    # comment = Comment.query.get(id)
    comments = Comment.query.filter(Comment.parentId == id).all()
    # print("ASDFASDF", [comment.to_dict() for comment in comments] )
    # print("asdfasdfasdf", [comment.to_dict() for comments in comment])
    # comment_on_comment = Comment_on_comment.query.filter(Comment_on_comment.commentId == id).all()  

# 'comment_on_comment': [comment.to_dict() for comment in comment_on_comment]
    return {}


@comment_routes.route('/new', methods=["POST"])
def new_comment():
    data = request.json

    userId = data["userId"]
    postId = data["postId"]
    comment = data["comment"]
    parentId =data["parentId"]
    username = data["username"]

    new_comment = Comment(
        userId=userId,
        postId=postId,
        comment=comment,
        parentId=parentId,
        username=username,
    )

    db.session.add(new_comment)
    db.session.commit()

    return new_comment.to_dict()


@comment_routes.route('/delete', methods=["DELETE"])
def delete_comment():
    data = request.json
    comment = Comment.query.get(data['id'])

    db.session.delete(comment)
    db.session.commit()

    return {"success": comment.to_dict()}


@comment_routes.route('/edit', methods=["PUT"])
def edit_comment():
    data = request.json

    comment = Comment.query.get(data['id'])

    comment.userId = data["userId"]
    comment.postId = data["postId"]
    comment.comment = data["comment"]

    db.session.commit()

    comments = Comment.query.filter(Comment.postId == data['postId']).all()

    return comment.to_dict()