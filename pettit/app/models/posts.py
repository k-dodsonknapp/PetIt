from app.models.db import db
from sqlalchemy import func


class Post(db.Model):
    __tablename__ = "posts"

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.Text, nullable=False)
    body = db.Column(db.Text)
    image = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

    user = db.relationship('User', back_populates='post')
    comment = db.relationship('Comment', back_populates='post')
    vote = db.relationship('Vote', back_populates='post')
    # comment_on_comment = db.relationship('Comment_on_comment', back_populates='post')


    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'title': self.title,
            'body': self.body, 
            'image': self.image,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
