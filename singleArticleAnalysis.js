// const NewsAPI = require('newsapi');
// const newsapi = new NewsAPI('1f5ab45295f640fe8a9b397a85acfde5');


async function getArticleInfo(searchQuery){
    //use NEWSAPI to get news articles
    //1. need to get the articles that I just reviewed.
    //2. search for all reviews of each article in the PRIVATE pool.
    //3. mark the number of reviews found for each demographic
    //4. add the score that was given to each demographic the reviewee belonged to.
    /*example:
        "Article 1"
        numReviewMale = 2
        totScoreMale = 8 (out of max of 20)
        so the score we want to display is 8 / 2 = *4*
    */
    var articlesIReviewed

    var scoresForArticles = [[],[]];
    var nForArticles = [[],[]];
    console.log(searchQuery)
    $('#a1Title').innerHTML = searchQuery
    firebase.firestore().collection('articles').where("title", "==", searchQuery).get()
    .then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
            console.log(doc.data().title)
            document.getElementById(`a1Title`).innerHTML = doc.data().title;
            var scoreArray = doc.data().scoreArray;
            var nArray = doc.data().nArray;
            //gender
            for(var k = 0; k < 30; k++){
                $(`#a1AnalysisRange${k}`).val(Math.floor(scoreArray[k]/nArray[k]));
                $(`#1${k}`).css("background", `rgb(${255+($(`#a1AnalysisRange${k}`).val()*15)}, ${255-Math.abs($(`#a1AnalysisRange${k}`).val()*15)}, ${255-($(`#a1AnalysisRange${k}`).val()*15)})`);
    
            }  
        })
    }).catch(function(err){
        console.log(err)
    });

    //alert(JSON.stringify(articlesIReviewed));
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable);
}


$(document).ready(function () {    
    //setInterval(getTimeToNext, 1000);
    let seed = Math.floor(Math.random()*3); //0, 1, or 2
    if(seed == 0) $('#logo').attr('src', 'img/vibeCheck.png');
    if(seed == 1) $('#logo').attr('src', 'img/vibeCheckM.png');
    if(seed == 2) $('#logo').attr('src', 'img/vibeCheckY.png');


    getArticleInfo(getQueryVariable('searchQuery'));
 

    
});

