import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, BrowserRouter as Router, Link, NavLink } from 'react-router-dom';


import styles from './ListViewItem.module.css';

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import firebase from '../firebase';

import Article from '../container/Article';



const ListViewItem = props => {
    const {
        data
    } = props

    const [dipslayPicture, setDisplayPicture] = useState()
    const [displayString, setDisplayString] = useState()

    useEffect(() => {
        setDisplayPicture()
        let imageName = firebase.storage().ref(data.imageFolder).child(data.displayPhoto)
        imageName.getDownloadURL().then(function (url) {
                let picture = { name: imageName.name, url: url }
                setDisplayPicture(picture)
            })


        let i = data.article.split('\n').join('')
        setDisplayString(i.slice(0, 150) + '...')
    }, [data.id])

    let dataURL = ''
    if (data) {
        if (data.name) {
            dataURL = "/" + data.name.replace(/\s/g, '-') + "/" + data.id;
        }
    }

    return (
        <div className={styles.Main}>
            {dipslayPicture ?
                <a target="_blank" href={data.link}><img className={styles.Image} src={dipslayPicture.url} /></a>
                :
                <img className={styles.ImageNotLoaded} src={"/EntertainMyLife1.jpg"} />
            }
            <div className={styles.CardContent}>
                <span className={styles.Title}>{data.name}</span>
                <span className={styles.String}>{displayString}</span>
                <hr style={{ width: '300px', backgroundColor: 'transparent', height: '0px', border: 'solid 1px var(--gray-2)', borderWidth: '1px 0px 0px 0px' }} />
                <NavLink to={{ pathname: dataURL, state: data }}>
                    <button className={styles.CheckItOut}>Check it Out!</button>
                </NavLink>
            </div>
        </div>
    )
}

export default ListViewItem