

export default async function pageLoaded() {
    //get user info to set up profile page
    const specialHeader = {
        headers: {
            Authorization: `Bearer ${document.cookie}`
        }
    };
    let userInfo = await axios.get('http://localhost:3000/user/info', specialHeader);
    userInfo = userInfo.data.result;
    //alert(JSON.stringify(userInfo));
    //set up profile page:s
    document.getElementById(`${userInfo.userGender}Radio`).checked = true;
    document.getElementById(`userAge`).value = userInfo.userAge;
    $(`select option[value=${userInfo.userLocation}]`).attr("selected", true);
    $(`select option[value=${userInfo.userEducation}]`).attr("selected", true);
    $(`select option[value=${userInfo.userRace}]`).attr("selected", true);
    document.getElementById(`${userInfo.userAffiliation}`).checked = true;


    $('#submitButton').on("click", async function(){
        //save changes, kick to landing.html
    });
    $('#deleteButton').on("click", async function(){
        //delete account, kick to index.html
    });



}


$(document).ready(function () {
    pageLoaded();
});