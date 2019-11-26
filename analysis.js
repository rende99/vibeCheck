// const NewsAPI = require('newsapi');
// const newsapi = new NewsAPI('1f5ab45295f640fe8a9b397a85acfde5');


async function getArticles(){
    //use NEWSAPI to get news articles
    
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

async function displayArticleInfo(x){
    let i = x.data;
    //should actually be private articles that i've reviewed today.
    let biasResponse = await axios.post('http://localhost:3000/public/reviewed',{});
    alert(biasResponse);
}



$(document).ready(function () {    
    //setInterval(getTimeToNext, 1000);
    for(let i = 1; i < 6; i++){
        $(`#inlineRadio${i}`).on("click", null, i, displayArticleInfo);
    }
});