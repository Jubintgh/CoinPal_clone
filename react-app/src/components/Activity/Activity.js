import './Activity.css'
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAllTransactions, deleteTransaction, rejectTransaction} from '../../store/transaction';

const Activity = () => {
    const { user } = useSelector((state) => state.session);
    const transactions = useSelector(state => state.transactions['alltransactions'])
    const currUsername = useSelector(state => state.session.user.username) 
    const id = Number(user.id);

    const history = useHistory();
    const dispatch = useDispatch();

    //useStates
    const [errors, setErrors] = useState([]);
    const [switcher, setSwitcher] = useState(false);

    const cancelReq = async (id, transactionId) => {
      const result = await dispatch(deleteTransaction(id,transactionId))

      setSwitcher((prev) => !prev)

      if (result){
        if(result.errors){
          let errs = Object.keys(result.errors)
          setErrors(errs)
        } 
      } 
    }

    const rejectReq = async (id, transactionId) => {
      const result = await dispatch(rejectTransaction(id,transactionId))

      setSwitcher((prev) => !prev)
      
      if (result){
        if(result.errors){
          let errs = Object.keys(result.errors)
          setErrors(errs)
        } else {
          history.push('/');
        }
      } 
    }
    //useEffets
    useEffect(() => {
      dispatch(getAllTransactions(id));
    }, [dispatch, id, switcher])
    

    const canCancel = (transaction) => {
      console.log(currUsername)
      if((transaction.transaction_status === 3) && (transaction.from_username === currUsername)) return true
      return false
    }
    const canReject = (transaction) => {
      if((transaction.transaction_status === 3) && (transaction.to_username === currUsername)) return true
      return false
    }

    return(
        <div>
          {errors && errors.forEach(err => {
            <li>{err}</li>
          })}
            { transactions && transactions.map((transact, idx) => {
                  return (
                    <div className="Activity__main">
                      <div className="transaction__container" key={idx} value={transact.transaction_id}>
                          <p className='transaction__status'>{transact.transaction_status === 0 ? 'Pending': transact.transaction_status === 1 ? 'Completed' : transact.transaction_status === 2 ? 'Rejected' : transact.transaction_status === 3 ? 'Request' : 'Loading...'}</p>
                              <div>
                                  <p className={'transact_from_user'}>From: {transact.from_username}</p>
                                  <p className={'transact_to_user'}>To: {transact.to_username}</p>
                                  <p className={'transact_amount'}>Amount: {transact.amount}</p>
                                  <p className={'transact_type'}>Crypto: {transact.crypto_type}</p>
                              </div>
                          <button style={{visibility: canCancel(transact) ? 'visible': 'hidden'}} onClick={() => cancelReq(id, transact.transaction_id)}>cancel request</button>
                          <button style={{visibility: canReject(transact) ? 'visible': 'hidden'}} onClick={() => rejectReq(id, transact.transaction_id)}>reject request</button>
                      </div>
                    </div>
                  )
              })
            }
        </div>
    )
}
  
  
export default Activity;