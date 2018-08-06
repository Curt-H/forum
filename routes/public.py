from flask import (
    Blueprint,
    render_template,
)

from models.topics import Topic
from routes import current_user
from utils import log

public = Blueprint(__name__, 'public')


@public.route('/')
def index():
    u = current_user()
    topics = Topic.all()
    log('TOPICS OBJECT\n{}'.format(topics))
    return render_template('index.html', topics=topics, user=u)
