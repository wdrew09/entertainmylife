import React, { useState, useEffect } from 'react';

import styles from './Disclosure.module.css';
import { NavLink } from 'react-router-dom';


const Disclosure = props => {

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "auto"
        });
    }, [])

    return (
        <div className={styles.Main}>
            <span className={styles.Title}>Disclosure</span>
            <span className={styles.Content}>EntertainMyLife.com participates in multiple affiliate programs such as Amazon, Uncommon Goods, and more. This means we do not directly sell anything on EntertainMyLife.com. Instead, we earn a small commission when you use one of the links provided on this website in order to make a purchase on another site. We do this to help with expenses that help us grow. We make sure each and every site is trusted so you can have peace of mind with your online shopping. if you have any questions what so ever, feel free to <NavLink to={'/contact-us'}>contact us</NavLink></span>
        </div>
    )
}

export default Disclosure