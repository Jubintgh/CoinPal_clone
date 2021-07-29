import './Transaction.css'
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getWallet } from '../../store/wallet';

const MyWallet = () => {
    const { userId } = useParams();

    
    const { user } = useSelector((state) => state.session);
    const { wallet } = useSelector((state) => state.wallet);
    
    const [bitcoinBalance, setBitcoinBalance] = useState(null)
    const [ethereumBalance, setethereumBalance] = useState(null)
    const [usdCoinBalance, setUsdCoinBalance] = useState(null)
    const [totalBalance, setTotalBalance] = useState(null)

    // const user = useSelector((state) => state.likes.likes);
    // const userLikesObj = useSelector((state) => state.likes.likes);
    const history = useHistory();
    const dispatch = useDispatch();
    
    const id = Number(user.id);

    //useEffets
    useEffect(() => {
      dispatch(getWallet(id));
    }, [dispatch, id])

    //useStates
    const [otherUser, setOtherUser] = useState(null)
    const [amount, setAmount] = useState(null)


    const onTransaction = async (e) => {

        e.preventDefault();

        if (password === repeatPassword) {
          const data = await dispatch(signUp(
            username,
            email,
            password,
            first_name,
            last_name,
            age,
            location,
            gender,
            coach,
            discipline,
            img_url));
            
          if (data) {
            setErrors(data)
          }
        }
    };

    return (
        <form onSubmit={onTransaction}>
            <p>{otherUser}</p>
            <div className="send-crypto">
                <h3>Send Crypto!</h3>
                <input onChange={e => setOtherUser(e.target.value)} placeholder='enter @username'/>
                <input onChange={e => setAmount(e.target.value)} placeholder='enter value'/>
                <select>Select Crypto
                    <option>Bitcoin</option>
                    <option>Ethereum</option>
                    <option>USD coin</option>
                </select>
            </div>
        </form>
    );
}
  
  
export default MyWallet;
  