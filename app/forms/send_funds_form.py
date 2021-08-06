from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DecimalField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User

# def username_exists(form, field):
#     # Checking if username is already in use
#     to_username = field.data
#     user = User.query.filter(User.username == to_username).first()
#     if not user:
#         raise ValidationError('Username does not exist')

class SendFundsForm(FlaskForm):
    from_user_id = StringField('from_user', validators=[DataRequired()])
    to_username = StringField('to_username', validators=[DataRequired()])
    amount = DecimalField('Amount', places=8, validators=[DataRequired()])
    crypto_type = StringField('crypto_type', validators=[DataRequired()])