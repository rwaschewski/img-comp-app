import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
// import firebaseService from '@/service/firebaseService'

Vue.use(Vuex)

export const store = new Vuex.Store({
  // statemanagement of users and their saved images
  state: {
    user: null,
    loadedImages: [
      {
        id: '',
        name: '',
        data: ''
      }
    ],
    imageUrl: ''
  },
  mutations: {
    // change state from users and loaded images
    setUser (state, payload) {
      state.user = payload
    },
    setImage (state, payload) {
      state.loadedImages.push(payload)
    }
  },
  actions: {
    // register new User with email and password and push data to firebase
    signUserUp ({commit}, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          const newUser = {
            id: user.uid,
            savedImages: []
          }
          commit('setUser', newUser)
          console.log(newUser)
        }
      )
      .catch(
        error => {
          // error handling
          console.log(error)
        }
      )
    },
    // Sign in with User Account and save user state
    signUserIn ({commit}, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            const newUser = {
              id: user.uid,
              // saved Images have to get from firebase storage
              savedImages: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            console.log(error)
          }
        )
    },
    saveImage ({commit}, payload) {
      // save the compressed image and push the data to firebase
      console.log('[ImageBlob]: ' + payload.file.blob)
      const image = {
        name: payload.file.name,
        blob: payload.file.blob,
        url: payload.url
      }
      console.log('[ImageBlob]: ' + image.blob)
      var authUser = firebase.auth().currentUser
      var currentUser

      if (authUser !== null && currentUser !== undefined) {
        // User is signed in
        currentUser = authUser
        // userName = this.state.user.displayName
      } else {
        // No user is signed in.
        currentUser = { name: 'anonymous', email: 'anonymous' }
      }
      // console.log(this.state.user)
      var storageRef = firebase.storage().ref()
      // Create Blob from imagefile
      let blob = new Blob([image.blob], {type: 'image/jpeg'})
      // Create the file metadata
      var metadata = {
        contentType: 'image/jpeg'
      }
      // Define Path to image
      var pathRef = 'images/' + currentUser.email + '/' + image.name
      // Upload file and metadata to the object 'images/mountains.jpg'
      var uploadTask = storageRef.child(pathRef).put(blob, metadata)
      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function (snapshot) {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused')
              break
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running')
              break
          }
        }, function (error) {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              alert('[Firebase] You have no permission to get access to this file')
              break
            case 'storage/canceled':
              // User canceled the upload
              alert('[Firebase] Upload canceled')
              break
            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              console.error(error.serverResponse)
              break
          }
        }, function () {
        // Upload completed successfully, now we can get the download URL
          alert('Dein Bild wurde komprimiert. Du kannst es mit Rechtsklick, oder langem Druck auf dem Bild, herunterladen.')
          var downloadUrl = storageRef.child(pathRef).getDownloadURL().then(function (url) {
            // `url` is the download URL
            // This can be downloaded directly:
            var xhr = new XMLHttpRequest()
            xhr.responseType = 'blob'
            xhr.onload = function (event) {
              var blob = xhr.response
              return blob
            }
            xhr.open('GET', url)
            xhr.send()
            this.state.imageUrl = url
          }).catch(function (error) {
            // Handle any errors
            switch (error.code) {
              case 'storage/object_not_found':
                // File doesn't exist
                alert('[Firebase] File not found')
                break
              case 'storage/unauthorized':
                // User doesn't have permission to access the object
                alert('[Firebase] You have no permission to get access to this file')
                break
              case 'storage/canceled':
                // User canceled the upload
                alert('[Firebase] Download canceled')
                break
              case 'storage/unknown':
                // Unknown error occurred, inspect the server response
                console.error(error.code)
                break
            }
          })
          .then(() => {
            commit('saveImage', {
              ...image,
              imageUrl: downloadUrl
            })
          })
        })
    }
  },
  getters: {
    loadedImages (state) {
      return state.loadedImages.sort((imageA, imageB) => {
        return imageA.date > imageB.date
      })
    },
    user (state) {
      return state.user
    },
    imageUrl (state) {
      return state.imageUrl
    }
  }
})
