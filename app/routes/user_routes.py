from flask import Blueprint
from flask_login import login_required
from app.model import User

user_bp = Blueprint('users', __name__)


@user_bp.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_bp.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()
