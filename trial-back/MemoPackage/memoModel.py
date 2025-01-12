from BasePackage import db,limiter

memo_limiter = limiter

class Memo(db.Model):
    __tablename__ = 'records_demo'  # Optional: Explicit table name
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    created_date = db.Column(db.String(50), nullable=False)  # Date of creation
    target_date = db.Column(db.String(50), nullable=False)   # Target completion date
    status = db.Column(db.String(50), nullable=False)  # Status (e.g., open, completed)
    persistence = db.Column(db.String(50), nullable=False)  # Persistence (e.g., daily, monthly, yearly)
    completed_date = db.Column(db.String(50), nullable=True)  # Completion date (nullable for "open" status)
    
    def __repr__(self):
        return f'<Memo {self.title}>'
