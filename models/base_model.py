from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String

db = SQLAlchemy()


class ModelMixin(object):
    id = Column(Integer, primary_key=True, nullable=False, autoincrement=True)

    @classmethod
    def new(cls, forms):
        m = cls()
        for name, value in forms.items():
            setattr(m, name, value)

        db.session.add(m)
        db.session.commit()
        return m

    @classmethod
    def update(cls, cls_id, **kwargs):
        m = cls.query.filter_by(id=cls_id).first()
        for name, value in kwargs.items():
            setattr(m, name, value)

        db.session.add(m)
        db.session.commit()
        return m

    @classmethod
    def all(cls, **kwargs):
        ms = cls.query.filter_by(**kwargs).all()
        return ms

    @classmethod
    def one(cls, **kwargs):
        ms = cls.query.filter_by(**kwargs).first()
        return ms

    @classmethod
    def delete(cls, cls_id):
        m = cls.query.filter_by(id=cls_id).first()

        db.session.delete(m)
        db.session.commit()


class SimpleUser(ModelMixin, db.Model):
    username = Column(String(50), nullable=False)
    password = Column(String(50), nullable=False)


if __name__ == '__main__':
    db.create_all()
    form = dict(
        username='123',
        password='456',
    )

    u1 = SimpleUser.new(form)
    u2 = SimpleUser.one(id=2)
    u3 = SimpleUser.all(password='456')

    print(u1)
    print(u2)
    print(u3)
