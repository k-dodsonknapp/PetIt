from __future__ import annotations
from app.extensions import db
from sqlalchemy import DateTime, func, ForeignKey, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from user import User
    from comments import Comment
    from app.model.votes import Vote
    from communities import Communities


class Post(db.Model):
    __tablename__ = "posts"

    id: Mapped[int] = mapped_column(primary_key=True)
    userId: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    title: Mapped[str] = mapped_column(nullable=False)
    body: Mapped[str]
    image: Mapped[str] = mapped_column(nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
    )
    username: Mapped[str]
    community_id: Mapped[int] = mapped_column(
        ForeignKey("communities.id"), nullable=True
    )
    votes: Mapped[int] = mapped_column(Integer, nullable=False, server_default="0")

    user: Mapped["User"] = relationship("User", back_populates="post")
    comment: Mapped[list["Comment"]] = relationship("Comment", back_populates="post")
    vote: Mapped[list["Vote"]] = relationship("Vote", back_populates="post")
    communities: Mapped["Communities"] = relationship(
        "Communities", back_populates="post"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "title": self.title,
            "body": self.body,
            "image": self.image,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "username": self.username,
            "community_id": self.community_id,
            "votes": self.votes,
        }
