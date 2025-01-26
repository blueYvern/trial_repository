from PACKAGES.MemoPackage.memoRoutes import memos_blueprint
from PACKAGES.ElectronicsPackage.electronicsRoutes import electronics_blueprint
from APP.BasePackage import db,limiter
from configparser import RawConfigParser


from flask import Flask
from flask_cors import CORS
import os

parser = RawConfigParser()
parser.read("../resources/config.properties")

db_path = parser.get('default', r'DATASOURCE')

app = Flask(__name__)
CORS(app) 

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + db_path
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
limiter.init_app(app)

app.register_blueprint(memos_blueprint, url_prefix='/memos')
app.register_blueprint(electronics_blueprint, url_prefix='/electronics')

if __name__ == '__main__':
    app.run()