from flask import Blueprint, jsonify, session, request
from .user_routes import login_required
from app.models import User, CryptoWallet, db
from app.forms import WalletAddFunds
import json
from decimal import Decimal
import decimal

wallet_routes = Blueprint('wallet', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@wallet_routes.route('/<int:id>')
# @login_required
def get_balance(id):
    """
    returns user's balance
    """
    user = User.query.get(id)


    bitcoin_balance = user.user_cryptowallet.bitcoin_balance
    ethereum_balance = user.user_cryptowallet.ethereum_balance
    usd_coin_balance = user.user_cryptowallet.usd_coin_balance
    total_balance = bitcoin_balance + ethereum_balance + usd_coin_balance

    total_json = {
        "bitcoin_balance": str(bitcoin_balance),
        "ethereum_balance": str(ethereum_balance),
        "usd_coin_balance": str(usd_coin_balance),
        "total_balance": str(total_balance)
    }

    return { 'wallet_balance': total_json}


# @wallet_routes.route('/<int:id>', methods=['PUT'])
# # @login_required
# def get_balance(id):
#     """
#     updates user's balance
#     """
#     user = User.query.get(id)
#     ex_bitcoin_balance = user.user_cryptowallet.bitcoin_balance
#     ex_ethereum_balance = user.user_cryptowallet.ethereum_balance
#     ex_usd_coin_balance = user.user_cryptowallet.usd_coin_balance

#     updated_bitcoin_balance = request.json['bitcoinBalance']
#     updated_ethereum_balance = request.json['etherBalance']
#     updated_usd_coin_balance = request.json['usd_coinBalance']

#     new_wallet_state = CryptoWallet()
#     new_wallet_state.bitcoin_balance = updated_bitcoin_balance 
#     new_wallet_state.ethereum_balance = updated_ethereum_balance 
#     new_wallet_state.usd_coin_balance = updated_usd_coin_balance 

#     bitcoin_balance = user.user_cryptowallet.bitcoin_balance
#     ether_balance = user.user_cryptowallet.ethereum_balance
#     usd_coin_balance = user.user_cryptowallet.usd_coin_balance

#     db.session.commit()

#     total_balance = bitcoin_balance + ether_balance + usd_coin_balance

#     total_json = {
#         "bitcoin_balance": str(bitcoin_balance),
#         "ether_balance": str(ether_balance),
#         "usd_coin_balance": str(usd_coin_balance),
#         "total_balance": str(total_balance)
#     }

#     return { 'wallet_balance': total_json}