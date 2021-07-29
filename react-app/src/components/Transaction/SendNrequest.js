import './Transaction.css'
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getTransactions, postTransaction } from '../../store/transaction';

const MyWallet = () => {
    const { userId } = useParams();

    
    const { user } = useSelector((state) => state.session);


    const id = Number(user.id);
    const history = useHistory();
    const dispatch = useDispatch();

    //useEffets
    useEffect(() => {
      dispatch(getTransactions(id));
    }, [dispatch, id])


    
    //useStates
    const [toUserName, settoUserName] = useState(null)
    const [amount, setAmount] = useState(null)
    const [fromUserId, setFromUserId] = useState(null)
    const [cryptoType, setCryptoType] = useState(null)
    
    const onTransaction = async (e) => {
      e.preventDefault();
      const result = await dispatch(postTransaction)
      if (result.data){
        history.push('/');
      }
    }
  
    return (
        <form onSubmit={onTransaction}>
            <p>{toUserName}</p>
            <div className="send-crypto">
                <h3>Send Crypto!</h3>
                <input onChange={e => settoUserName(e.target.value)} placeholder='enter @username'/>
                <input onChange={e => setAmount(e.target.value)} placeholder='enter value'/>
                <select
                  onChange={e => setCryptoType(e.target.value)}
                >Select Crypto
                    <option value='Bitcoin'>Bitcoin</option>
                    <option value='Ethereum'>Ethereum</option>
                    <option value='usdCoin'>USD coin</option>
                </select>
            </div>
        </form>
    );
}
  
  
export default MyWallet;
  