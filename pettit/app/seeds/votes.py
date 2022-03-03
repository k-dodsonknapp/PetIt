from app.models import db, Vote

def seed_votes():

    post_votes = Vote(
        vote_count=0,
        userId=1,
        post_id=1,
    )

    db.session.add(post_votes)
    db.session.commit()

def undo_seed_votes():
    db.session.execute('TRUNCATE votes RESTART IDENTITY CASCADE;')
    db.session.commit()