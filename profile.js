

export default async function pageLoaded() {
    //get user info to set up profile page
    const specialHeader = {
        headers: {
            Authorization: `Bearer ${document.cookie}`
        }
    };
    let userInfo = await axios.get('http://localhost:3000/user/info', specialHeader);

    userInfo = userInfo.data.result;
    //set up profile page:s
    document.getElementById(`${userInfo.userGender}Radio`).checked = true;
    document.getElementById(`userAge`).value = userInfo.userAge;
    $(`select option[value=${userInfo.userLocation}]`).attr("selected", true);
    $(`select option[value=${userInfo.userEducation}]`).attr("selected", true);
    $(`select option[value=${userInfo.userRace}]`).attr("selected", true);
    document.getElementById(`${userInfo.userAffiliation}`).checked = true;



    $('#submitButton').on("click", async function(){
        let userGender = $('#genderSelector input:radio:checked').val()
        let userAge = $('#userAge').val();
        let userLocation = $('#stateSelector').val();
        let userEducation = $('#educationSelector').val();
        let userRace = $('#raceSelector').val();
        let userAffiliation = $('#affiliationSelector input:radio:checked').val();
        //save changes, kick to landing.html
        let newInfo = await axios.post('http://localhost:3000/user/info',
        {
            data: {
                'userGender': userGender,
                'userAge': userAge,
                'userLocation': userLocation,
                'userEducation': userEducation,
                'userRace': userRace,
                'userAffiliation': userAffiliation
            },
        },
            specialHeader
        );
        let userI = await axios.get('http://localhost:3000/user/info', specialHeader);
        //alert(JSON.stringify(userI.data.result))
        window.location.href = "landing.html";

    });
    $('#deleteButton').on("click", async function(){
        let userName = $('#userEmail').val();
        let pass = $('#userPassword').val();
        //alert(userName);
        //delete account, kick to index.html
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



}


$(document).ready(function () {
    pageLoaded();
});