import React, { useState, useEffect } from 'react';

import styles from './PageNotFound.module.css';

const PageNotFound = props => {

    const [showLoading, setShowLoading] = useState(false)

    useEffect(() => {
        let timer1 = setTimeout(() => setShowLoading(true), 1000)

        return () => {
            clearTimeout(timer1)
        }
    }, [])

    useEffect(() => {

        window.scrollTo({
            top: 0,
            behavior: "auto"
        });
    }, [])

    return (
        <div className={styles.Main}>
            {showLoading &&
                <span className={styles.Title}>404 - Page Not Found</span>
            }
        </div>
    )
}

export default PageNotFound
