// import './ProfilePage.css';
// import { useSelector, useDispatch } from 'react-redux';
// import { useParams, useHistory, Link } from 'react-router-dom';
// import { useEffect, useState } from 'react';



// const ProfilePage = () => {
//     const dispatch = useDispatch();
//     const history = useHistory();
//     const { userId } = useParams();
//     const firstUser = useSelector((state) => state.users[userId]);
//     const { user } = useSelector((state) => state.session);
//     const userLikesObj = useSelector((state) => state.likes.likes);
    
//     const id = Number(user.id);
  
//     const [likeButton, setLikeButton] = useState('/like-button-unclicked.png');
//     const [dislikeButton, setDislikeButton] = useState(
//       '/dislike-button-unclicked.png'
//     );
//     const [swipeDirection, setSwipeDirection] = useState('');

  
//     useEffect(() => {
//       dispatch(getNewUsers(id));
//       dispatch(getOneUser(userId));
//     }, [dispatch, id, userId]);

// }
  
  
// export default ProfilePage;
  