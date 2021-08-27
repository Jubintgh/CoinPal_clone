from logging import info
from typing import DefaultDict
from flask.blueprints import Blueprint
import requests

url = "https://coinranking1.p.rapidapi.com/exchanges"

headers = {
    'x-rapidapi-host': "coinranking1.p.rapidapi.com",
    'x-rapidapi-key': "undefined"
    }

response = requests.request("GET", url, headers=headers)

external_market_routes = Blueprint('market', __name__)

def db_errors_to_error_messages(errtype, error):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    errorMessages.append(f'{errtype} : {error}')
    return errorMessages

@external_market_routes.route('/')
def get_coins():

    url = "https://coinranking1.p.rapidapi.com/coins"

    headers = {
        'x-rapidapi-host': "coinranking1.p.rapidapi.com",
        'x-rapidapi-key': "8ed4d1f157mshd202dc98f1ce45cp1c9d02jsn0b6784e75f03"
        }

    response = requests.request("GET", url, headers=headers)

    all_info = response.json()

    all_coins = [ {
        
        info['symbol']: {
            'id': info['id'],
            'marketCap': info['marketCap'],
            'rank': info['rank'],
            'price': info['price'],
            'circulatingSupply': info['circulatingSupply'],
            'description': info['description'],
            'history': info['history'],
            'marketCap': info['marketCap'],
            'name': info['name'],
            'volume': info['volume'],
            'color': info['color'],
            'iconUrl': info['iconUrl'],


        } for info in all_info['data']['coins']}]
        
    return {'allCoins': all_coins}