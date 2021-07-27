from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Transaction

class RequestFundsForm(FlaskForm):
    pass