# from app.models import db, Comment_on_comment
# from datetime import datetime


# def seed_comment_on_comments():

    
    
    
    
#     comment_on_comment1 = Comment_on_comment(
#         userId=1,
#         postId=3,
#         commentId=1,
#         comment_on_comment="hey",
#         created_at=datetime.today(),
#         updated_at=datetime.today(),
#     )
#     comment_on_comment2 = Comment_on_comment(
#         userId=2,
#         postId=2,
#         commentId=2,
#         comment_on_comment="hey hey",
#         created_at=datetime.today(),
#         updated_at=datetime.today(),
#     )
#     comment_on_comment3 = Comment_on_comment(
#         userId=3,
#         postId=1,
#         commentId=3,
#         comment_on_comment="hey hey hey",
#         created_at=datetime.today(),
#         updated_at=datetime.today(),
#     )
#     comment_on_comment4 = Comment_on_comment(
#         userId=4,
#         postId=17,
#         commentId=4,
#         comment_on_comment="hey hey hey hey",
#         created_at=datetime.today(),
#         updated_at=datetime.today(),
#     )
#     comment_on_comment5 = Comment_on_comment(
#         userId=5,
#         postId=16,
#         commentId=5,
#         comment_on_comment="hey hey hey hey hey",
#         created_at=datetime.today(),
#         updated_at=datetime.today(),
#     )
#     comment_on_comment6 = Comment_on_comment(
#         userId=6,
#         postId=15,
#         commentId=6,
#         comment_on_comment="hey hey hey hey hey hey",
#         created_at=datetime.today(),
#         updated_at=datetime.today(),
#     )
#     comment_on_comment7 = Comment_on_comment(
#         userId=1,
#         postId=14,
#         commentId=7,
#         comment_on_comment="hey hey hey hey hey hey hey",
#         created_at=datetime.today(),
#         updated_at=datetime.today(),
#     )
#     comment_on_comment8 = Comment_on_comment(
#         userId=2,
#         postId=13,
#         commentId=8,
#         comment_on_comment="hey hey hey hey hey hey hey hey",
#         created_at=datetime.today(),
#         updated_at=datetime.today(),
#     )

#     db.session.add(comment_on_comment1)
#     db.session.add(comment_on_comment2)
#     db.session.add(comment_on_comment3)
#     db.session.add(comment_on_comment4)
#     db.session.add(comment_on_comment5)
#     db.session.add(comment_on_comment6)
#     db.session.add(comment_on_comment7)
#     db.session.add(comment_on_comment8)
#     db.session.commit()


# def undo_comment_on_comments():
#     db.session.execute('TRUNCATE comment_on_comments RESTART IDENTITY CASCADE;')
#     db.session.commit()
    