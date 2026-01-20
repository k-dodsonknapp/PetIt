from app.model import Comment
from datetime import datetime
from app.extensions import db
from sqlalchemy import text


def seed_comments():

    comments = []

    comments.append(
        Comment(
            userId=2,
            postId=3,
            comment="LOL that got a belly laugh out of me. Cute kitty :)",
            created_at=datetime.today(),
            updated_at=datetime.today(),
            username="marnie",
        )
    )

    comments.append(
        Comment(
            userId=1,
            postId=2,
            comment="Goldens are the best.",
            created_at=datetime.today(),
            updated_at=datetime.today(),
            username="Demo",
        )
    )

    comments.append(
        Comment(
            userId=6,
            postId=1,
            comment="This is my favourite comment if the day and it's just 06:00 here.",
            created_at=datetime.today(),
            updated_at=datetime.today(),
            username="barry",
        )
    )

    comments.append(
        Comment(
            userId=5,
            postId=17,
            comment="Thanks for sharing your Brittany, reminds me of my grandfather he bred great hunting dogs",
            created_at=datetime.today(),
            updated_at=datetime.today(),
            username="moose",
        )
    )

    comments.append(
        Comment(
            userId=4,
            postId=16,
            comment="what dog lovers see",
            created_at=datetime.today(),
            updated_at=datetime.today(),
            username="daphne",
        )
    )

    comments.append(
        Comment(
            userId=3,
            postId=15,
            comment="Aren't they ever so slightly more related to cats than dogs?",
            created_at=datetime.today(),
            updated_at=datetime.today(),
            username="bobbie",
        )
    )

    comments.append(
        Comment(
            userId=2,
            postId=14,
            comment="Shenzi? that's a name i haven't heard in a long time",
            created_at=datetime.today(),
            updated_at=datetime.today(),
            username="marnie",
        )
    )

    comments.append(
        Comment(
            userId=1,
            postId=13,
            comment="Shenzi? that's a name i haven't heard in a long time",
            created_at=datetime.today(),
            updated_at=datetime.today(),
            username="Demo",
        )
    )

    comments.append(
        Comment(
            userId=6,
            postId=12,
            comment="She is totally adorable!",
            created_at=datetime.today(),
            updated_at=datetime.today(),
            username="barry",
        )
    )

    comments.append(
        Comment(
            userId=5,
            postId=11,
            comment="Thats some serious calf development",
            created_at=datetime.today(),
            updated_at=datetime.today(),
            username="mosse",
        )
    )

    comments.append(
        Comment(
            userId=4,
            postId=10,
            comment="Thats some serious calf development",
            created_at=datetime.today(),
            updated_at=datetime.today(),
            username="daphne",
        )
    )

    comments.append(
        Comment(
            userId=3,
            postId=9,
            comment="She is totally adorable!",
            created_at=datetime.today(),
            updated_at=datetime.today(),
            username="bobbie",
        )
    )

    comments.append(
        Comment(
            userId=2,
            postId=8,
            comment="Big ole milk doggos",
            created_at=datetime.today(),
            updated_at=datetime.today(),
            username="marnie",
        )
    )

    comments.append(
        Comment(
            userId=1,
            postId=7,
            comment="Aw! So adorable!",
            created_at=datetime.today(),
            updated_at=datetime.today(),
            username="Demo",
        )
    )

    comments.append(
        Comment(
            userId=6,
            postId=6,
            comment="My kitty was very interested in this lol",
            created_at=datetime.today(),
            updated_at=datetime.today(),
            username="barry",
        )
    )

    comments.append(
        Comment(
            userId=5,
            postId=5,
            comment="Never seen a cat with a face so lively and animated.",
            created_at=datetime.today(),
            updated_at=datetime.today(),
            username="moose",
        )
    )

    comments.append(
        Comment(
            userId=4,
            postId=4,
            comment="My cat came out of nowhere, purring like crazy, and rubbed her head on my phone when i played this",
            created_at=datetime.today(),
            updated_at=datetime.today(),
            username="daphne",
        )
    )

    comments.append(
        Comment(
            userId=3,
            postId=3,
            comment="Looks just as confused as we are!",
            created_at=datetime.today(),
            updated_at=datetime.today(),
            username="bobbie",
        )
    )

    comments.append(
        Comment(
            userId=2,
            postId=2,
            comment="ok, I don't know if this beats 'Horse Outside' or not",
            created_at=datetime.today(),
            updated_at=datetime.today(),
            username="marnie",
        )
    )

    comments.append(
        Comment(
            userId=1,
            postId=2,
            comment="This is my favourite comment if the day and it's just 06:00 here.",
            created_at=datetime.today(),
            updated_at=datetime.today(),
            username="Demo",
        )
    )

    comments.append(
        Comment(
            userId=1,
            postId=3,
            comment="The dog knows how to give respect the King of Jungle !",
            created_at=datetime.today(),
            updated_at=datetime.today(),
            username="Demo",
        )
    )

    comments.append(
        Comment(
            userId=2,
            postId=3,
            comment="That's awesome. Quality content",
            created_at=datetime.today(),
            updated_at=datetime.today(),
            username="marnie",
        )
    )

    comments.append(
        Comment(
            userId=3,
            postId=1,
            comment="This is how half the videos of my toddler end too.",
            created_at=datetime.today(),
            updated_at=datetime.today(),
            username="bobbie",
        )
    )

    comments.append(
        Comment(
            userId=4,
            postId=17,
            comment="Shhh, I gave him Buddy Biscuits",
            created_at=datetime.today(),
            updated_at=datetime.today(),
            username="daphne",
        )
    )

    comments.append(
        Comment(
            userId=5,
            postId=16,
            comment="this dog is a paid actor",
            created_at=datetime.today(),
            updated_at=datetime.today(),
            username="moose",
        )
    )

    comments.append(
        Comment(
            userId=6,
            postId=15,
            comment="A bow bow to the Lion king!!!!",
            created_at=datetime.today(),
            updated_at=datetime.today(),
            username="barry",
        )
    )

    comments.append(
        Comment(
            userId=1,
            postId=14,
            comment="Dog did a Bow Bow.",
            created_at=datetime.today(),
            updated_at=datetime.today(),
            username="Demo",
        )
    )

    comments.append(
        Comment(
            userId=2,
            postId=13,
            comment="Probably I'll do the same reactions if ever I saw my dog doing this stuff. Lol",
            created_at=datetime.today(),
            updated_at=datetime.today(),
            username="marnie",
        )
    )

    comments.append(
        Comment(
            userId=3,
            postId=12,
            comment="Tell that to the guy who kicked a bear off his porch protecting his puppies",
            created_at=datetime.today(),
            updated_at=datetime.today(),
            username="bobbie",
        )
    )

    comments.append(
        Comment(
            userId=4,
            postId=11,
            comment="Yeah I read that the bear had to go for rabies shots afterwards.",
            created_at=datetime.today(),
            updated_at=datetime.today(),
            username="daphne",
        )
    )

    comments.append(
        Comment(
            userId=5,
            postId=10,
            comment="BONK",
            created_at=datetime.today(),
            updated_at=datetime.today(),
            username="moose",
        )
    )

    comments.append(
        Comment(
            userId=6,
            postId=9,
            comment="I died after the thud",
            created_at=datetime.today(),
            updated_at=datetime.today(),
            username="barry",
        )
    )

    comments.append(
        Comment(
            userId=1,
            postId=8,
            comment="I smell bs, how did you write that comment then?",
            created_at=datetime.today(),
            updated_at=datetime.today(),
            username="Demo",
        )
    )

    comments.append(
        Comment(
            userId=2,
            postId=7,
            comment="RIP 🙏",
            created_at=datetime.today(),
            updated_at=datetime.today(),
            username="marnie",
        )
    )

    for comment in comments:
        db.session.add(comment)

    db.session.commit()


def undo_comments():
    db.session.execute(text("TRUNCATE comments RESTART IDENTITY CASCADE;"))
    db.session.commit()
