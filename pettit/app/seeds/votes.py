from app.models import db, Vote

def seed_votes():

    votes_on_post = Vote(
        vote=True,
        vote_count=0,
        userId=1,
        post_id=1,
    )

    db.session.add(votes_on_post)
    db.session.commit()

def undo_seed_votes():
    db.session.execute('TRUNCATE votes RESTART IDENTITY CASCADE;')
    db.session.commit()