from time import time

from sqlalchemy import Column, String, Text, Integer

from models.base_model import ModelMixin, db
from models.user import User
from utils import log


class Topic(ModelMixin, db.Model):
    title = Column(String(50), nullable=False)
    content = Column(Text, nullable=False)
    writer_id = Column(Integer, nullable=False)
    create_time = Column(Integer, nullable=False, default=time())
    update_time = Column(Integer, nullable=False, default=time())
    read_num = Column(Integer, nullable=False, default=0)
    reply_num = Column(Integer, nullable=False, default=0)

    def writer_name(self):
        writer_id = self.writer_id
        user = User.one(id=writer_id)
        return user.username

    def writer_avatar(self):
        writer_id = self.writer_id
        user = User.one(id=writer_id)
        return user.avatar

    @classmethod
    def all_order(cls, order='reverse', **kwargs):
        if order == 'reverse':
            ms = cls.query.order_by(Topic.update_time.desc())
        else:
            ms = cls.query.order_by(Topic.update_time)
        ms = ms.filter_by(**kwargs).all()
        for i in ms:
            log('MS:', i.update_time)
        return ms
