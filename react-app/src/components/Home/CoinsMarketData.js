const CoinsData = ({allCoins}) => {
    
    return(
        <ul>
            {allCoins && Object.keys(allCoins).map(coin => {
                    return(
                        <li key={coin} className='home_navbar_items'>
                            <img className='coin_icon' src={allCoins[coin].iconUrl} alt='coin_icon'/>
                            <table id='customers'>
                                <thead>
                                    <tr>
                                        <th style={{backgroundColor: allCoins[coin].color}}>Name</th>
                                        <th style={{backgroundColor: allCoins[coin].color}}>Rank</th>
                                        <th style={{backgroundColor: allCoins[coin].color}}>Symbol</th>
                                        <th style={{backgroundColor: allCoins[coin].color}}>Price</th>
                                        <th style={{backgroundColor: allCoins[coin].color}}>Circulating Supply</th>
                                        <th style={{backgroundColor: allCoins[coin].color}}>Market Cap</th>
                                        <th style={{backgroundColor: allCoins[coin].color}}>Volume</th>
                                    </tr>
                                </thead>
                                <tr>
                                    <td>{allCoins[coin].name}</td>
                                    <td>{allCoins[coin].rank}</td>
                                    <td>{coin}</td>
                                    <td>{allCoins[coin].price}</td>
                                    <td>{allCoins[coin].circulatingSupply}</td>
                                    <td>{allCoins[coin].marketCap}</td>
                                    <td>{allCoins[coin].volume}</td>
                                </tr>
                            </table>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default CoinsData