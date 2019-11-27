// const NewsAPI = require('newsapi');
// const newsapi = new NewsAPI('1f5ab45295f640fe8a9b397a85acfde5');


async function getArticleInfo(){
    //use NEWSAPI to get news articles
    //1. need to get the articles that I just reviewed.
    //2. search for all reviews of each article in the PRIVATE pool.
    //3. mark the number of reviews found for each demographic
    //4. add the score that was given to each demographic the reviewee belonged to.
    /*example:
        "Article 1"
        numReviewMale = 2
        totScoreMale = 8 (out of max of 20)
        so the score we want to display is 8 / 2 = *4*
    */
    const specialHeader = {
        headers: {
            Authorization: `Bearer ${document.cookie}`
        }
    };

    let privateData = await axios.get("http://localhost:3000/private/reviewed" , specialHeader);
    for(let i = 0; i < privateData.data.result.length; i++){
        
    }
    //privateData = privateData.data.result[1];
    privateData = privateData.data;
    let articlesIReviewed = await axios.get('http://localhost:3000/user/articles', specialHeader);
    articlesIReviewed = articlesIReviewed.data.result;
    //alert(JSON.stringify(articlesIReviewed));
    for(let i = 1; i < 6; i++){
        //i represents article # here
        let currTitle = articlesIReviewed.articles[i-1].title;
        document.getElementById(`a${i}Title`).innerHTML = currTitle;
        //search for all reviews of article in the PRIVATE pool:
        //set up variables for averages first:
        let nrmale=0,tsmale=0,nrfemale=0,tsfemale=0,nrother=0,tsother=0,nrBaby=0,tsBaby=0,nrYoung=0,
            tsYoung=0,nrMid=0,tsMid=0,nrOld=0,tsOld=0,nrElderly=0,tsElderly=0,nrNE=0,tsNE=0,nrSouth=0,tsSouth=0,
            nrMW=0,tsMW=0,nrW=0,tsW=0,nrAbroad=0,tsAbroad=0,nrNHS=0,tsNHS=0,nrHS=0,tsHS=0,nrSUN=0,tsSUN=0,nrABD=0,tsABD=0,
            nrMD=0,tsMD=0,nrBLK=0,tsBLK=0,nrAMI=0,tsAMI=0,nrASI=0,tsASI=0,nrHAW=0,tsHAW=0,nrWHI=0,tsWHI=0,nrHIS=0,tsHIS=0,
            nrALT=0,tsALT=0,nrCON=0,tsCON=0,nrMOD=0,tsMOD=0,nrLTR=0,tsLTR=0,nrLIB=0,tsLIB=0,nrSOC=0,tsSOC=0;
        
        for(let k = 0; k < privateData.result.length; k++){
            //for each person's reading pool
        
            for(let j = 0; j < privateData.result[k].articles.length; j++){
                //For each article in the private pool
                //check if title is the same as the one we reviewed:
                if(privateData.result[k].articles[j].title == currTitle){
                    //gender stuff:
                    let gender = privateData.result[k].articles[j].info.userGender; 
                    switch(gender){
                        case "male":
                            nrmale++;
                            tsmale += parseInt(privateData.result[k].articles[j].score, 10);
                            break;
                        case "female":
                            nrfemale++;
                            tsfemale += parseInt(privateData.result[k].articles[j].score, 10);
                            break;
                        case "other":
                            nrother++;
                            tsother += parseInt(privateData.result[k].articles[j].score, 10);
                            break;
                    }
                    //age stuff:
                    let age = parseInt(privateData.result[k].articles[j].info.userAge, 10);
                    switch(true){
                        case (age < 18):
                            nrBaby++;
                            tsBaby += parseInt(privateData.result[k].articles[j].score, 10);
                            break;
                        case (age >= 18 && age < 25):
                            nrYoung++;
                            tsYoung += parseInt(privateData.result[k].articles[j].score, 10);
                            break;
                        case (age >= 25 && age < 40):
                            nrMid++;
                            tsMid += parseInt(privateData.result[k].articles[j].score, 10);
                            break;
                        case (age >= 40 && age < 60):
                            nrOld++;
                            tsOld += parseInt(privateData.result[k].articles[j].score, 10);
                            break;
                        case (age >= 60):
                            nrElderly++;
                            tsElderly += parseInt(privateData.result[k].articles[j].score, 10);
                            break;
                    }
                    //location stuff:
                    let loc = privateData.result[k].articles[j].info.userLocation;
                    switch(loc){
                        case "AK": case "AZ": case "CA": case "OR": case "WA": case "ID": case "MT": case "WY": case "NV": case "UT": case "CO": case "NM": case "HI":
                            nrW++;
                            tsW += parseInt(privateData.result[k].articles[j].score, 10);
                            break;
                        case "ND": case "SD": case "NE": case "KS": case "MN": case "IA": case "MO": case "WI": case "IL": case "MI": case "IN": case "OH":
                            nrMW++;
                            tsMW += parseInt(privateData.result[k].articles[j].score, 10);
                            break;
                        case "PA": case "NJ": case "NY": case "CT": case "RI": case "MA": case "VT": case "NH": case "ME":
                            nrNE++;
                            tsNE += parseInt(privateData.result[k].articles[j].score, 10);
                            break;
                        case "TX": case "OK": case "AR": case "LA": case "KY": case "TN": case "MS": case "AL": case "WV": case "MD": case "DE": case "DC": case "VA": case "NC": case "SC": case "GA": case "FL":
                            nrSouth++;
                            tsSouth += parseInt(privateData.result[k].articles[j].score, 10);
                            break;
                        case "AWAY":
                            nrAbroad++;
                            tsAbroad += parseInt(privateData.result[k].articles[j].score, 10);
                            break;
                    }
                    //education stuff:
                    let edu = privateData.result[k].articles[j].info.userEducation;
                    switch(edu){
                        case "PMS": case "SES":
                            nrNHS++;
                            tsNHS += parseInt(privateData.result[k].articles[j].score, 10);
                            break;
                        case "SHS": case "AHS":
                            nrHS++;
                            tsHS += parseInt(privateData.result[k].articles[j].score, 10);
                            break;
                        case "SUN":
                            nrSUN++;
                            tsSUN += parseInt(privateData.result[k].articles[j].score, 10);
                            break;
                        case "ADG": case "BDG":
                            nrABD++;
                            tsABD += parseInt(privateData.result[k].articles[j].score, 10);
                            break;
                        case "MDG": case "DOC":
                            nrMD++;
                            tsMD += parseInt(privateData.result[k].articles[j].score, 10);
                            break;
                    }
                    //race stuff:
                    let race = privateData.result[k].articles[j].info.userRace;
                    switch(race){
                        case "BLK":
                            nrBLK++;
                            tsBLK += parseInt(privateData.result[k].articles[j].score, 10);
                            break;
                        case "AMI":
                            nrAMI++;
                            tsAMI += parseInt(privateData.result[k].articles[j].score, 10);
                            break;
                        case "ASI":
                            nrASI++;
                            tsASI += parseInt(privateData.result[k].articles[j].score, 10);
                            break;
                        case "NHW":
                            nrNHW++;
                            tsNHW += parseInt(privateData.result[k].articles[j].score, 10);
                            break;
                        case "WHT":
                            nrWHI++;
                            tsWHI += parseInt(privateData.result[k].articles[j].score, 10);
                            break;
                        case "HIS":
                            nrHIS++;
                            tsHIS += parseInt(privateData.result[k].articles[j].score, 10);
                            break;
                    }
                    //affiliation stuff:
                    let aff = privateData.result[k].articles[j].info.userAffiliation;
                    switch(aff){
                        case "altright":
                            nrALT++;
                            tsALT += parseInt(privateData.result[k].articles[j].score, 10);
                            break;
                        case "conservative":
                            nrCON++;
                            tsCON += parseInt(privateData.result[k].articles[j].score, 10);
                            break;
                        case "moderate":
                            nrMOD++;
                            tsMOD += parseInt(privateData.result[k].articles[j].score, 10);
                            break;
                        case "libertarian":
                            nrLTR++;
                            tsLTR += parseInt(privateData.result[k].articles[j].score, 10);
                            break;
                        case "liberal":
                            nrLIB++;
                            tsLIB += parseInt(privateData.result[k].articles[j].score, 10);
                            break;
                        case "socialist":
                            nrSOC++;
                            tsSOC += parseInt(privateData.result[k].articles[j].score, 10);
                            break;
                    }
                    //Data finished allotting. Now we gotta display it all! Look below (outside of the inner 'for' loop)
                }
            }
        }
        //show what we found (change colors, range sliders, etc....):
        
        //gender
        $(`#a${i}AnalysisRange0`).val(nrmale == 0 ? 0 : Math.floor(tsmale/nrmale));
        $(`#a${i}AnalysisRange1`).val(nrfemale == 0 ? 0 : Math.floor(tsfemale/nrfemale));
        $(`#a${i}AnalysisRange2`).val(nrother == 0 ? 0 : Math.floor(tsother/nrother));

        //age
        $(`#a${i}AnalysisRange3`).val(nrBaby == 0 ? 0 : Math.floor(tsBaby/nrBaby));
        $(`#a${i}AnalysisRange4`).val(nrYoung == 0 ? 0 : Math.floor(tsYoung/nrYoung));
        $(`#a${i}AnalysisRange5`).val(nrMid == 0 ? 0 : Math.floor(tsMid/nrMid));
        $(`#a${i}AnalysisRange6`).val(nrOld == 0 ? 0 : Math.floor(tsOld/nrOld));
        $(`#a${i}AnalysisRange7`).val(nrElderly == 0 ? 0 : Math.floor(tsElderly/nrElderly));
        
        //location
        $(`#a${i}AnalysisRange8`).val(nrNE == 0 ? 0 : Math.floor(tsNE/nrNE));
        $(`#a${i}AnalysisRange9`).val(nrSouth == 0 ? 0 : Math.floor(tsSouth/nrSouth));
        $(`#a${i}AnalysisRange10`).val(nrMW == 0 ? 0 : Math.floor(tsMW/nrMW));
        $(`#a${i}AnalysisRange11`).val(nrW == 0 ? 0 : Math.floor(tsW/nrW));
        $(`#a${i}AnalysisRange12`).val(nrAbroad == 0 ? 0 : Math.floor(tsAbroad/nrAbroad));
        
        //education
        $(`#a${i}AnalysisRange13`).val(nrNHS == 0 ? 0 : Math.floor(tsNHS/nrNHS));
        $(`#a${i}AnalysisRange14`).val(nrHS == 0 ? 0 : Math.floor(tsHS/nrHS));
        $(`#a${i}AnalysisRange15`).val(nrSUN == 0 ? 0 : Math.floor(tsSUN/nrSUN));
        $(`#a${i}AnalysisRange16`).val(nrABD == 0 ? 0 : Math.floor(tsABD/nrABD));
        $(`#a${i}AnalysisRange17`).val(nrMD == 0 ? 0 : Math.floor(tsMD/nrMD));

        //race
        $(`#a${i}AnalysisRange18`).val(nrBLK == 0 ? 0 : Math.floor(tsBLK/nrBLK));
        $(`#a${i}AnalysisRange19`).val(nrAMI == 0 ? 0 : Math.floor(tsAMI/nrAMI));
        $(`#a${i}AnalysisRange20`).val(nrASI == 0 ? 0 : Math.floor(tsASI/nrASI));
        $(`#a${i}AnalysisRange21`).val(nrHAW == 0 ? 0 : Math.floor(tsHAW/nrHAW));
        $(`#a${i}AnalysisRange22`).val(nrWHI == 0 ? 0 : Math.floor(tsWHI/nrWHI));
        $(`#a${i}AnalysisRange23`).val(nrHIS == 0 ? 0 : Math.floor(tsHIS/nrHIS));
        
        //affiliation
        $(`#a${i}AnalysisRange24`).val(nrALT == 0 ? 0 : Math.floor(tsALT/nrALT));
        $(`#a${i}AnalysisRange25`).val(nrCON == 0 ? 0 : Math.floor(tsCON/nrCON));
        $(`#a${i}AnalysisRange26`).val(nrMOD == 0 ? 0 : Math.floor(tsMOD/nrMOD));
        $(`#a${i}AnalysisRange27`).val(nrLTR == 0 ? 0 : Math.floor(tsLTR/nrLTR));
        $(`#a${i}AnalysisRange28`).val(nrLIB == 0 ? 0 : Math.floor(tsLIB/nrLIB));
        $(`#a${i}AnalysisRange29`).val(nrSOC == 0 ? 0 : Math.floor(tsSOC/nrSOC));

        for(let k = 0; k < 30; k++){
            //for each slider bar in the subsection
            //alert($(`#a${i}AnalysisRange${k}`).val());
            $(`#${i}${k}`).css("background", `rgb(${255+($(`#a${i}AnalysisRange${k}`).val()*15)}, ${255-Math.abs($(`#a${i}AnalysisRange${k}`).val()*15)}, ${255-($(`#a${i}AnalysisRange${k}`).val()*15)})`);

        }

    }

}

function colorIt(i){
    $(`#a${i}Range`).on("input", function(){
        let sliderValue = $(`#a${i}Range`).val();
        $(`#a${i}PB`).css("background", `rgb(${255+(sliderValue*15)}, ${255-Math.abs(sliderValue*15)}, ${255-(sliderValue*15)})`);
        //border-radius: 1.3px;
        //$('input[type=range]').css("border-radius", `1.3px`);
    }) 
}



$(document).ready(function () {    
    //setInterval(getTimeToNext, 1000);
    getArticleInfo();
});