from app.model import Vote
from app.extensions import db
from sqlalchemy import text


def seed_votes():
    # Votes for posts
    post_votes = [
        Vote(
            user_id=1,
            post_id=1,
            comment_id=None,
            vote=None,
        ),
        Vote(
            user_id=2,
            post_id=1,
            comment_id=None,
            vote=True,
        ),
        Vote(
            user_id=3,
            post_id=1,
            comment_id=None,
            vote=False,
        ),
        Vote(
            user_id=2,
            post_id=2,
            comment_id=None,
            vote=None,
        ),
        Vote(
            user_id=3,
            post_id=3,
            comment_id=None,
            vote=None,
        ),
        Vote(
            user_id=4,
            post_id=4,
            comment_id=None,
            vote=None,
        ),
        Vote(
            user_id=5,
            post_id=5,
            comment_id=None,
            vote=None,
        ),
        Vote(
            user_id=6,
            post_id=6,
            comment_id=None,
            vote=None,
        ),
        Vote(
            user_id=1,
            post_id=7,
            comment_id=None,
            vote=None,
        ),
        Vote(
            user_id=2,
            post_id=8,
            comment_id=None,
            vote=None,
        ),
        Vote(
            user_id=3,
            post_id=9,
            comment_id=None,
            vote=None,
        ),
        Vote(
            user_id=4,
            post_id=10,
            comment_id=None,
            vote=None,
        ),
        Vote(
            user_id=5,
            post_id=11,
            comment_id=None,
            vote=None,
        ),
        Vote(
            user_id=6,
            post_id=12,
            comment_id=None,
            vote=None,
        ),
        Vote(
            user_id=1,
            post_id=13,
            comment_id=None,
            vote=None,
        ),
        Vote(
            user_id=2,
            post_id=14,
            comment_id=None,
            vote=None,
        ),
        Vote(
            user_id=3,
            post_id=15,
            comment_id=None,
            vote=None,
        ),
        Vote(
            user_id=4,
            post_id=16,
            comment_id=None,
            vote=None,
        ),
        Vote(
            user_id=5,
            post_id=17,
            comment_id=None,
            vote=None,
        ),
    ]

    for vote in post_votes:
        db.session.add(vote)

    db.session.commit()


def undo_seed_votes():
    db.session.execute(text("TRUNCATE votes RESTART IDENTITY CASCADE;"))
    db.session.commit()
