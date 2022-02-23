from app.models.db import db
from sqlalchemy import func


class Comment_on_comment(db.Model):
    __tablename__ = "comment_on_comments"

    id = db.Column(db.Integer, primary_key=True)
    comment_on_comment = db.Column(db.Text, nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    postId = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
    commentId = db.Column(db.Integer, db.ForeignKey('comments.id'), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

    user = db.relationship('User', back_populates='comment_on_comment')
    post = db.relationship('Post', back_populates='comment_on_comment')
    comment = db.relationship('Comment', back_populates='comment_on_comment')


    def to_dict(self):
        return {
            'id': self.id,
            'comment_on_comment': self.comment_on_comment,
            'userId': self.userId,
            'postId': self.postId,
            'commentId': self.commentId,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }