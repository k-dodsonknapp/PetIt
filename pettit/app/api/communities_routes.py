from flask import Blueprint
from app.models import Communities, Post, db


community_routes = Blueprint('communities', __name__)

@community_routes.route('/')
def get_communities():
    communities = Communities.query.all()

    return {'communities': [community.to_dict() for community in communities]}