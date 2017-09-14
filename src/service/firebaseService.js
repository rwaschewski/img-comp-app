import * as firebase from 'firebase'
// Initialize Firebase
var config = {
  apiKey: 'AIzaSyAvP46_9euNkNYcTGY29YCfrAyrTQujoQA',
  authDomain: 'image-compressor-pwa.firebaseapp.com',
  databaseURL: 'https://image-compressor-pwa.firebaseio.com',
  projectId: 'image-compressor-pwa',
  storageBucket: 'gs://image-compressor-pwa.appspot.com'
}
firebase.initializeApp(config)

export default {
  database: firebase.database()
}
