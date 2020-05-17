import React, { useEffect } from 'react';

import styles from './AboutUs.module.css';

import { NavLink } from 'react-router-dom';

const PrivacyPolicy = props => {

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "auto"
        });
    }, [])

    return (
        <div className={styles.Main}>
            <span className={styles.Title}>Privacy Policy</span>
            <span className={styles.Content}>We believe the privacy of everyone, not just ourselves and our visitors, is extremely important. We do not sell or distribute any of your personal information to a third party. If you have any further questions, feel free to <NavLink to={'/contact-us'}>contact us</NavLink>. This site is intended for users of at least 13 years old</span>
        </div>
    )
}

export default PrivacyPolicy