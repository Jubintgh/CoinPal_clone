from .db import db




class Transaction(db.Model):
    __tablename__ = 'transactions'


    id = db.Column(db.Integer, primary_key=True)
    from_user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    to_user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    amount = db.Column(db.DECIMAL, nullable=False)
    transaction_status = db.Column(db.Integer, nullable=False)
    crypto_type = db.Column(db.VARCHAR, nullable=False)
    created_at = db.Column(db.DateTime)


    from_user = db.relationship('User', foreign_keys="Friend.from_user_id")
    to_user = db.relationship('User', foreign_keys="Friend.to_user_id")
    to_user = db.relationship(
        "User",
        primaryjoin="and_(Friend.from_user_id == foreign(User.id)), "
                    "Friend.to_user_id == foreign(User.id)"
    )