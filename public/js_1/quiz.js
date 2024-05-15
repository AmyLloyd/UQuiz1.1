//Set variables to access sections
const quizHome = document.getElementById("quiz-home");
const quizQuestionSet = document.getElementById("quiz-question-set");
const gameOverScreen = document.getElementById("game-over-screen");
const scoreboardScreen = document.getElementById("scoreboard-screen");

//set variables to access buttons including choices buttons
const startButton = document.getElementById("start-button");
const nextButton = document.getElementById("next-button");
const submitButton = document.getElementById("submit-button");
const returnHomeButton = document.getElementById("return-home");

//set original attributes of sections
gameOverScreen.setAttribute("style", "visibility: hidden");
quizQuestionSet.setAttribute("style", "visibility: hidden");
quizHome.setAttribute("style", "display: block");
scoreboardScreen.setAttribute("style", "visibility: hidden");

//Identify root element for rendering messages
const messageEl = document.getElementById("message-element");

//Identify root element for rendering table rows for score data
const scoreBoardEl = document.getElementById("score-board-element");

//Identify positions for question data in quizQuestionSet section
const choiceA = document.getElementById("choice-a");
const choiceB = document.getElementById("choice-b");
const choiceC = document.getElementById("choice-c");
const choiceD = document.getElementById("choice-d");
const questionBody = document.getElementById("question-body");
const questionCreator = document.getElementById("question-creator");

const radioValA = document.getElementById("radio-value-a");
const radioValB = document.getElementById("radio-value-b");
const radioValC = document.getElementById("radio-value-c");
const radioValD = document.getElementById("radio-value-d");

let questions = [];
//handler to dynamically render the pulled database information on the page. 
const getQuizData = async(event) => {
    if(event) {
        event.preventDefault();
    }

    try {
        // Get the current path from window.location.pathname
        const path = window.location.pathname;

        // Extract the id from the path (assuming the last segment is the id)
        const id = path.split('/').pop();

        const response = await fetch(`/api/quiz/data/${id}`);

        if(!response.ok) {
            throw new Error(`HTTP error. Status: ${response.status}`);
        }

        const quizData = await response.json();
        questions = quizData.questions;        

    } catch (error) {
        console.error('Error fetching question:', error);
    }
};

//current question array to link when rendering text
let currentQuestionIndex = 0;

const startButtonHandler = async (event) => {
    event.preventDefault();

    startButton.disabled = true;
    quizHome.style.display = "none";
    quizQuestionSet.style.visibility = "visible";
    nextButton.style.display = "none";

    try {
        await getQuizData();
        if(!questions) {
            console.log("no questions", questions);
        }

        questions.forEach(renderQuestion);

    } catch(error) {
        console.error('Error fetching quiz question:', error);
    }
};
    

//render questions dynamically 
const renderQuestion = () => {

    var currentQuestion = questions[currentQuestionIndex];
    questionBody.textContent = currentQuestion.question_body;
    choiceA.textContent = currentQuestion.choice_a;
    choiceB.textContent = currentQuestion.choice_b;
    choiceC.textContent = currentQuestion.choice_c;
    choiceD.textContent = currentQuestion.choice_d;

    radioValA.setAttribute("value", `${currentQuestion.choice_a}`);
    radioValB.setAttribute("value", `${currentQuestion.choice_b}`);
    radioValC.setAttribute("value", `${currentQuestion.choice_c}`);
    radioValD.setAttribute("value", `${currentQuestion.choice_d}`);
};

const nextButtonHandler = (event) => {
    event.preventDefault();
    submitButton.style.display = 'block';
    nextButton.style.display = 'none';

    while (messageEl.firstChild) {
        messageEl.removeChild(messageEl.firstChild);
    }

    $('input[type="radio"]').prop('checked', false);

    currentQuestionIndex ++;

    if(currentQuestionIndex < questions.length) {
        renderQuestion();
    } else {
        currentQuestionIndex = 0;
        nextButton.disabled = true;
        quizHome.style.display = "none";
        quizQuestionSet.style.display = "none";
        gameOverScreen.style.visibility = "visible";

        gameOver();
    }
}

//create variable to hold score
let score = 0;

//add event listener to submit choice
const submitButtonHandler = (event) => {
    event.preventDefault();
    submitButton.style.display = 'none';
    nextButton.style.display = 'block';
    
    const guessEl = $('input:checked');

    if(guessEl.length === 0) {
        console.log('no input checked');
        const responseEl = $('<h2>').text("Please select a response to continue.");
        messageEl.append(responseEl.text());
        submitButton.style.display = 'block';
        nextButton.style.display = 'none';

        setTimeout(() => {
            if (messageEl instanceof jQuery) {
                messageEl.empty();
            } else if (messageEl instanceof Element) {
                messageEl.innerHTML = '';
            } else {
                console.error('Unsupported messageEl type:', messageEl);
            }
        }, 1000);

        return;
    }

    const guess = guessEl.val();
    if(guess === questions[currentQuestionIndex].answer) {
        score++;
        console.log(score);

        const responseEl = $('<h2>').text("CORRECT!");
        messageEl.append(responseEl.text());

    } else {
        const responseEl = $('<h2>').text("WRONG!");
        const answerTextEl = $('<span>').attr('id', 'answer').text(`The correct answer is: ${questions[currentQuestionIndex].answer}`)
        responseEl.append(answerTextEl.text());
        messageEl.append(responseEl.text());
    }

    setTimeout(() => {
        if (messageEl instanceof jQuery) {
            messageEl.empty();
        } else if (messageEl instanceof Element) {
            messageEl.innerHTML = '';
        } else {
            console.error('Unsupported messageEl type:', messageEl);
        }
    }, 5000);
};


const gameOver = () => {
    quizQuestionSet.style.display = "none";
    gameOverScreen.style.visibility = "visible";

    let finalScore = document.getElementById("final-score");
    finalScore.textContent = score;
}

const saveScoreButtonHandler = async (event) => {
    
    try {
        event.preventDefault();

        getQuizScoreData();
        

        await saveScore();

        await displayQuizScores();

    } catch (error) {
        console.error("Error handling save score:", error);
    }

    gameOverScreen.style.display = "none";
    scoreboardScreen.style.visibility = "visible";
};

const displayQuizScores = async () => {
    try {
        const scoreData = await getQuizScoreData();

        if(!scoreData) {
            console.log("No scores available.");
            return;
        }
        
        console.log(scoreData[0]);
        console.log("scoreData{0].score",scoreData[0].score);
        console.log("scoreData.user_id", scoreData[0].user_id);


        scoreData.forEach((score) => renderScore(score.user_id, score.score));
    } catch (error) {
        console.error("Error fetching quiz scores:", error);
    }
};

const saveScore = async () => {
    // Get the current path from window.location.pathname
    const path = window.location.pathname;

    // Extract the id from the path (assuming the last segment is the id)
    let quiz_id = path.split('/').pop();
    const user_id = 3;

    if ( quiz_id && user_id && score) {
        const response = await fetch(`/api/score`, {
        method: 'POST',
        body: JSON.stringify({ quiz_id, user_id, score }),
        headers: {
            'Content-Type': 'application/json',
        },
        });
    
        if (response.ok) {
    
        alert('Score saved');
        } else {
        alert('Failed to save score');
        }
    }
};


const getQuizScoreData = async() => {
    
    try {
        console.log("quiz score data function being used");
        // Get the current path from window.location.pathname
        const path = window.location.pathname;

        // Extract the id from the path (assuming the last segment is the id)
        const id = path.split('/').pop();
        
        const response = await fetch(`/api/score/data`);

        if(!response.ok) {
            throw new Error(`HTTP error. Status: ${response.status}`);
        }

        const scoreData = await response.json();
        console.log(scoreData[0]);
        return scoreData;

    } catch (error) {
        console.error('Error fetching question:', error);
        
    }
};

//render scores dynamically 
const renderScore = (username, highScore) => {

    console.log(highScore, "highScore");
    console.log(username, "username");

    const scoreRowEl = document.createElement("tr");
    const usernameEl = document.createElement("th");
    const highScoreEl = document.createElement("td");

    usernameEl.textContent = `${username}`;
    highScoreEl.textContent = `${highScore}`;

    scoreRowEl.append(usernameEl);
    scoreRowEl.append(highScoreEl);
    scoreBoardEl.append(scoreRowEl);

    var currentQuestion = questions[currentQuestionIndex];
    questionBody.textContent = currentQuestion.question_body;
    choiceA.textContent = currentQuestion.choice_a;
};

const returnHomeButtonHandler = (event) => {
    event.preventDefault();

    document.location.replace('/quiz');

}

// document.querySelector('#submit-choice').addEventListener('click', submitChoice);
document.querySelector('#start-button').addEventListener('click', startButtonHandler);

//Handler for the next button on quiz-page
document.querySelector('#next-button').addEventListener('click', nextButtonHandler);

//Handler for the submitChoice answer on quiz-page
document.querySelector('#submit-button').addEventListener('click', submitButtonHandler);

//Handler for the saveScore button on quiz-page
document.querySelector('#save-score').addEventListener('click', saveScoreButtonHandler);

//Handler for return Home button
document.querySelector('#return-home').addEventListener('click', returnHomeButtonHandler);