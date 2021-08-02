import './Contacts.css'
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAllFriends, postFriendship, removeFriend} from '../../store/friend';

const MyContacts = () => {
    const { user } = useSelector((state) => state.session);
    let friendsList = useSelector(state => state.friends);
    if (friendsList) friendsList= Object.values(friendsList)
    
    const id = Number(user.id);


    const history = useHistory();
    const dispatch = useDispatch();

    //useEffets
    useEffect(() => {
      dispatch(getAllFriends(id));
    }, [dispatch, id])

    //useStates
    const [errors, setErrors] = useState([]);
    // const [toUserName, settoUserName] = useState(null)
    // const [amount, setAmount] = useState(null)
    // const [fromUserId, setFromUserId] = useState(String(id))
    // const [cryptoType, setCryptoType] = useState('Bitcoin')
    
    // const onTransaction = async (e) => {
    //   e.preventDefault();

    //   setFromUserId(id)

    //   const result = await dispatch(postTransaction(id, {
    //     "from_user_id": fromUserId,
    //     "to_username": toUserName,
    //     "amount": amount,
    //     "crypto_type": cryptoType
    //   }))
      
    //   if (result){
    //     if(result.errors){
    //       let errs = Object.keys(result.errors)
    //       setErrors(errs)
    //     } else {
    //       history.push('/');
    //     }
    //   } 
    // }

    const unfriend = async (otherUserId) => {
        await dispatch(removeFriend(otherUserId))
    }

    return (
        <div id='contacts_page'>
            <h5>Contacts</h5>
            <div className='contacts_container'>
            {
              friendsList && friendsList.map((friend, idx) => {
                return (
                    // <div href={`/user/${friend.user_name}`}>
                    <div className='profile__container' key={idx}>

                        <div className='signle_contact'>
                            <img id='profile_pic' src={friend.profile_img} alt="profile_pic" className=""/>
                            <p className={'real_name'}>{friend.first_name} {friend.last_name}</p>
                            <p className={'user_name'}>{friend.user_name}</p>
                            <button onClick={(e) => unfriend(friend.user_name)}>Remove friend</button>
                        </div>
                    </div>
                    // </div>
                )
              })
            }
            </div>
        </div>
    );
}
  
  
export default MyContacts;
  