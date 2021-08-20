import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getUsers } from '../store/users';

function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // const response = await fetch('/api/users/');
      // const responseData = await response.json();
      const responseData = await getUsers();
      setUsers(responseData.users);
    }
    fetchData();

  }, []);

  const userComponents = users.map((user) => {
    return (
      <li key={user.id}>
        <img className='logged_in_profile' src={user.img} alt='profile-pic'/>
        <NavLink to={`/users/${user.username}`}>{user.username}</NavLink>
      </li>
    );
  });

  return (
    <>
      <h1>User List: </h1>
      <ul>{userComponents}</ul>
    </>
  );
}

export default UsersList;
