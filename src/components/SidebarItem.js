import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, BrowserRouter as Router, Link, NavLink } from 'react-router-dom';

import styles from './SidebarItem.module.css';



import firebase from '../firebase';

const SidebarItem = props => {
    const {
        data
    } = props

    const [dipslayPicture, setDisplayPicture] = useState()

    useEffect(() => {
        setDisplayPicture()
        let imageName = firebase.storage().ref(data.imageFolder).child(data.displayPhoto)
        imageName.getDownloadURL().then(function (url) {
            let picture = { name: imageName.name, url: url }
            setDisplayPicture(picture)
        })
    }, [data.id])

    let dataURL = ''
    if (data) {
        if (data.name) {
            dataURL = "/" + data.name.replace(/\s/g, '-') + "/" + data.id;
        }
    }

    return (
        <NavLink to={{ pathname: dataURL, state: data }}>
            <div className={styles.Main}>
                {dipslayPicture ?
                    <img className={styles.Image} src={dipslayPicture.url} />
                    :
                    <img className={styles.ImageNotLoaded} src={"/EntertainMyLife1.jpg"} />
                }
                <hr style={{ width: '80%', backgroundColor: 'transparent', height: '0px', border: 'solid 1px var(--gray-2)', borderWidth: '1px 0px 0px 0px' }} />
                <div className={styles.Bottom}>
                    <span className={styles.Title}>{data.name}</span>
                    {/* <button className={styles.CheckItOut}>Check it Out!</button> */}
                </div>
            </div>
        </NavLink >

    )
}

export default SidebarItem
