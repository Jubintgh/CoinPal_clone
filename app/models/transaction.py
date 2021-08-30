import datetime
from typing import DefaultDict
from .db import db
from .user import User
from .crypto_wallet import CryptoWallet


class Transaction(db.Model):
    __tablename__ = 'transactions'

    id = db.Column(db.Integer, primary_key=True)
    from_user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    to_user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    amount = db.Column(db.DECIMAL, nullable=False)
    transaction_status = db.Column(db.Integer, nullable=False)
    crypto_type = db.Column(db.VARCHAR, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow())


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
            'transaction_id': ((self.id + 235) * 2000000),
            'from_username': from_user_username,
            'to_username': to_user_username,
            'amount': str(self.amount),
            'transaction_status': self.transaction_status,
            'crypto_type': self.crypto_type,
            'date': {   
                        'month' : self.created_at.month,
                        'day' : self.created_at.day,
                        'year' : self.created_at.year,
                    }
        }