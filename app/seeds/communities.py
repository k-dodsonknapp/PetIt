from app.model import Communities
from app.extensions import db


def seed_communities():

    community1 = Communities(
        community_name='Crabs', 
        community_type='Public',
    )
    community2 = Communities(
        community_name='Armidillos', 
        community_type='Public',
    )
    community3 = Communities(
        community_name='Sugar Gliders', 
        community_type='Public',
    )
    community4 = Communities(
        community_name='Dogs', 
        community_type='Public',
    )
    community5 = Communities(
        community_name='Cats', 
        community_type='Public',
    )
    community6 = Communities(
        community_name='Giraffe', 
        community_type='Public',
    )
    community7 = Communities(
        community_name='Squirrel', 
        community_type='Public',
    )
    
    db.session.add(community1)
    db.session.add(community2)
    db.session.add(community3)
    db.session.add(community4)
    db.session.add(community5)
    db.session.add(community6)
    db.session.add(community7)

    db.session.commit()


def undo_communities():
    db.session.execute('TRUNCATE communities RESTART IDENTITY CASCADE;')
    db.session.commit()