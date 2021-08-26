import './Activity.css'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllTransactions, deleteTransaction, rejectTransaction, payTransaction} from '../../store/transaction';


const Activity = () => {
    const { user } = useSelector((state) => state.session);

    let transactions = useSelector(state => state.transactions['alltransactions'])

    const currUsername = useSelector(state => state.session.user.username) 
    const id = Number(user.id);

    const dispatch = useDispatch();

    //useStates
    const [errors, setErrors] = useState([]);
    const [switcher, setSwitcher] = useState('none');


    const cancelReq = async (transactionId) => {
      const result = await dispatch(deleteTransaction(id, transactionId))

      if (result){
        if(result.success){
          await dispatch(getAllTransactions(id))
          return
        }
        else if(result.errors){
          setErrors(result.errors)
        } 
      } 
    }
    
    const rejectReq = async (id, transactionId) => {
      let rejectedTransact = await dispatch(rejectTransaction(id,transactionId))
      
      setSwitcher('block')
      // setTimeout(async () => await dispatch(getAllTransactions(id)), 2000)
    }

    const payReq = async(id, transactionId) => {
      const acceptedTransact = await dispatch(payTransaction(id, transactionId))
      
      if (acceptedTransact){
        if(acceptedTransact.errors){
          setErrors([])
          let errs = Object.values(acceptedTransact.errors)
          setErrors(errs)
          return
        }

        setSwitcher('block')
        // setTimeout(async () => await dispatch(getAllTransactions(id)), 2000)
      }

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

    const refreshPage = ()=>{
      setSwitcher('none')
      dispatch(getAllTransactions(id))
    }

    //useEffets
    useEffect(() => {
      dispatch(getAllTransactions(id))
    }, [dispatch, id])

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
        <div id='activity__navbar'>
          <h5>Search transactions:</h5>
          <input style={{display: (switcher === 'block' ? 'none' : 'block')}} className='transaction__search_container' placeholder='search transactions...'></input>
          <button style={{display: switcher}} onClick={() => refreshPage()} className='activity_nav_button'>Back to all transactions</button>
        </div>
        <div className='Activity_page'>
          {errors && errors.forEach(err => {
            <li className='errors__class'>{err}</li>
          })}
            {transactions && transactions.map((transact, idx) => {
                  return (
                    <div key={idx} className="Activity__main">
                      <div className='logo_status_activity'>
                        <img className='transaction_logo' alt='logo' src={transactionStatLogo(transact.transaction_status)}/>
                        <p className='transaction__status'>{transact.transaction_status === 0 ? 'Pending': transact.transaction_status === 1 ? 'Completed' : transact.transaction_status === 2 ? 'Rejected' : transact.transaction_status === 3 ? 'Request' : 'Loading...'}</p>
                      </div>
                      <div className="transaction__container" value={transact.transaction_id}>
                            <div>
                              <p className={'transact_from_user'}>From: {transact.from_username}</p>
                              <p className={'transact_to_user'}>To: {transact.to_username}</p>
                              <p className={'confirm_num'}>Confirmation Number: {transact.transaction_id}</p>
                            </div>
                          {
                            canCancel(transact) ? 
                            <div className='buttons_container'>
                            <button className='Activity_button' style={{visibility: canCancel(transact) ? 'visible': 'hidden'}} onClick={() => cancelReq(transact.transaction_id)}>Cancel</button> 
                            </div>
                            :
                            canReject(transact) ? 
                            <div className='buttons_container'>
                              {errors ? <div className='errors__class' >{errors}</div> : <p></p>}
                              <button className='Activity_button' style={{visibility: canReject(transact) ? 'visible': 'hidden'}} onClick={() => rejectReq(id, transact.transaction_id)}>Reject</button>
                              <button className='Activity_button' style={{visibility: canReject(transact) ? 'visible': 'hidden'}} onClick={() => payReq(id, transact.transaction_id)}>Pay</button> 
                            </div>
                          : <p/>}
                      </div>
                      <div className='amount__container'>
                            <p className={'transact_type'}>Date: {`${numToMonth(transact.date.month)} ${transact.date.day} ${transact.date.year}` }</p>
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