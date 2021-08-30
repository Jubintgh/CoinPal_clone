from flask import Blueprint, request
from logging import info
from typing import DefaultDict
from flask.blueprints import Blueprint
import requests


external_market_routes = Blueprint('market', __name__)


# @external_market_routes.route('/search')
# def get_coin_info():

#     search = request.args.get('user')
#     url: 'https://api.coinranking.com/v2/search-suggestions?query=f{}'

#     url = "https://coinranking1.p.rapidapi.com/coin/1/history/7d"

#     headers = {
#         'x-rapidapi-host': "coinranking1.p.rapidapi.com",
#         'x-rapidapi-key': "8ed4d1f157mshd202dc98f1ce45cp1c9d02jsn0b6784e75f03"
#     }

#     response = requests.request("GET", url, headers=headers)

#     all_info = response.json()

#     # all_markets = [ {
    
#     # info['name']: {
#     #     'id': info['id'],
#     #     'marketShare': info['marketShare'],
#     #     'numberOfMarkets': info['numberOfMarkets'],
#     #     'rank': info['rank'],
#     #     'volume': info['volume'],
#     #     'description': info['description'],
#     #     'verified': info['verified'],
#     #     'iconUrl': info['iconUrl'],
#     # } for info in all_info['data']['exchanges']}]

#     return {'allMarkets': all_info}

@external_market_routes.route('/search')
def get_coin_info():

    search = request.args.get('crypto')
    url= f'https://api.coinranking.com/v2/search-suggestions?query={search}'

    headers = {
        'x-rapidapi-key': "8ed4d1f157mshd202dc98f1ce45cp1c9d02jsn0b6784e75f03"
    }

    response = requests.request("GET", url, headers=headers)

    res = response.json()

    return {'allMarkets': res}


@external_market_routes.route('/coins')
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
            'rank': info['rank'],
            'name': info['name'],
            'price': info['price'],
            'circulatingSupply': info['circulatingSupply'],
            'marketCap': info['marketCap'],
            'volume': info['volume'],
            'description': info['description'],
            'history': info['history'],
            'color': info['color'],
            'iconUrl': info['iconUrl'],

        } for info in all_info['data']['coins']}]

    if all_info['status'] == "success":
        return {'allCoins': all_coins}
    else:
        return {'erros': 'something went wrong with the server'}, 500

@external_market_routes.route('/info')
def get_markets():

    url = "https://coinranking1.p.rapidapi.com/exchanges"

    headers = {
        'x-rapidapi-host': "coinranking1.p.rapidapi.com",
        'x-rapidapi-key': "8ed4d1f157mshd202dc98f1ce45cp1c9d02jsn0b6784e75f03"
        }

    response = requests.request("GET", url, headers=headers)
    all_info = response.json()

    all_markets = [ {
    
    info['name']: {
        'id': info['id'],
        'marketShare': info['marketShare'],
        'numberOfMarkets': info['numberOfMarkets'],
        'rank': info['rank'],
        'volume': info['volume'],
        'description': info['description'],
        'verified': info['verified'],
        'iconUrl': info['iconUrl'],
    } for info in all_info['data']['exchanges']}]

    if all_info['status'] == "success":
        return {'allMarkets': all_markets}
    else:
        return {'erros': 'something went wrong with the server'}, 500