import React, { useState, useEffect } from 'react';

import styles from './ListView.module.css';
import { Route, Switch, Redirect, BrowserRouter as Router, Link, NavLink } from 'react-router-dom';

import { faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Masonry from 'react-masonry-css'
import firebase from '../firebase';

import ListViewItem from '../components/ListViewItem';
import PageNotFound from './PageNotFound';
import ReactResizeDetector from 'react-resize-detector';

const ListView = props => {

    const [pageName, setPageName] = useState()
    const [dataList, setDataList] = useState()
    const [dataToSend, setDataToSend] = useState()
    const [activePage, setActivePage] = useState()
    const [pageCount, setPageCount] = useState()
    const [pageWidth, setPageWidth] = useState()
    const [cardsPerRow, setCardsPerRow] = useState(3)
    const [cardWidth, setCardWidth] = useState('350px')

    const pageList = ['homepage', 'tech', 'under20', 'fun', 'gear', 'pets', 'kids', 'home', 'shopsmall']
    const cardsPerPage = 25

    useEffect(() => {
        window.addEventListener("resize", resize())
        resize()
    }, [])

    useEffect(() => {
        setPageName(props.match.params.pagename)
        setDataToSend([])
    }, [props.match.params.pagename])

    useEffect(() => {
        setActivePage(Number(props.match.params.id))
        if (dataList) {
            settingSendData(props.match.params.id, dataList)
        }

        window.scrollTo({
            top: 0,
            behavior: "auto"
        });
    }, [props.match.params.id])

    let resize = () => {
        console.log('size')
    }

    useEffect(() => {
        if (pageName) {
            firebase.firestore().collection('products').onSnapshot((snapshot) => {
                const returnData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))
                if (pageName === 'homepage') {
                    let homeList = returnData.sort((a, b) => (a.id < b.id) ? 1 : -1)
                    setDataList(homeList)
                    setPageCount((Math.ceil(homeList.length / cardsPerPage)))
                    settingSendData(1, homeList)
                } else {
                    let tagFilter = returnData.filter(a => a.tags.includes(pageName.toLowerCase()))
                    let list = tagFilter.sort((a, b) => (a.id < b.id) ? 1 : -1)
                    setDataList(list)
                    setPageCount(list.length / cardsPerPage)
                    settingSendData(1, list)
                }

            })

            window.scrollTo({
                top: 0,
                behavior: "auto"
            });
        }
    }, [pageName])




    const settingSendData = (page, list) => {
        console.log(list)
        let tempList = []
        if (list) {
            for (let i = (page - 1) * cardsPerPage; i < page * cardsPerPage; i++) {
                if (list[i]) {
                    tempList.push(list[i])
                }
            }
        }
        console.log(tempList)
        setDataToSend(tempList)
    }

    const changingWidth = (width) => {
        if (pageWidth != width) {
            setPageWidth(width)
            if (pageWidth > 1250 && cardsPerRow != 3) {
                if (cardsPerRow != 3) {
                    setCardsPerRow(3)
                }
            } else if (pageWidth > 850 && pageWidth < 1251 && cardsPerRow != 2) {
                if (cardsPerRow != 2) {
                    setCardsPerRow(2)
                }
            }
            else if (pageWidth < 400 && pageWidth > 319 && cardWidth != 300) {
                setCardWidth(300)
            } else if (pageWidth < 320 && cardWidth != 250) {
                setCardWidth(250)
            }
            else {
                if (cardsPerRow != 1 && pageWidth < 851) {
                    setCardsPerRow(1)
                }
            }
        }
    }

    return (

        <div className={styles.Main}>
            {pageList.includes(pageName) ?
                <div className={styles.Main}>
                    <ReactResizeDetector handleWidth handleHeight onResize={(width, height) => changingWidth(width)} />
                    <Masonry
                        breakpointCols={cardsPerRow}
                        className={styles.MyMasonryGrid}
                        columnClassName={styles.MyMasonryGridColumn}>
                        {dataToSend && dataToSend.length > 0 &&
                            dataToSend.map(data => (
                                <div className={styles.EachItem} key={`DATA_${dataToSend.indexOf(data)}`} >
                                    < ListViewItem
                                        width={cardWidth}
                                        data={data}
                                    />
                                </div>
                            ))
                        }
                    </Masonry>
                    <div className={styles.Footer}>
                        {activePage != 1 ?
                            <NavLink activeClassName="active" to={`/${pageName}/${Number(activePage) - 1}`} ><button style={{ borderWidth: '1px' }} className={styles.PaginationButton}><FontAwesomeIcon icon={faAngleDoubleLeft} color='var(--main)' size="xs" /></button></NavLink>
                            :
                            <button style={{ borderWidth: '1px' }} disabled={true} className={styles.PaginationButton}><FontAwesomeIcon icon={faAngleDoubleLeft} color='var(--main)' size="xs" /></button>
                        }
                        {(activePage > 3) && <NavLink activeClassName="active" to={`/${pageName}/${1}`} ><button className={styles.PaginationButton}>1</button></NavLink>}
                        {(activePage - 3 > 1) && <button className={styles.PaginationButton}>...</button>}

                        {(activePage - 2 > 0) && <NavLink activeClassName="active" to={`/${pageName}/${Number(activePage) - 2}`} ><button className={styles.PaginationButton}>{activePage - 2}</button></NavLink>}
                        {(activePage - 1 > 0) && <NavLink activeClassName="active" to={`/${pageName}/${Number(activePage) - 1}`} ><button className={styles.PaginationButton}>{activePage - 1}</button></NavLink>}
                        <NavLink activeClassName="active" to={`/${pageName}/${activePage}`} ><button className={styles.PaginationButtonSelected}>{activePage}</button></NavLink>
                        {(activePage + 1 < pageCount) && <NavLink activeClassName="active" to={`/${pageName}/${Number(activePage) + 1}`} ><button className={styles.PaginationButton}>{`${Number(activePage) + 1}`}</button></NavLink>}
                        {(activePage + 2 < pageCount) && <NavLink activeClassName="active" to={`/${pageName}/${Number(activePage) + 2}`} ><button className={styles.PaginationButton}>{`${Number(activePage) + 2}`}</button></NavLink>}

                        {activePage + 3 < pageCount && <button className={styles.PaginationButton}>...</button>}
                        {(pageCount != 1 && activePage < pageCount) && <NavLink activeClassName="active" to={`/${pageName}/${pageCount}`} ><button className={styles.PaginationButton}>{pageCount}</button></NavLink>}

                        {activePage != pageCount ?
                            <NavLink activeClassName="active" to={`/${pageName}/${activePage + 1}`} ><button className={styles.PaginationButton}><FontAwesomeIcon icon={faAngleDoubleRight} color='var(--main)' size="xs" /></button></NavLink>
                            :
                            <button disabled={true} className={styles.PaginationButton}><FontAwesomeIcon icon={faAngleDoubleRight} color='var(--main)' size="xs" /></button>
                        }
                    </div>
                </div>
                :
                <PageNotFound />
            }
        </div >
    )
}

export default ListView