import uuid
import hashlib
import os
from verify_code import verify_code
from random import randint
from models.reply import Reply
from models.session import Session
from models.topics import Topic
from routes import login_required, generate_csrf_token, current_user
from utils import log
from flask import (
    Blueprint,
    render_template,
    request,
    url_for,
    redirect,
    make_response)
from models.user import User

users = Blueprint(__name__, 'users')


@users.route('/signup')
def signup():
    result = request.args.get('result', '')
    return render_template('sign_up.html', result=result)


@users.route('/signin')
def signin():
    code = str(randint(1000, 9999))
    sha256_code = hashlib.sha256(code.encode('ascii')).hexdigest()
    filename = '{}.png'.format(sha256_code)
    if os.path.exists(filename):
        filepath = 'static/code/{}'.format(filename)
    else:
        filepath = verify_code(code, sha256_code)

    result = request.args.get('result', '')
    u = current_user()
    if u.id > 0:
        generate_csrf_token()
    return render_template('sign_in.html', result=result, code=filepath)


@users.route('/user/new', methods=['POST'])
def register():
    form = dict()
    for k, v in request.form.items():
        form[k] = v

    user, result = User.register(form)
    log('Register result:', result, user)
    return redirect(url_for('.signup', result=result))


@users.route('/user/login', methods=['POST'])
def login():
    form = dict()
    for k, v in request.form.items():
        form[k] = v

    log('FORM\n{}'.format(form))

    # 验证验证码
    vcode = form['code']
    vcode = hashlib.sha256(vcode.encode('ascii')).hexdigest()
    vcode = 'static/code/{}.png'.format(vcode)
    img = form['img']
    if img != vcode:
        return redirect(url_for('.signin', result='验证码不正确'))
    form.pop('code')
    form.pop('img')

    session_id = None
    u, result = User.login(form)
    if not u.is_guest():
        session_id = uuid.uuid4().hex
        form = dict(
            session_id=session_id,
            user_id=u.id,
        )
        Session.new(form)
    log('USER\n{}'.format(u.username))
    response = make_response(redirect(url_for('.signin', result=result)))
    if session_id is not None:
        response.set_cookie('session_id', session_id)
    return response


@users.route('/logout')
def logout():
    response = make_response(redirect(url_for('routes.route_public.index')))
    response.set_cookie('session_id', ' ')
    return response
