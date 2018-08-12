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


@users.route('/signin')
def signin():
    return render_template('signin.html')


@users.route('/user/new', methods=['POST'])
def register():
    """
    接受注册信息, 写入数据库
    """
    # 获取注册相关数据
    form = dict()
    for k, v in request.form.items():
        form[k] = v

    # 执行注册数据
    user, result = User.register(form)
    log('Register result:', result, user)

    #  注册结果失败则返回到注册页面, 成功则自动登陆
    if result == '注册成功':
        log(f'自动登陆用表单\n{form}')
        form = dict(
            session_id=uuid.uuid4().hex,
            user_id=user.id,
        )
        s = Session.new(form)

        generate_csrf_token(user)
        response = make_response(redirect(url_for('routes.public.index')))
        response.set_cookie('session_id', s.session_id)
        return response
    else:
        return redirect(url_for('.loginfo', result=result, target=url_for('routes.user.login')))


@users.route('/login/view')
def login_view():
    """
    登录页面
    """
    # 生成4位数验证码
    code = str(randint(1000, 9999))
    # 将验证码内容的hash作为图片的文件名
    sha256_code = hashlib.sha256(code.encode('ascii')).hexdigest()
    filename = '{}.png'.format(sha256_code)
    # 如果曾经生成过就直接调用, 否则生成图片
    if os.path.exists(filename):
        filepath = 'static/code/{}'.format(filename)
    else:
        filepath = verify_code(code, sha256_code)

    result = request.args.get('result', '')

    return render_template('login.html', result=result, code=filepath)


@users.route('/login/valid', methods=['POST'])
def login_valid():
    """
    验证登陆数据
    """
    # 接收POST数据
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
        return redirect(url_for('.log_info', result='验证码不正确', target=url_for('.login_view')))
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
        # 生成csrf令牌
        u = current_user()
        if u.id > 0:
            generate_csrf_token()
            log('更新CSRF令牌')

    log('USER\n{}'.format(u.username))
    response = make_response(redirect(url_for('.log_info', result=result, target=url_for('routes.public.index'))))
    if session_id is not None:
        response.set_cookie('session_id', session_id)
    return response


@users.route('/logout')
def logout():
    """
    注销登录用
    :return: 重定向到首页
    """
    response = make_response(redirect(url_for('routes.public.index')))
    # 清除session_id
    response.set_cookie('session_id', ' ')
    return response


@users.route('/loginfo')
def log_info():
    """
    用于显示注册结果
    :return:
    """
    result = request.args.get('result', '')
    target = request.args.get('target', url_for('routes.public.index'))
    return render_template('log_info.html', alert=result, target=target)
