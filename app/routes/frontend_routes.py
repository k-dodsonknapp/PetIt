import os
from flask import Blueprint, send_from_directory, current_app

frontend_bp = Blueprint('frontend', __name__)


@frontend_bp.route('/', defaults={'path': ''})
@frontend_bp.route('/<path:path>')
def serve_frontend(path):
    # Debugging: Log requested path and full static folder
    # print(f"Requested path: {path}")
    # print(f"Static folder: {current_app.static_folder}")

    # Serve the file if it exists; fallback to index.html
    return send_from_directory(current_app.static_folder, path or 'index.html')
