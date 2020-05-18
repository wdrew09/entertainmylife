import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';


import styles from './ListViewItem.module.css';

import firebase from '../firebase';

const ListViewItem = props => {
    const {
        data,
        width
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


        let i = data.article.split("(add picture)").join('')
        i = i.split("(add paragraph)").join('')
        setDisplayString(i.slice(0, 150) + '...')
    }, [data.id])

    let dataURL = ''
    if (data) {
        if (data.name) {
            dataURL = "/article/" + data.name.replace(/\s/g, '-') + "/" + data.id;
        }
    }

    return (
        <div className={styles.Main} style={{ width: width }}>
            {dipslayPicture ?
                <a target="_blank" href={data.link}><img style={{ width: width }} className={styles.Image} src={dipslayPicture.url} alt={data.name}/></a>
                :
                <img style={{ width: width }} className={styles.ImageNotLoaded} src={"/EntertainMyLife1.jpg"} alt={"Logo"}/>
            }
            <div className={styles.CardContent}>
                <h2 className={styles.Title}>{data.name}</h2>
                <h4 className={styles.String}>{displayString}</h4>
                <hr style={{ width: '300px', backgroundColor: 'transparent', height: '0px', border: 'solid 1px var(--gray-2)', borderWidth: '1px 0px 0px 0px' }} />
                {data.article.length > 400 ?
                    <NavLink to={{ pathname: dataURL, state: data }}>
                        <button className={styles.CheckItOut}>Check it Out!</button>
                    </NavLink>
                    :
                    <a target="_blank" href={data.link}><button className={styles.CheckItOut}>Check it Out!</button></a>
                }
            </div>
        </div>
    )
}

export default ListViewItem