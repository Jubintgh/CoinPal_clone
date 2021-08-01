import './Contacts.css'
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAllFriends, postFriendship, } from '../../store/friend';

const MyContacts = () => {
    const { user } = useSelector((state) => state.session);
    const friendsList = useSelector(state => state.friends['friends_list'])
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

    return (
        <div id='contacts_page'>
            <h5>Contacts</h5>
            <div className='contacts_container'>
            {
              friendsList && friendsList.map((friend, idx) => {
                return (
                    <a href={`/user/${friend.user_name}`}>
                        <div className='profile__container' key={idx} value={friend.to_user_id}>
                            <div>
                                {console.log(friend.profile_img)}
                                <img id='profile_pic' src={friend.profile_img} alt="profile_pic" className=""/>
                                <p className={'real_name'}>{friend.first_name} {friend.last_name}</p>
                                <p className={'user_name'}>{friend.user_name}</p>
                            </div>
                        </div>
                    </a>
                )
              })
            }
            </div>
        </div>
    );
}
  
  
export default MyContacts;
  