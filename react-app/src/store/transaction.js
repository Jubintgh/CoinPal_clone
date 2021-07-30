//constants
const SET_TRANSACTION = 'transaction/SET_TRANSACTION';
const REMOVE_TRANSACTION = 'transaction/REMOVE_TRANSACTION';

const setTransaction = (transaction) => ({
    type: SET_TRANSACTION,
    payload: transaction
})

const removeTransaction = (transactionId) => ({
    type: REMOVE_TRANSACTION,
    payload: transactionId
})

export const getTransactions = (userId) => async (dispatch) => {
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

        dispatch(setTransaction(data.transactions))
    }
}


export const postTransaction = (userId, transaction) => async (dispatch) => {
    console.log(transaction)
    const response = await fetch(`/api/transactions/${userId}/type/pay`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "from_user_id": transaction.fromUserId,
            "to_username": transaction.toUser,
            "amount": transaction.amount,
            "crypto_type": transaction.cryptoType
        })
    });
    if (response.ok){
        const data = await response.json();
        if(data.error){
            return;
        }

        dispatch(setTransaction(data))
    }
}

// export const deleteTransaction = (userId, transactionId) => async (dispatch) => {
//     const response = await fetch(`/api/transactions/${userId}/transactions/${transactionId}`, {
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     });
//     if (response.ok){
//         const data = await response.json();
//         if(data.error){
//             return;
//         }
//         dispatch(removeTransaction(data))
//     }
// }

const initialState = {}

export default function reducer(state = initialState, action){
    let newState;
    switch(action.type){
        case SET_TRANSACTION:
            return { 
                ...state,
                ...action.payload
            }
        // case REMOVE_TRANSACTION:
        //     newState = { ...state };
        //     delete newState[action.payload]
        //     return newState
        default:
            return state
    }
}