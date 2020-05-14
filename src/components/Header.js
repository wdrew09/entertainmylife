import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, BrowserRouter as Router, Link, NavLink } from 'react-router-dom';

import styles from './Header.module.css';

import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ReactResizeDetector from 'react-resize-detector';
import { slide as Menu } from 'react-burger-menu'


const Header = props => {

    const [pageWidth, setPageWidth] = useState()

    useEffect(() => {
        setPageWidth(window.innerWidth)
    }, [])

    const changingWidth = (width) => {
        if (pageWidth != width) {
            setPageWidth(width)
        }
    }

    var menuStyles = {
        bmBurgerButton: {
            position: 'absolute',
            width: '36px',
            height: '30px',
            left: '36px',
            top: '36px',
        },
        bmBurgerBars: {
            background: '#373a47'
        },
        bmBurgerBarsHover: {
            background: '#a90000'
        },
        bmCrossButton: {
            height: '24px',
            width: '24px'
        },
        bmCross: {
            background: '#bdc3c7'
        },
        bmMenuWrap: {
            position: 'absolute',
            height: '100%'
        },
        bmMenu: {
            background: '#373a47',
            padding: '2.5em 1.5em 0',
            fontSize: '1.15em',
            marginTop: '-35px',
        },
        bmMorphShape: {
            fill: '#373a47'
        },
        bmItemList: {
            color: '#b8b7ad',
            padding: '0.8em',
            display: 'flex',
            flexDirection: 'column'
        },
        bmItem: {
            display: 'inline-block'
        },
        bmOverlay: {
            background: 'rgba(0, 0, 0, 0.3)',
            marginTop: '-35px'
        }
    }

    return (
        <div>
            <ReactResizeDetector handleWidth handleHeight onResize={(width, height) => changingWidth(width)} />

            {pageWidth < 1100 ?
                <div>
                    <NavLink exact activeClassName="active" to="/homepage/1"><img className={styles.LogoImage} src={"/Entertain_My_Life_01.png"} /></NavLink>
                    <Menu styles={menuStyles} customBurgerIcon={<FontAwesomeIcon style={{ margin: '0px 0px 0px 10px' }} icon={faBars} color='black' size='1x' />}>
                        <NavLink activeClassName="active" to="/tech/1"><button className={styles.MenuButton}>Tech</button></NavLink>
                        <NavLink activeClassName="active" to="/under20/1"><button className={styles.MenuButton}>Under 20</button></NavLink>
                        <NavLink activeClassName="active" to="/fun/1"><button className={styles.MenuButton}>Fun</button></NavLink>
                        <NavLink activeClassName="active" to="/gear/1"><button className={styles.MenuButton}>Gear</button></NavLink>


                        <NavLink activeClassName="active" to="/pets/1"><button className={styles.MenuButton}>Pets</button></NavLink>
                        <NavLink activeClassName="active" to="/kids/1"><button className={styles.MenuButton}>Kids</button></NavLink>
                        <NavLink activeClassName="active" to="/home/1"><button className={styles.MenuButton}>Home</button></NavLink>
                        <NavLink activeClassName="active" to="/shopsmall/1"><button className={styles.MenuButton}>Shop Small</button></NavLink>
                    </Menu>
                </div>
                :
                <div>
                    <div className={styles.TopButtons}>
                        {/* <button className={styles.SearchIcon}>
                    <FontAwesomeIcon icon={faSearch} color='black' size='lg' />
                </button> */}

                    </div>
                    <div className={styles.SectionButtons}>

                        <NavLink activeClassName="active" to="/tech/1"><button className={styles.SectionButtonsButton}>Techs</button></NavLink>
                        <NavLink activeClassName="active" to="/under20/1"><button className={styles.SectionButtonsButton}>Under 20</button></NavLink>
                        <NavLink activeClassName="active" to="/fun/1"><button className={styles.SectionButtonsButton}>Fun</button></NavLink>
                        <NavLink activeClassName="active" to="/gear/1"><button className={styles.SectionButtonsButton}>Gear</button></NavLink>

                        <NavLink exact activeClassName="active" to="/homepage/1"><img className={styles.LogoImage} src={"/Entertain_My_Life_01.png"} /></NavLink>

                        <NavLink activeClassName="active" to="/pets/1"><button className={styles.SectionButtonsButton}>Pets</button></NavLink>
                        <NavLink activeClassName="active" to="/kids/1"><button className={styles.SectionButtonsButton}>Kids</button></NavLink>
                        <NavLink activeClassName="active" to="/home/1"><button className={styles.SectionButtonsButton}>Home</button></NavLink>
                        <NavLink activeClassName="active" to="/shopsmall/1"><button className={styles.SectionButtonsButton}>Shop Small</button></NavLink>
                    </div>
                </div>
            }

        </div>
    )
}

export default Header
