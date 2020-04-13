// const NewsAPI = require('newsapi');
// const newsapi = new NewsAPI('1f5ab45295f640fe8a9b397a85acfde5');

async function getRecentArticles(){
    // Create a storage reference from our storage service
    var db = firebase.firestore()
    db.collection('articles')
    .orderBy('dateadded', 'desc')
    .limit(5)
    .get()
    .then((querySnapshot) => {
        var i = 1;
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data().title}`);
            // update HTML
            var sumScores = doc.data().scoreArray.reduce(function(a, b){
                return a + b;
            }, 0);
            var sumReviews = doc.data().nArray.reduce(function(a, b){
                return a + b;
            }, 0);
            var avgscore = Math.floor(sumScores/sumReviews);
            document.getElementById(`a${i}`).innerHTML = doc.data().title;
            document.getElementById(`a${i}href`).setAttribute("href", doc.data().url);
            document.getElementById(`a${i}href`).style.color = "black"

            $(`#a${i}AnalysisRange`).val(avgscore);
            $(`#a${i}PB`).css("background", `rgb(${255+(avgscore*15)}, ${255-Math.abs(avgscore*15)}, ${255-(avgscore*15)})`);

            i++;
        });
    });


}

async function searchHandle(event){
    //firing each time the search bar is TYPED in.
    //get list of all titles of all articles
    let searchQuery = $('#searchBar').val();
    //console.log(searchQuery);
    //remove datalist, if existing
    let possibleTitles = [];
    
    if(searchQuery==""){
        $('option').remove();
        return
    }
    await firebase.firestore().collection('articles').orderBy('title_lower')
    .startAt(searchQuery.toLowerCase())
    .endAt(searchQuery.toLowerCase()+'\uf8ff')
    .limit(10).get().then(function(querySnapshot){
        querySnapshot.forEach(function(doc) {
            possibleTitles.push(doc.data().title);
            console.log("awaiter", doc.data().title);
        });
    })



    for(let i = 0; i < possibleTitles.length; i++){
        //see if it already exists in the list.
        $('option').remove();
        //$(`#searchAuto`).(`<option value=\"${possibleTitles[i]}\"></option>`)
    }
    for(let i = 0; i < possibleTitles.length; i++){
        $(`#searchAuto`).append(`<option value="${possibleTitles[i]}"></option>`)
    }
    //alert(possibleTitles);
    //add datalist


        

    //DEBOUNCING AND ALL THAT SHOULD BE GOING ON AROUND HERE!!! THIS IS WHERE THE USER IS SEARCHING FOR SOMETHING!
    if (event.keyCode === 13) {
        //enter pressed, make sure that there is an article we can go to.
        var exists = false
        await firebase.firestore().collection('articles').where("title", "==", searchQuery).get()
        .then(function(querySnapshot){
            querySnapshot.forEach(function(doc) {
                exists = true
            });
        })
    
        if(exists){
            window.location.href = `singleArticleAnalysis.html?searchQuery=${searchQuery}`;

        }else{

        }
    }
    //if click away, also clear the interval, also reset:
}


$(document).ready(async function () {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          window.location.href = "landing.html";
        } else {
          // No user is signed in.
        }
    });
    let seed = Math.floor(Math.random()*3); //0, 1, or 2
    if(seed == 0) $('#logo').attr('src', 'img/vibeCheck.png');
    if(seed == 1) $('#logo').attr('src', 'img/vibeCheckM.png');
    if(seed == 2) $('#logo').attr('src', 'img/vibeCheckY.png');
    getRecentArticles();

    var eSelect = document.getElementById('searchAuto');
    //alert(storageRef.child('articles').fullPath)
     
    //Article title array is filled. Add the event listener now:
    $("#searchBar").keyup(function(){searchHandle(event)});
    
   
});