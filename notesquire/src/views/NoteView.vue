<template>
  <section class="py-16 md:py-24 bg-white">
    <div class="container px-4 mx-auto" v-if="dataReady">
      <div class="md:max-w-2xl mx-auto mb-12 text-center">
        <div class="flex items-center justify-center">
          <p class="inline-block text-green-500 font-medium">{{ author }}</p>
          <span class="mx-1 text-green-500">•</span>
          <p class="inline-block text-green-500 font-medium">{{ date }}</p>
          <span class="mx-1 text-green-500">•</span>
          <p class="inline-block text-green-500 font-medium" @click="toggleDarkMode()"><span class="underline">{{ darkMode.mode }}</span> {{darkMode.icon}}</p>
        </div>
        <h2 class="mb-4 text-3xl md:text-5xl leading-tight text-darkCoolGray-900 font-bold tracking-tighter">
          {{ title }}
        </h2>
        <p class="mb-6 text-lg md:text-xl font-medium text-coolGray-500">
          {{ description }}
        </p>
      </div>
      <div class="mb-10 mx-auto max-w-max overflow-hidden rounded-lg"></div>
      <div class="md:max-w-3xl mx-auto">
        <p class="mb-8 pb-10 text-lg md:text-xl font-medium text-coolGray-500 border-b border-coolGray-100"
          style="white-space: pre-wrap">
          {{ note }}
        </p>
        <div class="flex items-center justify-center">
          <button
            class="inline-flex mr-4 items-center justify-center py-2 px-4 text-coolGray-300 hover:text-coolGray-400 bg-white hover:bg-coolGray-100 border border-coolGray-200 hover:border-coolGray-300 rounded-md shadow-md transition duration-200"
            @click="copyToClipboard">
            <svg width="20" height="16" viewbox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M15 13.8333H5C4.33696 13.8333 3.70108 13.5699 3.23224 13.1011C2.76339 12.6323 2.5 11.9964 2.5 11.3333V4.66667C2.5 4.44565 2.41221 4.23369 2.25592 4.07741C2.09964 3.92113 1.88768 3.83333 1.66667 3.83333C1.44566 3.83333 1.23369 3.92113 1.07741 4.07741C0.921133 4.23369 0.833336 4.44565 0.833336 4.66667V11.3333C0.833336 12.4384 1.27232 13.4982 2.05372 14.2796C2.44063 14.6665 2.89996 14.9734 3.40549 15.1828C3.91101 15.3922 4.45283 15.5 5 15.5H15C15.221 15.5 15.433 15.4122 15.5893 15.2559C15.7455 15.0996 15.8333 14.8877 15.8333 14.6667C15.8333 14.4457 15.7455 14.2337 15.5893 14.0774C15.433 13.9211 15.221 13.8333 15 13.8333ZM19.1667 6.28333C19.158 6.20678 19.1412 6.13136 19.1167 6.05833V5.98333C19.0766 5.89765 19.0232 5.81889 18.9583 5.75V5.75L13.9583 0.75C13.8894 0.68518 13.8107 0.631734 13.725 0.591667H13.65L13.3833 0.5H6.66667C6.00363 0.5 5.36774 0.763392 4.8989 1.23223C4.43006 1.70107 4.16667 2.33696 4.16667 3V9.66667C4.16667 10.3297 4.43006 10.9656 4.8989 11.4344C5.36774 11.9033 6.00363 12.1667 6.66667 12.1667H16.6667C17.3297 12.1667 17.9656 11.9033 18.4344 11.4344C18.9033 10.9656 19.1667 10.3297 19.1667 9.66667V6.33333C19.1667 6.33333 19.1667 6.33333 19.1667 6.28333ZM14.1667 3.34167L16.325 5.5H15C14.779 5.5 14.567 5.4122 14.4107 5.25592C14.2545 5.09964 14.1667 4.88768 14.1667 4.66667V3.34167ZM17.5 9.66667C17.5 9.88768 17.4122 10.0996 17.2559 10.2559C17.0996 10.4122 16.8877 10.5 16.6667 10.5H6.66667C6.44565 10.5 6.23369 10.4122 6.07741 10.2559C5.92113 10.0996 5.83334 9.88768 5.83334 9.66667V3C5.83334 2.77899 5.92113 2.56702 6.07741 2.41074C6.23369 2.25446 6.44565 2.16667 6.66667 2.16667H12.5V4.66667C12.5 5.32971 12.7634 5.96559 13.2322 6.43443C13.7011 6.90327 14.337 7.16667 15 7.16667H17.5V9.66667Z"
                fill="currentColor"></path>
            </svg><span class="ml-2 text-sm text-coolGray-500 hover:text-coolGray-600 font-medium">Copy Link</span>
          </button>
          <button
            class="inline-flex mr-2 h-9 w-9 items-center justify-center text-coolGray-500 hover:text-coolGray-600 bg-white hover:bg-coolGray-100 border border-coolGray-200 rounded-md shadow-md transition duration-200"
            @click="shareToFacebook">
            <svg width="10" height="18" viewbox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7.6 3.43332H9.16667V0.783318C8.40813 0.70444 7.64596 0.665497 6.88333 0.666651C4.61667 0.666651 3.06667 2.04998 3.06667 4.58332V6.76665H0.508333V9.73332H3.06667V17.3333H6.13333V9.73332H8.68333L9.06667 6.76665H6.13333V4.87498C6.13333 3.99998 6.36667 3.43332 7.6 3.43332Z"
                fill="currentColor"></path>
            </svg>
          </button>
          <button
            class="inline-flex mr-2 h-9 w-9 items-center justify-center text-coolGray-500 hover:text-coolGray-600 bg-white hover:bg-coolGray-100 border border-coolGray-200 rounded-md shadow-md transition duration-200"
            @click="shareToTwitter">
            <svg width="18" height="14" viewbox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M17.3333 1.83339C16.7069 2.10513 16.0445 2.28477 15.3667 2.36672C16.0818 1.93949 16.6177 1.26737 16.875 0.475053C16.203 0.875105 15.4673 1.15697 14.7 1.30839C14.1871 0.752196 13.5041 0.381966 12.7582 0.255762C12.0122 0.129558 11.2455 0.254518 10.5782 0.611044C9.91087 0.96757 9.38078 1.5355 9.07104 2.22575C8.76129 2.916 8.68941 3.68954 8.86667 4.42505C7.50786 4.35632 6.1787 4.00251 4.96555 3.3866C3.75239 2.77069 2.68237 1.90646 1.825 0.850052C1.52428 1.37519 1.36627 1.9699 1.36667 2.57505C1.3656 3.13704 1.50352 3.69057 1.76813 4.18636C2.03275 4.68215 2.41585 5.10481 2.88333 5.41672C2.33998 5.40194 1.80824 5.25613 1.33333 4.99172V5.03339C1.33741 5.82079 1.61333 6.58263 2.11443 7.19002C2.61553 7.79742 3.31105 8.21309 4.08333 8.36672C3.78605 8.45719 3.4774 8.50489 3.16667 8.50839C2.95158 8.50587 2.73702 8.48637 2.525 8.45005C2.74493 9.1274 3.17052 9.71934 3.74256 10.1435C4.31461 10.5677 5.00465 10.803 5.71667 10.8167C4.51434 11.7628 3.0299 12.2791 1.5 12.2834C1.22145 12.2843 0.943114 12.2676 0.666668 12.2334C2.22869 13.2419 4.04901 13.7773 5.90833 13.7751C7.19141 13.7884 8.46428 13.5459 9.6526 13.0618C10.8409 12.5777 11.9209 11.8616 12.8293 10.9555C13.7378 10.0493 14.4566 8.97121 14.9438 7.78414C15.431 6.59707 15.6767 5.32483 15.6667 4.04172C15.6667 3.90005 15.6667 3.75005 15.6667 3.60005C16.3206 3.11239 16.8846 2.51457 17.3333 1.83339V1.83339Z"
                fill="currentColor"></path>
            </svg>
          </button>
          <button v-if="signedIn"
            class="inline-flex mr-4 items-center justify-center py-2 px-4 text-coolGray-300 hover:text-coolGray-400 bg-white hover:bg-coolGray-100 border border-coolGray-200 hover:border-coolGray-300 rounded-md shadow-md transition duration-200"
            @click="logOut">
            <span class="text-sm text-coolGray-500 hover:text-coolGray-600 font-medium">Log Out</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import firebase from "@/config/db.js";
import copy from "copy-text-to-clipboard";
export default {
  name: "NoteView",
  data() {
    return {
      title: "",
      note: "",
      author: "",
      date: "",
      url: "",
      description: "",
      dataReady: false,
      signedIn: false,
      userName: "",
      darkMode: {
        mode: "Dark Mode",
        icon: "🌒",
      },
    };
  },
  created() {
    this.getNote();
  },
  methods: {
    getNote() {
      //get note from firebase storage
      var userName = this.$route.params.userName;
      this.userName = userName;
      var noteID = this.$route.params.noteId;
      firebase
        .firestore()
        .collection("users")
        .where("username", "==", userName)
        .get()
        .then((doc) => {
          if (doc.docs[0].id.length > 0) {
            console.log("User Exists");
            firebase
              .firestore()
              .collection("users")
              .doc(doc.docs[0].id)
              .collection("notes")
              .doc(noteID)
              .get()
              .then((doc) => {
                if (doc.exists) {
                  document.title = doc.data().name;
                  this.title = doc.data().name;
                  this.note = doc.data().content;
                  this.author = doc.data().author;
                  this.date = doc.data().createdOn.toDate().toLocaleDateString();
                  this.url = doc.data().url;
                  this.description = doc.data().description;
                  this.dataReady = true;
                } else {
                  console.log(userName + "/" + noteID + " 1does not exist");
                }
              });
          } else {
            console.log(userName + "/" + noteID + " does not exist");
          }
        })
        .catch((err) => {
          console.log("Error getting document", err);
        });
      // if user signed in
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.signedIn = true;
        } else {
          this.signedIn = false;
        }
      });
    },
    copyToClipboard() {
      copy("https://notesquire.wkmn.app/@" + this.userName + "/" + this.url);
    },
    shareToFacebook() {
      window.open(
        "https://www.facebook.com/sharer/sharer.php?u=https://notesquire.wkmn.app/@" + this.userName + "/" +
        this.url,
        "_blank"
      );
    },
    shareToTwitter() {
      window.open(
        "https://twitter.com/intent/tweet?text=Check out this note on notesquire.wkmn.app/@" + this.userName + "/" +
        this.url,
        "_blank"
      );
    },
    logOut() {
      firebase.auth().signOut();
    },
    toggleDarkMode(){
      // add/remove class to h2 text-white or text-white/text-coolGray-900
      // add/remove class to section bg-coolGray-900 or bg-white
      // add/remove class to p text-coolGray-500 or text-white
      if (this.darkMode.mode == "Dark Mode") {
        this.darkMode.mode = "Light Mode";
        this.darkMode.icon = "🌕";
        document.querySelector("h2").classList.add("text-white");
        document.querySelector("h2").classList.remove("text-darkCoolGray-900");
        document.querySelector("section").classList.add("bg-coolGray-900");
        var p = document.querySelectorAll("p");
        for (var i = 0; i < p.length; i++) {
          p[i].classList.add("text-white");
          p[i].classList.remove("text-coolGray-500");
        }
      } else {
        this.darkMode.mode = "Dark Mode";
        this.darkMode.icon = "🌒";
        document.querySelector("h2").classList.remove("text-white");
        document.querySelector("h2").classList.add("text-darkCoolGray-900");
        document.querySelector("section").classList.remove("bg-coolGray-900");
        var p = document.querySelectorAll("p");
        for (var i = 0; i < p.length; i++) {
          p[i].classList.remove("text-white");
          p[i].classList.add("text-coolGray-500");
        }
      }
    }
  }
};
</script>
