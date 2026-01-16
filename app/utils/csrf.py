from functools import wraps
from flask import request, abort
from flask_wtf.csrf import validate_csrf
from wtforms.validators import ValidationError

def require_csrf(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        cookie_token = request.cookies.get("csrf_token")
        header_token = request.headers.get("X-CSRFToken")

        if not cookie_token:
            abort(400, description="CSRF token missing from cookies")

        if not header_token:
            abort(400, description="CSRF token missing from header")

        if cookie_token != header_token:
            abort(400, description="CSRF token mismatch")

        try:
            validate_csrf(header_token)
        except ValidationError:
            abort(400, description="CSRF token invaild")

        return f(*args, **kwargs)
    
    return wrapper
