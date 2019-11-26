// const NewsAPI = require('newsapi');
// const newsapi = new NewsAPI('1f5ab45295f640fe8a9b397a85acfde5');

const pubRoot = new axios.create({
    baseURL: "http://localhost:3000/public"
});

async function getRecentArticles(){
    //alert('');
    let recentResponse = await axios.get("http://localhost:3000/public/",{
    });
    alert(recentResponse);
}


$(document).ready(function () {
    $("#searchBar").keyup(function(event) {
        //DEBOUNCING AND ALL THAT SHOULD BE GOING ON AROUND HERE!!! THIS IS WHERE THE USER IS SEARCHING FOR SOMETHING!
        if (event.keyCode === 13) {
            let searchQuery = $('#searchBar').val();
            window.location.href = `singleArticleAnalysis.html?searchQuery=${searchQuery}`;

        }
    });
    getRecentArticles();
   
});