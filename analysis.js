// const NewsAPI = require('newsapi');
// const newsapi = new NewsAPI('1f5ab45295f640fe8a9b397a85acfde5');


async function getArticles(){
    //use NEWSAPI to get news articles
    let newsResponse = await axios({
        url: "https://newsapi.org/v2/top-headlines?country=us&language=en&apiKey=1f5ab45295f640fe8a9b397a85acfde5",
    });
    //alert(JSON.stringify(newsResponse.data.articles[0].title));
    let numFound = 0;
    for(let i = 0; numFound < 5; i++){
        if((newsResponse.data.articles[i].url.includes("nytimes.com") || newsResponse.data.articles[i].url.includes("cnn.com")
        || newsResponse.data.articles[i].url.includes("wsj.com")  || newsResponse.data.articles[i].url.includes("yahoo.com")
        || newsResponse.data.articles[i].url.includes("google.com")  || newsResponse.data.articles[i].url.includes("huffingtonpost")
        || newsResponse.data.articles[i].url.includes("foxnews.com")  || newsResponse.data.articles[i].url.includes("nbcnews.com")
        || newsResponse.data.articles[i].url.includes("dailymail.c") || newsResponse.data.articles[i].url.includes("theguardian.com"))
        && !newsResponse.data.articles[i].title.includes("Washington Post")){
            document.getElementById(`a${numFound+1}Title`).innerHTML = newsResponse.data.articles[i].title;
            document.getElementById(`articleLink${numFound+1}`).setAttribute("href", newsResponse.data.articles[i].url);
            numFound++;
        }

    }
    
}

function submitBias(){
    alert("You have read all the articles!");
    window.location.href = "analysis.html";
}

function getTimeToNext(){
    let currTime = new Date();
    let nextTime = new Date();
    //alert(currTime);
    if(currTime.getHours() >= 9) nextTime.setDate(currTime.getDate() + 1);
    nextTime.setHours(9,0,0,0);
    let t = nextTime - currTime;
    let hours = Math.floor((t%(1000 * 60 * 60 * 24))/(1000 * 60 * 60));
    hours = hours > 9 ? hours : "0" + hours;
    let minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
    minutes = minutes > 9 ? minutes : "0" + minutes;
    let seconds = Math.floor((t % (1000 * 60)) / 1000); 
    seconds = seconds > 9 ? seconds : "0" + seconds;
    //alert(`${hours}:${minutes}:${seconds}`);
    document.getElementById('timer').innerHTML = `New Articles in: ${hours}:${minutes}:${seconds}`;
}

function colorIt(i){
    $(`#a${i}Range`).on("input", function(){
        let sliderValue = $(`#a${i}Range`).val();
        $(`#a${i}PB`).css("background", `rgb(${255+(sliderValue*15)}, ${255-Math.abs(sliderValue*15)}, ${255-(sliderValue*15)})`);
        //border-radius: 1.3px;
        //$('input[type=range]').css("border-radius", `1.3px`);
    }) 
}

function displayArticleInfo(i){
    alert(i.data);
}



$(document).ready(function () {
    getArticles();
    
    //setInterval(getTimeToNext, 1000);
    for(let i = 1; i < 6; i++){
        $(`#inlineRadio${i}`).on("click", null, i, displayArticleInfo);
    }
});