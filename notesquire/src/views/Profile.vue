<template>
  <section class="py-24 md:pb-32 bg-white"
    style="background-image: url('/assets/flex-ui-assets//elements/pattern-white.svg'); background-position: center;">
    <div class="container px-4 mx-auto md:max-w-5xl">
      <div class="max-w-4xl mx-auto mb-8 text-center">
        <span
          class="inline-block py-px px-2 mb-4 text-xs leading-5 text-green-500 bg-green-100 font-medium uppercase rounded-full shadow-sm">{{
              role
          }}</span>
        <h3 class="mb-4 text-3xl md:text-4xl leading-tight font-medium font-bold tracking-tighter">{{ name }}</h3>
        <p class="text-lg md:text-xl text-coolGray-500 font-medium">{{ bio }}</p>
      </div>
      <div class="mx-auto max-w-6xl">
        <div class="flex flex-wrap items-center justify-center mb-14 -mx-3">
          <div class="w-full md:w-1/3 px-3 mb-3 md:mb-0">
            <div class="relative">
              <img class="absolute top-1/2 left-4 transform -translate-y-1/2"
                src="/assets/flex-ui-assets//elements/blog/search.svg" alt=""><input
                class="w-full h-full py-3 pl-12 pr-4 text-coolGray-500 leading-tight placeholder-coolGray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 border border-coolGray-200 rounded-lg shadow-xsm"
                type="text" placeholder="Search" @input="searchNotes" id="searchInput">
            </div>
          </div>

        </div>
      </div>
<div v-for="note in noteList" v-bind:key="note" id="notesList">
        <div id="notesWrapper" class="flex flex-wrap items-center p-7 px-10 bg-coolGray-50 rounded-md" v-if="note.privacy != 'Hidden'">
        <div class="w-full md:w-auto mr-auto mb-6 md:mb-0">
          <h3 class="text-lg md:text-xl font-semibold">{{ note.name }}</h3>
        </div>
        <div class="w-full md:w-auto lg:mr-10 mb-6 md:mb-0">
          <div class="flex flex-wrap">
            <div class="inline-flex w-full lg:w-auto items-center"><span class="ml-2 font-medium text-coolGray-500">{{ note.date }}</span>
            </div>
          </div>
        </div>
        <div class="w-full md:w-auto"><a
            class="inline-block py-3 px-7 w-full md:w-auto text-lg leading-8 text-green-50 font-medium text-center bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md shadow-sm"
            :href="'/n/' + username + '/' + note.url">View Note</a></div>
      </div>
</div>
    </div>
  </section>
</template>

<script>
import firebase from '@/config/db.js';
export default {
  name: "Profile",
  data() {
    return {
      name: '',
      email: '',
      bio: '',
      role: '',
      noteList: [],
      uid: '',
      username: '',
    };
  },
  methods: {
    getUserProfile() {
      var username = this.$route.params.username;
      firebase
        .firestore()
        .collection('users')
        .where('username', '==', username)
        .get()
        .then(doc => {
          if (doc.docs[0].id.length > 0) {
            this.uid = doc.docs[0].id;
            firebase
              .firestore()
              .collection('users')
              .doc(doc.docs[0].id)
              .get()
              .then(doc => {
                this.name = doc.data().name;
                this.email = doc.data().email;
                this.bio = doc.data().bio;
                this.role = doc.data().role;
                this.username = doc.data().username;
              });
              this.getUserNotes();
          }
          else {
            this.$router.push('/404');
          }
        });
    },
    getUserNotes() {
      firebase
        .firestore()
        .collection('users')
        .doc(this.uid)
        .collection('notes')
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            this.noteList.push({
              name: doc.data().name,
              date: doc.data().createdOn.toDate().toLocaleDateString(),
              url: doc.data().url,
              privacy: doc.data().privacy,
            });
          });
        });
    },
    searchNotes() {
                  var searchInput = document.querySelector("#searchInput"),
                rows = document.querySelectorAll("#notesList #notesWrapper");


            [].forEach.call(rows, function (row) {
                if (rows.length > 5)
                    row.style.display = "none";
                var cells = row.querySelectorAll("h3, span"),
                    containsText = false;

                [].forEach.call(cells, function (cell) {
                    var text = cell.textContent.toLowerCase(),
                        search = searchInput.value.toLowerCase();

                    if (text.indexOf(search) != -1)
                        containsText = true;
                });
                if (containsText) {
                    row.style.display = "";
                }
                else {
                    row.style.display = "none";
                }
            });

    }
  },
      mounted() {
      this.getUserProfile();
    },
};
</script>

<style lang="scss" scoped>
</style>