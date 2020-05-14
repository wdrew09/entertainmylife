import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, BrowserRouter as Router, Link, NavLink } from 'react-router-dom';

import firebase from '../firebase';
import styles from './Article.module.css';

import PageNotFound from './PageNotFound';

import ListViewItem from '../components/ListViewItem';
import SidebarItem from '../components/SidebarItem';
import ListView from './ListView';

import Masonry from 'react-masonry-css'


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

        firebase.firestore().collection('products').where("id", "==", parseFloat(props.match.params.id)).onSnapshot((snapshot) => {
            const returnData = snapshot.docs.map((doc) => ({
                ...doc.data()
            }))
            setData(...returnData)
        })

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
            let value = data.article.split('(add picture)')
            let finishedSplit = []
            value.map(val => {
                let index = value.indexOf(val)
                let newVal = val
                if (val.includes('(add paragraph)')) {
                    newVal = val.split('(add paragraph)')
                    console.log(newVal)
                } else {
                    newVal = [newVal]
                }

                console.log(newVal.length)
                value[index] = newVal
            })
            setSplitArticle(value)

            //Getting data for sidebar
            firebase.firestore().collection('products').where("tags", "array-contains", data.tags[0]).onSnapshot((snapshot) => {
                const sidebarData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))

                sidebarData.slice(0, 15)
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

    const cardsPerScreen = () => {
        if (window.innerWidth < 1000) {
            return 2
        } else {
            return 3
        }
    }

    if (data) {
        console.log(data.link)
    }
    return (
        <div className={styles.Main}>
            {data ?
                <div >
                    <div className={styles.ArticlePage}>
                        <div className={styles.Article}>
                            <span className={styles.Title}>{data.name}</span>
                            <span className={styles.Date}>{data.date}</span>
                            <span className={styles.Content}>
                                {splitArticle && splitArticle.map(value => (
                                    <div key={`DATA_${splitArticle.indexOf(value)}`}>
                                        <div style={{display: 'flex', flexDirection: 'column'}}>
                                            {value.map(eachP => (
                                                <span className={styles.EachParagraph}>{eachP}</span>
                                            ))}
                                        </div>
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
                                    sidebarData.indexOf(val) < 6 &&
                                    <div key={`SIDEBAR_VAL${sidebarData.indexOf(val)}`}>
                                        <SidebarItem data={val} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className={styles.MasonryDiv}>
                        <Masonry
                            breakpointCols={cardsPerScreen()}
                            className={styles.MyMasonryGrid}
                            columnClassName={styles.MyMasonryGridColumn}>
                            {sidebarData && sidebarData.length > 5 &&
                                sidebarData.map(val => (
                                    sidebarData.indexOf(val) > 0 &&
                                    <div className={styles.EachItem} key={`DATA_EACH_ITEM_${sidebarData.indexOf(val)}`} >
                                        < ListViewItem data={val} />
                                    </div>
                                ))
                            }
                        </Masonry>
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
