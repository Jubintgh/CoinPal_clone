import './Home.css';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCoins, getAllMarkets } from '../../store/marketInfo';
import CoinsData from './CoinsMarketData'
import MarketData from './MarketData';
import SingleCoinInfo from './SingleCoinInfo';
import About from './About';


const Home = () => {

    let allCoins = useSelector((state) => state.marketInfo.allCoins)
    let allMarkets = useSelector((state) => state?.marketInfo?.allMarkets)

    const [switcher, setSwitcher] = useState(false)
    const [display, setDisplay] = useState(1)
    const [errors, setErrors] = useState([]);
    const [suggestedCoins, setSuggestedCoins] = useState([])
    const [searchTerm, setSearchCoinTerm] = useState('')
    const [singleCoin, setSingleCoin] = useState('')

    const dispatch = useDispatch();
    useEffect(() => {
     
        let waitRes = async()=>{
            await setSwitcher(false)

            if(display ===  1){
                const data = await dispatch(getAllCoins())
                if (data) {
                    setErrors(data);
                } else {
                    allMarkets = [];
                }
                setSuggestedCoins([])
            }
            
            else if(display ===  2){
                const data = await dispatch(getAllMarkets())  
                if (data) {
                    setErrors(data);
                } else {
                    allCoins = []; 
                }
                setSuggestedCoins([])
            }

            setSwitcher(true)

            setTimeout(async()=> {
                if (!allCoins) setSwitcher(false)
                else setSwitcher(true)
            }, 5000)
        }

        waitRes()
    }, [dispatch, display])

    const lookUpCoin = async() => {
        const res = await fetch(`/api/markets/search?crypto=${searchTerm}`,{
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if(res.ok){
            const query = await res.json();
            setSuggestedCoins(query.allMarkets.data.coins.splice(0,3))
        }
    }

    const setSearchCoin = (coin) => {
        const searchedCoin = {'info': allCoins[coin.symbol]}
        allCoins = []
        setSuggestedCoins([])
        setSingleCoin(searchedCoin)
        setDisplay(3)
    }

    const sideBarObjects = {
        'Coins Market Data':1, 
        'Market Data': 2, 
        'About': 4
    }
    
    return (
        <div className='home_page'>
            {/* <div className='errors__class'>
                {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
                ))}
            </div> */}
            <div className='side_bar'>
                <img id='side_bar_logo' src='https://user-images.githubusercontent.com/73211975/127380259-8872d61e-851a-4aa5-8152-baec2618e00d.png' alt='logo'/>
                <h4 id='side_bar_title'>Coin Pal</h4>
                {Object.keys(sideBarObjects).map(bar => 
                    (<button className='home_navbar_btns' onClick={() => setDisplay(sideBarObjects[bar])}>{bar}</button>)
                )}
            </div>
            <div className='main_bar'>
                {
                    <>
                        {(display === 1) ? <input className='crypto_search_bar' onChange={e => setSearchCoinTerm(e.target.value)} placeholder='Look up crypto...'/>: <></>}
                        {suggestedCoins && suggestedCoins.map(coin => (
                            <li onClick={e => setSearchCoin(coin)} key={coin.symbol} className='search_result'><img id='seach_profile_pic' src={coin.iconUrl} alt='profile_pic'/>{coin.name}</li>
                        ))}
                        {(display === 1) ?<button className='crypto_search_btn' onClick={e => lookUpCoin(e.target.value)}>Search</button>: <></>}
                    </>
                }
                {
                    (display === 1) ? <CoinsData allCoins={allCoins}/>:
                    (display === 2) ? <MarketData allMarkets={allMarkets}/>:
                    (display === 3) ? <SingleCoinInfo targetCoin={singleCoin}/>:
                    (display === 4) ? <About/>:
                    <p>Not available</p>
                }

                {
                    !switcher &&
                    <div className="loader_container">
                    <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                    <p>Loading</p>
                    </div>
                }
                {
                    (switcher && (!allCoins && !allMarkets) &&
                        <div>
                            <h5>Data not available due to request limit or deprecated API, please contact the administrators</h5>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Home