// const NewsAPI = require('newsapi');
// const newsapi = new NewsAPI('1f5ab45295f640fe8a9b397a85acfde5');


async function getArticles(){
    const specialHeader = {
        headers: {
            Authorization: `Bearer ${document.cookie}`
        }
    };
    //use NEWSAPI to get news articles
    // get a user attribute here to see if they've already done articles for today. If not, do what's already below.
    // If they have already done articles, then show update the ranges with what they declared the bias was, and the article titles.
    //d is the current day (27 for nov. 27, for example)
    let d = new Date();
    d = d.getDate();
    var dateJSONInfo = 0;
    try{
        let dateJSONInfo2 = await axios.get(`http://localhost:3000/user/articles`,
        specialHeader
        );  
        dateJSONInfo = dateJSONInfo2.data.result.userDate;

    }catch{
        dateJSONInfo = -1;
    }

    
    
    //alert("Date from GET request: " + dateJSONInfo);

    if(d != dateJSONInfo){
        //Different Date. Give new articles
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
                document.getElementById(`a${numFound+1}Title`).innerHTML = newsResponse.data.articles[i].title;
//                alert(document.getElementById(`a${numFound+1}Title`).innerHTML);
                document.getElementById(`articleLink${numFound+1}`).setAttribute("href", newsResponse.data.articles[i].url);
                //alert(numFound);
                numFound++;
            }
        }

        //note: date is 'd' here...

    }else{
        //alert(dateJSONInfo);
        //was already given articles. Get them, and do not allow them to make changes to the bias they already gave.
        let existingArticles = await axios.get(`http://localhost:3000/user/articles`,
            specialHeader
        );
        existingArticles = existingArticles.data.result;
        //alert(JSON.stringify(existingArticles.articles[0].title));
        for(let i = 1; i < 6; i++){
            document.getElementById(`a${i}Title`).innerHTML = existingArticles.articles[i-1].title;
            document.getElementById(`articleLink${i}`).removeAttribute("href");
            $(`#a${i}Range`).val(existingArticles.articles[i-1].score);
            let sliderValue = $(`#a${i}Range`).val();
            $(`#a${i}PB`).css("background", `rgb(${255+(sliderValue*15)}, ${255-Math.abs(sliderValue*15)}, ${255-(sliderValue*15)})`);
        }
        $(`<html><div class="text-center p-3" style="font-size: 20px; padding-top: 10px; padding-bottom: 80px;">Click <a href="analysis.html">here</a> to see the sitewide analysis for each of today's articles.</div></html>`)
        .insertAfter('#news');
        document.getElementById('instructions').innerHTML = "You've already completed your analysis for today! Come back tomorrow for another set of articles.";
        document.getElementById('finishButton').classList.add("invisible");
    }
    
    
}

async function submitBias(){
    //make post request with the articles that we have read today
    const specialHeader = {
        headers: {
            Authorization: `Bearer ${document.cookie}`
        }
    };
    let d = new Date();
    d = d.getDate();

    /********************************************************************************** 
        in public: Every single review of every article, with each score attached. Will allow
        unlogged-in users to search for article, and see bias.
        in private: Every single review of every article, with score and demographic info attached. Will allow
        logged-in users to see more in-depth data on each article
        user: should have demographic information of the user, as well as the articles they have reviewed today.
    ***********************************************************************************/
    //first, delete the articles from the day before (if any)
    /*
    try {
        let deleteResponse = await axios.delete('http://localhost:3000/user/articles',
            specialHeader
        );
    } catch (error){

    }
    */
    //now, add the new articles from today:

    let addArticlesToday = await axios.post('http://localhost:3000/user/articles',
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
            ],
            "userDate": d
        }
    },
        specialHeader
    );
    
   
    let biasPublicResponse = await axios.post('http://localhost:3000/public/reviewed',
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
    //get demographic information for the private post.
    //
    //
    const demoJSONInfo = await axios.get(`http://localhost:3000/user/info`,
        specialHeader
    );

    let biasPrivateResponse = await axios.post('http://localhost:3000/private/reviewed',
    {
        data: {
            "articles": [
                {
                    "title": document.getElementById(`a1Title`).innerHTML,
                    "url": document.getElementById(`articleLink1`).href,
                    "score": $(`#a1Range`).val(),
                    "info": demoJSONInfo.data.result
                },
                {
                    "title": document.getElementById(`a2Title`).innerHTML,
                    "url": document.getElementById(`articleLink2`).href,
                    "score": $(`#a2Range`).val(),
                    "info": demoJSONInfo.data.result
                },
                {
                    "title": document.getElementById(`a3Title`).innerHTML,
                    "url": document.getElementById(`articleLink3`).href,
                    "score": $(`#a3Range`).val(),
                    "info": demoJSONInfo.data.result
                },
                {
                    "title": document.getElementById(`a4Title`).innerHTML,
                    "url": document.getElementById(`articleLink4`).href,
                    "score": $(`#a4Range`).val(),
                    "info": demoJSONInfo.data.result
                },
                {
                    "title": document.getElementById(`a5Title`).innerHTML,
                    "url": document.getElementById(`articleLink5`).href,
                    "score": $(`#a5Range`).val(),
                    "info": demoJSONInfo.data.result
                }        
            ]
        },
        "type": "merge",
    },
        specialHeader
    );

    window.location.href = "analysis.html";
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

function searchHandle(arr){
    //if(searchQuery)return;
    //firing each time the search bar is TYPED in.
    //get list of all titles of all articles
    let searchQuery = $('#searchBar').val();
    //alert(searchQuery);
    let clrID = setTimeout(()=>{
        //remove datalist, if existing
        let possibleTitles = [];
        for(let i = 0; i < arr.length; i++){
            if((arr[i].toLowerCase()).includes(searchQuery.toLowerCase())){
                possibleTitles.push(arr[i]);
            }
        }
        //alert(possibleTitles)
        for(let i = 0; i < possibleTitles.length; i++){
            //see if it already exists in the list.
            $('option').remove();
            //$(`#searchAuto`).(`<option value=\"${possibleTitles[i]}\"></option>`)
        }
        for(let i = 0; i < possibleTitles.length; i++){
            $(`#searchAuto`).append(`<option value='${possibleTitles[i]}'></option>`)
        }
        //alert(possibleTitles);
        //add datalist

        
    }, 200);
    //DEBOUNCING AND ALL THAT SHOULD BE GOING ON AROUND HERE!!! THIS IS WHERE THE USER IS SEARCHING FOR SOMETHING!
    if (event.keyCode === 13) {
        window.location.href = `singleArticleAnalysis.html?searchQuery=${searchQuery}`;
    }
    //if click away, also clear the interval, also reset:
}


$(document).ready(async function () {
    //put up logo
    let seed = Math.floor(Math.random()*3); //0, 1, or 2
    if(seed == 0) $('#logo').attr('src', 'img/vibeCheck.png');
    if(seed == 1) $('#logo').attr('src', 'img/vibeCheckM.png');
    if(seed == 2) $('#logo').attr('src', 'img/vibeCheckY.png');

    getArticles();
    let pubResponse = await axios.get("http://localhost:3000/public/reviewed");
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
    //Article title array is filled. Add the event listener now:
    $("#searchBar").keyup(function(){searchHandle(uniqueArticleTitles)});

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
    $('#finishButton').on("click", submitBias)
});