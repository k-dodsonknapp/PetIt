from .auth_routes import auth_bp
from .comment_routes import comment_bp
from .communities_routes import community_bp
from .image_routes import image_bp
from .post_routes import post_bp
from .user_routes import user_bp
from .vote_routes import votes_bp
from .frontend_routes import frontend_bp

# Expose blueprints for use elsewhere
__all__ = [
    "auth_bp",
    "comment_bp",
    "community_bp",
    "image_bp",
    "post_bp",
    "user_bp",
    "votes_bp",
    "frontend_bp",
]