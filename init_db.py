from app import db
from app import configured_app

server = configured_app()
db.create_all(app=server)
