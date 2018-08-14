import time

from flask import (
    Blueprint,
    render_template,
    redirect,
    url_for,
    request,
    make_response)

from models.csrf import Csrf
from models.reply import Reply
from models.topics import Topic
from routes import current_user, turn_to_dict, login_required, csrf_valid_get, csrf_valid_post, generate_csrf_token
from utils import log

detail = Blueprint('detail', __name__)


@detail.route('/topic/new')
def topic_new_view():
    valid = login_required()
    if not valid:
        return redirect(url_for('routes.user.signin', result='请先登录'))

    u = current_user()
    return render_template('new_topice_view.html', username=u.username)


@detail.route('/topic/new/add', methods=['POST'])
def topic_add():
    form = turn_to_dict()
    u = current_user()
    form['writer_id'] = u.id

    form['content'] = form['content']

    Topic.new(form)
    return redirect(url_for('public.index'))


@detail.route('/topic/<int:topic_id>')
def topic_content(topic_id):
    topic = add_read_num(topic_id)
    replys = Reply.all(topic_id=topic_id)
    u = current_user()
    if not u.is_guest():
        token = Csrf.one(user_id=u.id).csrf_token
    else:
        token = ''

    response = make_response(render_template('detail.html', topic=topic, replys=replys, user=u, token=token))
    return response


@detail.route('/topic/delete')
@csrf_valid_get
def topic_delete():
    topic_id = request.args['id']
    Topic.delete(topic_id)
    return redirect(url_for('public.index'))


@detail.route('/topic/edit')
@csrf_valid_get
def topic_edit():
    topic_id = request.args['id']
    topic = Topic.one(id=topic_id)
    u = current_user()
    if not u.is_guest():
        token = Csrf.one(user_id=u.id).csrf_token
    else:
        token = ''
    return render_template('edit.html', topic=topic, csrf=token)


@detail.route('/topic/edit/post', methods=['POST'])
@csrf_valid_post
def topic_update():
    u = current_user()

    form = turn_to_dict()
    topic_id = form.pop('id')
    form['writer_id'] = u.id
    form['update_time'] = time.time()

    log(form)
    Topic.update(topic_id, **form)

    return redirect(url_for('public.index'))


@detail.route('/reply/add', methods=['POST'])
def reply_add():
    u = current_user()

    form = turn_to_dict()
    form['writer_id'] = u.id

    Reply.new(form)
    return redirect(url_for('.topic_content', topic_id=form['topic_id'], _anchor='reply_form'))


def add_read_num(topic_id):
    topic = Topic.one(id=topic_id)
    log('TOPIC\n{}'.format(topic))
    log('CONTENT\n{}'.format(topic.content))
    read_num = topic.read_num + 1
    log('Reading num increase!')

    Topic.update(cls_id=topic.id, read_num=read_num)
    return Topic.one(id=topic_id)
