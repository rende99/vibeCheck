// const NewsAPI = require('newsapi');
// const newsapi = new NewsAPI('1f5ab45295f640fe8a9b397a85acfde5');


async function getArticles(){
    //use NEWSAPI to get news articles
    
}

function submitBias(){
    alert("You have read all the articles!");
    window.location.href = "analysis.html";
}

function colorIt(i){
    $(`#a${i}Range`).on("input", function(){
        let sliderValue = $(`#a${i}Range`).val();
        $(`#a${i}PB`).css("background", `rgb(${255+(sliderValue*15)}, ${255-Math.abs(sliderValue*15)}, ${255-(sliderValue*15)})`);
        //border-radius: 1.3px;
        //$('input[type=range]').css("border-radius", `1.3px`);
    }) 
}

async function displayArticleInfo(x){
    let i = x.data;
    //should actually be private articles that i've reviewed today.
    let biasResponse = await axios.get('http://localhost:3000/public/reviewed',{});
    alert(biasResponse);
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
    //first thing we do is get the thing that the person searched   
    let searchQuery = getQueryVariable('searchQuery');
    //setInterval(getTimeToNext, 1000);
    for(let i = 1; i < 6; i++){
        $(`#inlineRadio${i}`).on("click", null, i, displayArticleInfo);
    }
});