import React, { useState, useEffect } from 'react';

import styles from './AboutUs.module.css';

const AboutUs = props => {

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "auto"
        });
    }, [])

    return (
        <div className={styles.Main}>
            <span className={styles.Title}>About Us</span>
            <span className={styles.Content}>At Entertain my Life, we want to bring you the very best products that the world has to offer. We're new here, which means we're still figuring this thing out but we think we have found some pretty cool and unique products to show off. We understand that sometimes life needs a little excitement and that's what we strive to provide. You may have noticed that we don't actually sell anything here, what we do is search through the internet, looking for the coolest and most exciting things to buy. Then, we show them off here. We're still growing, so keep your eyes open for new and exciting products each and every day. We appreciate that you've chosen us to find your next exciting thing and we will continue to make this site even more exciting every chance we get. </span>
            <span className={styles.Signature}>Thanks, the Entertain my Life team</span>
        </div>
    )
}

export default AboutUs
