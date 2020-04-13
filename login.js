
async function emailSignInPressed() {
    var made = false;
    var userName;
    var pass;

    //create new
    event.preventDefault();

    userName = $('#userEmail').val();
    userName = userName.toLowerCase();
    pass = $('#userPassword').val();

    // need to create account here with firebase, verify, etc.

    firebase.auth().signInWithEmailAndPassword(userName,pass)
    .catch(function(err){
        switch (err.code){
            case "auth/invalid-email":
                $('#emailHelp').removeAttr('hidden')
                $('#emailHelp').show()

                $('#genericHelp').hide()
                $('#passwordHelp').hide()
                break;
            case "auth/wrong-password":
                $('#passwordHelp').removeAttr('hidden')
                $('#passwordHelp').show()

                $('#genericHelp').hide()
                $('#emailHelp').hide()
                break;
            default:
                $('#genericHelp').removeAttr('hidden')
                $('#genericHelp').show()

                $('#passwordHelp').hide()
                $('#emailHelp').hide()
                break;
        }
        console.log(err.message, err.code);
        //window.location.href = "signup.html"
    });



}

async function facebookSignInPressed() {
    console.log("fb");
}

async function twitterSignInPressed() {
    console.log("twit");
}

async function googleSignInPressed() {
    console.log("goog");
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        //var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(user.email)
        // ...
        hideSignInElements()
        firebase.firestore().collection('users').doc(user.email).set({
            email: user.email
        }, {merge: true}).then(function(){
            firebase.firestore().collection('users').doc(user.email).get().then(function(doc){
                if (doc.data().affiliation == undefined || doc.data().age == undefined || doc.data().education == undefined || 
                doc.data().gender == undefined || doc.data().location == undefined || doc.data().race == undefined){
                    window.location.href = "survey.html";
    
                }else{
                    window.location.href = "landing.html";
                }
            }).catch(function(err){
                console.log(err.message)
            })
            
        })
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
}

$(document).ready(function () {
    let seed = Math.floor(Math.random() * 3); //0, 1, or 2
    if(seed == 0) $('#logo').attr('src', 'img/vibeCheck.png');
    if(seed == 1) $('#logo').attr('src', 'img/vibeCheckM.png');
    if(seed == 2) $('#logo').attr('src', 'img/vibeCheckY.png');
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          window.location.href = "landing.html";
        } else {
          // No user is signed in.
        }
    });
    $('#googleSignInButton').on("click", googleSignInPressed);
    $('#facebookSignInButton').on("click", facebookSignInPressed);
    $('#twitterSignInButton').on("click", twitterSignInPressed);
    $('#loginButton').on("click", emailSignInPressed);

});