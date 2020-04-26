import React, { useState, useEffect } from 'react';

import styles from './Advertise.module.css';

const Advertise = props => {

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "auto"
        });
    }, [])

    return (
        <div className={styles.Main}>
            <span className={styles.Title}>Advertise</span>
            <span className={styles.Content}>Did you know you could advertise your product here on entertainmylife.com? For information, please contact advertise@entertainmylife.com</span>
        </div>
    )
}

export default Advertise