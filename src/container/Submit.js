import React, { useState, useEffect } from 'react';

import styles from './Submit.module.css';

import firebase from '../firebase';

import ImageUploading from "react-images-uploading";

const Submit = props => {

    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [loginErrorMessage, setLoginErrorMessage] = useState('')

    const [prodName, setProdName] = useState('')
    const [imageFolderName, setImageFolderName] = useState('')
    const [article, setArticle] = useState('')
    const [tags, setTags] = useState([])
    const [link, setLink] = useState('')
    const [date, setDate] = useState('')
    const [images, setImages] = useState([])
    const [submitErrorMessage, setSubmitErrorMessage] = useState('')

    const [storageFolderNames, setStorageFolderNames] = useState('')
    const [firestoreNames, setFirestoreNames] = useState('')
    const [highestID, setHighestID] = useState(0)
    const [articleCursorPosition, setArticleCursorPosition] = useState(0)

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "auto"
        });

        setFirebaseData()
        firebase.auth().signOut()
    }, [])

    const setFirebaseData = () => {
        firebase.storage().ref('/').listAll().then(function (result) {
            result.prefixes.forEach(function (folder) {
                setStorageFolderNames([...storageFolderNames, folder.location.path])
            })
        })

        let tempHighId = 0
        firebase.firestore().collection('products').onSnapshot((snapshot) => {
            snapshot.docs.map((doc) => {
                setFirestoreNames([...firestoreNames, doc.data().name])
                // console.log(doc.data().name, doc.data().id)
                if (doc.data().id > tempHighId) {
                    tempHighId = doc.data().id
                }
            })
            setHighestID(tempHighId)
        })
    }

    const auth = firebase.auth()

    const maxNumber = 10;
    const maxMbFileSize = 1;

    const availableTags = ['tech', 'under20', 'fun', 'gear', 'pets', 'kids', 'home', 'shopsmall']

    const onLogin = () => {
        let promise = auth.signInWithEmailAndPassword(email, pass)
        promise.then(() => loginSuccess())
            .catch(() => setLoginErrorMessage('Incorrect email or password'));
        setPass('')
    }

    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
        }
    })

    const loginSuccess = () => {
        setEmail('')
        setPass('')
        setLoginErrorMessage('')
    }

    const addedTag = (val) => {
        if (!tags.includes(val)) {
            setTags([...tags, val])
        }
    }

    const checkVals = () => {
        if (firestoreNames.includes(prodName) || prodName.length < 5) {
            setSubmitErrorMessage('this product name is already being used or is less than 5 characters')
            return false
        }
        if (storageFolderNames.includes(imageFolderName) || imageFolderName.length < 5) {
            setSubmitErrorMessage('this image folder name is already being used or is less than 5 characters')
            return false
        }
        if (!images.length > 0) {
            setSubmitErrorMessage('must add some images')
            return false
        }
        if (article.length < 100) {
            setSubmitErrorMessage('must make article longer')
            return false
        }
        if (tags.length < 1) {
            setSubmitErrorMessage('must add some tags')
            return false
        }
        if (link.length < 5) {
            setSubmitErrorMessage('must add a link')
            return false
        }
        if (date.length < 5) {
            setSubmitErrorMessage('must add a date')
            return false
        }
        let articlePicCount = article.split('(add picture)').length - 1
        let picCount = images.length - 1
        if (articlePicCount !== picCount) {
            setSubmitErrorMessage('pics added minus the display pic is not the same as pics used in article')
            return false
        }
        return true
    }

    const fileAdded = (imageList) => {
        setImages(imageList)
    }

    const setArticleFunc = (val) => {
        setArticle(val.value)
        setArticleCursorPosition(val.selectionStart)
    }

    const addArticleValue = (type) => {
        setArticle([article.slice(0, articleCursorPosition), type, article.slice(articleCursorPosition)].join(''))
    }

    const logoutClicked = () => {
        auth.signOut()
    }

    const addAnotherClicked = () => {
        setProdName('')
        setImageFolderName('')
        setArticle('')
        setTags([])
        setLink('')
        setDate('')
        setImages([])
        setSubmitErrorMessage('')

        setStorageFolderNames('')
        setFirestoreNames('')
        setHighestID(0)
        setArticleCursorPosition(0)

        setFirebaseData()
    }


    const submitClicked = () => {
        if (!checkVals()) { return }

        firebase.firestore().collection("products").doc(prodName).set({
            id: highestID + 1,
            name: prodName,
            imageFolder: imageFolderName,
            displayPhoto: images[0].file.name,
            article: article.toString(),
            tags: tags,
            link: link,
            date: date
        })
            .then(function () {
                setSubmitErrorMessage('success');
            })
            .catch(function (error) {
                setSubmitErrorMessage('error');
            });

        images.map(image => {
            let storageRef = firebase.storage().ref(imageFolderName + '/' + image.file.name)
            storageRef.put(image.file)
        })

        let ref = firebase.database().ref('/' + prodName)
        ref.set({
            id: highestID + 1,
            name: prodName,
            imageFolder: imageFolderName,
            displayPhoto: images[0].file.name,
            article: article.toString(),
            tags: tags,
            link: link,
            date: date
        })
    }

    console.log(highestID)

    return (
        <div className={styles.Main}>
            {!isLoggedIn ?
                <div className={styles.Login}>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder={'email'}></input>
                    <input value={pass} type={"password"} onChange={(e) => setPass(e.target.value)} placeholder={'password'}></input>
                    <button onClick={() => onLogin()}>Sign In</button>
                    <span>{loginErrorMessage}</span>
                </div>
                :
                <div className={styles.Submit}>
                    <input value={prodName} placeholder={"Name"} onChange={(e) => setProdName(e.target.value)}></input>
                    <input style={{ marginBottom: '10px' }} value={imageFolderName} placeholder={"Image Folder Name"} onChange={(e) => setImageFolderName(e.target.value)}></input>

                    <ImageUploading
                        onChange={fileAdded}
                        maxNumber={maxNumber}
                        multiple
                        maxFileSize={maxMbFileSize}
                        acceptType={["jpg", "gif", "png"]}
                    >
                        {({ imageList, onImageUpload, onImageRemoveAll }) => (
                            <div>
                                <button onClick={onImageUpload}>Upload images</button>
                                <button onClick={onImageRemoveAll}>Remove all images</button>

                                {imageList.map((image) => (
                                    <div key={image.key}>
                                        <img src={image.dataURL} />
                                        <button onClick={image.onUpdate}>Update</button>
                                        <button onClick={image.onRemove}>Remove</button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </ImageUploading>

                    <div style={{ display: 'flex', margin: 'auto', marginTop: '15px' }}>
                        <textarea onClick={(e) => setArticleFunc(e.target)} value={article} placeholder={"Article"} onChange={(e) => setArticleFunc(e.target)}></textarea>
                        <div style={{ marginLeft: '0px', display: 'flex', flexDirection: 'column', marginTop: '100px' }}>
                            <button onClick={() => addArticleValue('(add paragraph)')}>add paragraph</button>
                            <button onClick={() => addArticleValue('(add picture)')} style={{ marginTop: '10px' }}>add picture</button>
                            <span style={{marginTop: '10px'}}>character count: {article.length}</span>
                        </div>
                    </div>
                    <select onChange={(e) => addedTag(e.target.value)}>
                        {availableTags.map(val => {
                            return (<option key={availableTags.indexOf(val)}>{val}</option>)
                        })}
                    </select>
                    {tags.length > 0 &&
                        tags.map(tag => (
                            <span style={{ marginLeft: '10px' }}>{tag}</span>
                        ))
                    }
                    <button style={{ width: '100px', backgroundColor: 'red', margin: 'auto', color: 'white' }} onClick={() => setTags([])}>clear all tags</button>
                    <input value={link} placeholder={"Link"} onChange={(e) => setLink(e.target.value)}></input>
                    <input value={date} placeholder={"May 15th, 2020"} onChange={(e) => setDate(e.target.value)}></input>
                    {submitErrorMessage !== 'success' ?
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <button className={styles.SubmitButton} style={{ width: '100px', margin: 'auto', marginTop: '20px' }} onClick={() => submitClicked()}>Submit</button>
                            <span>{submitErrorMessage}</span>
                            <button style={{ width: '100px', margin: 'auto', marginTop: '100px', backgroundColor: 'red', color: 'white' }} onClick={() => logoutClicked()}>logout</button>
                        </div>
                        :
                        <div style={{ display: 'flex', margin: 'auto', marginTop: '20px', flexDirection: 'column' }}>
                            <button className={styles.SubmitButton} style={{ width: '200px', margin: 'auto', marginTop: '20px' }} onClick={() => addAnotherClicked()}>create another</button>
                            <span>{submitErrorMessage}</span>
                            <button style={{ width: '100px', margin: 'auto', marginTop: '100px', backgroundColor: 'red', color: 'white' }} onClick={() => logoutClicked()}>logout</button>
                        </div>
                    }

                </div>
            }
        </div>
    )
}

export default Submit