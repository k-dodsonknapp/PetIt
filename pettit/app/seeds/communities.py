from app.models import db, Communities


def seed_communities():

    community1 = Communities(
        community_name='Crabs', 
        community_description='All about crustaceans.',
    )
    community2 = Communities(
        community_name='Armidillos', 
        community_description='All about the rolly pooley ollies that are Armidillos.',
    )
    community3 = Communities(
        community_name='Sugar Gliders', 
        community_description='All about the flying fur balls that are Sugar Gliders.',
    )
    community4 = Communities(
        community_name='Dogs', 
        community_description='All about humans best friend.',
    )
    community5 = Communities(
        community_name='Cats', 
        community_description='We think we domesticated them but in reality they have trained us! All about pooty cats.',
    )
    community6 = Communities(
        community_name='Giraffe', 
        community_description='These walking trees is the topic of convo, hear all about Giraffes.',
    )
    community7 = Communities(
        community_name='Squirrel', 
        community_description='These nutty guys are all the rage. All about squirrels!',
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