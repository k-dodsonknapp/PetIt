import os
from flask import Flask, request, redirect
from flask_cors import CORS
from flask_wtf.csrf import generate_csrf

from app.model import User
from app.seeds import seed_commands
from .config import Config
from app.routes.routes import register_routes
from .extensions import db, migrate, login_manager, csrf

from dotenv import load_dotenv

load_dotenv()

def create_app(config_class=Config):
    static_folder = os.path.join(os.path.dirname(os.path.abspath(__file__)), "../react-app/build")
    app = Flask(__name__, static_folder=static_folder, static_url_path='/')
    app.config.from_object(config_class)

    CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

    app.cli.add_command(seed_commands)

    # Bind extensions to the app
    db.init_app(app)
    migrate.init_app(app, db)
    login_manager.init_app(app)
    csrf.init_app(app)

    login_manager.login_view = 'auth.unauthorized'

    @login_manager.user_loader
    def load_user(id):
        return User.query.get(int(id))

    register_routes(app)

    # Handle redirect to HTTPS in production
    @app.before_request
    def https_redirect():
        if os.environ.get('FLASK_ENV') == 'production':
            if request.headers.get('X-Forwarded-Proto') == 'http':
                url = request.url.replace('http://', 'https://', 1)
                return redirect(url, code=301)

    # Inject CSRF token for security
    @app.after_request
    def inject_csrf_token(response):
        response.set_cookie(
            'csrf_token',
            generate_csrf(),
            secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
            samesite='Strict' if os.environ.get('FLASK_ENV') == 'production' else None,
            httponly=True)
        return response    

    return app
