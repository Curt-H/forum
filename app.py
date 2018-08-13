from flask import Flask
from models.base_model import db
from routes.topics import detail
from routes.public import public
from routes.user import users
from routes.profile import profile
from routes.chat import chat
from utils import log
from routes import timeformat
from secret import user, password

from chat import socketio


def jinja_env(app):
    env = app.jinja_env
    env.filters['timeformat'] = timeformat
    return app


def configured_app():
    server = Flask(__name__)
    server.register_blueprint(public)
    server.register_blueprint(users)
    server.register_blueprint(detail)
    server.register_blueprint(profile)
    server.register_blueprint(chat)

    # flask sqlalchemy initialize
    database = 'mysql+pymysql://{}:{}@localhost/web?charset=utf8mb4'.format(user, password)

    server.config['SQLALCHEMY_DATABASE_URI'] = database
    server.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
    db.init_app(server)
    log('Successfully initialize the database')

    server = jinja_env(server)

    socketio.init_app(server)

    return server


if __name__ == '__main__':
    app = configured_app()
    # debug 模式可以自动加载你对代码的变动, 所以不用重启程序
    # host 参数指定为 '0.0.0.0' 可以让别的机器访问你的代码
    # app = Flask(__name__)
    # register_route(app)
    config = dict(
        debug=True,
        host='0.0.0.0',
        port=80,
    )
    socketio.run(app, **config)
