import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import firebaseService from '@/service/firebaseService'

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
    ]
  },
  mutations: {
    // change state from users and loaded images
    setUser (state, payload) {
      state.user = payload
    },
    saveImage (state, payload) {
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
      const image = {
        name: payload.name,
        imageData: payload.data,
        id: payload.id
      }
      let imageUrl
      let key
      firebaseService.database().ref('compImg').push(image)
        .then((data) => {
          key = data.key
          return key
        })
        .then(key => {
          const filename = payload.img.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          return firebase.storage().ref('compImgs/' + key + '.' + ext).put(payload.img)
        })
        .then(fileData => {
          imageUrl = fileData.metadata.downloadURLs[0]
          return firebaseService.database().ref('compImgs').child(key).update({imageUrl: imageUrl})
        })
        .then(() => {
          commit('saveImage', {
            ...image,
            imageUrl: imageUrl,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
      // firebaseService.uploadImage(image)
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
    }
  }
})
