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

    useEffect(() => {
      dispatch(getWallet(id));
      
    }, [dispatch, id])
    


    return (
        <div>
            <h3>Send Crypto!</h3>
            <input placeholder='enter @username'></input>
        </div>
    );
}
  
  
export default MyWallet;
  