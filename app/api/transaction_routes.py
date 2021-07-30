import asyncio
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Transaction, CryptoWallet, db
from app.forms import SendFundsForm
from decimal import Decimal
from .user_routes import validation_errors_to_error_messages


transaction_routes = Blueprint('transactions' ,__name__)

def db_errors_to_error_messages(errtype, error):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    errorMessages.append(f'{errtype} : {error}')
    return errorMessages

# transaction algorithm
async def transact(amount, crypto_type, from_wallet, to_wallet):
    pending_amount = amount[0]

    if crypto_type == 'Bitcoin':
        if from_wallet.bitcoin_balance > pending_amount:
            from_wallet.bitcoin_balance = from_wallet.bitcoin_balance - pending_amount
            to_wallet.bitcoin_balance = to_wallet.bitcoin_balance + pending_amount
        else:
            return 2
        
        db.session.commit()

    elif crypto_type == 'Ethereum':
        if from_wallet.ethereum_balance > pending_amount:
            from_wallet.ethereum_balance = from_wallet.ethereum_balance - pending_amount
            to_wallet.ethereum_balance = to_wallet.ethereum_balance + pending_amount
        else:
            return 2

        db.session.commit()

    elif crypto_type == 'USDCoin':
        if from_wallet.usd_coin_balance > pending_amount:
            from_wallet.usd_coin_balance = from_wallet.usd_coin_balance - pending_amount
            to_wallet.usd_coin_balance = to_wallet.usd_coin_balance + pending_amount
        else:
            return 2

        db.session.commit()

    else:
        return 0

    return 1


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


@transaction_routes.route('/test', methods=['GET'])
def test():
    return {'test': current_user.is_authenticated}

@transaction_routes.route('/<int:id>/type/<filter_t>', methods=['POST'])
# @login_required
async def post_transactions(id, filter_t):
    """
    creates a new transaction record
    """
    new_transaction = Transaction()

    transaction_type = filter_t
    form = SendFundsForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        if transaction_type == 'pay':
            from_user_id = int(form.data['from_user_id'])

            """
            find id by username vvvvv
            """
            other_user = form.data['to_username']
            to_user_id = User.query.filter(User.username == other_user).first()
            to_user_id = to_user_id.id
            """
            find id by username ^^^^
            """

        elif transaction_type == 'request':
            to_user_id = int(form.data['from_user_id'])

            """
            find id by username vvvvv
            """
            other_user = form.data['to_username']
            to_user_id = User.query.filter(User.username == other_user).first()
            to_user_id = to_user_id.id
            """
            find id by username ^^^^
            """

        """
        grab other transaction data
        """
        amount = Decimal(form.data['amount']),
        transaction_status = 0, #0 : pending 1:accepted 2: rejected
        crypto_type = form.data['crypto_type']
    
        new_transaction = Transaction(
            from_user_id,
            to_user_id,
            amount,
            transaction_status, #0 : pending 1:accepted 2: rejected
            crypto_type
        )

        # processing transaction
        from_user_wallet = CryptoWallet.query.get(from_user_id)
        to_user_wallet = CryptoWallet.query.get(to_user_id)

        db.session.add(new_transaction)

        # return {'test': str(from_user_wallet.bitcoin_balance),
        #         'test2': str(amount[0])}
        status = await transact(amount, crypto_type, from_user_wallet, to_user_wallet)

        if status == 1:
            new_transaction.transaction_status = 1
            db.session.commit()
            return {'transactions': [new_transaction.to_dict()]}
        elif status == 2:
            return {'errors': db_errors_to_error_messages('Balance', 'insufficient funds')}, 200
    
    db.session.commit()
    new_transaction.transaction_status = 2

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