from APP.BasePackage import db,limiter

inventory_limiter = limiter

class Inventory(db.Model):
    __tablename__ = 'inventory'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    category = db.Column(db.String(200), nullable=True)

    def __repr__(self):
        return '<Inventory %r>' % self.name