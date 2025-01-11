from flask import request, jsonify
from . import memos_blueprint
from .memoModel import db, Memo

# Create a new memo
@memos_blueprint.route('/', methods=['POST'])
def create_memo():
    data = request.get_json()
    new_memo = Memo(title=data['title'], content=data['content'])
    db.session.add(new_memo)
    db.session.commit()
    return jsonify({'message': 'Memo created!'}), 201

# Get all memos
@memos_blueprint.route('/', methods=['GET'])
def get_memos():
    memos = Memo.query.all()
    return jsonify([{'id': memo.id, 'title': memo.title, 'content': memo.content} for memo in memos])

# Get a single memo by ID
@memos_blueprint.route('/<int:id>', methods=['GET'])
def get_memo(id):
    memo = Memo.query.get_or_404(id)
    return jsonify({'id': memo.id, 'title': memo.title, 'content': memo.content})

# Update a memo by ID
@memos_blueprint.route('/<int:id>', methods=['PUT'])
def update_memo(id):
    memo = Memo.query.get_or_404(id)
    data = request.get_json()
    memo.title = data['title']
    memo.content = data['content']
    db.session.commit()
    return jsonify({'message': 'Memo updated!'})

# Delete a memo by ID
@memos_blueprint.route('/<int:id>', methods=['DELETE'])
def delete_memo(id):
    memo = Memo.query.get_or_404(id)
    db.session.delete(memo)
    db.session.commit()
    return jsonify({'message': 'Memo deleted!'})
