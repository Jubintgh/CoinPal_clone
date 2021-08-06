import React from 'react';
import { IconContext } from 'react-icons';
import { FaLinkedin, FaAngellist, FaGithub } from 'react-icons/fa';
import { MdWeb } from 'react-icons/md';
import './Footer.css';
// import AK from '../../public/'

const Footer = () => {
  return (
    <div className='main-footer'>
      <IconContext.Provider value={{ className: 'react-icons' }}>
        <div className='footer-container'>
          <div>

          </div>
          <div className='footer-content-row-1'>
            <div className='footer-col-link'>
              <a href={'https://github.com/Jubintgh/CoinPal_clone'}>About</a>
            </div>
            <div className='footer-col-link'>
              <a href={'https://github.com/Jubintgh?tab=repositories'}>Other Projects</a>
            </div>
            <div className='footer-col-link'>
              <a href={'https://github.com/Jubintgh/CoinPal_clone'}>Resume</a>
            </div>
            <div className='footer-col-link'>
              <a href={'https://github.com/Jubintgh/CoinPal_clone'}>Contact</a>
            </div>
            <div className='footer-col-row1'>
              <img alt="jubinPic" className='footer-profilePic' src='https://avatars.githubusercontent.com/u/73211975?v=4' />
              <h3>Jubin Taghdir</h3>
              <div className='footer-row-row2'>
                <a rel="noreferrer" href='https://github.com/Jubintgh' target='_blank'>
                  <FaGithub />
                </a>
                <a rel="noreferrer" href='https://angel.co/u/jubin-taghdir' target='_blank'>
                  <FaAngellist />
                </a>
                <a rel="noreferrer" href='https://github.com/Jubintghr' target='_blank'>
                  <MdWeb />
                </a>
                <a
                  rel="noreferrer"
                  href='https://www.linkedin.com/in/jubintaghdir/'
                  target='_blank'
                >
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </div>
        </div>
      </IconContext.Provider>
    </div>
  );
};

export default Footer;
