from flask import (
    url_for,
    render_template,
    Blueprint,
    request,
)

chatroom = Blueprint('chatroom', __name__)
