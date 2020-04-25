import React, { useState, useEffect } from 'react';

import styles from './ListViewItem.module.css';

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import firebase from '../firebase';



const ListViewItem = props => {
    const {
        data
    } = props

    const [dipslayPicture, setDisplayPicture] = useState()
    const [displayString, setDisplayString] = useState()
    // console.log(data.imageFolder)

    useEffect(() => {
        setDisplayPicture()
        var storageRef = firebase.storage().ref(data.imageFolder);

        storageRef.listAll().then(function (result) {
            result.items.forEach(function (imageRef) {
                if (imageRef.name === data.displayPhoto) {
                    imageRef.getDownloadURL().then(function (url) {
                        let picture = { name: imageRef.name, url: url }
                        setDisplayPicture(picture)
                    })
                }
            });
        }).catch(function (error) {
            // Handle any errors
        });

        let i = data.article.split('\n').join('')
        setDisplayString(i.slice(0, 150) + '...')
    }, [data.id])

    console.log(dipslayPicture)

    return (
        <div className={styles.Main}>
            {dipslayPicture ?
                <img className={styles.Image} src={dipslayPicture.url} />
                :
                <img className={styles.ImageNotLoaded} src={"/EntertainMyLife1.jpg"} />
            }
            <div className={styles.CardContent}>
                <span className={styles.Title}>{data.name}</span>
                <span className={styles.String}>{displayString}</span>
                <hr style={{ width: '300px', backgroundColor: 'transparent', height: '0px', border: 'solid 1px var(--gray-2)', borderWidth: '1px 0px 0px 0px' }} />
                <button className={styles.CheckItOut}>Check it Out!</button>
            </div>
        </div>
    )
}

export default ListViewItem