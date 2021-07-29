from flask import Blueprint, jsonify, request
from flask.wrappers import Request
from flask_login import login_required
from app.models import User, Transaction, db
from app.forms import SignUpForm
from decimal import Decimal

transaction_routes = Blueprint('transactions' ,__name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@transaction_routes.route('/<int:id>')
# @login_required
def get_transactions(id):
    """
    returns a list of user transaction objects
    """

    transactions = Transaction.query.filter(Transaction.from_user_id == id).all()


    return {'transactions': [user_transaction.to_dict() for user_transaction in transactions]}


@transaction_routes.route('/<int:id>/<tansaction_t>', methods=['POST'])
# @login_required
def post_transactions(id, tansaction_t):
    """
    creates a new transaction record
    """

    transaction_type = tansaction_t

    if transaction_type == 'pay':
        from_user_id = int(request.json['from_user_id'])
        to_user_id = int(request.json['to_user_id'])

    elif transaction_type == 'request':
        to_user_id = int(request.json['from_user_id'])
        from_user_id = int(request.json['to_user_id'])

        from_user_id = int(request.json['from_user_id'])
        to_user_id = int(request.json['to_user_id'])
    amount = Decimal(request.json['amount'])
    transaction_status = 0 #0 : pending 1:accepted 2: rejected
    crypto_type = request.json['crypto_type']

    new_transaction = Transaction(
        from_user_id,
        to_user_id,
        amount,
        transaction_status,
        crypto_type,
    )
    
    db.session.add(new_transaction)
    db.session.commit()

    return {'transactions': [new_transaction.to_dict()]}


# @transaction_routes.route('/<int:id>/pay', methods=['PUT'])
# # @login_required
# def get_transactions(id):
#     """
#     updates an existing transaction record
#     """

#     user = User.query.get(id)
#     transaction_id = request.json['transactionId']

#     transaction = Transaction.query.get(transaction_id)

#     transaction

    # return {'transactions': [user_transaction.to_dict() for user_transaction in all_transactions]}/


# @transaction_routes.route('/<int:id>', methods=['DELETE'])
# # @login_required
# def get_transactions(id):
#     """
#     deletes an existing transaction record that belongs to the current logged in user
#     """

#     transaction_id = request.json['transactionId']

#     user = User.query.get(id)
#     transaction = Transaction.query.get(transaction_id)

#     return {'transaction': 'successfully deleted'}