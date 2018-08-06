from sqlalchemy import Column, String, Integer
from models.base_model import ModelMixin, db


class Csrf(ModelMixin, db.Model):
    csrf_token = Column(String(32), nullable=False)
    user_id = Column(Integer, nullable=False)
