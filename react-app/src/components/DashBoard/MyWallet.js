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
        "logo": "https://user-images.githubusercontent.com/73211975/128097437-7c56579c-79a4-4d41-b699-bcd8c093cb3e.png"
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
                        "logo": "https://user-images.githubusercontent.com/73211975/128097437-7c56579c-79a4-4d41-b699-bcd8c093cb3e.png"
                        })}/>
                    <input className="wallet_leftbar--coinselector" type="image" alt="Ethereum_logo" src="https://user-images.githubusercontent.com/73211975/127550925-a3e2eb4e-8c52-4af3-81cf-e696bd176175.png" value='Ethereum' onClick={e => setCurrCoin({
                        "coin": e.target.value,
                        "logo": "https://user-images.githubusercontent.com/73211975/128097454-0111460e-bb44-4f28-8117-52cf99521448.png"
                        })}/>
                    <input className="wallet_leftbar--coinselector" type="image" alt="USD-Coin_logo" src="https://user-images.githubusercontent.com/73211975/127550886-172c26da-addb-4eac-8e73-ea0c0d89aad7.png" value='USD-Coin' onClick={e => setCurrCoin({
                        "coin": e.target.value,
                        "logo": "https://user-images.githubusercontent.com/73211975/128097470-eb7ea8b9-3f0f-4700-8fe8-59a3f2ef2cbc.png"
                        })}/>
                </ul>
            </div>

            <div className="wallet-rightbar">
                <div className="currentstats">
                    <img alt="logo" className="currcoin__logo" src={currCoin["logo"]}/>
                        <div className="currcoin__balance">balance
                            <p className='amount'>{currCoin.coin === 'Bitcoin' ? bitcoinBalance + ' BitCoin available' : currCoin.coin === 'Ethereum' ? ethereumBalance + ' ETH available' : currCoin.coin === 'USD-Coin' ? usdCoinBalance + ' USD-Coin available' : currCoin === 'Loading...'}</p>
                            <p className='extras'>
                            CoinPal works with a balance
                            No kidding! You can still use CoinPal to shop or send Crypto when your balance is not zero.
                            </p>
                            <p className='extras'>
                            Preferred when paying online
                            Set as preferred
                            We’ll use your available balance when you shop online or send Crypto for goods and services.
                            If you don’t have enough Crypto in your balance, we’ll ask you to pick another payment method at checkout.
                            More about payment preferences
                            </p>
                            <a href='/my/SendNrequest'>Send Crypto</a> 
                        </div>
                </div>
            </div>

        </div>
    );
}
  
  
export default MyWallet;
  