from .memoService import MemoService,memo_limiter

from flask import request, jsonify
from flask import Blueprint

# Create the Blueprint object (only once)
memos_blueprint = Blueprint('memos', __name__)

# CREATE
@memos_blueprint.route('/create_memo/', methods=['POST'])
def create_new_memo():
    try:
        if MemoService.createMemo(memo=request.get_json()):
            return jsonify({'message': 'Memo created successfully'}), 201

        return jsonify({'message': 'Memo creation failed'}), 304

    except Exception as e:
        return jsonify({'message': str(e)}), 500

# READ
@memos_blueprint.route('/get_memos/open/', methods=['GET'])
def get_open_memos():
    memos = MemoService.getAllMemos()
    return jsonify([
        {
            'id': memo.id,
            'title': memo.title,
            'created_date': memo.created_date,
            'target_date': memo.target_date,
            'status': memo.status,
            'persistence': memo.persistence,
            'completed_date': memo.completed_date if memo.completed_date else None
        }
        for memo in memos if memo.status == 'open'
    ])

@memos_blueprint.route('/get_memos/completed/', methods=['GET'])
def get_completed_memos():
    memos = MemoService.getAllMemos()
    return jsonify([
        {
            'id': memo.id,
            'title': memo.title,
            'created_date': memo.created_date,
            'target_date': memo.target_date,
            'status': memo.status,
            'persistence': memo.persistence,
            'completed_date': memo.completed_date if memo.completed_date else None
        }
        for memo in memos if memo.status == 'completed'
    ])

@memos_blueprint.route('/get_memos/', methods=['GET'])
def get_all_memos_count():
    memos = MemoService.getAllMemosCount()
    return jsonify([memos])

# UPDATE
@memos_blueprint.route('/update_memo/', methods=['PUT'])
def update_memo():
    try:
        if MemoService.updateMemo(request.get_json()):
            return jsonify({'message': 'Memo updated successfully'}), 200

        return jsonify({'message': 'Memo update failed'}), 304

    except Exception as e:
        return jsonify({'message': str(e)}), 500

@memos_blueprint.route('/update_memo/<string:action>', methods=['PUT'])
def update_memo_action(action):
    try:
        if MemoService.updateMemoAction(request.get_json()):
            return jsonify({'message': 'Memo ' + action + ' successfully'}), 200

        return jsonify({'message': 'Memo ' + action + ' failed'}), 304

    except Exception as e:
        print(e)
        return jsonify({'message': str(e)}), 500

# DELETE
@memos_blueprint.route('/delete_memo/<int:memo_id>', methods=['DELETE'])
def delete_memo(memo_id):
    try:
        if MemoService.deleteMemo(memo_id):
            return jsonify({'message': 'Memo deleted successfully'}), 200

        return jsonify({'message': 'Memo deletion failed'}), 304

    except Exception as e:
        return jsonify({'message': str(e)}), 500
