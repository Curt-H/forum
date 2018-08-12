from flask import (
    url_for,
    render_template,
    Blueprint,
    request,
)

chat = Blueprint('chatroom', __name__)


@chat.route('/chatroom')
def chatroom():
    return render_template('chatroom.html')
