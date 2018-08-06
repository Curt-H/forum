import hashlib
import os
import uuid

from flask import (
    Blueprint,
    render_template,
    make_response,
    redirect,
    url_for,
    request)

from models.csrf import Csrf
from models.reply import Reply
from models.topics import Topic
from models.user import User
from routes import login_required, current_user, csrf_token_create, turn_to_dict, csrf_valid_post
from utils import log

profile = Blueprint(__name__, 'profile')


@profile.route('/user/<string:username>')
def profile_index(username):
    valid = login_required()
    can_edit = True

    if not valid:
        return redirect(url_for('routes.user.signin', result='请先登录'))

    user = User.one(username=username)
    log('USER:', user)
    user_id = user.id

    replys = Reply.all(writer_id=user_id)
    replys.reverse()
    topics = Topic.all_order(writer_id=user_id)
    return render_template('profile.html', user=user, replys=replys, topics=topics, can_edit=can_edit)


@profile.route('/profile/edit', methods=['GET'])
def edit_profile():
    result = request.args.get('result', '')
    user_id = request.args['id']
    user = User.one(id=user_id)
    u = current_user()
    log('被编辑的用户:{}\n当前用户:{}'.format(user.id, u.id))

    token = csrf_token_create(u)

    render = render_template('edit_profile.html', token=token, user=user, result=result)
    response = make_response(render)
    return response


@profile.route('/profile/update', methods=['POST'])
@csrf_valid_post
def profile_update():
    form = turn_to_dict()
    log('form:\n{}'.format(form))
    form.pop('csrf')

    u = current_user()
    update_info = dict()
    action = form['action']

    if action == 'change_info':
        update_info['username'] = form['username']
        update_info['email'] = form['email']
        update_info['sign'] = form['sign']
        User.update(u.id, **update_info)
        return redirect(url_for('.profile_index', username=u.username))
    elif action == 'change_password':
        old_password = hashlib.sha256(form['old_pass'].encode('utf-8')).hexdigest()
        if u.password != old_password:
            return redirect(url_for('.edit_profile', id=u.id, result='密码错误'))

        new_password = hashlib.sha256(form['new_pass'].encode('utf-8')).hexdigest()
        update_info['password'] = new_password
        User.update(u.id, **update_info)
        return redirect(url_for('.profile_index', username=u.username))


@profile.route('/profile/avatar/update', methods=['POST'])
@csrf_valid_post
def profile_avatar_update():
    user_id = request.form['id']
    user = User.one(id=user_id)
    file = request.files['avatar']

    # 如果文件不是默认的头像, 则删除它
    if user.avatar != 'pic.png':
        os.remove('static/avatar/{}'.format(user.avatar))

    filename = '{}.{}'.format(uuid.uuid4().hex, 'png')
    path = 'static/avatar/{}'.format(filename)
    file.save(path)
    User.update(user_id, avatar=filename)

    return redirect(url_for('.profile_index', username=user.username))
