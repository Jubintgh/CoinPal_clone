import './ProfilePage.css';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getWallet } from '../../store/session';

const ProfilePage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { userId } = useParams();
    const firstUser = useSelector((state) => state.users[userId]);
    const { user } = useSelector((state) => state.session);
    const userLikesObj = useSelector((state) => state.likes.likes);
    
    const id = Number(user.id);
  
    const [likeButton, setLikeButton] = useState('/like-button-unclicked.png');
    const [dislikeButton, setDislikeButton] = useState(
      '/dislike-button-unclicked.png'
    );
    const [swipeDirection, setSwipeDirection] = useState('');

  
    useEffect(() => {
      dispatch(reNewWallet(id));
      dispatch(reNewWallet(userId));
    }, [dispatch, id, userId]);


    return (
        <ul>
          <li>
            <strong>User Id</strong> {userId}
          </li>
          <li>
            <strong>Username</strong> {user.username}
          </li>
          <li>
            <strong>Email</strong> {user.email}
          </li>
        </ul>
      );
}
  
  
export default ProfilePage;
  