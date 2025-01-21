from . import (
    auth_bp,
    user_bp,
    post_bp,
    comment_bp,
    votes_bp,
    image_bp,
    community_bp,
    frontend_bp,
)

def register_routes(app):
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(user_bp, url_prefix='/api/users')
    app.register_blueprint(post_bp, url_prefix='/api/posts')
    app.register_blueprint(comment_bp, url_prefix='/api/comments')
    app.register_blueprint(votes_bp, url_prefix='/api/votes')
    app.register_blueprint(image_bp, url_prefix='/api/images')
    app.register_blueprint(community_bp, url_prefix='/api/communities')
    app.register_blueprint(frontend_bp)