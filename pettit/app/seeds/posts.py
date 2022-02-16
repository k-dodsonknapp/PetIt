from app.models import db, Post
from datetime import datetime


def seed_posts():

    post1 = Post(
        userId=1,
        title="This is my fur-baby",
        body="I got this little guy at the flea market",
        image="An Image",
        created_at=datetime.today(),
        updated_at=datetime.today(),
    )
    post2 = Post(
        userId=2,
        title="I love my crocodile he is the best",
        body="The body can be as long as the habitat that you house him in",
        image="An Image",
        created_at=datetime.today(),
        updated_at=datetime.today(),
    )
    post3 = Post(
        userId=3,
        title="I bought three dogs and they are driving me crazy",
        body="Here are the little shits",
        image="An Image",
        created_at=datetime.today(),
        updated_at=datetime.today(),
    )
    post4 = Post(
        userId=4,
        title="I have this hamster name captian",
        body="O' captian, my captian",
        image="An Image",
        created_at=datetime.today(),
        updated_at=datetime.today(),
    )
    post5 = Post(
        userId=5,
        title="Is this a lovable creature?",
        body="A picture of a snake",
        image="An Image",
        created_at=datetime.today(),
        updated_at=datetime.today(),
    )
    post6 = Post(
        userId=6,
        title="I am not sure how to take care of puppies",
        body="The vet said shes due in a week! What do I do?",
        image="An Image",
        created_at=datetime.today(),
        updated_at=datetime.today(),
    )
    post7 = Post(
        userId=1,
        title="I am getting tired of thinking",
        body="A post body",
        image="An Image",
        created_at=datetime.today(),
        updated_at=datetime.today(),
    )
    post8 = Post(
        userId=2,
        title="I really need to make sure that I sleep better and longer",
        body="What the hell am I doing here",
        image="An Image",
        created_at=datetime.today(),
        updated_at=datetime.today(),
    )
    post9 = Post(
        userId=3,
        title="Just one more post after this",
        body="Fust one more",
        image="An Image",
        created_at=datetime.today(),
        updated_at=datetime.today(),
    )
    post10 = Post(
        userId=4,
        title="A title",
        body="A body",
        image="An Image",
        created_at=datetime.today(),
        updated_at=datetime.today(),
    )

    post_10 = Post(
        userId=5,
        title='The Second Post',
        body='The second posts body so it is much longer than the tile section.',
        image='IMAGE',
        created_at=datetime.today(),
        updated_at=datetime.today(),
    )

    post_11 = Post(
        userId=6,
        title='Matt really is a legend',
        body='Matt is great at backend routes its very fun to work with him -kenneth',
        image='IMAGE',
        created_at=datetime.today(),
        updated_at=datetime.today(),
    )
    post_12 = Post(
        userId=1,
        title='Matt wins another great game',
        body='Another great shot by matthewsatterwhite. STYLES',
        image='IMAGE',
        created_at=datetime.today(),
        updated_at=datetime.today(),
    )
    post_13 = Post(
        userId=2,
        title='JetBrains Academy offering Flask Developer Study plan',
        body='The second posts body so it is much longer than the tile section.',
        image='IMAGE',
        created_at=datetime.today(),
        updated_at=datetime.today(),
    )
    post_14 = Post(
        userId=3,
        title='Making a Robinhood Clone using Flask',
        body='Any advice on how to make a flask app look just like Robinhood? Thanks!',
        image='IMAGE',
        created_at=datetime.today(),
        updated_at=datetime.today(),
    )

    post_15 = Post(
        userId=4,
        title='Making great seeders is important to test your routes!',
        body='Write random letters is not going to cut it kenneth. I have typing alot of information. Making it pass',
        image='IMAGE',
    )

    post_16 = Post(
        userId=5,
        title="Wait, will it pass now?",
        body='After a long week full of upsets. Our hero kenneth finds himself in yet another challenge.',
        image='IMAGE',
    )

    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)
    db.session.add(post5)
    db.session.add(post6)
    db.session.add(post7)
    db.session.add(post8)
    db.session.add(post9)
    db.session.add(post10)
    db.session.add(post_10)
    db.session.add(post_11)
    db.session.add(post_12)
    db.session.add(post_13)
    db.session.add(post_14)
    db.session.add(post_15)
    db.session.add(post_16)

    db.session.commit()


def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()