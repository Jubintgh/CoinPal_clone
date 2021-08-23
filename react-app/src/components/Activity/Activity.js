import './Activity.css'
import { useSelector, useDispatch } from 'react-redux';
// import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAllTransactions, deleteTransaction, rejectTransaction} from '../../store/transaction';

const Activity = () => {
    const { user } = useSelector((state) => state.session);
    let transactions = useSelector(state => state.transactions['alltransactions'])
    const currUsername = useSelector(state => state.session.user.username) 
    const id = Number(user.id);

    const dispatch = useDispatch();

    //useStates
    const [errors, setErrors] = useState([]);
    const [switcher, setSwitcher] = useState(false);
    const [displayTransactions, setDisplayTransactions] = useState(() => transactions)


    const cancelReq = async (id, transactionId) => {
      const result = await dispatch(deleteTransaction(id,transactionId))

      setSwitcher((prev) => !prev)

      if (result){
        if(result.errors){
          let errs = Object.keys(result.errors)
          setErrors(errs)
        } 
      } 
    }

    const rejectReq = async (id, transactionId) => {
      await dispatch(rejectTransaction(id,transactionId))
      dispatch(getAllTransactions)
    }


    const numToMonth = (num) => {

      const months = ['', 'Jan',	'Feb', 'Mar',	'Apr', 'May',	'Jun', 'Jul',	'Aug', 'Sep', 'Oct', 'Nov',	'Dec'];

      return months[num];
    }

    const transactionStatLogo = (status) => {
      switch(status){
        case 1:
          return 'https://user-images.githubusercontent.com/73211975/128391094-bd6bc2f3-5e3e-4a35-9577-22e26648d83d.png'
          
        case 2:
          return 'https://user-images.githubusercontent.com/73211975/128391722-71b228b4-d84c-41c4-93b9-843d72079565.png'

        case 3:
          return 'https://user-images.githubusercontent.com/73211975/128392440-f771136b-3f72-4baa-ab57-8c87604a5586.png'

        default:
          return 'https://user-images.githubusercontent.com/73211975/128391496-c2a42f69-bfe1-4deb-9ffb-660021b70e21.jpg'
      }

    }

    //useEffets
    useEffect(() => {
      setDisplayTransactions(transactions)
      dispatch(getAllTransactions(id))
    }, [dispatch, id, switcher])

    const quickSort = (arr) => {
      if(arr.length <= 1){
        return arr
      }

      let pivot = arr.shift();
      let left = arr.filter(el => el.transaction_status < pivot.transaction_status);
      let right = arr.filter(el => el.transaction_status >= pivot.transaction_status);

      let leftSorted = quickSort(left);
      let rightSorted = quickSort(right);
      return [...leftSorted, pivot, ...rightSorted];
    }

    const sortBy = (sort) => {

      switch(sort){
        case 'Incoming':
          console.log(transactions)
          transactions = transactions.filter(transaction => {
            return transaction.transaction_status === 3
          })
          setDisplayTransactions(transactions)
        break;
        case 'Status':
          transactions = quickSort(transactions)
          setDisplayTransactions(transactions)
        break;
        default:
          return
      }
    }
    

    const canCancel = (transaction) => {
      if((transaction.transaction_status === 3) && (transaction.from_username === currUsername)) return true
      return false
    }
    const canReject = (transaction) => {
      if((transaction.transaction_status === 3) && (transaction.to_username === currUsername)) return true
      return false
    }

    return(
      <div className='parent_page'>
        <div id='contact__navbar'>
            <button onClick={() => sortBy('Status')} className='friend_req_button'>Sort By status</button>
            <button onClick={() => sortBy('Incoming')} className='friend_req_button'>Requests</button>
            <button className='friend_req_button'>Search Transactions</button>
        </div>
        <div className='Activity_page'>
          {errors && errors.forEach(err => {
            <li className='errors__class'>{err}</li>
          })}
            {displayTransactions && displayTransactions.map((transact, idx) => {
                  return (
                    <div key={idx} className="Activity__main">
                      <img className='transaction_logo' alt='logo' src={transactionStatLogo(transact.transaction_status)}/>
                      <p className='transaction__status'>{transact.transaction_status === 0 ? 'Pending': transact.transaction_status === 1 ? 'Completed' : transact.transaction_status === 2 ? 'Rejected' : transact.transaction_status === 3 ? 'Request' : 'Loading...'}</p>
                      <div className="transaction__container" value={transact.transaction_id}>
                              <div>
                                  <p className={'transact_from_user'}>From: {transact.from_username}</p>
                                  <p className={'transact_to_user'}>To: {transact.to_username}</p>
                              </div>
                          {
                            canCancel(transact) ? 
                            <div className='buttons_container'>
                            <button className='Activity_button' style={{visibility: canCancel(transact) ? 'visible': 'hidden'}} onClick={() => cancelReq(id, transact.transaction_id)}>Cancel</button> 
                            </div>
                            :
                            canReject(transact) ? 
                            <div className='buttons_container'>
                              <button className='Activity_button' style={{visibility: canReject(transact) ? 'visible': 'hidden'}} onClick={() => rejectReq(id, transact.transaction_id)}>Reject</button>
                              <button className='Activity_button' style={{visibility: canReject(transact) ? 'visible': 'hidden'}} onClick={() => window.location.href='/my/SendNrequest'}>Pay</button> 
                            </div>
                          : <p/>}
                      </div>
                      <div className='amount__container'>
                            <p className={'transact_type'}>time: {`${numToMonth(transact.date.month)} ${transact.date.day} ${transact.date.year}` }</p>
                            <p className={'transact_amount'}>Amount: {transact.amount}</p>
                            <p className={'transact_type'}>Crypto: {transact.crypto_type}</p>
                      </div>
                    </div>
                  )
              })
            }
        </div>
        <h6>No more transactions</h6>
      </div>
    )
}
  
  
export default Activity;