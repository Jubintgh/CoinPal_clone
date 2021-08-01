import './Transaction.css'
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAllTransactions, postTransaction } from '../../store/transaction';

const MyWallet = () => {
    const { userId } = useParams();

    
    const { user } = useSelector((state) => state.session);


    const id = Number(user.id);
    const history = useHistory();
    const dispatch = useDispatch();

    //useEffets
    useEffect(() => {
      dispatch(getAllTransactions(id));
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
          let errs = Object.keys(result.errors)
          setErrors(errs)
        } else {
          history.push('/');
        }
      } 
    }

    return (
        <form onSubmit={onTransaction}>
            {errors && errors.forEach(err => (
              <li>{err}</li>
            ))}
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
                    <option value='USDCoin'>USD coin</option>
                </select>
            </div>
            
            <button>Send</button>
        </form>
    );
}
  
  
export default MyWallet;
  