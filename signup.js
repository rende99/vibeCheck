
const userRoot = new axios.create({
    baseURL: "http://localhost:3000/user"
});

async function createDemo({userGender, userAge, userLocation, userEducation, userRace, userAffiliation, token}) {
    return await userRoot.post(`/demo`, {
        data: {userGender, userAge, userLocation, userEducation, userRace, userAffiliation},
        headers: {'Authorization': `Bearer ${token}` }
    });
}

export default function pageLoaded() {
    var made = false;
    var userName;
    var pass;

    $('#finishButton').on("click", async function(){

        //create new
        event.preventDefault();
        
        userName = $('#userEmail').val();
        userName = userName.toLowerCase();
        pass = $('#userPassword').val();


        let userGender = $('#genderSelector input:radio:checked').val()
        let userAge = $('#userAge').val();
        let userLocation = $('#stateSelector').val();
        let userEducation = $('#educationSelector').val();
        let userRace = $('#raceSelector').val();
        let userAffiliation = $('#affiliationSelector input:radio:checked').val();
        try{
            let createResponse = await axios.post('http://localhost:3000/account/create',
            {
                name: userName,
                pass: pass,
                data: {
                    'userGender': userGender,
                    'userAge': userAge,
                    'userLocation': userLocation,
                    'userEducation': userEducation,
                    'userRace': userRace,
                    'userAffiliation': userAffiliation
                }
            });
        }catch(error){
            $('#errorText').remove();
            $('#cred').append('<h1 id="errorText" class="text-center h3" style="color:red"><b>Username already in use</b></h1>');
            return;
        }


        //debugger;

        let loginResponse = await axios.post("http://localhost:3000/account/login",
        {
            name: userName,
            pass: pass,
        });
        //alert(loginResponse.data.jwt);
        document.cookie = loginResponse.data.jwt;
        //document.cookie = `Bearer ${token}`;
        //debugger;
        const specialHeader = {
            headers: {
                Authorization: `Bearer ${document.cookie}`
            }
        };


        //need to get 'Bearer' auth jwt token to send as part of this request.
        const userPost = await axios.post(`http://localhost:3000/user/info`,
        {
            data: {
                'userGender': userGender,
                'userAge': userAge,
                'userLocation': userLocation,
                'userEducation': userEducation,
                'userRace': userRace,
                'userAffiliation': userAffiliation
            }
        },
            specialHeader
        );
        //alert(JSON.stringify(userPost.data));

        
        const userResponse = await axios.get(`http://localhost:3000/user/info`,
            specialHeader
        );
        //alert(JSON.stringify(userResponse.data));
        

        /*
        */
        

        window.location.href = "landing.html";


        //debugger;

    });

}






$(document).ready(function () {
    pageLoaded();
});