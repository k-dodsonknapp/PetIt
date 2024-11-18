from flask.cli import AppGroup
from .communities import seed_communities, undo_communities
from .posts import seed_posts, undo_posts
from .users import seed_users, undo_users
from .comments import seed_comments, undo_comments
from .votes import seed_votes, undo_seed_votes
from .seed_decorator import check_data_in_session
# from .votes_comments import seed_comment_votes, undo_comment_votes

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
# @check_data_in_session
def seed():
    print('THIS FIRST')
    # seed_users()
    # # Add other seed functions here
    # seed_posts()
    # seed_comments()
    # # seed_comment_on_comments()
    # seed_votes()
    # # seed_comment_votes()
    # seed_communities()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    # Add other undo functions here
    undo_posts()
    undo_comments()
    # undo_comment_on_comments()
    undo_seed_votes()
    # undo_comment_votes()
    undo_communities()