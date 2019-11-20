

export default function pageLoaded(){
    $('#submitButton').on("click", async function(){
        event.preventDefault();
        //Reveal more
        $('#hid1').css("visibility", "visible");
        $('#hid2').css("visibility", "visible");


    });
    $('#finishButton').on("click", async function(){
        //create new
        event.preventDefault();
        let userName = $('#userEmail').val();
        let pass = $('#userPassword').val();
        //need to check if account exists. If it does, send to login page. If not, create a new Account!

        const createResponse = await axios({
            method: "post",
            url: "http://localhost:3000/account/create",
            data: {
                name: userName,
                pass: pass
            },
        });
        let userGender = $('#genderSelector input:radio:checked').val()
        let userAge = $('#userAge').val();
        let userLocation = $('#stateSelector').val();
        let userEducation = $('#educationSelector').val();
        let userRace = $('#raceSelector').val();
        let userAffiliation = $('#affiliationSelector input:radio:checked').val();
        
        //need to get 'Bearer' auth jws token to send as part of this request.
        const loginResponse = await axios({
            method: "post",
            url: "http://localhost:3000/account/login",
            data: {
                name: userName,
                pass: pass
            },
        });
        let token = loginResponse.data.jwt;
        
        const response = await axios({
            method: "post",
            url: "http://localhost:3000/user/demo",
            headers: {
                Authorization: "Bearer " + token,
            },
            data: {
                userGender: userGender,
                userAge: userAge,
                userLocation: userLocation,
                userEducation: userEducation,
                userRace: userRace,
                userAffiliation: userAffiliation
            },
        });


        /*
        await populateDemographics({
            userGender: userGender,
            userAge: userAge,
            userLocation: userLocation,
            userEducation: userEducation,
            userRace: userRace,
            userAffiliation: userAffiliation
        });
        */
    });

}






$(document).ready(function () {
    pageLoaded();
});