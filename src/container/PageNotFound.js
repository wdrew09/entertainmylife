import React, { useState, useEffect } from 'react';

import styles from './PageNotFound.module.css';

const PageNotFound = props => {

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "auto"
        });
    }, [])

    return (
        <div className={styles.Main}>
            <span className={styles.Title}>404 - Page Not Found</span>
        </div>
    )
}

export default PageNotFound
