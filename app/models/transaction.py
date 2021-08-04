from .db import db
from .user import User



class Transaction(db.Model):
    __tablename__ = 'transactions'

    # def __init__(self, from_user_id, to_user_id, amount, transaction_status, crypto_type):
    #     self.from_user_id = from_user_id
    #     self.to_user_id = to_user_id
    #     self.amount = amount
    #     self.transaction_status = transaction_status
    #     self.crypto_type = crypto_type

    id = db.Column(db.Integer, primary_key=True)
    from_user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    to_user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    amount = db.Column(db.DECIMAL, nullable=False)
    transaction_status = db.Column(db.Integer, nullable=False)
    crypto_type = db.Column(db.VARCHAR, nullable=False)
    created_at = db.Column(db.DateTime)


    def to_dict(self):
        return {
            'transaction_id': self.id,
            'from_user_id': self.from_user_id,
            'to_user_id': self.to_user_id,
            'amount': str(self.amount),
            'transaction_status': self.transaction_status,
            'crypto_type': self.crypto_type
        }

    def front_end_to_dict(self):

        to_user_username = User.query.get(self.to_user_id)
        to_user_username = to_user_username.username
        from_user_username = User.query.get(self.from_user_id)
        from_user_username = from_user_username.username
        
        return{
            'transaction_id': self.id,
            'from_user_id': from_user_username,
            'to_user_id': to_user_username,
            'amount': str(self.amount),
            'transaction_status': self.transaction_status,
            'crypto_type': self.crypto_type
        }