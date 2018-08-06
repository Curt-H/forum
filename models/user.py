import hashlib
from sqlalchemy import Column, String
from models.base_model import ModelMixin, db
from utils import log


class User(ModelMixin, db.Model):
    """
    User 是一个保存用户数据的 model
    现在只有两个属性 username 和 password
    """
    username = Column(String(32), nullable=False)
    password = Column(String(64), nullable=False)
    email = Column(String(32), nullable=True)
    avatar = Column(String(70), nullable=True, default='pic.png')
    sign = Column(String(128), nullable=True, default='这家伙很懒，什么个性签名都没有留下')
    role = Column(String(10), nullable=False, default='normal')

    @staticmethod
    def guest():

        form = dict(
            role='guest',
            username='游客',
            id=-1,
            password='guest',
            sign='请登录',
        )
        user_now = User()
        for name, value in form.items():
            setattr(user_now, name, value)
        return user_now

    def is_guest(self):
        return self.role == 'guest'

    @staticmethod
    def salted_password(password, salt='$!@><?>HUI&DWQa`'):
        """$!@><?>HUI&DWQa`"""
        salted = password + salt
        hash_password = hashlib.sha256(salted.encode('ascii')).hexdigest()
        return hash_password

    @classmethod
    def login(cls, form):
        salted = cls.salted_password(form.get('password', ''))
        u = User.one(username=form['username'], password=salted)
        if u is not None:
            result = '登录成功'
            return u, result
        else:
            result = '用户名或者密码错误'
            return User.guest(), result

    @classmethod
    def register(cls, form):
        valid = len(form['username']) > 2 and len(form['password']) > 2
        log(form['username'], form['password'])
        if valid:
            form['password'] = cls.salted_password(form['password'])
            u = User.new(form)
            result = '注册成功'
            return u, result
        else:
            result = '用户名或者密码长度必须大于2'
            return User.guest(), result
