import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Footer.module.css';

import { faArrowCircleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ReactResizeDetector from 'react-resize-detector';

const Footer = props => {

    const [pageWidth, setPageWidth] = useState()

    useEffect(() => {
        setPageWidth(window.innerWidth)
    }, [])

    const changingWidth = (width) => {
        if (pageWidth !==width) {
            setPageWidth(width)
        }
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
    console.log(pageWidth)
    return (
        <div className={styles.Main}>
            {pageWidth > 600 ?
                <div className={styles.ComputerStyle}>
                    <div className={styles.Links}>
                        <div className={styles.FirstHalf}>
                            <div>
                                <NavLink activeClassName="active" to="/tech/1"><button className={styles.SectionButtonsButton}>Tech</button></NavLink>
                                <NavLink activeClassName="active" to="/gear/1"><button className={styles.SectionButtonsButton}>Gear</button></NavLink>
                                <NavLink activeClassName="active" to="/fun/1"><button className={styles.SectionButtonsButton}>Fun</button></NavLink>
                                <NavLink activeClassName="active" to="/under20/1"><button className={styles.SectionButtonsButton}>Under 20</button></NavLink>
                            </div>
                            <div>
                                <NavLink activeClassName="active" to="/pets/1"><button className={styles.SectionButtonsButton}>Pets</button></NavLink>
                                <NavLink activeClassName="active" to="/kids/1"><button className={styles.SectionButtonsButton}>Kids</button></NavLink>
                                <NavLink activeClassName="active" to="/home/1"><button className={styles.SectionButtonsButton}>Home</button></NavLink>
                                <NavLink activeClassName="active" to="/shopsmall/1"><button className={styles.SectionButtonsButton}>Shop Small</button></NavLink>
                            </div>
                        </div>
                        <div className={styles.SecondHalf}>
                            <div>
                                <NavLink activeClassName="active" to="/about-us/"><button className={styles.SectionButtonsButton}>About Us</button></NavLink>
                                <NavLink activeClassName="active" to="/contact-us/"><button className={styles.SectionButtonsButton}>Contact Us</button></NavLink>
                                <NavLink activeClassName="active" to="/advertise/"><button className={styles.SectionButtonsButton}>Advertise</button></NavLink>
                            </div>
                            <div>
                                <NavLink activeClassName="active" to="/disclosure/"><button className={styles.SectionButtonsButton}>Disclosure</button></NavLink>
                                <NavLink activeClassName="active" to="/disclaimer/"><button className={styles.SectionButtonsButton}>Disclaimer</button></NavLink>
                                <NavLink activeClassName="active" to="/privacy-policy/"><button className={styles.SectionButtonsButton}>Privacy Policy</button></NavLink>
                            </div>
                        </div>
                    </div>
                    <div className={styles.BackToTop}>
                        <button style={{height: '50px'}} onClick={() => scrollToTop()}><FontAwesomeIcon icon={faArrowCircleUp} color='white' size='2x' /></button>
                        <span>Back to the Top!</span>
                        <ReactResizeDetector handleWidth handleHeight onResize={(width, height) => changingWidth(width)} />
                    </div>
                </div>
                :
                <div className={styles.MobileStyle}>
                    <div>
                        <NavLink activeClassName="active" to="/tech/1"><button className={styles.SectionButtonsButton}>Tech</button></NavLink>
                        <NavLink activeClassName="active" to="/gear/1"><button className={styles.SectionButtonsButton}>Gear</button></NavLink>
                        <NavLink activeClassName="active" to="/fun/1"><button className={styles.SectionButtonsButton}>Fun</button></NavLink>
                        <NavLink activeClassName="active" to="/under20/1"><button className={styles.SectionButtonsButton}>Under 20</button></NavLink>

                        <NavLink activeClassName="active" to="/pets/1"><button className={styles.SectionButtonsButton}>Pets</button></NavLink>
                        <NavLink activeClassName="active" to="/kids/1"><button className={styles.SectionButtonsButton}>Kids</button></NavLink>
                        <NavLink activeClassName="active" to="/home/1"><button className={styles.SectionButtonsButton}>Home</button></NavLink>
                        <NavLink activeClassName="active" to="/shopsmall/1"><button className={styles.SectionButtonsButton}>Shop Small</button></NavLink>
                    </div>
                    <div>
                        <NavLink activeClassName="active" to="/about-us/"><button className={styles.SectionButtonsButton}>About Us</button></NavLink>
                        <NavLink activeClassName="active" to="/contact-us/"><button className={styles.SectionButtonsButton}>Contact Us</button></NavLink>
                        <NavLink activeClassName="active" to="/advertise/"><button className={styles.SectionButtonsButton}>Advertise</button></NavLink>

                        <NavLink activeClassName="active" to="/disclosure/"><button className={styles.SectionButtonsButton}>Disclosure</button></NavLink>
                        <NavLink activeClassName="active" to="/disclaimer/"><button className={styles.SectionButtonsButton}>Disclaimer</button></NavLink>
                        <NavLink activeClassName="active" to="/privacy-policy/"><button className={styles.SectionButtonsButton}>Privacy Policy</button></NavLink>
                    </div>
                    <ReactResizeDetector handleWidth handleHeight onResize={(width, height) => changingWidth(width)} />
                </div>
            }
        </div>
    )
}

export default Footer