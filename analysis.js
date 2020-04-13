// const NewsAPI = require('newsapi');
// const newsapi = new NewsAPI('1f5ab45295f640fe8a9b397a85acfde5');


async function getArticleInfo(user){
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
    await firebase.firestore().collection('users').doc(user.email).get()
    .then(function(doc){
        articlesIReviewed = doc.data().lastArticles;
    }).catch(function(err){
        console.log(err)
    });
    var scoresForArticles = [[],[]];
    var nForArticles = [[],[]];

    firebase.firestore().collection('articles').where('title', 'in', articlesIReviewed).get()
    .then(function(querySnapshot){
        var i = 1;
        querySnapshot.forEach(function(doc){
            document.getElementById(`a${i}Title`).innerHTML = doc.data().title;
            var scoreArray = doc.data().scoreArray;
            var nArray = doc.data().nArray;
            //gender
            for(var k = 0; k < 30; k++){
                $(`#a${i}AnalysisRange${k}`).val(Math.floor(scoreArray[k]/nArray[k]));
                $(`#${i}${k}`).css("background", `rgb(${255+($(`#a${i}AnalysisRange${k}`).val()*15)}, ${255-Math.abs($(`#a${i}AnalysisRange${k}`).val()*15)}, ${255-($(`#a${i}AnalysisRange${k}`).val()*15)})`);

            }
            i++
        })
    }).catch(function(err){
        console.log(err)
    });

    //alert(JSON.stringify(articlesIReviewed));
}




$(document).ready(function () {    
    //setInterval(getTimeToNext, 1000);
    let seed = Math.floor(Math.random()*3); //0, 1, or 2
    if(seed == 0) $('#logo').attr('src', 'img/vibeCheck.png');
    if(seed == 1) $('#logo').attr('src', 'img/vibeCheckM.png');
    if(seed == 2) $('#logo').attr('src', 'img/vibeCheckY.png');

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            getArticleInfo(user);
        }else{
            console.log("not logged in");

        }
    })

    
});