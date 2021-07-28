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
    const [currentCoin, setCurrentCoin] = useState('Bitcoin')

    // const user = useSelector((state) => state.likes.likes);
    // const userLikesObj = useSelector((state) => state.likes.likes);
    const history = useHistory();
    const dispatch = useDispatch();
    
    const id = Number(user.id);

    useEffect(() => {
      dispatch(getWallet(id));

      setBitcoinBalance(wallet.wallet_balance.bitcoin_balance)
      setethereumBalance(wallet.wallet_balance.ethereum_balance)
      setUsdCoinBalance(wallet.wallet_balance.usd_coin_balance)
      
    }, [dispatch, id, currentCoin])
    
    
    function coinSwitch (currCoin){
        
        setTotalBalance(wallet.wallet_balance.total_balance)
    }

    return (
        <div>
        <div>
            {/* <div>
                <a onClick={setCurrentCoin('Bitcoin')}>
                </a>
                <a onClick={setCurrentCoin('Ethereum')}>
                    <p> {ethereumBalance} </p>  
                </a>
                <a onClick={setCurrentCoin('USDCoin')}>
                    
                </a>
            </div> */}
                <a></a>
                <a></a>
                <a></a>
        </div>
        <section>
            <span>Coinpal logo</span>
            <h3>CoinPal balance</h3>
            <section>
            {
                // coinSwitch(currentCoin)
            }
            </section>
            {/* <p> {ethereumBalance} </p> 
            <p> {usdCoinBalance} </p>
            <p> {totalBalance} </p> */}
        </section>
        </div>
    );
}
  
  
export default MyWallet;
  