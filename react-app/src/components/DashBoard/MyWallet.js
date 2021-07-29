import { useSelector, useDispatch, connectAdvanced } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getWallet } from '../../store/wallet';

const MyWallet = () => {
    const { user } = useSelector((state) => state.session);
    const bitcoinBalance = useSelector((state) => state.wallet.wallet_balances.bitcoin_balance);
    const ethereumBalance = useSelector((state) => state.wallet.wallet_balances.ethereum_balance);
    const usdCoinBalance = useSelector((state) => state.wallet.wallet_balances.usd_coin_balance);

    const dispatch = useDispatch();
    const history = useHistory();
    const id = Number(user.id);

    useEffect(() => {
        dispatch(getWallet(id))
    }, [dispatch, bitcoinBalance, ethereumBalance, usdCoinBalance])
    
    return (
        <div className="wallet-page">

            <div className="wallet-leftbar">
                <ul className="wallet_leftbar--coinholder">
                    <input className="wallet_leftbar--coinselector" type="image" alt="ethereum_logo" src="https://user-images.githubusercontent.com/73211975/127550815-431bd4d7-d17f-4740-8b83-2e0b07092dbe.png" value='Bitcoin'/>
                    <input className="wallet_leftbar--coinselector" type="image" alt="ethereum_logo" src="https://user-images.githubusercontent.com/73211975/127550925-a3e2eb4e-8c52-4af3-81cf-e696bd176175.png" value='Ethereum'/>
                    <input className="wallet_leftbar--coinselector" type="image" alt="ethereum_logo" src="https://user-images.githubusercontent.com/73211975/127550886-172c26da-addb-4eac-8e73-ea0c0d89aad7.png" value='USD-Coin'/>
                </ul>
            </div>

            <div className="wallet-rightbar">
                <p>{bitcoinBalance || "Loading..."}</p>
                <p>{ethereumBalance || "Loading..."}</p>
                <p>{usdCoinBalance || "Loading..."}</p>
            </div>

        </div>
    );
}
  
  
export default MyWallet;
  