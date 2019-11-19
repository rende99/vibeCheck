

export default function pageLoaded(){
    $('#submitButton').on("click", async function(){
        //create new
        let userName = $('#userEmail').val();
        let pass = $('#userPassword').val();
        //need to check if account exists. If it does, send to login page. If not, create a new Account!

        const response = await axios({
            method: "post",
            url: "http://localhost:3000/account/create",
            data: {
                name: userName,
                pass: pass
            },
        });

        window.location.href = "tutorial.html";
    });
}






$(document).ready(function () {
    pageLoaded();

});