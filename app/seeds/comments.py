from app.model import Comment
from datetime import datetime
from app.extensions import db


def seed_comments():

    comment1 = Comment(
        userId=2,
        postId=3,
        comment="LOL that got a belly laugh out of me. Cute kitty :)",
        created_at=datetime.today(),
        updated_at=datetime.today(),
        username="marnie",
    )
    comment2 = Comment(
        userId=1,
        postId=2,
        comment="Goldens are the best.",
        created_at=datetime.today(),
        updated_at=datetime.today(),
        username="Demo",
    )
    comment3 = Comment(
        userId=6,
        postId=1,
        comment="This is my favourite comment if the day and it's just 06:00 here.",
        created_at=datetime.today(),
        updated_at=datetime.today(),
        username="barry",
    )
    comment4 = Comment(
        userId=5,
        postId=17,
        comment="Thanks for sharing your Brittany, reminds me of my grandfather he bred great hunting dogs",
        created_at=datetime.today(),
        updated_at=datetime.today(),
        username="moose",
    )
    comment5 = Comment(
        userId=4,
        postId=16,
        comment="what dog lovers see",
        created_at=datetime.today(),
        updated_at=datetime.today(),
        username="daphne",
    )
    comment6 = Comment(
        userId=3,
        postId=15,
        comment="Aren't they ever so slightly more related to cats than dogs?",
        created_at=datetime.today(),
        updated_at=datetime.today(),
        username="bobbie",
    )
    comment7 = Comment(
        userId=2,
        postId=14,
        comment="Shenzi? that's a name i haven't heard in a long time",
        created_at=datetime.today(),
        updated_at=datetime.today(),
        username="marnie",
    )
    comment8 = Comment(
        userId=1,
        postId=13,
        comment="Shenzi? that's a name i haven't heard in a long time",
        created_at=datetime.today(),
        updated_at=datetime.today(),
        username="Demo",
    )
    comment9 = Comment(
        userId=6,
        postId=12,
        comment="She is totally adorable!",
        created_at=datetime.today(),
        updated_at=datetime.today(),
        username="barry",
    )
    comment10 = Comment(
        userId=5,
        postId=11,
        comment="Thats some serious calf development",
        created_at=datetime.today(),
        updated_at=datetime.today(),
        username="mosse",
    )
    comment11 = Comment(
        userId=4,
        postId=10,
        comment="Thats some serious calf development",
        created_at=datetime.today(),
        updated_at=datetime.today(),
        username="daphne",
    )
    comment12 = Comment(
        userId=3,
        postId=9,
        comment="She is totally adorable!",
        created_at=datetime.today(),
        updated_at=datetime.today(),
        username="bobbie",
    )
    comment13 = Comment(
        userId=2,
        postId=8,
        comment="Big ole milk doggos",
        created_at=datetime.today(),
        updated_at=datetime.today(),
        username="marnie",
    )
    comment14 = Comment(
        userId=1,
        postId=7,
        comment="Aw! So adorable!",
        created_at=datetime.today(),
        updated_at=datetime.today(),
        username="Demo",
    )
    comment15 = Comment(
        userId=6,
        postId=6,
        comment="My kitty was very interested in this lol",
        created_at=datetime.today(),
        updated_at=datetime.today(),
        username="barry",
    )
    comment16 = Comment(
        userId=5,
        postId=5,
        comment="Never seen a cat with a face so lively and animated.",
        created_at=datetime.today(),
        updated_at=datetime.today(),
        username="moose",
    )
    comment17 = Comment(
        userId=4,
        postId=4,
        comment="My cat came out of nowhere, purring like crazy, and rubbed her head on my phone when i played this",
        created_at=datetime.today(),
        updated_at=datetime.today(),
        username="daphne",
    )
    comment18 = Comment(
        userId=3,
        postId=3,
        comment="Looks just as confused as we are!",
        created_at=datetime.today(),
        updated_at=datetime.today(),
        username="bobbie",
    )
    comment19 = Comment(
        userId=2,
        postId=2,
        comment="ok, I don't know if this beats 'Horse Outside' or not",
        created_at=datetime.today(),
        updated_at=datetime.today(),
        username="marnie",
    )
    comment20 = Comment(
        userId=1,
        postId=2,
        comment="This is my favourite comment if the day and it's just 06:00 here.",
        created_at=datetime.today(),
        updated_at=datetime.today(),
        username="Demo",
    )
    comment21 = Comment(
        userId=1,
        postId=3,
        comment="The dog knows how to give respect the King of Jungle !",
        created_at=datetime.today(),
        updated_at=datetime.today(),
        username="Demo",
    )
    comment22 = Comment(
        userId=2,
        postId=3,
        comment="That's awesome. Quality content",
        created_at=datetime.today(),
        updated_at=datetime.today(),
        username="marnie",
    )
    comment23 = Comment(
        userId=3,
        postId=1,
        comment="This is how half the videos of my toddler end too.",
        created_at=datetime.today(),
        updated_at=datetime.today(),
        username="bobbie",
    )
    comment24 = Comment(
        userId=4,
        postId=17,
        comment="Shhh, I gave him Buddy Biscuits",
        created_at=datetime.today(),
        updated_at=datetime.today(),
        username="daphne",
    )
    comment25 = Comment(
        userId=5,
        postId=16,
        comment="this dog is a paid actor",
        created_at=datetime.today(),
        updated_at=datetime.today(),
        username="moose",
    )
    comment26 = Comment(
        userId=6,
        postId=15,
        comment="A bow bow to the Lion king!!!!",
        created_at=datetime.today(),
        updated_at=datetime.today(),
        username="barry",
    )
    comment27 = Comment(
        userId=1,
        postId=14,
        comment="Dog did a Bow Bow.",
        created_at=datetime.today(),
        updated_at=datetime.today(),
        username="Demo",
    )
    comment28 = Comment(
        userId=2,
        postId=13,
        comment="Probably I'll do the same reactions if ever I saw my dog doing this stuff. Lol",
        created_at=datetime.today(),
        updated_at=datetime.today(),
        username="marnie",
    )
    comment29 = Comment(
        userId=3,
        postId=12,
        comment="Tell that to the guy who kicked a bear off his porch protecting his puppies",
        created_at=datetime.today(),
        updated_at=datetime.today(),
        username="bobbie",
    )
    comment30 = Comment(
        userId=4,
        postId=11,
        comment="Yeah I read that the bear had to go for rabies shots afterwards.",
        created_at=datetime.today(),
        updated_at=datetime.today(),
        username="daphne",
    )
    comment31 = Comment(
        userId=5,
        postId=10,
        comment="BONK",
        created_at=datetime.today(),
        updated_at=datetime.today(),
        username="moose",
    )
    comment32 = Comment(
        userId=6,
        postId=9,
        comment="I died after the thud",
        created_at=datetime.today(),
        updated_at=datetime.today(),
        username="barry",
    )
    comment33 = Comment(
        userId=1,
        postId=8,
        comment="I smell bs, how did you write that comment then?",
        created_at=datetime.today(),
        updated_at=datetime.today(),
        username="Demo",
    )
    comment34 = Comment(
        userId=2,
        postId=7,
        comment="RIP 🙏",
        created_at=datetime.today(),
        updated_at=datetime.today(),
        username="marnie",
    )


    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)
    db.session.add(comment6)
    db.session.add(comment7)
    db.session.add(comment8)
    db.session.add(comment9)
    db.session.add(comment10)
    db.session.add(comment11)
    db.session.add(comment12)
    db.session.add(comment13)
    db.session.add(comment14)
    db.session.add(comment15)
    db.session.add(comment16)
    db.session.add(comment17)
    db.session.add(comment18)
    db.session.add(comment19)
    db.session.add(comment20)
    db.session.add(comment21)
    db.session.add(comment22)
    db.session.add(comment23)
    db.session.add(comment24)
    db.session.add(comment25)
    db.session.add(comment26)
    db.session.add(comment27)
    db.session.add(comment28)
    db.session.add(comment29)
    db.session.add(comment30)
    db.session.add(comment31)
    db.session.add(comment32)
    db.session.add(comment33)
    db.session.add(comment34)

    db.session.commit()


def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
    