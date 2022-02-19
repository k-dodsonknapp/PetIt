# from app.models import db, Comment
# from datetime import datetime


# def seed_comments():

#     comment1 = Comment(
#         userId=2,
#         postId=3,
#         comment_id=18,
#         comment="LOL that got a belly laugh out of me. Cute kitty :)",
#         created_at=datetime.today(),
#         updated_at=datetime.today(),
#     )
#     comment2 = Comment(
#         userId=1,
#         postId=2,
#         comment_id=19,
#         comment="Goldens are the best.",
#         created_at=datetime.today(),
#         updated_at=datetime.today(),
#     )
#     comment3 = Comment(
#         userId=6,
#         postId=1,
#         comment_id=20,
#         comment="This is my favourite comment if the day and it's just 06:00 here.",
#         created_at=datetime.today(),
#         updated_at=datetime.today(),
#     )
#     comment4 = Comment(
#         userId=5,
#         postId=17,
#         comment="Thanks for sharing your Brittany, reminds me of my grandfather he bred great hunting dogs",
#         created_at=datetime.today(),
#         updated_at=datetime.today(),
#     )
#     comment5 = Comment(
#         userId=4,
#         postId=16,
#         comment="what dog lovers see",
#         created_at=datetime.today(),
#         updated_at=datetime.today(),
#     )
#     comment6 = Comment(
#         userId=3,
#         postId=15,
#         comment="Aren't they ever so slightly more related to cats than dogs?",
#         created_at=datetime.today(),
#         updated_at=datetime.today(),
#     )
#     comment7 = Comment(
#         userId=2,
#         postId=14,
#         comment="Shenzi? that's a name i haven't heard in a long time",
#         created_at=datetime.today(),
#         updated_at=datetime.today(),
#     )
#     comment8 = Comment(
#         userId=1,
#         postId=13,
#         comment="Shenzi? that's a name i haven't heard in a long time",
#         created_at=datetime.today(),
#         updated_at=datetime.today(),
#     )
#     comment9 = Comment(
#         userId=6,
#         postId=12,
#         comment="She is totally adorable!",
#         created_at=datetime.today(),
#         updated_at=datetime.today(),
#     )
#     comment10 = Comment(
#         userId=5,
#         postId=11,
#         comment="Thats some serious calf development",
#         created_at=datetime.today(),
#         updated_at=datetime.today(),
#     )
#     comment11 = Comment(
#         userId=4,
#         postId=10,
#         comment="Thats some serious calf development",
#         created_at=datetime.today(),
#         updated_at=datetime.today(),
#     )
#     comment12 = Comment(
#         userId=3,
#         postId=9,
#         comment="She is totally adorable!",
#         created_at=datetime.today(),
#         updated_at=datetime.today(),
#     )
#     comment13 = Comment(
#         userId=2,
#         postId=8,
#         comment="Big ole milk doggos",
#         created_at=datetime.today(),
#         updated_at=datetime.today(),
#     )
#     comment14 = Comment(
#         userId=1,
#         postId=7,
#         comment="Aw! So adorable!",
#         created_at=datetime.today(),
#         updated_at=datetime.today(),
#     )
#     comment15 = Comment(
#         userId=6,
#         postId=6,
#         comment="My kitty was very interested in this lol",
#         created_at=datetime.today(),
#         updated_at=datetime.today(),
#     )
#     comment16 = Comment(
#         userId=5,
#         postId=5,
#         comment="Never seen a cat with a face so lively and animated.",
#         created_at=datetime.today(),
#         updated_at=datetime.today(),
#     )
#     comment17 = Comment(
#         userId=4,
#         postId=4,
#         comment="My cat came out of nowhere, purring like crazy, and rubbed her head on my phone when i played this",
#         created_at=datetime.today(),
#         updated_at=datetime.today(),
#     )
#     comment18 = Comment(
#         userId=3,
#         postId=3,
#         comment="Looks just as confused as we are!",
#         created_at=datetime.today(),
#         updated_at=datetime.today(),
#     )
#     comment19 = Comment(
#         userId=2,
#         postId=2,
#         comment="ok, I don't know if this beats 'Horse Outside' or not",
#         created_at=datetime.today(),
#         updated_at=datetime.today(),
#     )
#     comment20 = Comment(
#         userId=1,
#         postId=1,
#         comment="This is my favourite comment if the day and it's just 06:00 here.",
#         created_at=datetime.today(),
#         updated_at=datetime.today(),
#     )

#     db.session.add(comment1)
#     db.session.add(comment2)
#     db.session.add(comment3)
#     db.session.add(comment4)
#     db.session.add(comment5)
#     db.session.add(comment6)
#     db.session.add(comment7)
#     db.session.add(comment8)
#     db.session.add(comment9)
#     db.session.add(comment10)
#     db.session.add(comment11)
#     db.session.add(comment12)
#     db.session.add(comment13)
#     db.session.add(comment14)
#     db.session.add(comment15)
#     db.session.add(comment16)
#     db.session.add(comment17)
#     db.session.add(comment18)
#     db.session.add(comment19)
#     db.session.add(comment20)

#     db.session.commit()


# def undo_comments():
#     db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
#     db.session.commit()
    