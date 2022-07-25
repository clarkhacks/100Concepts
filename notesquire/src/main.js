import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import firebase from '@/config/db.js'
firebase.auth().onAuthStateChanged(() => {
    createApp(App).use(router).mount('#app')
})
