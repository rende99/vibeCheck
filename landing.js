// const NewsAPI = require('newsapi');
// const newsapi = new NewsAPI('1f5ab45295f640fe8a9b397a85acfde5');


async function getArticles(){
    //use NEWSAPI to get news articles
    // get a user attribute here to see if they've already done articles for today. If not, do what's already below.
    // If they have already done articles, then show update the ranges with what they declared the bias was, and the article titles.

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

async function submitBias(){
    //make post request with the articles that we have read today
    

    /********************************************************************************** 
        should be PUTTING to USER too, overwriting the old things user reviewed yesterday!
        if PUTTING doesn't work, DELETE then POST.

        in public: Every single review of every article, with each score attached. Will allow
        unlogged-in users to search for article, and see bias.
        in private: Every single review of every article, with score and demographic info attached. Will allow
        logged-in users to see more in-depth data on each article
        user: should have demographic information of the user, as well as the articles they have reviewed today.
    ***********************************************************************************/
    alert(document.cookie);
    /*
    let deleteResponse = await axios.delete('http://localhost:3000/user/articles',{
        headers: {
            Authorization: document.cookie
        }
    });
    
    let userResponse = await axios.post('http://localhost:3000/user/articles', {
        headers: {
            Authorization: document.cookie
        },
        data: {
            "articles": [
                {
                    "title": document.getElementById(`a1Title`).innerHTML,
                    "url": document.getElementById(`articleLink1`).href,
                    "score": $(`#a1Range`).val()
                },
                {
                    "title": document.getElementById(`a2Title`).innerHTML,
                    "url": document.getElementById(`articleLink2`).href,
                    "score": $(`#a2Range`).val()
                },
                {
                    "title": document.getElementById(`a3Title`).innerHTML,
                    "url": document.getElementById(`articleLink3`).href,
                    "score": $(`#a3Range`).val()
                },
                {
                    "title": document.getElementById(`a4Title`).innerHTML,
                    "url": document.getElementById(`articleLink4`).href,
                    "score": $(`#a4Range`).val()
                },
                {
                    "title": document.getElementById(`a5Title`).innerHTML,
                    "url": document.getElementById(`articleLink5`).href,
                    "score": $(`#a5Range`).val()
                }  
            ]
        }
    });
    alert(JSON.stringify(userResponse.data));
    
    
    let todayArticles = await axios.post('http://localhost:3000/private/all',{
        headers: {
            Authorization: document.cookie
        },
        data: {
            "articles": [
                {
                    "title": document.getElementById(`a1Title`).innerHTML,
                    "url": document.getElementById(`articleLink1`).href,
                    "score": $(`#a1Range`).val()
                },
                {
                    "title": document.getElementById(`a2Title`).innerHTML,
                    "url": document.getElementById(`articleLink2`).href,
                    "score": $(`#a2Range`).val()
                },
                {
                    "title": document.getElementById(`a3Title`).innerHTML,
                    "url": document.getElementById(`articleLink3`).href,
                    "score": $(`#a3Range`).val()
                },
                {
                    "title": document.getElementById(`a4Title`).innerHTML,
                    "url": document.getElementById(`articleLink4`).href,
                    "score": $(`#a4Range`).val()
                },
                {
                    "title": document.getElementById(`a5Title`).innerHTML,
                    "url": document.getElementById(`articleLink5`).href,
                    "score": $(`#a5Range`).val()
                }        
            ]
        },
    });
    */
    let biasResponse = await axios.post('http://localhost:3000/public/reviewed',
    {
        data: {
            "articles": [
                {
                    "title": document.getElementById(`a1Title`).innerHTML,
                    "url": document.getElementById(`articleLink1`).href,
                    "score": $(`#a1Range`).val()
                },
                {
                    "title": document.getElementById(`a2Title`).innerHTML,
                    "url": document.getElementById(`articleLink2`).href,
                    "score": $(`#a2Range`).val()
                },
                {
                    "title": document.getElementById(`a3Title`).innerHTML,
                    "url": document.getElementById(`articleLink3`).href,
                    "score": $(`#a3Range`).val()
                },
                {
                    "title": document.getElementById(`a4Title`).innerHTML,
                    "url": document.getElementById(`articleLink4`).href,
                    "score": $(`#a4Range`).val()
                },
                {
                    "title": document.getElementById(`a5Title`).innerHTML,
                    "url": document.getElementById(`articleLink5`).href,
                    "score": $(`#a5Range`).val()
                }        
            ]
        },
        "type": "merge"
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
    $("#searchBar").keyup(function(event) {
        //DEBOUNCING AND ALL THAT SHOULD BE GOING ON AROUND HERE!!! THIS IS WHERE THE USER IS SEARCHING FOR SOMETHING!
        if (event.keyCode === 13) {
            let searchQuery = $('#searchBar').val();
            window.location.href = `singleArticleAnalysis.html?searchQuery=${searchQuery}`;

        }
    });
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