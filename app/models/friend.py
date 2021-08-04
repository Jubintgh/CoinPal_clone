from .db import db


class Friend(db.Model):
    __tablename__='friends'

    from_user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True, nullable=False)
    to_user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True, nullable=False)
    status = db.Column(db.Integer, default=0, nullable=False)

    def to_dict(self):
        return {
            'from_user_id': self.from_user_id,
            'to_user_id': self.to_user_id,
            'status': self.status
        }