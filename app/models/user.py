from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    first_name = db.Column(db.VARCHAR(255), nullable=False)
    last_name = db.Column(db.VARCHAR(255), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    img_url = db.Column(db.VARCHAR, nullable=False)
    created_at = db.Column(db.DateTime)

    user_cryptowallet = db.relationship("CryptoWallet", uselist=False, back_populates="user")

    user_requests_from = db.relationship(
        "Friend",
        foreign_keys="Friend.from_user_id",
        backref="from_requests",
        cascade="delete, merge, save-update"
    )
    user_requests_to = db.relationship(
        "Friend",
        foreign_keys="Friend.to_user_id",
        backref="to_requests",
        cascade="delete, merge, save-update"
    )

    from_user_transactions = db.relationship(
        "Transaction",
        foreign_keys="Transaction.from_user_id",
        backref="from_transactions",
        cascade="merge, save-update"
    )

    to_user_transactions = db.relationship(
        "Transaction",
        foreign_keys="Transaction.to_user_id",
        backref="to_transactions",
        cascade="merge, save-update"
    )

    messages = db.relationship("Message", back_populates="user", cascade="delete, merge, save-update")
    
    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'img': self.img_url
        }