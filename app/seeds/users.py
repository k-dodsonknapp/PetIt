from app.model import User
from app.extensions import db
from app.seeds.seed_decorator import check_data_in_session
from uuid import uuid4 as uuid4

# Adds a demo user, you can add other users here if you want
# @check_data_in_session


def seed_users():

    demo = User(username='Demo', email='demo@aa.io', password='password')
    marnie = User(username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(username='bobbie', email='bobbie@aa.io', password='password')
    daphne = User(username='daphne', email='daphne@mail.come',
                  password='password')
    moose = User(username='moose', email='moose@mail.come',
                 password='password')
    barry = User(username='barry', email='barry@mail.come',
                 password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(daphne)
    db.session.add(moose)
    db.session.add(barry)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
