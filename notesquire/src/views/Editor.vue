<template>
  <section class="bg-coolGray-50 py-4">
    <div class="container px-4 mx-auto max-w-screen-md">
      <div
        class="p-6 h-full border border-coolGray-100 overflow-hidden bg-white rounded-md shadow-dashboard"
      >
        <div class="pb-6 border-b border-coolGray-100">
          <div class="flex flex-wrap items-center justify-between -m-2">
            <div class="w-full md:w-auto p-2 md:w-2/3">
              <span class="text-coolGray-900 text-lg font-semibold">
                <input
                  class="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                  type="text"
                  placeholder="New Note"
                  v-model="noteName"
                />
              </span>
              <span class="text-xs text-coolGray-500 font-medium mt-4">
                <input
                  class="mt-4 w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                  type="text"
                  placeholder="Description"
                  v-model="description"
                />
              </span>
            </div>
            <div class="w-full md:w-auto p-2">
              <div class="flex flex-wrap justify-between -m-1.5">
                <div class="w-full md:w-auto p-1.5">
                  <button
                    class="flex flex-wrap justify-center w-full px-4 py-2 font-medium text-sm text-coolGray-500 hover:text-coolGray-600 border border-coolGray-200 hover:border-coolGray-300 bg-white rounded-md shadow-button"
                  >
                    <p>Cancel</p>
                  </button>
                </div>
                <div class="w-full md:w-auto p-1.5">
                  <button
                    class="flex flex-wrap justify-center w-full px-4 py-2 bg-green-500 hover:bg-green-600 font-medium text-sm text-white border border-green-500 rounded-md shadow-button"
                    @click="checkIfUrlTaken"
                  >
                    <p>Save</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="py-6 border-b border-coolGray-100">
          <div class="w-full md:w-9/12">
            <div class="flex flex-wrap -m-3">
              <div class="w-full md:w-1/3 p-3">
                <p class="text-sm text-coolGray-800 font-semibold">Author</p>
              </div>
              <div class="w-full md:w-1/2 p-3">
                <input
                  class="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                  type="text"
                  placeholder="John Doe"
                  v-model="author"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="py-6 border-b border-coolGray-100">
          <div class="w-full md:w-9/12">
            <div class="flex flex-wrap -m-3">
              <div class="w-full md:w-1/3 p-3">
                <p class="text-sm text-coolGray-800 font-semibold">Link</p>
              </div>
              <div class="w-full md:flex-1 p-3">
                <div
                  class="flex items-center focus-within:border-green-500 overflow-hidden border border-coolGray-200 rounded-lg shadow-input"
                >
                  <p class="px-4 text-base text-coolGray-500 font-normal">/</p>
                  <input
                    class="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none border-l"
                    type="text"
                    placeholder="my-awesome-note"
                    @input="replaceSpecialCharacter"
                    v-model="url"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="pt-6">
          <div class="w-full md:w-5/6 mx-auto">
            <div class="flex flex-wrap -m-3">
              <div class="w-full p-3 md:flex-1">
                <textarea
                  class="block w-full h-64 p-6 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input resize-none"
                  placeholder="Write your note here..."
                  v-model="noteContent"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
import firebase from "@/config/db.js";
export default {
  name: "HomeView",
  components: {},
  data() {
    return {
      url: "",
      noteName: "",
      description: "",
      noteContent: "",
      author: "",
    };
  },
  methods: {
    replaceSpecialCharacter() {
      this.url = this.url.replace(/[^a-zA-Z0-9-]/g, "-");
    },
    randomName() {
      return "Note-" + Math.random().toString(36).substring(2, 7);
    },
    checkIfUrlTaken(){
      firebase.firestore().collection("notes").where("url", "==", this.url).get().then(function(querySnapshot) {
        if (querySnapshot.size > 0) {
          alert("URL already taken");
        }
        else {
          this.saveNote();
        }
      });
    },
    saveNote() {
      const user = firebase.auth().currentUser;
      const db = firebase.firestore();
      const todaysDate = new Date();
      const note = {
        url: this.url,
        author: this.author,
        name: this.noteName,
        description: this.description,
        content: this.noteContent,
        createdOn: todaysDate,
        owner: user.uid,
      };
      db.collection("notes").doc(this.url).set(note, { merge: true }).then(() => {
      this.$router.push("/n/" + this.url);
      });
    },
  },
  mounted() {
    this.url = this.randomName();
    this.noteName = this.url;
  },
};
</script>
