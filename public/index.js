const apiUrl= "https://api.github.com/users/";

// Creating today's day & date
const weekArray = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const monthArray = ["Jan","Feb","Mar","April","May","June","July","Aug","Sept","Octr","Nov","Dec"];

const d = new Date();
let day = weekArray[d.getDay()];
let date = d.getDate();
let month = monthArray[d.getMonth()];
let year = d.getFullYear();

date= day+ ", "+ date+ " "+ month+ ", "+ year;

// Dispalying the search svg by default
showSearchSvg()

const searchCity = document.querySelector('.searchCity')
// Creating Search Functionality
searchCity.addEventListener('submit', (event) => {

    // Preventing default submission of the form
    event.preventDefault();

    // 'window' object is used to declare variables inside a function as 'global variable'
    window.searchContent = document.getElementById('searchText').value;

    console.log(searchContent)

    if (searchContent) {
        getData(apiUrl + searchContent);
    }

    else {
        showSearchSvg()
    }

})


// Creating getData() function to get weather data from the API
function getData(url) {

    console.log(url)
    
    fetch(url).then(res => res.json()).then(data => {
        // Displaying the data json
        console.log(data)

        // If the serached city is not available, then display 404 not found page
        if (data.message == 'Not Found') {
            notFoundSvg()
        }

        else{
            showUser(data)
        }

    })
}

function showSearchSvg(){
    display = `
        <div class="card">
            <h3 class="card-title text-center mt-1" style="font-family: 'Times New Roman', Times, serif; font-weight: bold;">Search a User...</h3>
            <img src = "images/search.svg" class="mx-4 my-lg-2 my-0" alt="My Happy SVG" style="height: 400px;"/>
        </div>
    `

    document.getElementById('weatherwidget').innerHTML= display;
}

function notFoundSvg(){
    display = `
        <div class="card">
            <h3 class="card-title text-center mt-1" style="font-family: 'Times New Roman', Times, serif; font-weight: bold;">Oops... No user found</h3>
            <img src = "images/404.svg" class="mx-4 my-lg-2 my-0" alt="My Happy SVG" style="height: 400px;"/>
        </div>
    `

    document.getElementById('weatherwidget').innerHTML= display;
}

// Getting the search URL starting from ?
const queryString = window.location.search;

/* // Breaking (parsing) the queryString into parts, so that each data can be retreived
const urlParams = new URLSearchParams(queryString);

// Getting the value of 'id' in the url 
var unitp = urlParams.get('units')
console.log(unitp) */


/* Function to display result */
function showUser(data) {

    // Splitting the creation & updation dates
    let createDate= data.created_at;
    const myArray1= createDate.split("T")
    let newCreateDate= myArray1[0];

    let updateDate= data.updated_at;
    const myArray2= updateDate.split("T")
    let newUpdateDate= myArray2[0];

    display = `
        <div class="card">
            <div class="card-body">
                
                <div class= "d-flex justify-content-between upperText">
                    <h5 class="card-title" style="font-family:'Times New Roman', Times, serif" >${data.name}</h5>

                    <h5 class="card-title" style="font-family:'Times New Roman', Times, serif">${date}</h5>
                </div>
                
                
        
                <div id="tempcard" >
                    <img class="profileImage mx-auto d-flex justify-content-between rounded-circle my-3 py-3 border-5" src= "${data.avatar_url}">
                </div>

                <div class="overflow-hidden">

                            <div class="row gy-4">

                                <div class="col-lg-4 col-sm-6">

                                    <div class="card text-center" >
                                    <h5 class="card-header" style= "font-weight: bold;">User Name</h5>

                                    <img src = "images/avatar.svg" class="mx-4 my-2" alt="My Happy SVG" style="height: 150px;"/>
                                        
                                        <div class="card-body">
                                          <h4 class="card-text box1"  style="font-family:'Times New Roman', Times, serif">${data.login} </h4>
                                        </div>
                                    </div>

                                </div>

                                <div class="col-lg-4 col-sm-6">

                                    <div class="card text-center" >
                                    <h5 class="card-header" style= "font-weight: bold;">Created On</h5>

                                    <img src = "images/created.svg" class="mx-4 my-2" alt="My Happy SVG" style="height: 150px;"/>
                                        
                                        <div class="card-body">
                                          <h4 class="card-text box5"  style="font-family:'Times New Roman', Times, serif">${newCreateDate} </h4>
                                        </div>
                                    </div>
                                    
                                </div>


                                <div class="col-lg-4 col-sm-6">

                                    <div class="card text-center" >
                                    <h5 class="card-header" style= "font-weight: bold;">Last Updated</h5>

                                    <img src = "images/update.svg" class="mx-4 my-2" alt="My Happy SVG" style="height: 150px;"/>
                                        
                                        <div class="card-body">
                                          <h4 class="card-text box6"  style="font-family:'Times New Roman', Times, serif">${newUpdateDate} </h4>
                                        </div>
                                    </div>
                                    
                                </div>

                                <div class="col-lg-4 col-sm-6">

                                    <div class="card text-center" >
                                    <h5 class="card-header" style= "font-weight: bold;">Repos</h5>

                                    <img src = "images/repos.svg" class="mx-4 my-2" alt="My Happy SVG" style="height: 150px;"/>
                                        
                                        <div class="card-body">
                                          <h4 class="card-text box4"  style="font-family:'Times New Roman', Times, serif">${data.public_repos} </h4>
                                        </div>
                                    </div>
                                    
                                </div>

                                <div class="col-lg-4 col-sm-6">

                                    <div class="card text-center" >
                                    <h5 class="card-header" style= "font-weight: bold;">Followers</h5>

                                    <img src = "images/followers.svg" class="mx-4 my-2" alt="My Happy SVG" style="height: 150px;"/>
                                        
                                        <div class="card-body">
                                          <h4 class="card-text box2"  style="font-family:'Times New Roman', Times, serif">${data.followers} </h4>
                                        </div>
                                    </div>
                                    
                                </div>

                                <div class="col-lg-4 col-sm-6">

                                    <div class="card text-center" >
                                    <h5 class="card-header" style= "font-weight: bold;">Following</h5>

                                    <img src = "images/following.svg" class="mx-4 my-2" alt="My Happy SVG" style="height: 150px;"/>
                                        
                                        <div class="card-body">
                                          <h4 class="card-text box3"  style="font-family:'Times New Roman', Times, serif">${data.following} </h4>
                                        </div>
                                    </div>
                                    
                                </div>

                                

                                                              

                            </div>

                        </div>


            </div>
        </div>
    `

    document.getElementById('weatherwidget').innerHTML= display;

}