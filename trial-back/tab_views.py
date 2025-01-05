from flask import Blueprint,jsonify

tabs= Blueprint('tabs', __name__)

@tabs.route('/memos/')
def get_memos():
    return jsonify({"message":"Hello from memos"})

@tabs.route('/electronics/')
def get_electronics():
    return jsonify({"message":"Hello from electronics"})

@tabs.route('/codings/')
def get_codings():
    return jsonify({"message":"Hello from codings"})

@tabs.route('/entertainment/')
def get_entertainment():
    return jsonify({"message":"Hello from entertainment"})

@tabs.route('/docs/')
def get_docs(): 
    return jsonify({"message":"Hello from docs"})

@tabs.route('/health/')
def get_health():
    return jsonify({"message":"Hello from health"})

@tabs.route('/wealth/')
def get_wealth():
    return jsonify({"message":"Hello from wealth"})