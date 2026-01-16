from app.extensions import db
from flask import Blueprint, request, make_response
from app.model import User
from app.forms import LoginForm, SignUpForm
from flask_login import current_user, login_user, logout_user
from flask_wtf.csrf import generate_csrf
from app.utils.csrf import require_csrf

auth_bp = Blueprint("auth", __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


@auth_bp.route("/r", methods=["GET"])
def refresh_csrf():
    token = generate_csrf()

    response = make_response({"ok": True})

    response.set_cookie(
        "csrf_token",
        token,
        httponly=False,
        secure=False,
        samesite="Lax",
        path="/",
    )

    return response


@auth_bp.route("/")
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {"errors": ["Unauthorized"]}


@auth_bp.route("/login", methods=["POST"])
@require_csrf
def login():
    data = request.get_json(silent=True) or {}
    form = LoginForm(data=data)

    if form.validate():
        user = User.query.filter(User.email == form.data["email"]).first()
        login_user(user)
        # return user.to_dict()
        return {}

    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


@auth_bp.route("/logout")
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {"message": "User logged out"}


@auth_bp.route("/signup", methods=["POST"])
@require_csrf
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()

    user = User(
        username=form.data["username"],
        email=form.data["email"],
        password=form.data["password"],
    )
    db.session.add(user)
    db.session.commit()
    login_user(user)
    return user.to_dict()


@auth_bp.route("/unauthorized")
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {"errors": ["Unauthorized"]}, 401
