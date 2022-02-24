from app.models.db import db

class Vote(db.Model):
    __tablename__ = "votes"

    id = db.Column(db.Integer, primary_key=True)
    vote = db.Column(db.Boolean, nullable=False)
    vote_count = db.Column(db.Integer, nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    comment_id = db.Column(db.Integer, db.ForeignKey('comments.id'))
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))

    user = db.relationship('User', back_populates='vote')
    post = db.relationship('Post', back_populates='vote')
    comment = db.relationship('Comment', back_populates='vote')


    def to_dict(self):
        return {
            'id': self.id,
            'vote': self.vote,
            'vote_count': self.vote_count,
            'userId': self.userId,
            'comment_id': self.comment_id,
            'post_id': self.post_id,
        }