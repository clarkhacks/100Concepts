const firebaseConfig = {
  apiKey: "AIzaSyC36rVsVWRYtRiRIHFWm6L1s09DgmNH7go",
  authDomain: "clarkcms.firebaseapp.com",
  databaseURL: "https://clarkcms-default-rtdb.firebaseio.com",
  projectId: "clarkcms",
  storageBucket: "cdnphotos.wkmn.app",
  messagingSenderId: "70813844310",
  appId: "1:70813844310:web:d9fef7a66bcf64f73d4cf7",
};

firebase.initializeApp(firebaseConfig);
var params = new URLSearchParams(window.location.search);
function route(a) {
  if (a) {
    window.location.hash = "#" + a;
  } else {
    window.location.hash = "#";
  }
}
// if not logged in then goto login
function checkIfAuthed() {
  var user = firebase.auth().currentUser;
  if (user == null) {
    route("login");
  } else {
    setUserData();
    route();
  }
}
document
  .getElementById("new-photo-form-photo")
  .addEventListener("change", function () {
    var file = document.getElementById("new-photo-form-photo").files[0];
    document
      .getElementById("fileHolder")
      .setAttribute("data-filename", file.name);
  });

function uploadPhoto() {
  var user = firebase.auth().currentUser;
  var userID = user.uid;
  var file = document.getElementById("new-photo-form-photo").files[0];
  var reader = new FileReader();
  var photoID = randomID();
  var extension = file.name.split(".").pop();
  var photoName = document.getElementById("new-photo-form-image-title").value;
  reader.readAsDataURL(file);
  reader.onloadend = function () {
    firebase
      .storage()
      .ref()
      .child("/photo_share/" + userID + "/" + photoID + "." + extension)
      .put(file)
      .then((response) => {
        firebase
          .firestore()
          .collection("photoshare")
          .doc("data")
          .collection("photos")
          .doc(userID)
          .collection("photo")
          .doc(photoID)
          .set({
            name: photoName,
            url:
              "https://gassets.wkmn.app/photo_share/" +
              userID +
              "/" +
              photoID +
              "." +
              extension,
            location: photoID + "." + extension,
          });
        setUserData();
        route();
      });
  };
}

function deletePhoto(photoID, location) {
  var user = firebase.auth().currentUser;
  var userID = user.uid;
  firebase
    .firestore()
    .collection("photoshare")
    .doc("data")
    .collection("photos")
    .doc(userID)
    .collection("photo")
    .doc(photoID)
    .delete();

  firebase
    .storage()
    .ref()
    .child("/photo_share/" + userID + "/" + location);
  setUserData();
}

//random id
function randomID() {
  var result = "";
  var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  var length = 5;
  for (var i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}
//log the user in
function loginUser() {
  var email = document.getElementById("login-email").value;
  var password = document.getElementById("login-password").value;
  firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => {
      return firebase.auth().signInWithEmailAndPassword(email, password);
    })
    .catch((error) => {
      // Handle Errors here.
      console.log(error.code, error.message);
    });
  route();
}
// If user is or is not logged in.
firebase.auth().onAuthStateChanged(function (user) {
  checkIfAuthed();
});

function setUserData() {
  var user = firebase.auth().currentUser;
  var userID = user.uid;

  var db = firebase.firestore().collection("photoshare").doc("data");
  db.collection("users")
    .doc(userID)
    .get()
    .then((doc) => {
      document.getElementById("user-name").innerHTML = doc.data().name;
    });
  document.getElementById("home-gallery").innerHTML = "";
  document.getElementById("photos-section").innerHTML = "";
  db.collection("photos")
    .doc(userID)
    .collection("photo")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var counter = 0;
        var photoCard =
          '<li><a onclick="copyText(`' +
          doc.data().url +
          '`)" class="thumbnail"><span class="frame"><img src="' +
          doc.data().url +
          '" alt="' +
          doc.data().name +
          '" /></span></a></li>';
        var eachPhoto =
          '<a id="' +
          doc.id +
          '"></a><h2 id="image-title" class="style5">' +
          doc.data().name +
          '</h2><div id="single-image" class="image full"><span class="frame"><img src="' +
          doc.data().url +
          '" alt="' +
          doc.data().name +
          '" /></span></div><ul id="nav" class="style1 buttons"><li><a onclick="copyText(`' +
          doc.data().url +
          '`)" class="button n01"><span class="label">Copy Url</span></a></li><li><a onclick="deletePhoto(`' +
          doc.id +
          "`, `" +
          doc.data().location +
          '`)" class="button n01"><span class="label">Delete</span></a></li></ul><hr id="divider03" class="style1 full">';
        counter++; // later on limit gallery size on home screen
        document.getElementById("home-gallery").innerHTML += photoCard;
        document.getElementById("photos-section").innerHTML += eachPhoto;
        document.getElementById("new-photo-form-image-title").value = "";
      });
    });
}
