from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DecimalField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Transaction


class SendFundsForm(FlaskForm):
    from_user_id = StringField('from_user', validators=[DataRequired()])
    to_username = StringField('to_username', validators=[DataRequired()])
    amount = DecimalField('Amount', places=8, validators=[DataRequired()])
    crypto_type = StringField('crypto_type', validators=[DataRequired()])