export default function pageLoaded(){
    $('#loginButton').on("click", async function(){
        //create new
        let userName = $('#userEmail').val();
        let pass = $('#userPassword').val();
        //need to check if account exists. If it does, send to login page. If not, create a new Account!
        try{
            let loginResponse = await axios.post("http://localhost:3000/account/login",
            {
                name: userName,
                pass: pass,
            });
            document.cookie = loginResponse.data.jwt;
    
            window.location.href = "landing.html";
        }catch(error){
            $('#errorText').remove();
            $('#cred').append('<h1 id="errorText" class="text-center h3" style="color:red"><b>Username or Password is incorrect</b></h1>');
        }


    });


}






$(document).ready(function () {
    pageLoaded();

});