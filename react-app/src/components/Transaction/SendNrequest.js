import './SendNrequest.css'
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAllTransactions, postTransaction } from '../../store/transaction';

const MyWallet = () => {
  const { user } = useSelector((state) => state.session);

  const id = Number(user.id);
  let history = useHistory();
  const dispatch = useDispatch();

  //useEffets
  useEffect(() => {
    getAllTransactions(id);
  }, [dispatch, id])
  
  //useStates
  const [errors, setErrors] = useState([]);
  const [amount, setAmount] = useState(null)
  const [fromUserId, setFromUserId] = useState(String(id))
  const [cryptoType, setCryptoType] = useState('Bitcoin')
  const [type, setType] = useState('pay')
  const [searchedUsers, setSearchedUsers] = useState([])

  const [toUserInputField, setToUserInputField] = useState('')
  const [toUserProfPic, setToUserProfPic] = useState(null)

  
  const onTransaction = async (e) => {
    e.preventDefault();

    if(toUserInputField[0] === '@'){
      toUserInputField = toUserInputField.slice(1)
    }

    setFromUserId(id)
    const result = await dispatch(postTransaction(type, id, {
      "from_user_id": fromUserId,
      "to_username": toUserInputField,
      "amount": amount,
      "crypto_type": cryptoType
    }))

    if(!result){
      setErrors('Balance Insufficient')
    }

    if (result){
      if(result.errors){
        setErrors([])
        let errs = Object.values(result.errors)
        setErrors(errs)
        return
      } else {
        history.push('/my/transaction/history')
      }
    }
  }

  const searchQuery = async function(username) {
    if(username[0] === '@'){
      username = username.slice(1)
    }
    setToUserInputField()
    const res = await fetch(`/api/users/search?user=${username}`);
      if(res.ok){
        const response = await res.json();
        setSearchedUsers(response.users.slice(0,5))
      }
    return username
  }

  const selectUser = function(user){
    setToUserInputField(user.username)
    setToUserProfPic(user.img)
    setSearchedUsers([])
  }

  return (     
      <form className='transaction__form' onSubmit={onTransaction}>
        <div>
        {errors.map((error, ind) => (
          <div className='errors__class' key={ind}>{error}</div>
        ))}
        </div>
        <div className='send-crypto'>
            <h3 className='fund__field'><p>Send or Request Crypto!</p></h3>
            {/* <div>{searchedUsers && searchedUsers[0].username}</div> */}
            <ul className='search_result-holder'>
            <input type='text' className="user__name" onChange={e => searchQuery(e.target.value)} placeholder='To @username' value={toUserInputField}required/>
            {searchedUsers && searchedUsers.map((user, idx) => (
              (<li onClick={e => selectUser(user)} className='search_result' key={idx}><img id='seach_profile_pic' src={user.img} alt='profile_pic'/>{user.username}</li>)
            ))}
            </ul>
            <input type='decimal' className="fund__input" onChange={e => setAmount(e.target.value)} placeholder='enter value' required/>
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
              defaultValue={'pay'}
              onChange={e => setType(e.target.value)}
            >Select Transaction
                <option value='request'>request</option>
                <option value='pay'>pay</option>
            </select>
          <button className="fund__input" type='submit'>Send</button>
        </div>
      </form>
  );
}
  
  
export default MyWallet;
  