//constants
const SET_TRANSACTION = 'transaction/SET_TRANSACTION';
const REMOVE_TRANSACTION = 'transaction/REMOVE_TRANSACTION';

const setTransaction = (transaction) => ({
    type: SET_TRANSACTION,
    payload: transaction
})

const removeTransaction = (transaction) => ({
    type: REMOVE_TRANSACTION,
    payload: transaction
})

export const getTransaction = (transactionId)