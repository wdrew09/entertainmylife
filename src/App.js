import React from 'react';
import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom';

import styles from './App.css';

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
import Submit from './container/Submit';

const App = props => {

  let content = (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path="/:pagename/:id" component={ListView}></Route>
          <Route path="/about-us/"><AboutUs /></Route>
          <Route path="/contact-us/"><ContactUs /></Route>
          <Route path="/advertise/"><Advertise /></Route>
          <Route path="/disclosure/"><Disclosure /></Route>
          <Route path="/disclaimer/"><Disclaimer /></Route>
          <Route path="/privacy-policy/"><PrivacyPolicy /></Route>
          <Route path="/article/:name/:id" component={Article}></Route>
          <Route path="/submit" component={Submit}></Route>
          <Redirect from="/:pagename" to="/:pagename/1" />
          <Redirect from="/" to="/homepage/1" />
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



// dataToSend.forEach(function (obj) {
//   // if (!IDs.includes(obj.id)) {
//     db.collection("products").doc(obj.name).set({
//       id: obj.id,
//       name: obj.name,
//       imageFolder: obj.imageFolder,
//       displayPhoto: obj.displayPhoto,
//       article: obj.article,
//       tags: obj.tags,
//       link: obj.link,
//       date: obj.date
//     })
//       .then(function () {
//         console.log("Document successfully written!");
//       })
//       .catch(function (error) {
//         console.error("Error writing document: ", error);
//       });
//   // }
// });



{/* <IfModule mod_rewrite.c>
RewriteEngine On
RewriteCond %{SERVER_PORT} !^443$
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</IfModule>

<IfModule mod_rewrite.c>
RewriteEngine On
RewriteCond %{HTTP_HOST} ^entertainmylife.site$
RewriteRule (.*) https://www.entertainmylife.site/$1 [R=301,L]
</IfModule> */}





// import * as functions from 'firebase-functions'
// import * as Storage from '@google-cloud/storage'
// import {tmpdir} from 'os'
// import {join, dirname} from 'path'
// import * as sharp from 'sharp'
// import * as fs from 'fs-extra'

// const gcs = Storage()

// export const generateThumbs = functions.storage
// .object()
// .onFinalize(async object => {
//     const bucket = gcs.bucket(object.bucket)
//     const filePath = object.name
//     const fileName = filePath.split('/').pop()
//     const bucketDir = dirname(filePath)
//     const workingDir = join(tmpdir(), 'thumbs')
//     const tmpFilePath = join(workingDir, 'source.png')

//     if (fileName.includes('thumb@') || !object.contentType.includes('image')) {
//         console.log('failed')
//         return false
//     }

//     await fs.ensureDir(workingDir)

//     await bucket.file(filePath).download({
//         destination: tmpFilePath
//     })

//     const sizes = [64, 128, 256]

//     const uploadPromises = sizes.map(async size => {
//         const thumbName = `thumb@${size}_${fileName}`
//         const thumbPath = join(workingDir, thumbName)

//         await sharp(tmpFilePath)
//         .resize(size, size)
//         .toFile(thumbPath)

//         return bucket.upload(thumbPath, {
//             destination: join(bucketDir, thumbName)
//         })
//     })

//     await Promise.all(uploadPromises)

//     return fs.remove(workingDir)
// })