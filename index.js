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


$(document).ready(async function () {
    getRecentArticles();
    $("#searchBar").keyup(function(event) {
        //DEBOUNCING AND ALL THAT SHOULD BE GOING ON AROUND HERE!!! THIS IS WHERE THE USER IS SEARCHING FOR SOMETHING!
        if (event.keyCode === 13) {
            let searchQuery = $('#searchBar').val();
            window.location.href = `singleArticleAnalysis.html?searchQuery=${searchQuery}`;

        }
    });
   
});