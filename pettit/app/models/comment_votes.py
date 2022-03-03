from app.models.db import db

class Comment_Vote(db.Model):
    __tablename__ = "comment_votes"

    id = db.Column(db.Integer, primary_key=True)
    vote_amount = db.Column(db.Integer, nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    comment_id = db.Column(db.Integer, db.ForeignKey('comments.id'))

    
    comment = db.relationship('Comment', back_populates='comment_vote')
    user = db.relationship('User', back_populates='comment_vote')

    def to_dict(self): 
        return {
            'id': self.id,
            'vote_amount': self.vote_amount,
            'userid': self.userId,
            'comment_id': self.comment_id,
        }