from backend.models.db import db

class Vote(db.Model):
    __tablename__ = "votes"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))
    comment_id = db.Column(db.Integer, db.ForeignKey('comments.id'))
    upvote = db.Column(db.String(10))

    user = db.relationship('User', back_populates='vote')
    post = db.relationship('Post', back_populates='vote')
    comment = db.relationship('Comment', back_populates='vote')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'comment_id': self.comment_id,
            'post_id': self.post_id,
            'upvote': self.upvote,
        }