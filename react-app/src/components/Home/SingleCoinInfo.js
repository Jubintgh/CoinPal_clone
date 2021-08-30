const SingleCoinInfo = ({targetCoin})=> {

    return (

            targetCoin.info ? (<div id='coin_description_page'>
            <img id='search_crypto_logo' src={targetCoin.info?.iconUrl} alt='icon'/>
            <table id='customers'>
                <thead>
                    <tr>
                        <th style={{backgroundColor: targetCoin.info?.color}}>Name</th>
                        <th style={{backgroundColor: targetCoin.info?.color}}>Rank</th>
                        <th style={{backgroundColor: targetCoin.info?.color}}>Symbol</th>
                        <th style={{backgroundColor: targetCoin.info?.color}}>Price</th>
                        <th style={{backgroundColor: targetCoin.info?.color}}>Circulating Supply</th>
                        <th style={{backgroundColor: targetCoin.info?.color}}>Market Cap</th>
                    </tr>
                    <tr>
                        <td>{targetCoin.info?.name}</td>
                        <td>{targetCoin.info?.rank}</td>
                        <td>{targetCoin.info?.price}</td>
                        <td>{targetCoin.info?.circulatingSupply}</td>
                        <td>{targetCoin.info?.marketCap}</td>
                        <td>{targetCoin.info?.volume}</td>
                    </tr>
                </thead>
            </table>
            <div></div>
            <p
                dangerouslySetInnerHTML={{ __html: targetCoin.info?.description}}
                id='coin_description'
            />
        </div>)
        :

        (<h5>Data for this specific Crypto is not available at the moment please try again later</h5>)
    )
        
}

export default SingleCoinInfo