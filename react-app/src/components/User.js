import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllFriends, postFriendship, updateOneFriendship ,removeFriend} from '../store/friend';

function User() {
  const [user, setUser] = useState({});
  const [errors, setErrors] = useState([]);

  const { username }  = useParams();
  const dispatch = useDispatch();

  const currUser = useSelector((state) => state.session.user);
  let friendsList = useSelector(state => state.friends.friendsList);
  let pendingReqs = useSelector(state => state.friends.friendsPends);

  const id = Number(currUser.id);
  const currUserName = currUser.username

  useEffect(() => {
    if (!username) {
      return(
        <h1>Username Does not exist!</h1>
      );
    }
    (async () => {
      const response = await fetch(`/api/users/${username}`);
      const user = await response.json();
      setUser(user);
      dispatch(getAllFriends(id));
    })();
    }, [dispatch, username]);

  if (!user) {
    return null;
  }

  const isSelf = (username) => {
    if(currUserName === username){
      return false
    }
    return true
  }

  const isFriend = (username) => {
    if(friendsList[username]){
      return true
    }
    return false
  }

  const requestedFriend = (userName) => {
    if(userName in pendingReqs){
      return true
    }
    return false
  }

  const addFriend = async (userName) => {
    const res = await dispatch(postFriendship(userName))
    
    if(res.errors){
      setErrors([res.errors])
      return
    }
    dispatch(getAllFriends(id));
  }

  const unfriend = async (otherUserId) => {
    await dispatch(removeFriend(otherUserId))
    dispatch(getAllFriends(id));
  }

  const blockUser = async (otherUserId) => {
    await dispatch(updateOneFriendship(otherUserId, 'block'))
  }

  return (
    <div className='profile__container'>
      <div>
        {errors.map((error, ind) => (
          <div className='errors__class' key={ind}>{error}</div>
        ))}
        </div>
        { isSelf(user.username) &&
          <div className='signle_contact'>
              <img id='profile_pic' src={user.img} onError={(e) => {e.target.src = 'https://unwomen.org.au/wp-content/uploads/2020/09/Avitar_Image_Placeholder-1.png'}} alt="profile_pic" className=""/>
              <div className='name_username_container'>
                  <p className={'req_real_name'}>{user.first_name} {user.last_name}</p>
                  <p className={'req_user_name'}>@{user.username}</p>
              </div>
              {requestedFriend(user.username) ? <button disabled={true}>Pending request</button> : <button onClick={e => isFriend(user.username) ? unfriend(user.username) : addFriend(user.username)}>{isFriend(user.username) ? 'Remove friend' : 'Add as friend'}</button>}
          </div>
        }
        {
          !isSelf(user.username) &&
          <div className='name_username_container'>
            <p>Your Profile</p>
            <img id='profile_pic' src={user.img} onError={(e) => {e.target.src = 'https://unwomen.org.au/wp-content/uploads/2020/09/Avitar_Image_Placeholder-1.png'}} alt="profile_pic" className=""/>
            <p className={'profile_text'}>Full Name:  {user.first_name} {user.last_name}</p>
            <p className={'profile_text'}>Username:  @{user.username}</p>
          </div>
        }
    </div>
  );
}
export default User;
