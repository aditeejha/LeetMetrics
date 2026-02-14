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
            const parsedData = await response.json();
            console.log("Logging data: ", parsedData);

            displayUserData(parsedData);
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

    function updateProgress(solved, total, label, circle){
        constprogressDegree = (solved/total)*100;
        circle.style.setProperty("--progress-degree", `${progressDegree}%`);
        label.textContent = `${solved}/${total}`;
    }

    function displayUserData(parsedData){
        const totalQues=parsedData.totalSolved.totalSubmissions[0].count;
        const totalEasyQues=parsedData.totalSolved.totalSubmissions[1].count;
        const totalMediumQues=parsedData.totalSolved.totalSubmissions[2].count;
        const totalHardQues=parsedData.totalSolved.totalSubmissions[3].count;

        const solvedTotalQues = parsedData.totalSolved.matchedUserStats.acSubmissionNum[0].count;
        const solvedTotalEasyQues = parsedData.totalSolved.matchedUserStats.acSubmissionNum[1].count;
        const solvedTotalMediumQues = parsedData.totalSolved.matchedUserStats.acSubmissionNum[2].count;
        const solvedTotalHardQues = parsedData.totalSolved.matchedUserStats.acSubmissionNum[3].count;

        updateProgress(solvedTotalEasyQues, totalEasyQues, easylabel, easyProgressCircle);
        updateProgress(solvedTotalMediumQues, totalMediumQues, mediumLabel, mediumProgressCircle);
        updateProgress(solvedTotalHardQues, totalHardQues, hardLabel, hardProgressCircle);

        // Update progress circles and labels
        // easyprogressCircle.style.strokeDashoffset = 100 - (solvedTotalEasyQues / totalEasyQues * 100);
        // mediumProgressCircle.style.strokeDashoffset = 100 - (solvedTotalMediumQues / totalMediumQues * 100);
        // hardProgressCircle.style.strokeDashoffset = 100 - (solvedTotalHardQues / totalHardQues * 100);

        // easylabel.textContent = `${solvedTotalEasyQues}/${totalEasyQues}`;
        // mediumLabel.textContent = `${solvedTotalMediumQues}/${totalMediumQues}`;
        // hardLabel.textContent = `${solvedTotalHardQues}/${totalHardQues}`;

        const cardData = [
            {label:"Overall Submissions", value: parsedData.totalSolved.matchedUserStats.totalSubmissionNum[0].submissions},
            {label:"Overall Easy Submissions", value: parsedData.totalSolved.matchedUserStats.totalSubmissionNum[1].submissions},
            {label:"Overall Medium Submissions", value: parsedData.totalSolved.matchedUserStats.totalSubmissionNum[2].submissions},
            {label:"Overall Hard Submissions", value: parsedData.totalSolved.matchedUserStats.totalSubmissionNum[3].submissions}
        ];
    }

    searchButton.addEventListener('click', function(){
        const username = usernameInput.value;
        console.log("logging username: ", username);
        if(validateUsername(username)){
            fetchUserDetails(username);
        }
    })
})