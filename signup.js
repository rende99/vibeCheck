
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
        pass = $('#userPassword').val();


        let userGender = $('#genderSelector input:radio:checked').val()
        let userAge = $('#userAge').val();
        let userLocation = $('#stateSelector').val();
        let userEducation = $('#educationSelector').val();
        let userRace = $('#raceSelector').val();
        let userAffiliation = $('#affiliationSelector input:radio:checked').val();
        
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

        //need to get 'Bearer' auth jwt token to send as part of this request.
        let status = await axios.get(`http://localhost:3000/account/status`,{
            headers: {
                Authorization: `Bearer ${document.cookie}`
            }
        }).then(response => {
            alert("response: " + JSON.stringify(response.data));
            axios.post(`http://localhost:3000/user/${response.data.user.name}`,
            {
                headers: {
                    Authorization: `Bearer ${document.cookie}`
                },
                data: {
                    'userGender': userGender,
                    'userAge': userAge,
                    'userLocation': userLocation,
                    'userEducation': userEducation,
                    'userRace': userRace,
                    'userAffiliation': userAffiliation
                } 
            });
        });
        
        /*
        let response = await axios.post(`http://localhost:3000/user/${userName}`,
        {
            headers: {
                'Authorization': `Bearer ${document.cookie}`
            },
            data: {
                'userGender': userGender,
                'userAge': userAge,
                'userLocation': userLocation,
                'userEducation': userEducation,
                'userRace': userRace,
                'userAffiliation': userAffiliation
            }
        });
        alert(JSON.stringify(response.data));
        */
        

        window.location.href = "landing.html";


        //debugger;

    });

}






$(document).ready(function () {
    pageLoaded();
});