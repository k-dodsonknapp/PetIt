from crypt import methods
from flask import Blueprint, request
from app.models import Communities, Post, db


community_routes = Blueprint('communities', __name__)

@community_routes.route('/')
def get_communities():
    communities = Communities.query.all()

    return {'communities': [community.to_dict() for community in communities]}

@community_routes.route('/new', methods=["POST"])
def create_community():
    data = request.json

    community_name = data["community_name"]
    community_description = data["community_description"]

    new_community = Communities(
        community_name=community_name,
        community_description=community_description,
    )
    db.session.add(new_community)
    db.session.commit()

    return new_community.to_dict()

@community_routes.route('/edit/<int:id>', methods=["PUT"])
def update_community():
    data = request.json

    community = Communities.query.get(id)