import './Wallet.css'
import { useSelector, useDispatch } from 'react-redux';
// import { useParams, useHistory, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getWallet } from '../../store/wallet';

const MyWallet = () => {
    const { user } = useSelector((state) => state.session);
    const bitcoinBalance = useSelector((state) => state.wallet.wallet_balances.bitcoin_balance);
    const ethereumBalance = useSelector((state) => state.wallet.wallet_balances.ethereum_balance);
    const usdCoinBalance = useSelector((state) => state.wallet.wallet_balances.usd_coin_balance);

    const dispatch = useDispatch();
    // const history = useHistory();
    const id = Number(user.id);

    //useStates
    const [currCoin, setCurrCoin] = useState({
        "coin": "Bitcoin",
        "logo": "https://user-images.githubusercontent.com/73211975/127550815-431bd4d7-d17f-4740-8b83-2e0b07092dbe.png"
        }) 

    useEffect(() => {
        dispatch(getWallet(id))
    }, [dispatch, bitcoinBalance, ethereumBalance, usdCoinBalance])
    
    return (
        <div className="wallet-page">

            <div className="wallet-leftbar">
                <ul className="wallet_leftbar--coinholder">
                    <input className="wallet_leftbar--logo" type="image" alt="wallet_logo" src="https://user-images.githubusercontent.com/73211975/128096175-c7a6480a-8aec-45d8-bb2c-357c1f509976.png" value='Bitcoin'/>
                    <input className="wallet_leftbar--coinselector" type="image" alt="Bitcoin_logo" src="https://user-images.githubusercontent.com/73211975/127550815-431bd4d7-d17f-4740-8b83-2e0b07092dbe.png" value='Bitcoin' onClick={e => setCurrCoin({
                        "coin": e.target.value,
                        "logo": "https://user-images.githubusercontent.com/73211975/127550815-431bd4d7-d17f-4740-8b83-2e0b07092dbe.png"
                        })}/>
                    <input className="wallet_leftbar--coinselector" type="image" alt="Ethereum_logo" src="https://user-images.githubusercontent.com/73211975/127550925-a3e2eb4e-8c52-4af3-81cf-e696bd176175.png" value='Ethereum' onClick={e => setCurrCoin({
                        "coin": e.target.value,
                        "logo": "https://user-images.githubusercontent.com/73211975/127550925-a3e2eb4e-8c52-4af3-81cf-e696bd176175.png"
                        })}/>
                    <input className="wallet_leftbar--coinselector" type="image" alt="USD-Coin_logo" src="https://user-images.githubusercontent.com/73211975/127550886-172c26da-addb-4eac-8e73-ea0c0d89aad7.png" value='USD-Coin' onClick={e => setCurrCoin({
                        "coin": e.target.value,
                        "logo": "https://user-images.githubusercontent.com/73211975/127550886-172c26da-addb-4eac-8e73-ea0c0d89aad7.png"
                        })}/>
                </ul>
            </div>

            <div className="wallet-rightbar">
                <div className="currentstats">
                    <img alt="logo" className="currcoin__logo" src={currCoin["logo"]}/>
                        <div className="currcoin__balance">CoinPal balance
                            <p>{currCoin.coin === 'Bitcoin' ? bitcoinBalance + ' BitCoin available' : currCoin.coin === 'Ethereum' ? ethereumBalance + ' ETH available' : currCoin.coin === 'USD-Coin' ? usdCoinBalance + ' USD-Coin available' : currCoin === 'Loading...'}</p>
                        </div>
                    <button>Send Crypto</button>
                    <button>Add a crypto</button>
                </div>
            </div>

        </div>
    );
}
  
  
export default MyWallet;
  