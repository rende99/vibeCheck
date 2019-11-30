// const NewsAPI = require('newsapi');
// const newsapi = new NewsAPI('1f5ab45295f640fe8a9b397a85acfde5');

async function getRecentArticles(){
    let recentResponse = await axios.get("http://localhost:3000/public/reviewed");
    //Get the final 5 article names. put that in each title. Then search the data for each instance of the article name, and 
    //get the average score. then put in a range with that score/color.
    let length = recentResponse.data.result[recentResponse.data.result.length-1].articles.length;
    for(let i = 1; i < 6; i++){
        //get title of each article
        let title = recentResponse.data.result[recentResponse.data.result.length-1].articles[length - i].title;
        let score = recentResponse.data.result[recentResponse.data.result.length-1].articles[length - i].score;
        document.getElementById(`a${i}`).innerHTML = title;
        $(`#a${i}AnalysisRange`).val(score);
        $(`#a${i}PB`).css("background", `rgb(${255+(score*15)}, ${255-Math.abs(score*15)}, ${255-(score*15)})`);
    }


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
    getRecentArticles();
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
    
   
});