import time
import uuid
from functools import wraps
from flask import request, abort
from models.csrf import Csrf
from models.session import Session
from models.user import User
from utils import log


def current_user():
    if 'session_id' in request.cookies:
        session_id = request.cookies.get('session_id', 'guest')
        session = Session.one(session_id=session_id)
        if session is not None:
            user_id = session.user_id
            user = User.one(id=user_id)
            return user
        else:
            return User.guest()
    else:
        return User.guest()


def generate_csrf_token(u=None):
    if u is None:
        u = current_user()
    token = Csrf.one(user_id=u.id)
    csrf_token = uuid.uuid4().hex
    if token is None:
        form = dict(
            csrf_token=csrf_token,
            user_id=u.id
        )
        Csrf.new(form)
    else:
        Csrf.update(token.id, csrf_token=csrf_token)


def login_required():
    log('login_required')
    u = current_user()
    return not u.is_guest()


def turn_to_dict():
    form = dict()
    for k, v in request.form.items():
        form[k] = v
    return form


def timeformat(times):
    time_format = '%Y/%m/%d %H:%M:%S'
    value = time.localtime(times)
    formatted = time.strftime(time_format, value)
    return formatted


def csrf_valid_get(f):
    @wraps(f)
    def valid(*args, **kwargs):
        u = current_user()
        token = request.args.get('csrf', '')
        if Csrf.one(csrf_token=token) is not None and Csrf.one(csrf_token=token).user_id == u.id:
            return f(*args, **kwargs)
        else:
            abort(401)

    return valid


def csrf_valid_post(f):
    @wraps(f)
    def valid(*args, **kwargs):
        u = current_user()
        token = request.form.get('csrf', '')
        if Csrf.one(csrf_token=token) is not None and Csrf.one(csrf_token=token).user_id == u.id:
            return f(*args, **kwargs)
        else:
            abort(401)

    return valid


def csrf_token_create(u):
    if not u.is_guest():
        token = Csrf.one(user_id=u.id).csrf_token
    else:
        token = ''

    return token
