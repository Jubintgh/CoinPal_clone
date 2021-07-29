from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DecimalField
from wtforms.validators import DataRequired, Email, ValidationError
from .signup_form import username_exists
from app.models import Transaction


class SendFundsForm(FlaskForm):
    from_user_id = StringField('from_user', validators=[DataRequired(), username_exists])
    to_user_id = StringField('to_user', validators=[DataRequired(), username_exists])
    amount = DecimalField('Amount', places=8, validators=[DataRequired()])
    crypto_type = StringField('crypto_type', validators=[DataRequired()])