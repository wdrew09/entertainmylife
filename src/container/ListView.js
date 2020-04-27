import React, { useState, useEffect } from 'react';

import styles from './ListView.module.css';

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Masonry from 'react-masonry-css'

import firebase from '../firebase';

import ListViewItem from '../components/ListViewItem';


const ListView = props => {
    const {
        pageID
    } = props

    const [dataToSend, setDataToSend] = useState()

    useEffect(() => {
        firebase.firestore().collection('products').onSnapshot((snapshot) => {
            const returnData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))

            if (pageID === 'homepage') {
                setDataToSend(returnData.sort((a, b) => (a.id < b.id) ? 1 : -1))
            } else {
                let tagFilter = returnData.filter(a => a.tags.includes(pageID.toLowerCase()))
                setDataToSend(tagFilter.sort((a, b) => (a.id < b.id) ? 1 : -1))
            }
            
        })

        window.scrollTo({
            top: 0,
            behavior: "auto"
        });
    }, [pageID])

    return (
        <div className={styles.Main}>
            <Masonry
                breakpointCols={3}
                className={styles.MyMasonryGrid}
                columnClassName={styles.MyMasonryGridColumn}>
                {dataToSend && dataToSend.length > 0 &&
                    dataToSend.map(data => (
                        <div className={styles.EachItem} key={`DATA_${dataToSend.indexOf(data)}`} >
                            < ListViewItem
                                data={data}
                            />
                        </div>
                    ))
                }
            </Masonry>
        </div >
    )

}

export default ListView