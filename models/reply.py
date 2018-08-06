from sqlalchemy import Column, Integer, Text
from models.base_model import ModelMixin, db
from models.user import User


class Reply(ModelMixin, db.Model):
    content = Column(Text, nullable=False)
    writer_id = Column(Integer, nullable=False)
    topic_id = Column(Integer, nullable=False)

    def writer_name(self):
        writer_id = self.writer_id
        user = User.one(id=writer_id)
        return user.username
