import './Contacts.css'
import { useSelector, useDispatch } from 'react-redux';
// import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAllFriends, updateOneFriendship,removeFriend} from '../../store/friend';

const MyContacts = () => {
    const { user } = useSelector((state) => state.session);

    let friendsList = useSelector(state => Object.values(state.friends.friendsList));

    let friendReqList = useSelector(state => Object.values(state.friends.friendsReqs));

    const id = Number(user.id);

    // const history = useHistory();
    const dispatch = useDispatch();
    
    //useEffets
    useEffect(() => {
      dispatch(getAllFriends(id));
    }, [dispatch, id])

    //useStates
    // const [errors, setErrors] = useState([]);
    const [ReqDisplay, setReqDisplay] = useState(false)
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

    const unFriend = async (otherUserId) => {
        await dispatch(removeFriend(otherUserId))
        dispatch(getAllFriends(id))
    }

    const acceptFriend = async (userName) => {
        await dispatch(updateOneFriendship(userName, 'accept'))
        dispatch(getAllFriends(id))
    }

    const rejectFriend = async (userName) => {
        await dispatch(removeFriend(userName))
        dispatch(getAllFriends(id))
        // await dispatch(postFriendship(userName))
    }

    return (
        <div id='contacts_page'>
            <div id='contact__navbar'>
                <button onClick={e => setReqDisplay(!ReqDisplay)} className='friend_req_button'>requests</button>
            </div>
            <div className='contacts_container'>
            {ReqDisplay && <div className='contact_request_container'>
                { friendReqList && friendReqList.map((user, idx) => {
                        return (
                            <div className='profile__container' key={idx}>

                            <div className='signle_contact'>
                            <img id='profile_pic' src={user.profile_img} alt="profile_pic" className=""/>
                                <div className='name_username_container'>
                                    <p className={'real_name'}>{user.first_name} {user.last_name}</p>
                                    <p className={'user_name'}>@{user.user_name}</p>
                                </div>
                                    <button className={'accept_button'} onClick={(e) => acceptFriend(user.user_name)}>accept friend request</button>
                                    <button className={'accept_button'} onClick={(e) => rejectFriend(user.user_name)}>reject friend request</button>
                                </div>
                            </div>
                        )
                    })
                }
                </div>}
            </div>

            <div className='contacts_container'>
            <h5>Contacts</h5>
            {
              friendsList && friendsList.map((friend, idx) => {
                return (
                    <div className='profile__container' key={idx}>

                        <div className='signle_contact'>
                            <img id='profile_pic' src={friend.profile_img} alt="profile_pic" className=""/>
                                <div className='name_username_container'>
                                    <p className={'real_name'}>{friend.first_name} {friend.last_name}</p>
                                    <p className={'user_name'}>@{friend.user_name}</p>
                                </div>
                            <button className={'unfriend_button'} onClick={(e) => unFriend(friend.user_name)}>Remove this contact</button>
                        </div>
                    </div>
                )
              })
            }
            </div>
        </div>
    );
}
  
  
export default MyContacts;
