<template>
  <section class="overflow-hidden min-h-full">
    <NavBar :name="user.name" :email="user.email" :username="user.username"></NavBar>
    <div class="xl:ml-80">
      <section class="bg-white py-4">
        <div class="container px-4 mx-auto">
          <div>
            <div class="p-6 pb-0 h-full overflow-hidden bg-white rounded-t-md">
              <div class="pb-6 border-b border-coolGray-100">
                <div class="flex flex-wrap items-center justify-between -m-2">
                  <div class="w-full p-2">
                    <h2 class="text-coolGray-900 text-lg font-semibold">New Note</h2>
                    <p class="text-xs text-coolGray-500 font-medium">Create a new note to share with the world, or not.
                    </p>
                  </div>
                </div>
              </div>


              <div class="py-6 border-b border-coolGray-100">
                <div class="w-full md:w-10/12">
                  <div class="flex flex-wrap -m-3">
                    <div class="w-full md:w-1/3 p-3">
                      <p class="text-sm text-coolGray-800 font-semibold">Note Details</p>
                    </div>
                    <div class="w-full md:flex-1 p-3">
                      <div class="flex flex-wrap -m-3">
                        <div class="w-full p-3 md:w-2/3">
                          <p class="mb-1.5 font-medium text-base text-coolGray-800">Note Title</p>
                          <input
                            class="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                            type="text" placeholder="Note Title" v-model="title">
                        </div>
                        <div class="w-full p-3 md:w-1/3">
                          <p class="mb-1.5 font-medium text-base text-coolGray-800">Note Privacy</p>
                          <div class="relative">
                            <select
                              class="appearance-none w-full py-2.5 px-4 text-coolGray-900 text-base font-normal bg-white border outline-none border-coolGray-200 focus:border-green-500 rounded-lg shadow-input"
                              v-model="privacy">
                              <option>Public</option>
                              <option>Hidden</option>
                            </select>
                          </div>
                        </div>
                        <div class="w-full md:flex-1 p-3">
                          <p class="mb-1.5 font-medium text-base text-coolGray-800">Note Url</p>
                          <div
                            class="flex items-center focus-within:border-green-500 overflow-hidden border border-coolGray-200 rounded-lg shadow-input">
                            <p class="px-4 text-base text-coolGray-500 font-normal">/</p>
                            <input
                              class="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none border-l"
                              type="text" placeholder="my-awesome-note" @input="replaceSpecialCharacter"
                              v-model="url" />
                          </div>
                        </div>
                        <div class="w-full p-3">
                          <p class="mb-1.5 font-medium text-base text-coolGray-800">Description</p>
                          <input
                            class="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                            type="text" placeholder="Quick note description." v-model="description">
                        </div>

                        <div class="w-full p-3">
                          <p class="mb-1.5 font-medium text-base text-coolGray-800">Content</p>
                          <textarea
                            class="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input no-resize"
                            rows="10" placeholder="Your note content..." v-model="content" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="p-6 bg-white bg-opacity-60 rounded-b-md">
              <div class="w-full md:w-10/12">
                <div class="flex flex-wrap justify-end -m-1.5">
                  <div class="w-full md:w-auto p-1.5">
                    <button
                      class="flex flex-wrap justify-center w-full px-4 py-2 font-medium text-sm text-coolGray-500 hover:text-coolGray-600 border border-coolGray-200 hover:border-coolGray-300 bg-white rounded-md shadow-button"
                      @click="this.$router.push('/dashboard')">
                      <p>Cancel</p>
                    </button>
                  </div>
                  <div class="w-full md:w-auto p-1.5">
                    <button
                      class="flex flex-wrap justify-center w-full px-4 py-2 bg-green-500 hover:bg-green-600 font-medium text-sm text-white border border-green-500 rounded-md shadow-button"
                      @click="saveNote">
                      <p>Save</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>
<script>
// @ is an alias to /src
import firebase from "@/config/db.js";
import NavBar from "@/components/NavBar.vue";
export default {
  name: "Editor",
  components: {
    NavBar,
  },
  data() {
    return {
      url: "",
      title: "",
      description: "",
      content: "",
      privacy: "Public",
      user: {
        name: "",
        email: "",
        uid: "",
        username: "",
      },
      isLoading: true,
    };
  },
  methods: {
    getUserInfo() {
      var user = firebase.auth().currentUser;
      firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .get()
        .then(function (doc) {
          if (doc.exists) {
            this.user.name = doc.data().name;
            this.user.email = doc.data().email;
            this.user.uid = doc.data().uid;
            this.user.username = doc.data().username;
          } else {
            this.$router.push("/login");
          }
        }.bind(this));
    },
    replaceSpecialCharacter() {
      this.url = this.url.replace(/[^a-zA-Z0-9-]/g, "-");
    },
    randomName() {
      this.url = "Note-" + Math.random().toString(36).substring(2, 7);
    },
    checkIfUrlTaken() {
      var that = this;
      firebase
        .firestore()
        .collection("users")
        .doc(this.user.uid)
        .collection("notes")
        .where("url", "==", this.url)
        .get()
        .then(function (querySnapshot) {
          if (querySnapshot.size > 0) {
            alert("URL already taken");
          } else {
            that.saveNote();
          }
        });
    },
    saveNote() {
      const user = firebase.auth().currentUser;
      const db = firebase.firestore();
      // date mm/dd/yyyy
      const todaysDate = new Date();
      const note = {
        url: this.url,
        author: this.user.name,
        name: this.title,
        description: this.description,
        content: this.content,
        createdOn: todaysDate,
        owner: user.uid,
        privacy: this.privacy,
      };
      db.collection("users")
        .doc(user.uid)
        .collection("notes")
        .doc(this.url)
        .set(note, { merge: true })
        .then(() => {
          this.$router.push("/n/" + this.user.username + "/" + this.url,);
        });
    },
  },
  mounted() {
    this.getUserInfo();
    this.randomName();
  },
};
</script>
