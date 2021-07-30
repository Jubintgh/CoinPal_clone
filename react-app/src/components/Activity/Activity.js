import './Activity.css'
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getTransactions, deleteTransaction } from '../../store/transaction';

const Activity = () => {
    const { user } = useSelector((state) => state.session);
    const transactions = useSelector(state => state.transactions)
    const id = Number(user.id);

    const history = useHistory();
    const dispatch = useDispatch();

    //useEffets
    useEffect(() => {
      dispatch(getTransactions(id));
    }, [dispatch, id])
    
    //useStates
    const [errors, setErrors] = useState([]);
    const [transactionId, settransactionId] = useState(null)
    

    const onTransaction = async (e) => {
      e.preventDefault();

      settransactionId(e.target.value)

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
                    console.log(transactions, "this is transactions")
                    return (
                        <div key={transact.id} value={transact.id}>
                                <div>
                                    <p className={'transact_from_user'}>{transact.from_user_id}</p>
                                    <p className={'transact_to_user'}>{transact.to_user_id}</p>
                                </div>
                            <button onClick={() => onTransaction()}>delete</button>
                        </div>
                    )
                })
            }
        </div>
    )
}
  
  
export default Activity;