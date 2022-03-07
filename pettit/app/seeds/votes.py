from app.models import db, Vote

def seed_votes():

    post_votes = Vote(
        user_id=1,
        post_id=17,
    )

    post_votes1 = Vote(
        comment_id=1,
        user_id=2,
    )
    # post_votes2 = Vote(
    #     comment_id=
    #     userId=3,
    #     post_id=3,
    # )
    # post_votes3 = Vote(
    #     comment_id=
    #     userId=4,
    #     post_id=4,
    # )
    # post_votes4 = Vote(
    #     comment_id=
    #     userId=5,
    #     post_id=5,
    # )
    # post_votes5 = Vote(
    #     comment_id=
    #     userId=6,
    #     post_id=6,
    # )
    # post_votes6 = Vote(
    #     comment_id=
    #     userId=2,
    #     post_id=7,
    # )
    # post_votes7 = Vote(
    #     comment_id=
    #     userId=1,
    #     post_id=8,
    # )
    # post_votes8 = Vote(
    #     comment_id=
    #     userId=3,
    #     post_id=9,
    # )
    # post_votes9 = Vote(
    #     comment_id=
    #     userId=4,
    #     post_id=10,
    # )

    # post_votes10 = Vote(
    #     comment_id=
    #     userId=5,
    #     post_id=11,
    # )
    # post_votes11 = Vote(
    #     comment_id=
    #     userId=6,
    #     post_id=12,
    # )
    # post_votes12 = Vote(
    #     comment_id=
    #     userId=1,
    #     post_id=13,
    # )
    # post_votes13 = Vote(
    #     comment_id=
    #     userId=2,
    #     post_id=14,
    # )
    # post_votes14 = Vote(
    #     comment_id=
    #     userId=3,
    #     post_id=15,
    # )
    # post_votes15 = Vote(
    #     comment_id=
    #     userId=4,
    #     post_id=16,
    # )

    # post_votes16 = Vote(
    #     comment_id=
    #     userId=5,
    #     post_id=17,
    # )

    db.session.add(post_votes)
    db.session.add(post_votes1)
    # db.session.add(post_votes2)
    # db.session.add(post_votes3)
    # db.session.add(post_votes4)
    # db.session.add(post_votes5)
    # db.session.add(post_votes6)
    # db.session.add(post_votes7)
    # db.session.add(post_votes8)
    # db.session.add(post_votes9)
    # db.session.add(post_votes10)
    # db.session.add(post_votes11)
    # db.session.add(post_votes12)
    # db.session.add(post_votes13)
    # db.session.add(post_votes14)
    # db.session.add(post_votes15)
    # db.session.add(post_votes16)
    db.session.commit()

def undo_seed_votes():
    db.session.execute('TRUNCATE votes RESTART IDENTITY CASCADE;')
    db.session.commit()