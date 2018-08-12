from flask import (
    url_for,
    render_template,
    Blueprint,
    request,
)

chatroom = Blueprint('chatroom', __name__)


@chatroom.route('/chatroom')
def chatroom():
    return render_template('chatroom.html')
