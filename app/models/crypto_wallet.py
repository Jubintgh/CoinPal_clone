from .db import db


class CryptoWallet(db.Model):
    __tablename__='cryptowallets'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    ethereum_balance = db.Column(db.DECIMAL, default=0, nullable=False)
    bitcoin_balance = db.Column(db.DECIMAL, default=0, nullable=False)
    tether_balance = db.Column(db.DECIMAL, default=0, nullable=False)

    user = db.relationship(
        "User",
        back_populates="cryptowallet"
    )