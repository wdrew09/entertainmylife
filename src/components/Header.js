import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, BrowserRouter as Router, Link, NavLink } from 'react-router-dom';

import styles from './Header.module.css';

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ListView from '../container/ListView';

import firebase from '../firebase';

const Header = props => {
    const [newVal, setNewVal] = useState([])
    const [pic, setpic] = useState()

    // var storage = firebase.storage().ref('example/')
    // .getDownloadURL().then((url) => {
    //     setpic(url)
    // });
    // console.log(storage)




    // var storageRef = firebase.storage().ref("example");

    // storageRef.listAll().then(function(result) {
    //   result.items.forEach(function(imageRef) {
    //     imageRef.getDownloadURL().then(function(url) {
    //         console.log(url)
    //     })
    //   });
    // }).catch(function(error) {
    //   // Handle any errors
    // });

    return (
        <div>
            <div className={styles.TopButtons}>
                <button className={styles.SearchIcon}>
                    <FontAwesomeIcon icon={faSearch} color='black' size='lg' />
                </button>
            </div>

            <div className={styles.SectionButtons}>
                <NavLink activeClassName="active" to="/tech/"><button className={styles.SectionButtonsButton}>Tech</button></NavLink>
                <NavLink activeClassName="active" to="/gear/"><button className={styles.SectionButtonsButton}>Gear</button></NavLink>
                <NavLink activeClassName="active" to="/office/"><button className={styles.SectionButtonsButton}>Office</button></NavLink>
                <NavLink activeClassName="active" to="/under20/"><button className={styles.SectionButtonsButton}>Under 20</button></NavLink>

                <NavLink exact activeClassName="active" to="/"><img className={styles.LogoImage} src={"/EntertainMyLife1.jpg"} /></NavLink>

                <NavLink activeClassName="active" to="/pets/"><button className={styles.SectionButtonsButton}>Pets</button></NavLink>
                <NavLink activeClassName="active" to="/kids/"><button className={styles.SectionButtonsButton}>Kids</button></NavLink>
                <NavLink activeClassName="active" to="/home/"><button className={styles.SectionButtonsButton}>Home</button></NavLink>
                <NavLink activeClassName="active" to="/shopsmall/"><button className={styles.SectionButtonsButton}>Shop Small</button></NavLink>
            </div>

        </div>
    )
}

export default Header
