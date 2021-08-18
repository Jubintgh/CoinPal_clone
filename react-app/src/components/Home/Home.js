import './Home.css';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import { NavLink } from 'react-router-dom';


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
        <div className='splash-page'>
        <picture id='left_column'>
        
        <div className='multi-image-container' alt='multiple-images'>
            <img id='top_pic_phone' src='https://images.ctfassets.net/gkyt4bl1j2fs/hVKddYw7KKDk1iNCMmDDx/fc9ecc28d15ae8e27049d7cac0484fc1/Homepage_Desktop_UI_Comp_01.png?w=1584&h=1751&q=50&fm=webp' alt='phone'/>
            <img id='buttom_pic_phone' className='pulse atoms-bits-bit__top-right' src='https://images.ctfassets.net/gkyt4bl1j2fs/7LkWsnq60LKKQdhEfOssFx/128192b4b693f6842bea2669c8965474/Homepage_Bit4.svg' alt='payment'/>
        </div>
        <button className='demo-button' onClick={onDemoSignIn}>Try Demo account!</button>
        <p>
            Sign up for PayPal and start checking out with crypto
            Get access to a new way to pay. Sign up for an account and checkout with crypto at millions of online stores with PayPal.
            Checking out with crypto is a taxable transaction. Fees and exchange rates will apply. 
            Buying and selling cryptocurrency is subject to a number of risks and PayPal does not make any recommendations. Consult your tax advisor.       
        </p>

        <div className='multi-image-container' alt='multiple-images'>
        <img className='top_pic' src='https://images.ctfassets.net/gkyt4bl1j2fs/1wFljDmY3Hs95mtTxhDDiB/caf4cd1a4be9643d519f6607922e58c0/Homepage_Desktop_Photo_03.png?w=811&h=1186&q=50&fm=webp' alt='shopping'/>
        <img className='buttom_pic' src='https://images.ctfassets.net/gkyt4bl1j2fs/20XuFiM31dZOXxGfQCLYuU/537ae7843c60d4540f9a0cca7bc3abb4/Group_4853__1_.png' alt='payment'/>
        </div>
        <NavLink to='/login'><button className='demo-button'>Log in!</button></NavLink>

        <img src='https://www.paypalobjects.com/marketing/web/us/en/intro-offer1/Hero_illustration_1x.png' alt='high-five'/>
        <p>
            With Venmo, settling up feels like catching up. Send and receive money with Venmo friends and express yourself in each payment note.
        </p>
        </picture>

        <picture id='right_column'>
        <p>
            Sign up for PayPal and start checking out with crypto
            Get access to a new way to pay. Sign up for an account and checkout with crypto at millions of online stores with PayPal.
            Checking out with crypto is a taxable transaction. Fees and exchange rates will apply. 
            Buying and selling cryptocurrency is subject to a number of risks and PayPal does not make any recommendations. Consult your tax advisor.       
        </p>
        <div className='multi-image-container' alt='multiple-images'>
            <img className='top_pic' src='https://images.ctfassets.net/gkyt4bl1j2fs/1SOpncxX1EsFEbTLtF5JtT/abe49ad118a88e13786c257fff3c9f45/Homepage_Desktop_Photo_01.jpg?w=900&h=1260&q=50&fm=webp' alt='phone'/>
            <img className='buttom_pic' src='https://images.ctfassets.net/gkyt4bl1j2fs/42PqTx8tnUNgE8b8Ghtmv7/d8eb929da8672c1ac8540c16d7764496/Payment_Note_-_small.png' alt='transaction'/>
        </div>
        <p>
            Coin Pal is inspired by paypal based on the idea of a Peer to Peer blockchain economy. 
            The main purpose of the app is to faciliate the transfer of crypto between the users without the need to include the wallet hash with each transaction(similar to Venmo). 
            This is a concept app and no real Crypto is being used.
        </p>
        <NavLink to='/sign-up'><button className='demo-button'>Sign up!</button></NavLink>

        <img src='https://www.paypalobjects.com/marketing/web/us/en/home/PPYL_Onsite_Homepage_Crypto_V1_052621_Desktop_Illustration_2x.png' alt='shopping'/>
        <p>
            Coin Pal is inspired by paypal based on the idea of a Peer to Peer blockchain economy. 
            The main purpose of the app is to faciliate the transfer of crypto between the users without the need to include the wallet hash with each transaction(similar to Venmo). 
            This is a concept app and no real Crypto is being used.
        </p>
        <div className='multi-image-container' alt='multiple-images'>
        <img className='top_pic' src='https://images.ctfassets.net/gkyt4bl1j2fs/38B4fTw9LjXOaIyFQAGRFd/3481fb642c77b718ac20db02d25fb077/Homepage_Desktop_Photo_02.jpg?w=1100&h=1700&q=50&fm=webp' alt='shopping'/>
        <img className='buttom_pic' src='https://images.ctfassets.net/gkyt4bl1j2fs/1CWEgxUjzkK0bjMMdib2ed/15e2b572904f645644e1bac714cb20f7/Group_5095__1_.png' alt='payment'/>
        </div>
        <p>
            With Venmo, settling up feels like catching up. Send and receive money with Venmo friends and express yourself in each payment note.
        </p>
        </picture>
        </div>
    )
}

export default Home