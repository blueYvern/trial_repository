from flask import Flask,jsonify,request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

from MemoPackage import memos_blueprint

app = Flask(__name__)
CORS(app) #Enable CORS for all routes

# Configure the database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///memos.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize the database
db = SQLAlchemy(app)

#register blueprint
app.register_blueprint(memos_blueprint,url_prefix='/memos')

# Create the database (if not already created)
with app.app_context():
    db.create_all()


if __name__ == '__main__':
    #app.run(debug=True)
    app.run(host='0.0.0.0', port=5000, debug=True)