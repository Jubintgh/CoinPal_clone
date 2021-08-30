import './Home.css';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllMarkets } from '../../store/marketInfo';



const MarketData = ({allMarkets}) => {

    return(
        <ul>
            {allMarkets && Object.keys(allMarkets).map(market => {
                    return(
                        <li key={market} className='home_navbar_items'>
                            <img className='coin_icon' src={allMarkets[market].iconUrl} alt='coin_icon'/>
                            <table id='customers'>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Rank</th>
                                        <th>Price</th>
                                        <th>Market Share</th>
                                        <th>Number of Markets</th>
                                        <th>Volume</th>
                                    </tr>
                                </thead>
                                <tr>
                                    <td>{market}</td>
                                    <td>{allMarkets[market].rank}</td>
                                    <td>{allMarkets[market].price}</td>
                                    <td>{allMarkets[market].marketShare}</td>
                                    <td>{allMarkets[market].numberOfMarkets}</td>
                                    <td>{allMarkets[market].volume}</td>
                                </tr>
                            </table>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default MarketData