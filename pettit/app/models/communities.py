from app.models.db import db
from sqlalchemy import func


class Communities(db.Model):
    __tablename__ = "communities"

    id = db.Column(db.Integer, primary_key=True)
    community_name = db.Column(db.Text, nullable=False)
    community_description = db.Column(db.Text, nullable=False)

    post = db.relationship('Post', back_populates='communities')

    def to_dict(self):
        return {
            'id': self.id,
            'community_name': self.community_name,
            'community_description': self.community_description,
        }