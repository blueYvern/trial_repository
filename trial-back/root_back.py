from flask import Flask,jsonify,request
from flask_cors import CORS
from tab_views import tabs #tabs blueprint

app = Flask(__name__)
CORS(app) #Enable CORS for all routes

#register blueprint
app.register_blueprint(tabs,url_prefix='/get_tab')



@app.route('/api/data/', methods=['GET'])
def get_data():
    return jsonify({"message":"Hello from Flask!"})

@app.route('/api/data/', methods=['POST'])
def post_data():
    data = request.get_json()
    return jsonify({"received":data})



















if __name__ == '__main__':
    #app.run(debug=True)
    app.run(host='0.0.0.0', port=5000, debug=True)