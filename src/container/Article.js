import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, BrowserRouter as Router, Link, NavLink } from 'react-router-dom';

import firebase from '../firebase';
import styles from './Article.module.css';

const Article = props => {

    const [data, setData] = useState()
    const [pics, setPics] = useState()

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "auto"
        });

        if (!props.location.state) {
            firebase.firestore().collection('products').where("id", "==", parseFloat(props.match.params.id)).onSnapshot((snapshot) => {
                const returnData = snapshot.docs.map((doc) => ({
                    ...doc.data()
                }))
                setData(...returnData)
            })
        } else {
            setData(props.location.state)
        }

        
    }, [props.match.params.id])


    return (
        <div className={styles.Main}>
            {data ?
                <div>
                    <div className={styles.Article}>
                        <span className={styles.Title}>{data.name}</span>
                        <span className={styles.Content}>{data.article}</span>
                    </div>
                    <div className={styles.SideBar}>

                    </div>
                </div>
                :
                <div>
                    404 page not found :(
                </div>
            }
        </div>
    )
}

export default Article