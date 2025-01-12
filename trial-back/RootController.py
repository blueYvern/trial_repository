from MemoPackage.memoRoutes import memos_blueprint
from BasePackage import db,limiter
from flask import Flask
from flask_cors import CORS

import os

app = Flask(__name__)
CORS(app) 

db_path = "./resources/datastore/local_database.db"
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.abspath(db_path)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
limiter.init_app(app)

app.register_blueprint(memos_blueprint, url_prefix='/memos')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)