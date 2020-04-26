import React, { useState, useEffect } from 'react';

import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/firebase-storage'

var firebaseConfig = {
    apiKey: "AIzaSyCBeBmU8XvO7QckDyoUCAJSGpTzAO4l24Y",
    authDomain: "entertainmylife-dc14c.firebaseapp.com",
    databaseURL: "https://entertainmylife-dc14c.firebaseio.com",
    projectId: "entertainmylife-dc14c",
    storageBucket: "entertainmylife-dc14c.appspot.com",
    messagingSenderId: "348936309614",
    appId: "1:348936309614:web:ef05df72951f05c031cf7f",
    measurementId: "G-HTMRKZWLF6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//   firebase.analytics();


export default firebase



// {
//     "id": 1,
//     "name": "Bouncy Ball",
//     "imageFolder": "bouncyBall",
//     "displayPhoto": "bouncyBall2.jpg",
//     "article": "Bouncy Ball enatis congue nibh porttitor sed. Nam rhoncus, ligula vel elementum facilisis, lectus nunc placerat arcu, quis egestas lacus massa interdum ante. Integer nisl ex, blandit sit amet odio nec, sollicitudin mattis leo. Nullam pretium aliquam metus quis viverra. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per\n inceptos himenaeos. Aliquam facilisis neque non dolor tincidunt, nec elementum metus condimentum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam lobortis erat sed rutrum luctus. Maecenas imperdiet ac neque non venenatis. Aenean aliquet semper purus, eget semper turpis consectetur sed. Nunc sollicitudin sapien lectus, id tempor enim mollis at.\n Donec tincidunt nisl a porta tristique. Curabitur quis eros vehicula, molestie libero vitae, congue eros. Nunc sit amet mi non urna elementum tincidunt. Aliquam vel sem porttitor, ultrices nisi non, placerat massa. Sed tristique felis sed varius laoreet. Nullam ultricies, nulla eget porta ultrices, quam urna hendrerit erat, non ultricies nibh ex vitae ante. Nullam nulla orci, viverra sed urna sed, accumsan scelerisque tortor. Pellentesque aliquet ornare aliquet. Etiam et nunc sit amet mi auctor tincidunt. Aliquam aliquam ornare ligula. Curabitur porttitor faucibus nisi, eu accumsan dolor porttitor sit amet.",
//     "tags": ["home", "under20"],
//     "link": "https://www.amazon.com/Pllieay-Pieces-Jet-Bouncy-Filler-Children/dp/B074Z8C8RP/ref=sr_1_2?dchild=1&keywords=bouncy+ball&qid=1587748761&sr=8-2",
//     "data": "March 10, 2020"
// },
// {
//     "id": 2,
//     "name": "Water Bottle",
//     "imageFolder": "waterBottle",
//     "displayPhoto": "waterBottle1.jpg",
//     "article": "Water Bottle enatis congue nibh porttitor sed. Nam rhoncus, ligula vel elementum facilisis, lectus nunc placerat arcu, quis egestas lacus massa interdum ante. Integer nisl ex, blandit sit amet odio nec, sollicitudin mattis leo. Nullam pretium aliquam metus quis viverra. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per\n inceptos himenaeos. Aliquam facilisis neque non dolor tincidunt, nec elementum metus condimentum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam lobortis erat sed rutrum luctus. Maecenas imperdiet ac neque non venenatis. Aenean aliquet semper purus, eget semper turpis consectetur sed. Nunc sollicitudin sapien lectus, id tempor enim mollis at.\n Donec tincidunt nisl a porta tristique. Curabitur quis eros vehicula, molestie libero vitae, congue eros. Nunc sit amet mi non urna elementum tincidunt. Aliquam vel sem porttitor, ultrices nisi non, placerat massa. Sed tristique felis sed varius laoreet. Nullam ultricies, nulla eget porta ultrices, quam urna hendrerit erat, non ultricies nibh ex vitae ante. Nullam nulla orci, viverra sed urna sed, accumsan scelerisque tortor. Pellentesque aliquet ornare aliquet. Etiam et nunc sit amet mi auctor tincidunt. Aliquam aliquam ornare ligula. Curabitur porttitor faucibus nisi, eu accumsan dolor porttitor sit amet.",
//     "tags": ["office", "under20", "kids"],
//     "link": "https://www.amazon.com/Contigo-2063294-Autoseal-Chill-Bottle/dp/B07P5P5HLW/ref=sr_1_2_sspa?dchild=1&keywords=water+bottle&qid=1587749396&sr=8-2-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUFXOTNRMTMyUEYyN0smZW5jcnlwdGVkSWQ9QTA0MDI0NDEzSk9RSVNFMFNXNUxaJmVuY3J5cHRlZEFkSWQ9QTAzOTk4MTMxSEtIRlpLUjNSNTdXJndpZGdldE5hbWU9c3BfYXRmJmFjdGlvbj1jbGlja1JlZGlyZWN0JmRvTm90TG9nQ2xpY2s9dHJ1ZQ==",
//     "data": "March 11, 2020"
// },
// {
//     "id": 3,
//     "name": "Cool Clock",
//     "imageFolder": "coolClock",
//     "displayPhoto": "coolClock3.jpg",
//     "article": "Cool Clock enatis congue nibh porttitor sed. Nam rhoncus, ligula vel elementum facilisis, lectus nunc placerat arcu, quis egestas lacus massa interdum ante. Integer nisl ex, blandit sit amet odio nec, sollicitudin mattis leo. Nullam pretium aliquam metus quis viverra. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per\n inceptos himenaeos. Aliquam facilisis neque non dolor tincidunt, nec elementum metus condimentum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam lobortis erat sed rutrum luctus. Maecenas imperdiet ac neque non venenatis. Aenean aliquet semper purus, eget semper turpis consectetur sed. Nunc sollicitudin sapien lectus, id tempor enim mollis at.\n Donec tincidunt nisl a porta tristique. Curabitur quis eros vehicula, molestie libero vitae, congue eros. Nunc sit amet mi non urna elementum tincidunt. Aliquam vel sem porttitor, ultrices nisi non, placerat massa. Sed tristique felis sed varius laoreet. Nullam ultricies, nulla eget porta ultrices, quam urna hendrerit erat, non ultricies nibh ex vitae ante. Nullam nulla orci, viverra sed urna sed, accumsan scelerisque tortor. Pellentesque aliquet ornare aliquet. Etiam et nunc sit amet mi auctor tincidunt. Aliquam aliquam ornare ligula. Curabitur porttitor faucibus nisi, eu accumsan dolor porttitor sit amet.",
//     "tags": ["home", "under20", "tech"],
//     "link": "https://www.amazon.com/Contigo-2063294-Autoseal-Chill-Bottle/dp/B07P5P5HLW/ref=sr_1_2_sspa?dchild=1&keywords=water+bottle&qid=1587749396&sr=8-2-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUFXOTNRMTMyUEYyN0smZW5jcnlwdGVkSWQ9QTA0MDI0NDEzSk9RSVNFMFNXNUxaJmVuY3J5cHRlZEFkSWQ9QTAzOTk4MTMxSEtIRlpLUjNSNTdXJndpZGdldE5hbWU9c3BfYXRmJmFjdGlvbj1jbGlja1JlZGlyZWN0JmRvTm90TG9nQ2xpY2s9dHJ1ZQ==",
//     "data": "March 12, 2020"
// },
// {
//     "id": 4,
//     "name": "Headphones",
//     "imageFolder": "headphones",
//     "displayPhoto": "headphones1.jpg",
//     "article": "Headphones enatis congue nibh porttitor sed. Nam rhoncus, ligula vel elementum facilisis, lectus nunc placerat arcu, quis egestas lacus massa interdum ante. Integer nisl ex, blandit sit amet odio nec, sollicitudin mattis leo. Nullam pretium aliquam metus quis viverra. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per\n inceptos himenaeos. Aliquam facilisis neque non dolor tincidunt, nec elementum metus condimentum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam lobortis erat sed rutrum luctus. Maecenas imperdiet ac neque non venenatis. Aenean aliquet semper purus, eget semper turpis consectetur sed. Nunc sollicitudin sapien lectus, id tempor enim mollis at.\n Donec tincidunt nisl a porta tristique. Curabitur quis eros vehicula, molestie libero vitae, congue eros. Nunc sit amet mi non urna elementum tincidunt. Aliquam vel sem porttitor, ultrices nisi non, placerat massa. Sed tristique felis sed varius laoreet. Nullam ultricies, nulla eget porta ultrices, quam urna hendrerit erat, non ultricies nibh ex vitae ante. Nullam nulla orci, viverra sed urna sed, accumsan scelerisque tortor. Pellentesque aliquet ornare aliquet. Etiam et nunc sit amet mi auctor tincidunt. Aliquam aliquam ornare ligula. Curabitur porttitor faucibus nisi, eu accumsan dolor porttitor sit amet.",
//     "tags": ["home", "under20", "tech"],
//     "link": "https://www.amazon.com/Contigo-2063294-Autoseal-Chill-Bottle/dp/B07P5P5HLW/ref=sr_1_2_sspa?dchild=1&keywords=water+bottle&qid=1587749396&sr=8-2-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUFXOTNRMTMyUEYyN0smZW5jcnlwdGVkSWQ9QTA0MDI0NDEzSk9RSVNFMFNXNUxaJmVuY3J5cHRlZEFkSWQ9QTAzOTk4MTMxSEtIRlpLUjNSNTdXJndpZGdldE5hbWU9c3BfYXRmJmFjdGlvbj1jbGlja1JlZGlyZWN0JmRvTm90TG9nQ2xpY2s9dHJ1ZQ==",
//     "data": "March 13, 2020"
// }