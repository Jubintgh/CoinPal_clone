from .db import db


class CryptoWallet(db.Model):
    __tablename__='cryptowallets'

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True, nullable=False)
    ethereum_balance = db.Column(db.DECIMAL, default=0, nullable=False)
    bitcoin_balance = db.Column(db.DECIMAL, default=0, nullable=False)
    usd_coin_balance = db.Column(db.DECIMAL, default=0, nullable=False)


    user = db.relationship("User", back_populates="user_cryptowallet")