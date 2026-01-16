from app.extensions import db
from sqlalchemy import func


class Comment(db.Model):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    postId = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
    comment = db.Column(db.Text, nullable=False)
    parentId = db.Column(db.Integer)
    created_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now())
    username = db.Column(db.Text)

    user = db.relationship('User', back_populates='comment')
    post = db.relationship('Post', back_populates='comment')
    vote = db.relationship('Vote', back_populates='comment')
    # comment_on_comment = db.relationship('Comment_on_comment', back_populates='comment')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'postId': self.postId,
            'comment': self.comment,
            'parentId': self.parentId,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'username': self.username,
        }
