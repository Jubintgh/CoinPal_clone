from .db import db




class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    message_body = db.Column(db.VARCHAR(255), nullable=False)
    read_status = db.Column(db.Boolean, default=False, nullable=False)


    user = db.relationship("User", back_populates="messages")