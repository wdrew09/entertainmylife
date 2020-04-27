import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, BrowserRouter as Router, Link } from 'react-router-dom';

import styles from './App.css';

import data from './firebaseData.json';
import firebase from './firebase'

import ListView from './container/ListView';
import Header from './components/Header';
import Footer from './components/Footer';

import AboutUs from './container/AboutUs';
import ContactUs from './container/ContactUs';
import Advertise from './container/Advertise';
import Disclosure from './container/Disclosure';
import Disclaimer from './container/Disclaimer';
import PrivacyPolicy from './container/PrivacyPolicy';
import PageNotFound from './container/PageNotFound';

import Article from './container/Article';

// import NotFound from 

const App = props => {

  let dataToSend = data.data

  useEffect(() => {
    firebase.firestore().collection('products').onSnapshot((snapshot) => {
      const returnData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      var db = firebase.firestore();
      let IDs = returnData.map(val => val.id)

      dataToSend.forEach(function (obj) {
        if (!IDs.includes(obj.id)) {
          db.collection("products").doc(obj.name).set({
            id: obj.id,
            name: obj.name,
            imageFolder: obj.imageFolder,
            displayPhoto: obj.displayPhoto,
            article: obj.article,
            tags: obj.tags,
            link: obj.link,
            date: obj.date
          })
            .then(function () {
              console.log("Document successfully written!");
            })
            .catch(function (error) {
              console.error("Error writing document: ", error);
            });
        }
      });



      // console.log(storage)
      // var pathReference = storage.ref('example/examplephoto.png');
      // var gsReference = storage.refFromURL('gs://bucket/example/examplephoto.png')
      // console.log(storage)
      // var starsRef = storage.child('example/examplephoto.png');

      // // Get the download URL
      // starsRef.getDownloadURL().then(function (url) {
      //   // Insert url into an <img> tag to "download"
      //   console.log(url)
      // })


    })
  }, [])


  let content = (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path="/"><ListView pageID={'homepage'} /></Route>
          <Route path="/tech/"><ListView pageID={'tech'} /></Route>
          <Route path="/gear/"><ListView pageID={'gear'} /></Route>
          <Route path="/fun/"><ListView pageID={'fun'} /></Route>
          <Route path="/under20/"><ListView pageID={'under20'} /></Route>
          <Route path="/pets/"><ListView pageID={'pets'} /></Route>
          <Route path="/kids/"><ListView pageID={'kids'} /></Route>
          <Route path="/home/"><ListView pageID={'home'} /></Route>
          <Route path="/shopsmall/"><ListView pageID={'shopsmall'} /></Route>
          <Route path="/aboutus/"><AboutUs/></Route>
          <Route path="/contactus/"><ContactUs/></Route>
          <Route path="/advertise/"><Advertise/></Route>
          <Route path="/disclosure/"><Disclosure/></Route>
          <Route path="/disclaimer/"><Disclaimer/></Route>
          <Route path="/privacypolicy/"><PrivacyPolicy/></Route>
          <Route path="/:name/:id" component={Article}></Route>
          <Route ><PageNotFound /></Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  )

  return (
    <div className='App'>
      {content}
    </div>

  );
}

export default App;



