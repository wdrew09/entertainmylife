import React, { useState, useEffect } from 'react';

import firebase from '../firebase';
import styles from './Article.module.css';
import { NavLink } from 'react-router-dom';

import PageNotFound from './PageNotFound';

import ListViewItem from '../components/ListViewItem';
import SidebarItem from '../components/SidebarItem';

import Masonry from 'react-masonry-css'

import ReactResizeDetector from 'react-resize-detector';

const Article = props => {

    const [data, setData] = useState()
    const [pics, setPics] = useState([])
    const [thisPic, setThisPic] = useState()
    const [splitArticle, setSplitArticle] = useState()
    const [pageWidth, setPageWidth] = useState()

    const [cardsPerRow, setCardsPerRow] = useState(3)
    const [cardWidth, setCardWidth] = useState('350px')
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
                    if (imageRef.name !== data.displayPhoto) {
                        imageRef.getDownloadURL().then(function (url) {
                            setThisPic(url)
                        })
                    }
                })
            })
            let value = data.article.split('(add picture)')
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

    // const cardsPerScreen = () => {
    //     if (window.innerWidth < 1000) {
    //         return 2
    //     } else {
    //         return 3
    //     }
    // }

    const changingWidth = (width) => {
        if (pageWidth !== width) {
            setPageWidth(width)
            if (pageWidth > 1250 && cardsPerRow != 3) {
                if (cardsPerRow !== 3) {
                    setCardsPerRow(3)
                }
            } else if (pageWidth > 850 && pageWidth < 1251 && cardsPerRow !== 2) {
                if (cardsPerRow !== 2) {
                    setCardsPerRow(2)
                }
            }
            else if (pageWidth < 400 && pageWidth > 319 && cardWidth !== 300) {
                setCardWidth(300)
            } else if (pageWidth < 320 && cardWidth !== 250) {
                setCardWidth(250)
            }
            else {
                if (cardsPerRow != 1 && pageWidth < 851) {
                    setCardsPerRow(1)
                }
            }
        }
    }

    const cardsPerRowFunc = () => {
        let width = window.innerWidth
        if (width > 1250) {
            if (cardWidth !== '350px') {
                setCardWidth('350px')
            }
            return 3
        } else if (width < 1251 && width > 850) {
            if (cardWidth !== '350px') {
                setCardWidth('350px')
            }
            return 2
        } else if (width > 650 && width < 851) {
            if (cardWidth !== '275px') {
                setCardWidth('275px')
            }
            return 2
        } else if (width > 399 && width < 651) {
            if (cardWidth !== '350px') {
                setCardWidth('350px')
            }
            return 1
        } else if (width < 400 && width > 319) {
            if (cardWidth !== '300px') {
                setCardWidth('300px')
            }
            return 1
        }
    }
    
    const tagsAdjust = () => {
        let newTags = []
        data.tags.map(tag => {
            if (tag === 'home') {newTags.push({display: 'Home', json: tag})}
            else if (tag === 'tech') {newTags.push({display: 'Tech', json: tag})}
            else if (tag === 'under20') {newTags.push({display: 'Under 20', json: tag})}
            else if (tag === 'fun') {newTags.push({display: 'Fun', json: tag})}
            else if (tag === 'gear') {newTags.push({display: 'Gear', json: tag})}
            else if (tag === 'pets') {newTags.push({display: 'Pets', json: tag})}
            else if (tag === 'kids') {newTags.push({display: 'Kids', json: tag})}
            else if (tag === 'shopsmall') {newTags.push({display: 'Shop Small', json: tag})}
        })
        return newTags
    }

    return (
        <div className={styles.Main}>
            <ReactResizeDetector handleWidth handleHeight onResize={(width, height) => changingWidth(width)} />
            {data ?
                <div >
                    <div className={styles.ArticlePage}>
                        <div className={styles.Article}>
                            <span className={styles.Title}>{data.name}</span>
                            <span className={styles.Date}>{data.date}</span>
                            <span className={styles.Content}>
                                {splitArticle && splitArticle.map(value => (
                                    <div key={`DATA_${splitArticle.indexOf(value)}`}>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            {value.map(eachP => (
                                                <span className={styles.EachParagraph}>{eachP}</span>
                                            ))}
                                        </div>
                                        <div>
                                            {splitArticle.indexOf(value) < splitArticle.length - 1 &&
                                                (pics[splitArticle.indexOf(value)] ?

                                                    <img className={styles.Image} src={pics[splitArticle.indexOf(value)]} alt={"Product Image"}/>
                                                    :
                                                    <img className={styles.ImageNotLoaded} src={"/EntertainMyLife1.jpg"} alt={"Logo"}/>
                                                )
                                            }
                                        </div>

                                    </div>

                                ))}
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <a target="_blank" href={data.link}><button className={styles.CheckItOut}>Check it Out!</button></a>
                                    <span style={{display: 'flex'}}>
                                        {tagsAdjust().map(tag => (
                                            <NavLink activeClassName="active" to={"/" + tag.json + "/1"}><button className={styles.Tags}>{tag.display}</button></NavLink>
                                        ))}
                                    </span>
                                </div>
                            </span>
                        </div>
                        <div className={styles.Sidebar}>
                            {sidebarData &&
                                sidebarData.map(val => (
                                    sidebarData.indexOf(val) < 4 &&
                                    <div key={`SIDEBAR_VAL${sidebarData.indexOf(val)}`}>
                                        <SidebarItem data={val} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className={styles.MasonryDiv}>
                        <Masonry
                            breakpointCols={cardsPerRowFunc()}
                            className={styles.MyMasonryGrid}
                            columnClassName={styles.MyMasonryGridColumn}>
                            {sidebarData && sidebarData.length > 0 &&
                                sidebarData.map(val => (
                                    sidebarData.indexOf(val) > 3 &&
                                    <div className={styles.EachItem} key={`DATA_EACH_ITEM_${sidebarData.indexOf(val)}`} >
                                        < ListViewItem data={val} width={cardWidth} />
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
