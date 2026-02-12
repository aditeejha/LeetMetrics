document.addEventListener("DOMContentLoaded", function(){

    const searchButton = document.getElementById("search-btn");
    const usernameInput = document.getElementById("user-input");
    const statsContainer = document.querySelector(".stats-container");
    const easyprogressCircle = document.querySelector(".easy-progress");
    const mediumProgressCircle = document.querySelector(".medium-progress");
    const hardProgressCircle = document.querySelector(".hard-progress");
    const easylabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
    const hardLabel = document.getElementById("hard-label");z
    const cardStatsContainer = document.querySelector(".stats-cards");

    //return true or false based on regex(regular expression)
    function validateUsername(username) {
        if(username.trim()===""){
            alert("Username cannot be empty");
            return false;
        }
        const regex= /^[a-zA-Z0-9_-]$/;
        const isMatching = regex.test(username);
        if(!isMatching){
            alert("Invalid Username");
        }
        return isMatching;
    }

    

    searchButton.addEventListener('click', function(){
        const username = usernameInput.value;
        console.log("logging username: ", username);
        if(validateUsername(username)){
        }
    })
})