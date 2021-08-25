import './Home.css';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
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

    const sideBarObjects = [{'Contacts': Contacts}, {'Incomplete': null}, {'Activity': Activity}]
    const sideBarItems = sideBarObjects.map(item => Object.keys(item))
    const sideBarVals = sideBarObjects.map(item => Object.values(item))

    const { user } = useSelector((state) => state.session);

    const id = Number(user.id);


    return (
        <div className='home_page'>
            <div className='side_bar'>
                {sideBarItems.map(bar => 
                    (<li className='home_navbar_items'>{bar}</li>)
                )}
            </div>


            <div className='main_bar'>

                <div>
                    <p>Wallet Glance</p>
                        <picture className='wallet_container'>
                            <MyWallet />
                        </picture>
                    <p>Activity Glance</p>
                        <div className='activity_container'>
                            <Activity/>
                        </div>

                </div>
                <div className='left_column'>
                <p>Contacts Glance</p>
                    <div className='contacts_container_glance'>
                        <Contacts id='contacts'/>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Home