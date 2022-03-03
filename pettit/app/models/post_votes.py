from app.models.db import db

class Vote(db.Model):
    __tablename__ = "votes"

    id = db.Column(db.Integer, primary_key=True)
    vote_count = db.Column(db.Integer, nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))

    user = db.relationship('User', back_populates='vote')
    post = db.relationship('Post', back_populates='vote')


    def to_dict(self):
        return {
            'id': self.id,
            'vote_count': self.vote_count,
            'userId': self.userId,
            'post_id': self.post_id,
        }