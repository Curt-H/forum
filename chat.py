from flask import session
from flask_socketio import (
    emit,
    join_room,
    leave_room,
    SocketIO
)

from routes import current_user

socketio = SocketIO()

# from chat import socketio

"""
socketio 是对 websocket 的封装
在 socketio 中, 客户端连接的时候可以指定一个 namespace
如果不指定, 就是默认的 namespace (也就是 /)
有相同的 namespace 才能互相广播发送数据

除了 namespace 还有 room 的概念
用 join_room 来加入一个 room
用 leave_room 来退出一个 room

emit 发送数据可以让相同的 room 里面的连接收到信息
"""


@socketio.on('join', namespace='/chatroom')
def join(data):
    print('join', data)
    room = data['room']
    join_room(room)
    session['room'] = room
    u = current_user()
    message = f'用户:({u.username}) 进入了房间'
    d = dict(
        message=message,
    )
    emit('status', d, room=room)


@socketio.on('send', namespace='/chatroom')
def send(data):
    u = current_user()
    message = data.get('message')
    formatted = '{} : {}'.format(u.username, message)
    print('send', formatted)
    d = dict(
        message=formatted
    )
    room = session.get('room')
    emit('message', d, room=room)


@socketio.on('leave', namespace='/chatroom')
def leave(data):
    room = session.get('room')
    leave_room(room)
    u = current_user()
    d = dict(
        message='{} 离开了房间'.format(u.username),
    )
    emit('status', d, room=room)
