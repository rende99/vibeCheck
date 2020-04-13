

export default function pageLoaded() {
    var made = false;
    var userName;
    var pass;

    $('#finishButton').on("click", async function(){

        //create new
        event.preventDefault();

        //userName = $('#userEmail').val();
        //userName = userName.toLowerCase();
        //pass = $('#userPassword').val();


        let userGender = $('#genderSelector input:radio:checked').val()
        let userAge = $('#userAge').val();
        let userLocation = $('#stateSelector').val();
        let userEducation = $('#educationSelector').val();
        let userRace = $('#raceSelector').val();
        let userAffiliation = $('#affiliationSelector input:radio:checked').val();
        console.log(userGender)
        if(userGender === undefined){document.getElementById('genderForm').setAttribute('aria-invalid', true); return};
        if(userAge === undefined){document.getElementById('ageForm').setAttribute('aria-invalid', true);};


        // need to add account demographics here
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in.
                
                firebase.firestore().collection('users').doc(user.email).set({
                    gender: userGender,
                    age: userAge,
                    location: userLocation,
                    education: userEducation,
                    race: userRace,
                    affiliation: userAffiliation,
                    lastReviewDate: Date.now() - 86400000,
                    lastArticles: []
                }, {merge: true})
                .then(function(){
                    //alert(user.email)
                    window.location.href = "landing.html";
                })

            } else {
              // No user is signed in.
            }

        });
        
        //window.location.href = "landing.html";

    });

}


$(document).ready(function () {
    let seed = Math.floor(Math.random() * 3); //0, 1, or 2
    if(seed == 0) $('#logo').attr('src', 'img/vibeCheck.png');
    if(seed == 1) $('#logo').attr('src', 'img/vibeCheckM.png');
    if(seed == 2) $('#logo').attr('src', 'img/vibeCheckY.png');

    pageLoaded();


});