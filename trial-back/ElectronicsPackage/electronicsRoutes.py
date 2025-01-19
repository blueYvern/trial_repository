from .inventoryService import InventoryService,inventory_limiter

from flask import request, jsonify
from flask import Blueprint

# Create the Blueprint object (only once)
electronics_blueprint = Blueprint('inventory', __name__)


# CREATE
@electronics_blueprint.route('/add_inventory/', methods=['POST'])
def add_inventory():
    try:
        if InventoryService.addToInventory(component=request.get_json()):
            return jsonify({'message': 'Inventory created successfully'}), 201

        return jsonify({'message': 'Inventory creation failed'}), 201

    except Exception as e:
        return jsonify({'message': str(e)}), 500


# READ
@electronics_blueprint.route('/get_inventory/', methods=['GET'])
def get_all_inventory():
    inventory = InventoryService.getAllInventory()
    return jsonify([
        {
            'id': item.id,
            'name': item.name,
            'quantity': item.quantity,
            'category': item.category
        }
        for item in inventory
    ]),200

@electronics_blueprint.route('/get_inventory_count/', methods=['GET'])
def get_all_inventory_count():
    inventory = InventoryService.getInventoryCount()
    return jsonify(inventory),200

# UPDATE

# DELETE