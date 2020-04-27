import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, BrowserRouter as Router, Link, NavLink } from 'react-router-dom';

import firebase from '../firebase';
import styles from './Article.module.css';

import PageNotFound from './PageNotFound';

import ListViewItem from '../components/ListViewItem';
import SidebarItem from '../components/SidebarItem';
import ListView from './ListView';

const Article = props => {

    const [data, setData] = useState()
    const [pics, setPics] = useState([])
    const [thisPic, setThisPic] = useState()
    const [splitArticle, setSplitArticle] = useState()

    const [sidebarData, setSidebarData] = useState()

    useEffect(() => {
        setPics([])
    }, [])

    useEffect(() => {
        setPics([])
        window.scrollTo({
            top: 0,
            behavior: "auto"
        });

        // if (!props.location.state) {
            firebase.firestore().collection('products').where("id", "==", parseFloat(props.match.params.id)).onSnapshot((snapshot) => {
                const returnData = snapshot.docs.map((doc) => ({
                    ...doc.data()
                }))
                setData(...returnData)
            })
        // } else {
        //     setData(props.location.state)
        // }






    }, [props.match.params.id])

    useEffect(() => {
        // Setting the current pic while looping over images array for this product
        if (data) {
            firebase.storage().ref(data.imageFolder).listAll().then(function (result) {
                result.items.forEach(function (imageRef) {
                    if (imageRef.name != data.displayPhoto) {
                        imageRef.getDownloadURL().then(function (url) {
                            setThisPic(url)
                        })
                    }
                })
            })
            let value = data.article.split('\n')
            setSplitArticle(value)

            //Getting data for sidebar
            firebase.firestore().collection('products').where("tags", "array-contains", data.tags[0]).onSnapshot((snapshot) => {
                const sidebarData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))

                sidebarData.slice(0, 5)
                setSidebarData(sidebarData.filter(a => a.id !== data.id))
            })
        }
    }, [data])

    useEffect(() => {
        if (thisPic && !pics.includes(thisPic)) {
            if (!pics) {
                setPics(thisPic)
            } else {
                setPics([...pics, thisPic])
            }
        }
    }, [thisPic])

    console.log(data)

    return (
        <div className={styles.Main}>
            {data ?
                <div className={styles.ArticlePage}>
                    <div className={styles.Article}>
                        <span className={styles.Title}>{data.name}</span>
                        <span className={styles.Date}>{data.date}</span>
                        <span className={styles.Content}>
                            {splitArticle && splitArticle.map(value => (
                                <div key={`DATA_${splitArticle.indexOf(value)}`}>
                                    <span className={styles.EachParagraph}>{value}</span>
                                    <div>
                                        {splitArticle.indexOf(value) < splitArticle.length - 1 &&
                                            (pics[splitArticle.indexOf(value)] ?

                                                <img className={styles.Image} src={pics[splitArticle.indexOf(value)]} />
                                                :
                                                <img className={styles.ImageNotLoaded} src={"/EntertainMyLife1.jpg"} />
                                            )
                                        }
                                    </div>

                                </div>
                                
                            ))}
                            <a target="_blank" href={data.link}><button className={styles.CheckItOut}>Check it Out!</button></a>
                        </span>
                    </div>
                    <div className={styles.Sidebar}>
                        {sidebarData &&
                            sidebarData.map(val => (
                                <div>
                                    <SidebarItem data={val} />
                                </div>
                            ))

                        }

                    </div>
                </div>
                :
                <div>
                    <PageNotFound />
                </div>
            }
        </div>
    )
}

export default Article