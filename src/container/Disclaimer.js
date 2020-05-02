import React, { useState, useEffect } from 'react';

import styles from './Disclaimer.module.css';

const Disclaimer = props => {

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "auto"
        });
    }, [])

    return (
        <div className={styles.Main}>
            <span className={styles.Title}>Disclaimer</span>
            <span className={styles.Content}>EntertainMyLife.com is not associated or affiliated with any of the products we list unless it is stated. Once you have left our site through one of our affiliate links or other sites, we have no control over what they might show or do. We make an effort to stay up to date to make sure we keep all of our links active and maintained but this does not guarantee that we get them all right. We also have no control over any of the products you may see on this site. We strive to only include the best products available, but once you leave this site to go to another, we have no ability to control what happens.</span>
        </div>
    )
}

export default Disclaimer