
const userRoot = new axios.create({
    baseURL: "http://localhost:3000/user"
});

async function createDemo({userGender, userAge, userLocation, userEducation, userRace, userAffiliation, token}) {
    return await userRoot.post(`/demo`, {
        data: {userGender, userAge, userLocation, userEducation, userRace, userAffiliation},
        headers: {'Authorization': `Bearer ${token}` }
    });
}


export default function pageLoaded() {
    var made = false;
    var userName;
    var pass;

    $('#submitButton').on("click", async function(){
        //event.preventDefault();
        //Reveal more

        if(!made){
            $(
            `<div class="container" id="hid2" style="width: 40%; padding: 40px;" onsubmit="return false">
                <form onsubmit="return false">
                    <div class="form-group shadow p-3 mb-5 bg-white rounded" id="genderSelector">
                        <h4>What is your gender?</h4>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="exampleRadios" id="maleRadio" value="male">
                            <label class="form-check-label" for="maleRadio">
                                Male
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="exampleRadios" id="femaleRadio" value="female">
                            <label class="form-check-label" for="femaleRadio">
                                Female
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="exampleRadios" id="otherRadio" value="other">
                            <label class="form-check-label" for="otherRadio">
                                Other
                            </label>
                        </div> 
                    </div>
                </form>
                <form onsubmit="return false">
                    <div class="form-group shadow p-3 mb-5 bg-white rounded">
                        <h4>What is your Age?</h4>
                        <input type="email" class="form-control" id="userAge" placeholder="Enter Age">
                    </div>
                    <div class="form-group shadow p-3 mb-5 bg-white rounded">
                        <h4>Where are you from?</h4>
                        <div class="input-group mb-3">
                            <select class="custom-select" id="stateSelector">
                                <option selected>Choose...</option>
                                <option value="AWAY">Outside of the USA</option>
                                <option value="AK">Alaska</option>
                                <option value="AL">Alabama</option>
                                <option value="AR">Arkansas</option>
                                <option value="AZ">Arizona</option>
                                <option value="CA">California</option>
                                <option value="CO">Colorado</option>
                                <option value="CT">Connecticut</option>
                                <option value="DC">District of Columbia</option>
                                <option value="DE">Delaware</option>
                                <option value="FL">Florida</option>
                                <option value="GA">Georgia</option>
                                <option value="HI">Hawaii</option>
                                <option value="IA">Iowa</option>
                                <option value="ID">Idaho</option>
                                <option value="IL">Illinois</option>
                                <option value="IN">Indiana</option>
                                <option value="KS">Kansas</option>
                                <option value="KY">Kentucky</option>
                                <option value="LA">Louisiana</option>
                                <option value="MA">Massachusetts</option>
                                <option value="MD">Maryland</option>
                                <option value="ME">Maine</option>
                                <option value="MI">Michigan</option>
                                <option value="MN">Minnesota</option>
                                <option value="MO">Missouri</option>
                                <option value="MS">Mississippi</option>
                                <option value="MT">Montana</option>
                                <option value="NC">North Carolina</option>
                                <option value="ND">North Dakota</option>
                                <option value="NE">Nebraska</option>
                                <option value="NH">New Hampshire</option>
                                <option value="NJ">New Jersey</option>
                                <option value="NM">New Mexico</option>
                                <option value="NV">Nevada</option>
                                <option value="NY">New York</option>
                                <option value="OH">Ohio</option>
                                <option value="OK">Oklahoma</option>
                                <option value="OR">Oregon</option>
                                <option value="PA">Pennsylvania</option>
                                <option value="PR">Puerto Rico</option>
                                <option value="RI">Rhode Island</option>
                                <option value="SC">South Carolina</option>
                                <option value="SD">South Dakota</option>
                                <option value="TN">Tennessee</option>
                                <option value="TX">Texas</option>
                                <option value="UT">Utah</option>
                                <option value="VA">Virginia</option>
                                <option value="VT">Vermont</option>
                                <option value="WA">Washington</option>
                                <option value="WI">Wisconsin</option>
                                <option value="WV">West Virginia</option>
                                <option value="WY">Wyoming</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group shadow p-3 mb-5 bg-white rounded">
                        <h4>What is the highest form of education you've completed?</h4>
                        <div class="input-group mb-3">
                            <select class="custom-select" id="educationSelector">
                                <option selected>Choose...</option>
                                <option value="PMS">Primary School</option>
                                <option value="SES">Secondary School</option>
                                <option value="SHS">Some High School</option>
                                <option value="AHS">High School (GED)</option>
                                <option value="SUN">Some University</option>
                                <option value="ADG">Associate's Degree</option>
                                <option value="ADG">Bachelor's Degree</option>
                                <option value="ADG">Master's Degree</option>
                                <option value="ADG">Doctorate</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group shadow p-3 mb-5 bg-white rounded">
                        <h4>What's your Race/Ethnicity?</h4>
                        <div class="input-group mb-3">
                            <select class="custom-select" id="raceSelector">
                                <option selected>Choose...</option>
                                <option value="BLK">Black / African American</option>
                                <option value="AMI">American Indian / Alaska Native</option>
                                <option value="ASI">Asian</option>
                                <option value="NHW">Native Hawaiian or Other Pacific Islander</option>
                                <option value="WHT">White</option>
                                <option value="HIS">Hispanic or Latinx</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group shadow p-3 mb-5 bg-white rounded" id="affiliationSelector">
                        <h4>Where on the Political Spectrum are you?</h4>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="exampleRadios" id="altright" value="altright">
                            <label class="form-check-label" for="altright">
                                Alt-Right
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="exampleRadios" id="conservative" value="conservative">
                            <label class="form-check-label" for="conservative">
                                Conservative
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="exampleRadios" id="moderate" value="moderate">
                            <label class="form-check-label" for="moderate">
                                Moderate
                            </label>
                        </div> 
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="exampleRadios" id="libertarian" value="libertarian">
                            <label class="form-check-label" for="libertarian">
                                Libertarian
                            </label>
                        </div> 
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="exampleRadios" id="liberal" value="liberal">
                            <label class="form-check-label" for="liberal">
                                Liberal
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="exampleRadios" id="socialist" value="socialist">
                            <label class="form-check-label" for="socialist">
                                Socialist
                            </label>
                        </div>
                    </div>
                </form>
                <a class="btn btn-primary" href="#" role="button" id="finishButton">Finish</a>
            </div>`
            ).insertAfter('#firstContainer');
            $(`<h1 class="display-3 text-center" id="hid1">A few more questions...</h1>`).insertAfter('#firstContainer');
            made = true;
            $('#finishButton').on("click", doRest);

        }

    });
    async function doRest(){
        //create new
        alert(
        "1"
        )
        event.preventDefault();
        
        userName = $('#userEmail').val();
        pass = $('#userPassword').val();
        const createResponse = await axios({
            method: "post",
            url: "http://localhost:3000/account/create",
            data: {
                name: userName,
                pass: pass
            },
        });

        let userGender = $('#genderSelector input:radio:checked').val()
        let userAge = $('#userAge').val();
        let userLocation = $('#stateSelector').val();
        let userEducation = $('#educationSelector').val();
        let userRace = $('#raceSelector').val();
        let userAffiliation = $('#affiliationSelector input:radio:checked').val();
        
        
        alert(
            "2"
            )
        //need to get 'Bearer' auth jwt token to send as part of this request.
        const loginResponse = await axios({
            method: "post",
            url: "http://localhost:3000/account/login",
            data: {
                name: userName,
                pass: pass
            },
        });
        alert(
            "3"
            )
        let token = loginResponse.data.jwt;
        alert(
            "4"
            )
       
        alert(
            "5"
            )
   
        
        
        const response = await axios({
            method: "post",
            url: "http://localhost:3000/private/demo",
            headers: {
                'authorization': 'Bearer ' + token,
            },
            data: {
                userGender: userGender,
                userAge: userAge,
                userLocation: userLocation,
                userEducation: userEducation,
                userRace: userRace,
                userAffiliation: userAffiliation
            },
        });
        
    }

}






$(document).ready(function () {
    pageLoaded();
});