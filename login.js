export default function pageLoaded(){
    $('#loginButton').on("click", async function(){
        //create new
        let userName = $('#userEmail').val();
        let pass = $('#userPassword').val();
        //need to check if account exists. If it does, send to login page. If not, create a new Account!

        const response = await axios({
            method: "post",
            url: "http://localhost:3000/account/login",
            data: {
                name: userName,
                pass: pass
            },
        });
    });
}






$(document).ready(function () {
    pageLoaded();

});