from .db import db


class Friend(db.Model):
    __tablename__='friends'

    from_user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    to_user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    status = db.Column(db.Boolean, default=0, nullable=False)

    from_user = db.relationship('User', foreign_keys="Friend.from_user_id")
    to_user = db.relationship('User', foreign_keys="Friend.to_user_id")
    to_user = db.relationship(
        "User",
        primaryjoin="and_(Friend.from_user_id == foreign(User.id)), "
                    "Friend.to_user_id == User.id"
    )