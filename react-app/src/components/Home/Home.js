import './Home.css';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import { NavLink } from 'react-router-dom';
import MyWallet from '../DashBoard/MyWallet';
import Activity from '../Activity/Activity';
import Contacts from '../Contacts/Contacts'



const Home = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const email = 'demouser@mail.com';
    const password = 'Password1!';

    const onDemoSignIn = async (e) => {
        e.preventDefault();
        await dispatch(login(email, password));
        history.push('/');
    };


    return (
        <div className='home_page'>
            <div className='right_column'>
                <p>Wallet Glance</p>
                <div className='wallet_container'>
                    <MyWallet id='wallet'/>
                </div>
                <p>Activity Glance</p>
                <div className='activity_container'>
                    <Activity id='activity'/>
                </div>

            </div>
            <div className='left_column'>
            <p>Contacts Glance</p>
                <div className='contacts_container'>
                    <Contacts id='contacts'/>
                </div>
            </div>
        </div>
    )
}

export default Home