document.addEventListener("DOMContentLoaded", function(){

    const searchButton = document.getElementById("search-btn");
    const usernameInput = document.getElementById("user-input");
    const statsContainer = document.querySelector(".stats-container");
    const easyprogressCircle = document.querySelector(".easy-progress");
    const mediumProgressCircle = document.querySelector(".medium-progress");
    const hardProgressCircle = document.querySelector(".hard-progress");
    const easylabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
    const hardLabel = document.getElementById("hard-label");
    const cardStatsContainer = document.querySelector(".stats-cards");

    //return true or false based on regex(regular expression)
    function validateUsername(username) {
        if(username.trim()===""){
            alert("Username cannot be empty");
            return false;
        }
        const regex= /^[a-zA-Z0-9_-]+$/;
        const isMatching = regex.test(username);
        if(!isMatching){
            alert("Invalid Username");
        }
        return isMatching;
    }

    async function fetchUserDetails(username){
        
        try{
            const url=`https://alfa-leetcode-api.onrender.com/userProfile/${username}`;
            searchButton.textContent="Searching...";
            searchButton.disabled=true;
            
            const response = await fetch(url);
            if(!response.ok){
                throw new Error("Unable to fetch user details");
            }
            const data = await response.json();
            console.log("Logging data: ", data);

            displayUserData(data);
        }
        catch(error){
            console.log("Error fetching user details: ", error);
            alert("Error: " + error.message);
        }
        finally{
            searchButton.textContent="Search";
            searchButton.disabled=false;
        }
    } 

    

    searchButton.addEventListener('click', function(){
        const username = usernameInput.value;
        console.log("logging username: ", username);
        if(validateUsername(username)){
            fetchUserDetails(username);
        }
    })
})