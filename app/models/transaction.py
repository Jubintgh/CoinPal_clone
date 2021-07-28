from .db import db




class Transaction(db.Model):
    __tablename__ = 'transactions'


    id = db.Column(db.Integer, primary_key=True)
    from_user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    to_user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    amount = db.Column(db.DECIMAL, nullable=False)
    transaction_status = db.Column(db.Integer, nullable=False)
    crypto_type = db.Column(db.VARCHAR, nullable=False)
    created_at = db.Column(db.DateTime)