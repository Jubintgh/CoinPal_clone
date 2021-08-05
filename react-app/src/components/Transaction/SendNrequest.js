import './SendNrequest.css'
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
  const [type, setType] =useState('pay')
  
  const onTransaction = async (e) => {
    e.preventDefault();

    setFromUserId(id)

    const result = await dispatch(postTransaction(type, id, {
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
      <form className='transaction__form' onSubmit={onTransaction}>
          <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
          </div>
          <div className="send-crypto">
              <h3 className="fund__field">Send Crypto!</h3>
              <input className="user__name" onChange={e => settoUserName(e.target.value)} placeholder='enter @username'/>
              <input className="fund__input" onChange={e => setAmount(e.target.value)} placeholder='enter value'/>
              <p className="fund__field">Select Crypto type</p>
              <select
                className="fund__input"
                onChange={e => setCryptoType(e.target.value)}
              >Select Crypto
                  <option value='Bitcoin'>Bitcoin</option>
                  <option value='Ethereum'>Ethereum</option>
                  <option value='USDCoin'>USD coin</option>
              </select>
              <p className="fund__field">Transaction type</p>
              <select
                className="fund__input"
                onChange={e => setType(e.target.value)}
              >Select Transaction
                  <option value='request'>request</option>
                  <option value='pay' selected>pay</option>
              </select>
            <button className="fund__input" type='submit'>Send</button>
          </div>
          
      </form>
  );
}
  
  
export default MyWallet;
  