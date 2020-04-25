import React, { useState, useEffect } from 'react';

import styles from './ListView.module.css';

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import firebase from '../firebase';

import ListViewItem from '../components/ListViewItem';



const ListView = props => {
    const {
        pageID
    } = props
    // let newText = text.split('\n').map((item, i) => {
    //     return <p key={i}>{item}</p>;
    // });
    const [dataToSend, setDataToSend] = useState()

    useEffect(() => {
        firebase.firestore().collection('products').onSnapshot((snapshot) => {
            const returnData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
            setDataToSend(returnData.filter(a => a.tags.includes(pageID)))

        })
    }, [pageID])


    // var storageRef = firebase.storage().ref("example");

    // storageRef.listAll().then(function (result) {
    //     result.items.forEach(function (imageRef) {
    //         console.log(imageRef.name)
    //         imageRef.getDownloadURL().then(function (url) {
    //             // console.log(url)
    //         })
    //     });
    // }).catch(function (error) {
    //     // Handle any errors
    // });




    return (
        <div className={styles.Main}>
            <div className={styles.Content}>
                {dataToSend && dataToSend.length > 0 &&
                    dataToSend.map(data => (
                        <div key={`DATA_${dataToSend.indexOf(data)}`}>
                            < ListViewItem
                                data={data}
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ListView