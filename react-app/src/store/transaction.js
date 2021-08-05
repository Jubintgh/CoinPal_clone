//constants
const GET_TRANSACTIONS = 'transaction/GET_TRANSACTIONS';
const SET_TRANSACTION = 'transaction/SET_TRANSACTION';
const UPDATE_TRANSACTION = 'transaction/UPDATE_TRANSACTION'
const REMOVE_TRANSACTION = 'transaction/REMOVE_TRANSACTION';

const getTransactions = (transactions) => ({
    type: GET_TRANSACTIONS,
    payload: transactions
})

const setTransaction = (transaction) => ({
    type: SET_TRANSACTION,
    payload: transaction
})

const updateTransaction = (transaction) => ({
    type: UPDATE_TRANSACTION,
    payload: transaction
})

const removeTransaction = (transactionId) => ({
    type: REMOVE_TRANSACTION,
    payload: transactionId
})

export const getAllTransactions = (userId) => async (dispatch) => {
    const response = await fetch(`/api/transactions/${userId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok){
        const data = await response.json();
        if(data.error){
            return;
        }
        dispatch(getTransactions(data.transactions))
    }
}


export const postTransaction = (type ,userId, transaction) => async (dispatch) => {
    const response = await fetch(`/api/transactions/${userId}/type/${type}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "from_user_id": transaction.from_user_id,
            "to_username": transaction.to_username,
            "amount": transaction.amount,
            "crypto_type": transaction.crypto_type
        })
    });
    if (response.ok){
        const data = await response.json();
        if(data.errors){
            return data;
        }
        await dispatch(setTransaction(data))
        return data
    }
}

export const rejectTransaction = (userId, transactionId) => async (dispatch) => {
    const response = await fetch(`/api/transactions/${userId}/reject`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "user_id": userId,
            "transaction_id": transactionId
        })
    });
    if (response.ok){
        const data = await response.json();
        if(data.error){
            return;
        }
        dispatch(updateTransaction(data))
    }
}

export const deleteTransaction = (userId, transactionId) => async (dispatch) => {
    const response = await fetch(`/api/transactions/${userId}/delete`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "transaction_id": transactionId
        })
    });
    if (response.ok){
        const data = await response.json();
        if(data.error){
            return;
        }
        dispatch(removeTransaction(data.success))
    }
}

const initialState = {}

export default function reducer(state = initialState, action){
    let newState;
    
    switch(action.type){
        case GET_TRANSACTIONS:
            return { 
                alltransactions:[...action.payload]
            }
        case SET_TRANSACTION:
            return { 
                ...state,
                alltransactions:[action.payload]
            }
        case UPDATE_TRANSACTION:
            return { 
                ...state,
                alltransactions:[action.payload]
            }
        case REMOVE_TRANSACTION:
            newState = { ...state };
            delete newState[action.payload]
            return newState
        default:
            return state
    }
}