

export default async function pageLoaded(user) {
    //get user info to set up profile page
    //checked="true"
    // get user info
    let userGender
    let userAge
    let userLocation
    let userEducation
    let userRace
    let userAffiliation
    await firebase.firestore().collection('users').doc(user.email).get()
    .then(function(doc){
        userGender = doc.data().gender;
        userAge = parseInt(doc.data().age);
        userLocation = doc.data().location;
        userEducation = doc.data().education;
        userRace = doc.data().race;
        userAffiliation = doc.data().affiliation;
    })


    console.log(userGender)
    //set up profile page:s
    document.getElementById(`${userGender}Radio`).checked = true;
    document.getElementById(`userAge`).value = userAge;
    $(`select option[value=${userLocation}]`).attr("selected", true);
    $(`select option[value=${userEducation}]`).attr("selected", true);
    $(`select option[value=${userRace}]`).attr("selected", true);
    document.getElementById(`${userAffiliation}`).checked = true;



    $('#submitButton').on("click", async function(){
        let userGender = $('#genderSelector input:radio:checked').val()
        let userAge = $('#userAge').val();
        let userLocation = $('#stateSelector').val();
        let userEducation = $('#educationSelector').val();
        let userRace = $('#raceSelector').val();
        let userAffiliation = $('#affiliationSelector input:radio:checked').val();
        //save changes, kick to landing.html
        await firebase.firestore().collection('users').doc(user.email).set({
            gender: userGender,
            age: userAge,
            location: userLocation,
            education: userEducation,
            race: userRace,
            affiliation: userAffiliation
        }, {merge: true})
        //alert(JSON.stringify(userI.data.result))
        window.location.href = "landing.html";

    });

/*
    $('#deleteButton').on("click", async function(){
        let userName = $('#userEmail').val();
        let pass = $('#userPassword').val();
        //alert(userName);
        //delete account, kick to index.html
        user.delete().then(function(){

        })

        try{
            let newInfo = await axios.delete('http://localhost:3000/account/:' + userName,
            {
                data: {
                    "name": userName,
                    "pass": pass
                }

            }).catch();
            window.location.href = "index.html";
        }catch(error){
            $('#errorText').remove();
            $('#cred').append('<h1 id="errorText" class="text-center h3" style="color:red"><b>Username or Password is incorrect</b></h1>');
        }
    });
*/


}


$(document).ready(function () {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            pageLoaded(user);
        }else{
            console.log("not logged in");
            window.location.href = "index.html";
        }
    })
});