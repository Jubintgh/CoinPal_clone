import './Transaction.css'
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAllTransactions, postTransaction } from '../../store/transaction';

const MyWallet = () => {
    const { user } = useSelector((state) => state.session);

    const id = Number(user.id);
    const history = useHistory();
    const dispatch = useDispatch();

    //useEffets
    useEffect(() => {
      getAllTransactions(id);
    }, [dispatch, id])
    
    //useStates
    const [errors, setErrors] = useState([]);
    const [toUserName, settoUserName] = useState(null)
    const [amount, setAmount] = useState(null)
    const [fromUserId, setFromUserId] = useState(String(id))
    const [cryptoType, setCryptoType] = useState('Bitcoin')
    
    const onTransaction = async (e) => {
      e.preventDefault();

      setFromUserId(id)

      const result = await dispatch(postTransaction(id, {
        "from_user_id": fromUserId,
        "to_username": toUserName,
        "amount": amount,
        "crypto_type": cryptoType
      }))
      if (result){
        if(result.errors){
          let errs = Object.values(result.errors)
          setErrors(errs)
          return
        } else {
          history.push('/');
        }
      }
    }

    return (
        <form onSubmit={onTransaction}>
            <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
            </div>
            <div className="send-crypto">
                <h3>Send Crypto!</h3>
                <input onChange={e => settoUserName(e.target.value)} placeholder='enter @username'/>
                <input onChange={e => setAmount(e.target.value)} placeholder='enter value'/>
                <select
                  onChange={e => setCryptoType(e.target.value)}
                >Select Crypto
                    <option value='Bitcoin'>Bitcoin</option>
                    <option value='Ethereum'>Ethereum</option>
                    <option value='USDCoin'>USD coin</option>
                </select>
            </div>
            
            <button type='submit'>Send</button>
        </form>
    );
}
  
  
export default MyWallet;
  