from APP.BasePackage import db,limiter,logger


memo_limiter = limiter

class Memo(db.Model):
    __tablename__ = 'records_demo'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    created_date = db.Column(db.String(50), nullable=False)
    target_date = db.Column(db.String(50), nullable=False)
    status = db.Column(db.String(50), nullable=False)
    persistence = db.Column(db.String(50), nullable=False)
    completed_date = db.Column(db.String(50), nullable=True)
    
    def __repr__(self):
        return f'<Memo {self.title}>'
