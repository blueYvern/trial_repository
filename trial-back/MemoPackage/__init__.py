from flask import Blueprint

# Create a Blueprint object
memos_blueprint = Blueprint('memos', __name__)

from . import routes