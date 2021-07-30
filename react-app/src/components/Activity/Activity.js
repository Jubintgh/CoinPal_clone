import './Activity.css'
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getTransactions, deleteTransaction } from '../../store/transaction';

const Activity = () => {
    const { user } = useSelector((state) => state.session);
    const transactions = useSelector(state => state.transactions['alltransactions'])
    const id = Number(user.id);

    const history = useHistory();
    const dispatch = useDispatch();

    //useEffets
    useEffect(() => {
      dispatch(getTransactions(id));
    }, [dispatch, id])
    
    //useStates
    const [errors, setErrors] = useState([]);

    const cancelReq = async (id, transactionId) => {
      const result = await dispatch(deleteTransaction(id,transactionId))
      
      if (result){
        if(result.errors){
          let errs = Object.keys(result.errors)
          setErrors(errs)
        } else {
          history.push('/');
        }
      } 
    }

    return(
        <div>
            {
                transactions && transactions.map(transact => {
                    return (
                        <div className="transaction__container" key={transact.transaction_id} value={transact.transaction_id}>
                                <div>
                                    <p className={'transact_from_user'}>{transact.from_user_id}</p>
                                    <p className={'transact_to_user'}>{transact.to_user_id}</p>
                                    <p>TRANSACTION ID::::{transact.transaction_id}</p>
                                </div>
                            <button style={{visibility: transact.transaction_status === 3 ? 'visible': 'hidden'}} onClick={() => cancelReq(id, transact.transaction_id)}>cancel request</button>
                        </div>
                    )
                })
            }
        </div>
    )
}
  
  
export default Activity;