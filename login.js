export default function pageLoaded(){
    $('#loginButton').on("click", async function(){
        //create new
        let userName = $('#userEmail').val();
        let pass = $('#userPassword').val();
        //need to check if account exists. If it does, send to login page. If not, create a new Account!

        let loginResponse = await axios.post("http://localhost:3000/account/login",
        {
            name: userName,
            pass: pass,
        });

        window.location.href = "landing.html";

    });


}






$(document).ready(function () {
    pageLoaded();

});