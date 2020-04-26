import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, BrowserRouter as Router, NavLink } from 'react-router-dom';

import styles from './Footer.module.css';

import { faArrowCircleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = props => {

    // var storage = firebase.storage().ref('example/examplephoto.png').getDownloadURL().then((url) => {
    //     setpic(url)
    // });

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
    return (
        <div className={styles.Main}>
            <div className={styles.Links}>
                <div className={styles.FirstHalf}>
                    <div>
                        <NavLink activeClassName="active" to="/tech/"><button className={styles.SectionButtonsButton}>Tech</button></NavLink>
                        <NavLink activeClassName="active" to="/gear/"><button className={styles.SectionButtonsButton}>Gear</button></NavLink>
                        <NavLink activeClassName="active" to="/fun/"><button className={styles.SectionButtonsButton}>Fun</button></NavLink>
                        <NavLink activeClassName="active" to="/under20/"><button className={styles.SectionButtonsButton}>Under 20</button></NavLink>
                    </div>
                    <div>
                        <NavLink activeClassName="active" to="/pets/"><button className={styles.SectionButtonsButton}>Pets</button></NavLink>
                        <NavLink activeClassName="active" to="/kids/"><button className={styles.SectionButtonsButton}>Kids</button></NavLink>
                        <NavLink activeClassName="active" to="/home/"><button className={styles.SectionButtonsButton}>Home</button></NavLink>
                        <NavLink activeClassName="active" to="/shopsmall/"><button className={styles.SectionButtonsButton}>Shop Small</button></NavLink>
                    </div>
                </div>
                <div className={styles.SecondHalf}>
                    <div>
                        <NavLink activeClassName="active" to="/aboutus/"><button className={styles.SectionButtonsButton}>About Us</button></NavLink>
                        <NavLink activeClassName="active" to="/contactus/"><button className={styles.SectionButtonsButton}>Contact Us</button></NavLink>
                        <NavLink activeClassName="active" to="/advertise/"><button className={styles.SectionButtonsButton}>Advertise</button></NavLink>
                    </div>
                    <div>
                        <NavLink activeClassName="active" to="/disclosure/"><button className={styles.SectionButtonsButton}>Disclosure</button></NavLink>
                        <NavLink activeClassName="active" to="/disclaimer/"><button className={styles.SectionButtonsButton}>Disclaimer</button></NavLink>
                        <NavLink activeClassName="active" to="/privacypolicy/"><button className={styles.SectionButtonsButton}>Privacy Policy</button></NavLink>
                    </div>
                </div>
            </div>
            <div className={styles.BackToTop}>
                <button onClick={() => scrollToTop()}><FontAwesomeIcon icon={faArrowCircleUp} color='white' size='2x' /></button>
                <span>Back to the Top!</span>
            </div>
        </div>
    )
}

export default Header