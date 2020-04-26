import React, { useState, useEffect } from 'react';

import styles from './ContactUs.module.css';

const ContactUs = props => {

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "auto"
        });
    }, [])

    return (
        <div className={styles.Main}>
            <span className={styles.Title}>Contact Us</span>
            <span className={styles.Content}>For any questions, comments, copyright issues, press inquires, or anything else, please contact us at contact@entertainmylife.com </span>
            <hr/>
            <span className={styles.Content}><strong className={styles.Bold}>Note:</strong> If you have any questions, comments, or concerns about a product that you have purchased, please contact the company you purchased it from.</span>
        </div>
    )
}

export default ContactUs