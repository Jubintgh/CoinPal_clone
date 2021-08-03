import './Activity.css'
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAllTransactions, deleteTransaction, rejectTransaction} from '../../store/transaction';

const Activity = () => {
    const { user } = useSelector((state) => state.session);
    const transactions = useSelector(state => state.transactions['alltransactions'])
    const id = Number(user.id);

    const history = useHistory();
    const dispatch = useDispatch();

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
    
    //useStates
    const [errors, setErrors] = useState([]);

    const canCancel = (transaction) => {
      if((transaction.transaction_status === 3) && (transaction.from_user_id === id)) return true
      return false
    }
    const canReject = (transaction) => {
      if((transaction.transaction_status === 3) && (transaction.to_user_id === id)) return true
      return false
    }

    return(
        <div>
            {
              transactions && transactions.map((transact, idx) => {
                  return (
                    <div className="transaction__container" key={idx} value={transact.transaction_id}>
                            <div>
                                <p className={'transact_from_user'}>{transact.from_user_id}</p>
                                <p className={'transact_to_user'}>{transact.to_user_id}</p>
                                <p>{transact.amount}</p>
                                <p>{transact.transaction_status}</p>
                            </div>
                        <button style={{visibility: canCancel(transact) ? 'visible': 'hidden'}} onClick={() => cancelReq(id, transact.transaction_id)}>cancel request</button>
                        <button style={{visibility: canReject(transact) ? 'visible': 'hidden'}} onClick={() => rejectReq(id, transact.transaction_id)}>reject request</button>
                    </div>
                  )
              })
            }
        </div>
    )
}
  
  
export default Activity;