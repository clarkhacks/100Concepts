<template>
    <section class="overflow-hidden min-h-full">
        <NavBar :name="name" :email="email" :username="username"></NavBar>
        <div class="xl:ml-80">
            <section class="py-24 md:pb-32 bg-white">
                <div class="container px-4 mx-auto">
                    <div class="mx-auto max-w-6xl">
                        <div class="flex flex-wrap items-center justify-center mb-14 -mx-3">
                            <div class="w-full px-3 mb-3 md:mb-0 md:w-1/2">
                                <div class="relative">
                                    <img class="absolute top-1/2 left-4 transform -translate-y-1/2"
                                        src="/assets/flex-ui-assets/elements/blog/search.svg" alt="" /><input
                                        class="w-full h-full py-3 pl-12 pr-4 text-coolGray-500 leading-tight placeholder-coolGray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 border border-coolGray-200 rounded-lg shadow-xsm"
                                        type="text" placeholder="Search" @input="searchTable" id="searchInput" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <NoteList :noteList="noteList" @delete="deleteNote"></NoteList>
                </div>
            </section>
        </div>
    </section>
</template>
<script>
// @ is an alias to /src
import firebase from "@/config/db.js";
import NavBar from "@/components/NavBar.vue";
import NoteList from "@/components/NoteList.vue";
import Swal from "sweetalert2";
export default {
    name: "Dashboard",
    components: {
        NavBar,
        NoteList
    },
    data() {
        return {
            username: "",
            name: "",
            email: "",
            noteList: [
            ],
        };
    },
    methods: {
        searchTable() {
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

        },
        getNotes() {
            var user = firebase.auth().currentUser;
            firebase
                .firestore()
                .collection("users")
                .doc(user.uid)
                .collection("notes")
                .get()
                .then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        var note = {
                            url: doc.data().url,
                            noteName: doc.data().name,
                            description: doc.data().description,
                            noteContent: doc.data().noteContent,
                            date: doc.data().createdOn.toDate().toLocaleDateString(),
                            privacy: doc.data().privacy,
                            owner: this.username,
                        };
                        this.noteList.push(note);
                    }.bind(this));
                }.bind(this));
        },
        getUserInfo() {
            var user = firebase.auth().currentUser;
            firebase
                .firestore()
                .collection("users")
                .doc(user.uid)
                .get()
                .then(function (doc) {
                    if (doc.exists) {
                        this.username = doc.data().username;
                        this.name = doc.data().name;
                        this.email = doc.data().email;
                        this.getNotes();
                    } else {
                        this.$router.push("/login");
                    }
                }.bind(this));
        },
        deleteNote(url) {
            // Swal ask if sure to delete
            var that = this;
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.value) {
                    var user = firebase.auth().currentUser;
                    firebase
                        .firestore()
                        .collection("users")
                        .doc(user.uid)
                        .collection("notes")
                        .doc(url)
                        .delete()
                        .then(function () {
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            ).then(() => {
                                that.noteList = [];
                                that.getNotes();
                            });
                        })
                        .catch(function (error) {
                            console.error("Error removing document: ", error);
                        });
                }
            })

        }
    },
    mounted() {
        this.getUserInfo();
    },
};
</script>
