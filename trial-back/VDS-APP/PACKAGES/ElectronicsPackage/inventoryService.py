from .inventoryModel import Inventory,inventory_limiter,db

class InventoryService:

    @staticmethod
    def getAllInventory():
        return Inventory.query.all()
    
    @staticmethod
    def getInventoryCount():
        return Inventory.query.count()
    
    @staticmethod
    def check_existing(name,category):
        component = Inventory.query.filter_by(name=name,category=category).first()
        if component:
            return True,component
        else:
            return False,None

    @staticmethod
    def addToInventory(component):
        newComp = Inventory(
            name=component['name'],
            quantity=component['quantity'],
            category=component['category'])

        present,data = InventoryService.check_existing(newComp.name,newComp.category)
        if present:
            # call the update method here
            pass
        else:
            db.session.add(newComp)
            db.session.commit()
        return True