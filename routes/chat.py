from flask import (
    url_for,
    render_template,
    Blueprint,
    request,
    session,
)
from routes import current_user
from utils import log

chat = Blueprint('chatroom', __name__)


@chat.route('/chatroom')
def chatroom():
    """
    聊天室首页
    """
    u = current_user()
    log(f'当前用户\n{u}')
    return render_template('chatroom.html', u=u)
