// const NewsAPI = require('newsapi');
// const newsapi = new NewsAPI('1f5ab45295f640fe8a9b397a85acfde5');
var articlesToReview = []


async function getArticles(user){
    //use NEWSAPI to get news articles
    // get a user attribute here to see if they've already done articles for today. If not, do what's already below.
    // If they have already done articles, then show update the ranges with what they declared the bias was, and the article titles.
    //d is the current day (27 for nov. 27, for example)
    console.log(Date.now());

    var today = new Date();
    today.setDate(today.getDate());


    var lastGotArticles
    var didFinish
    await firebase.firestore().collection('users').doc(user.email).get()
    .then(function(doc) {
        if (doc.exists) {
            if (doc.data().affiliation == undefined || doc.data().age == undefined || doc.data().education == undefined || 
                doc.data().gender == undefined || doc.data().location == undefined || doc.data().race == undefined){
                //they haven't finished signing up
                window.location.href = "survey.html";

            }
            lastGotArticles = new Date(doc.data().lastReviewDate)
            didFinish = doc.data().didSubmit
            console.log(doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });


    //alert("Date from GET request: " + dateJSONInfo);
    console.log(lastGotArticles.getDate(), today.getDate())
    if(lastGotArticles.getDate() !== today.getDate() && lastGotArticles <= today){
        //Different Date. Give new articles
        console.log("giving new articles");
        let newsResponse = await axios({
            url: "https://newsapi.org/v2/top-headlines?country=us&language=en&apiKey=1f5ab45295f640fe8a9b397a85acfde5",
        });
        
        let numFound = 0;
        for(let i = 0; numFound < 5; i++){
            //alert(newsResponse.data.articles[i].url);
            if(typeof newsResponse.data.articles[i].url !== undefined
            && !newsResponse.data.articles[i].title.includes("Washington Post") && !newsResponse.data.articles[i].url.includes("youtube.com")){

                newsResponse.data.articles[i].title.replace(`"`, ``);
                newsResponse.data.articles[i].title.replace(`'`, ``);
                console.log(newsResponse.data.articles[i].title)
                await firebase.firestore().collection("articles").where("title", "==", newsResponse.data.articles[i].title).get()
                .then(function(querySnapshot) {
                    if(querySnapshot.empty) {
                        console.log("snapshot empty")
                        // this article has not been reviewed/added to our DB yet
                        firebase.firestore().collection('articles').add({
                            dateadded: Date.now(),
                            title: newsResponse.data.articles[i].title.replace("\"", "“").trim(),
                            title_lower: newsResponse.data.articles[i].title.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`"'~()]/g,"").trim(),
                            url: newsResponse.data.articles[i].url,
                            scoreArray: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            nArray: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                        });
                    }
                })
            

                console.log("after request")
                articlesToReview.push(newsResponse.data.articles[i].title);
                document.getElementById(`a${numFound+1}Title`).innerHTML = newsResponse.data.articles[i].title;
//                alert(document.getElementById(`a${numFound+1}Title`).innerHTML);
                document.getElementById(`articleLink${numFound+1}`).setAttribute("href", newsResponse.data.articles[i].url);
                //alert(numFound);
                numFound++;
            }
        }
        console.log(articlesToReview)
        firebase.firestore().collection('users').doc(user.email).set({
            lastArticles: articlesToReview,
            lastScores: [0,0,0,0,0],
            didSubmit: false
        }, {merge: true})

        //note: date is 'd' here...

    }else if(didFinish){
        console.log("reloading old articles");
        //was already given articles. Get them, and do not allow them to make changes to the bias they already gave.
        await firebase.firestore().collection('users').doc(user.email).get()
            .then(function(doc) {
            if (doc.exists) {
                for(var i = 1; i < 6; i++){
                    $(`#a${i}Range`).val(doc.data().lastScores[i-1]);
                    let sliderValue = $(`#a${i}Range`).val();
                    $(`#a${i}PB`).css("background", `rgb(${255+(sliderValue*15)}, ${255-Math.abs(sliderValue*15)}, ${255-(sliderValue*15)})`);
                    document.getElementById(`a${i}Title`).innerHTML = doc.data().lastArticles[i-1];
                    document.getElementById(`articleLink${i}`).removeAttribute("href");

                }
                articlesToReview = doc.data().lastArticles;
                console.log("Document data:", doc.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });

        //alert(JSON.stringify(existingArticles.articles[0].title));
       
        $(`<html><div class="text-center p-3" style="font-size: 20px; padding-top: 10px; padding-bottom: 80px;">Click <a href="analysis.html">here</a> to see the sitewide analysis for each of today's articles.</div></html>`)
        .insertAfter('#news');
        document.getElementById('instructions').innerHTML = "You've already completed your analysis for today! Come back tomorrow for another set of articles.";
        document.getElementById('finishButton').classList.add("invisible");
    }
    
    
}

async function submitBias(user){
    //make post request with the articles that we have read today
    //alert(user.data.userInfo.email.toString());
    var lastScores = [$('#a1Range').val(),$('#a2Range').val(),$('#a3Range').val(),$('#a4Range').val(),$('#a5Range').val()]
    await firebase.firestore().collection('users').doc(user.data.userInfo.email).set({
        lastReviewDate: Date.now(),
        lastScores: lastScores,
        didSubmit: true
    }, {merge: true})
    console.log(articlesToReview, "AAAA")

    await sortOutArticleInfo(user, articlesToReview[0], parseInt(lastScores[0]))
    await sortOutArticleInfo(user, articlesToReview[1], parseInt(lastScores[1]))
    await sortOutArticleInfo(user, articlesToReview[2], parseInt(lastScores[2]))
    await sortOutArticleInfo(user, articlesToReview[3], parseInt(lastScores[3]))
    await sortOutArticleInfo(user, articlesToReview[4], parseInt(lastScores[4]))


    window.location.href = "analysis.html";

}

async function sortOutArticleInfo(user, article, score){
    //first get demographic info from the user, and return the indicies we need to populate
    var age
    var gender
    var location
    var education
    var race
    var party
    var indexArray = [0,0,0,0,0,0] // one spot for each demographic info

    await firebase.firestore().collection('users').doc(user.data.userInfo.email).get().then(function(doc){
        age = parseInt(doc.data().age);
        gender = doc.data().gender;
        location = doc.data().location;
        education = doc.data().education;
        race = doc.data().race;
        party = doc.data().affiliation;
    });

    switch(true){
        case (age < 18):
            indexArray[0] = 0
            break;
        case (age >= 18 && age < 25):
            indexArray[0] = 1
            break;
        case (age >= 25 && age < 40):
            indexArray[0] = 2
            break;
        case (age >= 40 && age < 60):
            indexArray[0] = 3
            break;
        case (age >= 60):
            indexArray[0] = 4
            break;
    }
    switch(gender){
        case "male":
            indexArray[1] = 5
            break;
        case "female":
            indexArray[1] = 6
            break;
        case "other":
            indexArray[1] = 7
            break;
    }
    switch(location){
        case "AK": case "AZ": case "CA": case "OR": case "WA": case "ID": case "MT": case "WY": case "NV": case "UT": case "CO": case "NM": case "HI":
            indexArray[2] = 8
            break;
        case "ND": case "SD": case "NE": case "KS": case "MN": case "IA": case "MO": case "WI": case "IL": case "MI": case "IN": case "OH":
            indexArray[2] = 9
            break;
        case "PA": case "NJ": case "NY": case "CT": case "RI": case "MA": case "VT": case "NH": case "ME":
            indexArray[2] = 10
            break;
        case "TX": case "OK": case "AR": case "LA": case "KY": case "TN": case "MS": case "AL": case "WV": case "MD": case "DE": case "DC": case "VA": case "NC": case "SC": case "GA": case "FL":
            indexArray[2] = 11
            break;
        case "AWAY":
            indexArray[2] = 12
            break;
    }
    switch(education){
        case "PMS": case "SES":
            indexArray[3] = 13
            break;
        case "SHS": case "AHS":
            indexArray[3] = 14
            break;
        case "SUN":
            indexArray[3] = 15
            break;
        case "ADG": case "BDG":
            indexArray[3] = 16
            break;
        case "MDG": case "DOC":
            indexArray[3] = 17
            break;
    }
    switch(race){
        case "BLK":
            indexArray[4] = 18
            break;
        case "AMI":
            indexArray[4] = 19
            break;
        case "ASI":
            indexArray[4] = 20
            break;
        case "NHW":
            indexArray[4] = 21
            break;
        case "WHT":
            indexArray[4] = 22
            break;
        case "HIS":
            indexArray[4] = 23
            break;
    }
    switch(party){
        case "altright":
            indexArray[5] = 24
            break;
        case "conservative":
            indexArray[5] = 25
            break;
        case "moderate":
            indexArray[5] = 26
            break;
        case "libertarian":
            indexArray[5] = 27
            break;
        case "liberal":
            indexArray[5] = 28
            break;
        case "socialist":
            indexArray[5] = 29
            break;
    }

    await firebase.firestore().collection('articles').where('title', '==', article).get()
    .then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
            var scoreArray = doc.data().scoreArray;
            var nArray = doc.data().nArray;
            for(var k = 0; k < indexArray.length; k++){
                scoreArray[indexArray[k]] = scoreArray[indexArray[k]] + score;
                nArray[indexArray[k]] = nArray[indexArray[k]] + 1;
            }
            firebase.firestore().collection('articles').doc(doc.id).set({
                scoreArray: scoreArray,
                nArray: nArray
            }, {merge: true});
        })
    })



}


function getTimeToNext(){
    let currTime = new Date();
    let nextTime = new Date();
    //alert(currTime);
    if(currTime.getHours() >= 24) nextTime.setDate(currTime.getDate() + 1);
    nextTime.setHours(24,0,0,0);
    let t = nextTime - currTime;
    let hours = Math.floor((t%(1000 * 60 * 60 * 24))/(1000 * 60 * 60));
    hours = hours > 9 ? hours : "0" + hours;
    let minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
    minutes = minutes > 9 ? minutes : "0" + minutes;
    let seconds = Math.floor((t % (1000 * 60)) / 1000); 
    seconds = seconds > 9 ? seconds : "0" + seconds;
    //alert(`${hours}:${minutes}:${seconds}`);
    //document.getElementById('timer').innerHTML = `New Articles in: ${hours}:${minutes}:${seconds}`;
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
    let seed = Math.floor(Math.random()*3); //0, 1, or 2
    if(seed == 0) $('#logo').attr('src', 'img/vibeCheck.png');
    if(seed == 1) $('#logo').attr('src', 'img/vibeCheckM.png');
    if(seed == 2) $('#logo').attr('src', 'img/vibeCheckY.png');

    var userInfo
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            userInfo = user;
            getArticles(user);
            $('#finishButton').on("click", {userInfo: user}, submitBias)

        }else{
            console.log("not logged in");
            window.location.href = "index.html";

        }
    })
    //let pubResponse = await axios.get("http://localhost:3000/public/reviewed");
    /*
    pubResponse = pubResponse.data;
    //alert(JSON.stringify(pubResponse));
    let allArticleTitles = [];
    for(let k = 0; k < pubResponse.result.length; k++){
        for(let j = 0; j < pubResponse.result[k].articles.length; j++){
            allArticleTitles.push(pubResponse.result[k].articles[j].title);
            //alert(pubResponse.result[k].articles[j].title);
        }
    }
    let uniqueArticleTitles = [...new Set (allArticleTitles)];
    */
    //Article title array is filled. Add the event listener now:
    $("#searchBar").keyup(function(){searchHandle(event)});
    $("#signoutButton").on("click", function(){
        firebase.auth().signOut().then(function() {
            //window.location.href = "index.html";
        }, function(error) {
            console.error('Sign Out Error', error);
        });
    })
    $("#profileButton").on("click", function(){
        window.location.href = "profile.html";
    })

    let a1,a2,a3,a4,a5;
    $('#a1container').on("click", function(){
        if(document.getElementById('articleLink1').hasAttribute("href")){
            $('#a1PB').removeClass("text-muted");
            $('#a1Range').attr('disabled', false);
            a1=true;
        }

        if(a1 && a2 && a3 && a4 && a5){$('#finishButton').removeClass('disabled')}
    });
    $('#a2container').on("click", function(){
        if(document.getElementById('articleLink2').hasAttribute("href")){
            $('#a2PB').removeClass("text-muted");
            $('#a2Range').attr('disabled', false);
            a2=true;
        }
        if(a1 && a2 && a3 && a4 && a5){$('#finishButton').removeClass('disabled')}
    });
    $('#a3container').on("click", function(){
        if(document.getElementById('articleLink3').hasAttribute("href")){
            $('#a3PB').removeClass("text-muted");
            $('#a3Range').attr('disabled', false);
            a3=true;
        }
        if(a1 && a2 && a3 && a4 && a5){$('#finishButton').removeClass('disabled')}
    });
    $('#a4container').on("click", function(){
        if(document.getElementById('articleLink4').hasAttribute("href")){
            $('#a4PB').removeClass("text-muted");
            $('#a4Range').attr('disabled', false);
            a4=true;
        }
        if(a1 && a2 && a3 && a4 && a5){$('#finishButton').removeClass('disabled')}
    });
    $('#a5container').on("click", function(){
        if(document.getElementById('articleLink5').hasAttribute("href")){
            $('#a5PB').removeClass("text-muted");
            $('#a5Range').attr('disabled', false);
            a5=true;
        }
        if(a1 && a2 && a3 && a4 && a5){$('#finishButton').removeClass('disabled')}
    });
    for(let i = 1; i < 6; i++){
        $(`#a${i}Range`).on("input", function(){
            let sliderValue = $(`#a${i}Range`).val();
            $(`#a${i}PB`).css("background", `rgb(${255+(sliderValue*15)}, ${255-Math.abs(sliderValue*15)}, ${255-(sliderValue*15)})`);
            //border-radius: 1.3px;
            //$('input[type=range]').css("border-radius", `1.3px`);
        })
    }
    setInterval(getTimeToNext, 1000);
});