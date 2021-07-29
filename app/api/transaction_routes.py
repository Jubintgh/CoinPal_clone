from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Transaction, db
from app.forms import SendFundsForm
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

    transactions_debit = Transaction.query.filter(Transaction.from_user_id == id).all()
    transactions_credit = Transaction.query.filter(Transaction.to_user_id == id).all()

    transactions_all = transactions_debit + transactions_credit

    return {'transactions': [user_transaction.to_dict() for user_transaction in transactions_all]}


@transaction_routes.route('/<int:id>/type/<filter_t>', methods=['POST'])
# @login_required
def post_transactions(id, filter_t):
    """
    creates a new transaction record
    """
    transaction_type = filter_t

    form = SendFundsForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        if transaction_type == 'pay':
            from_user_id = int(form.data['from_user_id'])
            to_user_id = int(form.data['to_user_id'])

        elif transaction_type == 'request':
            to_user_id = int(form.data['from_user_id'])
            from_user_id = int(form.data['to_user_id'])
    
        new_transaction = Transaction(
            from_user_id,
            to_user_id,
            amount = Decimal(form.data['amount']),
            transaction_status = 0, #0 : pending 1:accepted 2: rejected
            crypto_type = form.data['crypto_type']
        )

        db.session.add(new_transaction)
        db.session.commit()
        return {'transactions': [new_transaction.to_dict()]}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


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