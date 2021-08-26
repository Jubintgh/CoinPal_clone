import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      // const responseData = await getUsers();
      setUsers(responseData.users);
    }
    fetchData();

  }, []);

  const userComponents = users.map((user) => {
    return (
      <div id='users_page'>
        {console.log(users)}
        <li key={user.id} className='single_user'>
            <NavLink className='profile__container' to={`/users/${user.username}`}>
              <div className='req_signle_contact'>
                  <img onError={(e) => {e.target.src = 'https://unwomen.org.au/wp-content/uploads/2020/09/Avitar_Image_Placeholder-1.png'}} id='req_profile_pic' src={user.img} alt="profile_pic" className=""/>
                    <div className='name_username_container'>
                        <p className={'req_real_name'}>{user.first_name} {user.last_name}</p>
                        <p className={'req_user_name'}>@{user.username}</p>
                    </div>
                </div>  
            </NavLink>
        </li>
      </div>
    );
  });

  return (
    <>
      <h1> List of all Users for demo purposes: </h1>
      <ul>{userComponents}</ul>
    </>
  );
}

export default UsersList;
