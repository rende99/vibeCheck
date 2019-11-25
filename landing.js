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
    //make post request with the articles that we have read today

    let biasResponse = await axios.post('http://localhost:3000/public/reviewed',
    {
        data: {
            "titles": {
                't1': document.getElementById(`a1Title`).innerHTML,
                't2': document.getElementById(`a2Title`).innerHTML,
                't3': document.getElementById(`a3Title`).innerHTML,
                't4': document.getElementById(`a4Title`).innerHTML,
                't5': document.getElementById(`a5Title`).innerHTML,
            },
            "URLs": {
                'u1':  document.getElementById(`articleLink1`).attr("href"),
                'u2':  document.getElementById(`articleLink2`).attr("href"),
                'u3':  document.getElementById(`articleLink3`).attr("href"),
                'u4':  document.getElementById(`articleLink4`).attr("href"),
                'u5':  document.getElementById(`articleLink5`).attr("href"),
            }
        },
    });

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





$(document).ready(function () {
    getArticles();
    let a1,a2,a3,a4,a5;
    $('#a1container').on("click", function(){
        $('#a1PB').removeClass("text-muted");
        $('#a1Range').attr('disabled', false);
        a1=true;
        if(a1 && a2 && a3 && a4 && a5){$('#finishButton').removeClass('disabled')}
    });
    $('#a2container').on("click", function(){
        $('#a2PB').removeClass("text-muted");
        $('#a2Range').attr('disabled', false);
        a2=true;
        if(a1 && a2 && a3 && a4 && a5){$('#finishButton').removeClass('disabled')}
    });
    $('#a3container').on("click", function(){
        $('#a3PB').removeClass("text-muted");
        $('#a3Range').attr('disabled', false);
        a3=true;
        if(a1 && a2 && a3 && a4 && a5){$('#finishButton').removeClass('disabled')}
    });
    $('#a4container').on("click", function(){
        $('#a4PB').removeClass("text-muted");
        $('#a4Range').attr('disabled', false);
        a4=true;
        if(a1 && a2 && a3 && a4 && a5){$('#finishButton').removeClass('disabled')}
    });
    $('#a5container').on("click", function(){
        $('#a5PB').removeClass("text-muted");
        $('#a5Range').attr('disabled', false);
        a5=true;
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
    $('#finishButton').on("click", submitBias)
});