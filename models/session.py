from sqlalchemy import Column, String, Integer
from models.base_model import ModelMixin, db


class Session(ModelMixin, db.Model):
    session_id = Column(String(32), nullable=False)
    user_id = Column(Integer, nullable=False)
