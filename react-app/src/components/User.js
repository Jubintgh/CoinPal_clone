import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllFriends, postFriendship, updateOneFriendship ,removeFriend} from '../store/friend';

function User() {
  const [user, setUser] = useState({});
  const { userId }  = useParams();
  const dispatch = useDispatch();

  const currUser = useSelector((state) => state.session.user);
  let friendsList = useSelector(state => state.friends);

  const id = Number(currUser.id);

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
      dispatch(getAllFriends(id));
    })();
  }, [dispatch, userId]);

  if (!user) {
    return null;
  }

  const isFriend = (userName) => {
    if(friendsList[userName]){
      return true
    }
    return false
  }

  const addFriend = async (userName) => {
    await dispatch(postFriendship(userName))
  }

  const unfriend = async (otherUserId) => {
    await dispatch(removeFriend(otherUserId))
  }

  const blockUser = async (otherUserId) => {
    await dispatch(updateOneFriendship(otherUserId, 'block'))
  }

  return (
    <div className='profile__container'>
      {console.log(isFriend(user.username))}
        <div className='signle_contact'>
            <img id='profile_pic' src={user.img} alt="profile_pic" className=""/>
            <p className={'real_name'}>{user.first_name} {user.last_name}</p>
            <p className={'user_name'}>{user.username}</p>
            <button onClick={e => isFriend(user.username) ? unfriend(user.username) : addFriend(user.username)}>{isFriend(user.username) ? 'Remove friend' : 'Add as friend'}</button>
            <button onClick={e => blockUser(user.username)}>block</button>
        </div>
    </div>
  );
}
export default User;
