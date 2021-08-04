import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllFriends, postFriendship, updateOneFriendship ,removeFriend} from '../store/friend';

function User() {
  const [user, setUser] = useState({});
  const { username }  = useParams();
  const dispatch = useDispatch();

  const currUser = useSelector((state) => state.session.user);
  let friendsList = useSelector(state => state.friends.friendsList);
  let pendingReqs = useSelector(state => state.friends.friendsPends);

  const id = Number(currUser.id);

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
    await dispatch(postFriendship(userName))
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
        <div className='signle_contact'>
            <img id='profile_pic' src={user.img} alt="profile_pic" className=""/>
            <p className={'real_name'}>{user.first_name} {user.last_name}</p>
            <p className={'user_name'}>{user.username}</p>
            {requestedFriend(user.username) ? <button disabled={true}>Pending request</button> : <button onClick={e => isFriend(user.username) ? unfriend(user.username) : addFriend(user.username)}>{isFriend(user.username) ? 'Remove friend' : 'Add as friend'}</button>}
            {/* <button onClick={e => blockUser(user.username)}>block</button> */}
        </div>
    </div>
  );
}
export default User;
