# from app.models import db, Comment_Vote

# def seed_comment_votes():

#     comment_vote = Comment_Vote(
#         vote_amount=0,
#         userId=1,
#         comment_id=1,
#     )

#     db.session.add(comment_vote)
#     db.session.commit()

# def undo_comment_votes():
#     db.session.execute('TRUNCATE comment_votes RESTART IDENTITY CASCADE;')
#     db.session.commit()