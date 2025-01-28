from app.model import Post
from datetime import datetime
from app.extensions import db


def seed_posts():

    post1 = Post(
        userId=1,
        title="This is my fur-baby",
        body="I got this little guy at the flea market",
        image="https://cdn.cnn.com/cnnnext/dam/assets/210407132946-01-pets-home-return-to-work-super-tease.jpg",
        created_at=datetime.today(),
        updated_at=datetime.today(),
        username="Demo",

    )
    post2 = Post(
        userId=2,
        title="I love my crocodile he is the best",
        body="The body can be as long as the habitat that you house him in",
        image="https://www.portseattle.org/sites/default/files/styles/detailpageimagesize/public/2020-09/IMG_8307.JPG?itok=6_7x0M6j.png",
        created_at=datetime.today(),
        updated_at=datetime.today(),
        username="marnie",

    )
    post3 = Post(
        userId=3,
        title="I bought three dogs and they are driving me crazy",
        body="Here are the little shits",
        image="https://www.nps.gov/saan/planyourvisit/images/IMG_0274_5.JPG?maxwidth=1200&maxheight=1200&autorotate=false.png",
        created_at=datetime.today(),
        updated_at=datetime.today(),
        username="bobbie",

    )
    post4 = Post(
        userId=4,
        title="I have this hamster name captian",
        body="O' captian, my captian",
        image="data:image/jpeg;base64,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",
        created_at=datetime.today(),
        updated_at=datetime.today(),
        username="daphne",

    )
    post5 = Post(
        userId=5,
        title="Is this a lovable creature?",
        body="A picture of a snake",
        image="https://i.insider.com/5d9247e42e22af25a62dbd38?width=600&format=jpeg&auto=webp.png",
        created_at=datetime.today(),
        updated_at=datetime.today(),
        username="moose",

    )
    post6 = Post(
        userId=6,
        title="I am not sure how to take care of puppies",
        body="The vet said shes due in a week! What do I do?",
        image="data:image/jpeg;base64,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",
        created_at=datetime.today(),
        updated_at=datetime.today(),
        username="barry",

    )
    post7 = Post(
        userId=1,
        title="I am getting tired of thinking",
        body="A post body",
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNEk6uMBCMGkXjN5N8z-xdRzB_Bk-i7PBKvg&usqp=CAU.png",
        created_at=datetime.today(),
        updated_at=datetime.today(),
        username="Demo",

    )
    post8 = Post(
        userId=2,
        title="I really need to make sure that I sleep better and longer",
        body="What the hell am I doing here",
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMePncPAs43LVV6BncggLSoE3djXOq5VUvCw&usqp=CAU.png",
        created_at=datetime.today(),
        updated_at=datetime.today(),
        username="marnie",

    )
    post9 = Post(
        userId=3,
        title="Just one more post after this",
        body="Fust one more",
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbKMuupCXMYuk_vIVt4FJQo3G2hzs4bZ5MBA&usqp=CAU.png",
        created_at=datetime.today(),
        updated_at=datetime.today(),
        username="bobbie",

    )
    post10 = Post(
        userId=4,
        title="A title",
        body="A body",
        image="https://s26162.pcdn.co/wp-content/uploads/2019/11/Screen-Shot-2019-11-06-at-5.53.05-PM.png",
        created_at=datetime.today(),
        updated_at=datetime.today(),
        username="daphne",

    )

    post_10 = Post(
        userId=5,
        title='The Second Post',
        body='The second posts body so it is much longer than the tile section.',
        image='https://dkt6rvnu67rqj.cloudfront.net/sites/default/files/styles/600x400/public/media/GettyImages-1140964404.jpg?h=411e6550&itok=alcdPeq3.png',
        created_at=datetime.today(),
        updated_at=datetime.today(),
        username="moose",

    )

    post_11 = Post(
        userId=6,
        title='Matt really is a legend',
        body='Matt is great at backend routes its very fun to work with him -kenneth',
        image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8v0ekbB8nNv050Zyx4JtZ5weXxmFSK_ZIVg&usqp=CAU',
        created_at=datetime.today(),
        updated_at=datetime.today(),
        username="barry",

    )
    post_12 = Post(
        userId=1,
        title='Matt wins another great game',
        body='Another great shot by matthewsatterwhite. STYLES',
        image='https://imgs.search.brave.com/wQ1WbpbGq--Yxe2G0vZaMl9IhRIdV8LkP3Gvj8uSG6Q/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNDgw/NTg1NDY1L3Bob3Rv/L3doby1pcy10aGUt/Ym9zcy5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9NkhHTXhL/TE9aV0ptd0RFRjBH/YjE2QzBCY25NbVk3/YnZBeTNOS21yT1c2/QT0',
        created_at=datetime.today(),
        updated_at=datetime.today(),
        username="Demo",

    )
    post_13 = Post(
        userId=2,
        title='JetBrains Academy offering Flask Developer Study plan',
        body='The second posts body so it is much longer than the tile section.',
        image='https://www.rd.com/wp-content/uploads/2017/10/01_sugarglider_Things-to-Know-Before-Adopting-Exotic-Pets_227566504_KAMONRAT.jpg?resize=640,426GE',
        created_at=datetime.today(),
        updated_at=datetime.today(),
        username="marnie",

    )
    post_14 = Post(
        userId=3,
        title='Making a Robinhood Clone using Flask',
        body='Any advice on how to make a flask app look just like Robinhood? Thanks!',
        image='https://static.scientificamerican.com/sciam/cache/file/84DB88D9-A602-4F0E-90F3608B94091149_source.jpg',
        created_at=datetime.today(),
        updated_at=datetime.today(),
        username="bobbie",

    )

    post_15 = Post(
        userId=4,
        title='Making great seeders is important to test your routes!',
        body='Write random letters is not going to cut it kenneth. I have typing alot of information. Making it pass',
        image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO3t1XSa6GTWL9HYaCcy0y0ECtSLI4zsGuBA&usqp=CAUAGE.png',
        created_at=datetime.today(),
        updated_at=datetime.today(),
        username="daphne",

    )

    post_16 = Post(
        userId=5,
        title="Wait, will it pass now?",
        body='After a long week full of upsets. Our hero kenneth finds himself in yet another challenge.',
        image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdHVgaOVwABex-HctF9VSH-wQcyK8-acy5aA&usqp=CAU.png',
        username="moose",

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
