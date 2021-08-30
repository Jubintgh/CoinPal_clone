//constants
const GET_COINS = 'market/GET_COINS';
const GET_MARKETS = 'market/GET_MARKETS'

const getCoins = (coins) => ({
    type: GET_COINS,
    payload: coins
})

const getMarkets = (coins) => ({
    type: GET_MARKETS,
    payload: coins
})

export const getAllCoins = () => async (dispatch) => {
    const response = await fetch(`/api/markets/coins`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok){
        const data = await response.json();
        if(data.erros){
            return data.erros;
        }
        dispatch(getCoins(data.allCoins[0]))
    }
}

export const getAllMarkets = () => async (dispatch) => {
    const response = await fetch(`/api/markets/info`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok){
        const data = await response.json();
        if(data.erros){
            return data.erros;
        }
        dispatch(getMarkets(data.allMarkets[0]))
    }
}

const initialState = {}

export default function reducer(state = initialState, action){
    switch(action.type){
        case GET_COINS:
            return { 
                allCoins: action.payload
            }
        case GET_MARKETS:
            return { 
                allMarkets: action.payload
            }
        default:
            return state
    }
}