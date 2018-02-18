
//all of the questions for the quiz
const STORE = [
    {
        questionID: 1,
        question: 'The oldest discovery of a written recipe for making beer is how many years old?',
        answers:['500 years old','1500 years old','5000 years old','5 million years old' ],
        correctAnswer: '5000 years old'
    },
    {
        questionID: 2,
        question: 'Cenosillicaphobia is the fear of what?',
		answers: ['Intoxication', 'Silica particulate in suspension', 'Sobriety', 'An empty beer glass'],
        correctAnswer: 'An empty beer glass'
    },
    {
        questionID: 3,
        question: 'Beer has been shown to prevent kidney stones in men by as much as:',
		answers: ['20%', '40%', '60%', '80%'],
        correctAnswer: '40%'
    },
    {
        questionID: 4,
        question: 'What is the U.S. state with the highest per capita consumption of beer?',
		answers: ['North Dakota', 'Washington', 'Wisconsin', 'California'],
        correctAnswer:'North Dakota'
    },
    {
        questionID: 5,
        question: 'The best beer style ever created is:',
		answers: ['Lager', 'Porter', 'Stout', 'IPA'],
        correctAnswer: 'IPA'
    }
] 
//The quotes provided by correct answer feedback
const QUOTES = [
    'I would give all my fame for a pot of ale and safety.\"<br> —William Shakespeare (King Henry V)',
    'I am a firm believer in the people. If given the truth, they can be depended upon to meet any national crisis. The great point is to bring them the real facts, and beer.\"<br> —Abraham Lincoln',
    'I feel sorry for people who don\'t drink. When they wake up in the morning, that\'s as good as they\'re going to feel all day.\"<br> - Frank Sinatra',
    'Ah, beer. The cause of and the solution to all of life\’s problems.\"<br> - Homer Simpson',
    '"An intelligent man is sometimes forced to be drunk to spend time with his fools.\"<br> - Earnest Hemingway, For Whom the Bell Tolls' 
]
/********************************************************************************************************************* */
let questionNum = 0;
let userScore = 0;


//generate question html -- this function generates the question for the user and the submission form 
function generateQuestion() {
   //if (questionNum+1 < STORE.length) {
        return  `
        <div class="quiz">
        <h3>${STORE[questionNum].question}</h2>
        <form>
            <fieldset role="radiogroup">
                <legend style="display:none" role="radiogroup" aria-label="question">${STORE[questionNum].question}</legend>
                <label class="choices">
                <input type="radio" value="${STORE[questionNum].answers[0]}" name="answer" required checked="checked" id="option1">
                <span>${STORE[questionNum].answers[0]}</span>
                </label>
                <label class="choices">
                <input type="radio" value="${STORE[questionNum].answers[1]}" name="answer" required id="option2">
                <span>${STORE[questionNum].answers[1]}</span>
                </label>
                <label class="choices">
                <input type="radio" value="${STORE[questionNum].answers[2]}" name="answer" required id="option3">
                <span>${STORE[questionNum].answers[2]}</span>
                </label>
                <label class="choices">
                <input type="radio" value="${STORE[questionNum].answers[3]}" name="answer" required id="option4">
                <span>${STORE[questionNum].answers[3]}</span>
                </label>
            </fieldset>
            <button type="submit" class="js-submit-button">Cheers</button>
        </form>
        </div>
        <div class="stats">
            <span class="quiz-progress">Question: ${questionNum+1} of 5</span>
            <span class="current-score">Score: ${userScore}/${questionNum}</span>
        </div>`
}

// this function will take the user from the main screen to the first question
function handleStartButton() {
    $('.js-start-button').click(event => {
        $('.quiz-start').addClass('hidden');
        $('.quiz').removeClass('hidden');
        $('.quiz').html(generateQuestion);
    });
}

// this function increments the questionNum variable and generates another question
function nextQuestion() {
    questionNum++;
    $('.quiz').html(generateQuestion);
}


//handleSubmitButton -- this function takes the user input as userAnswerVal, compares it to the correctAnswer,
// and calls the appropriate feedback function
function handleSubmitButton() {
     $('.quiz').on('click', '.js-submit-button', function(event) { 
     event.preventDefault();
     const userAnswer = $('input:checked');
     const userAnswerVal = userAnswer.val();
     const correctAnswer = `${STORE[questionNum].correctAnswer}`;
     $('.quiz').addClass('hidden');
     $('.user-feedback').removeClass('hidden');
    if (userAnswerVal === correctAnswer) {
        userCorrectFeedback();
        }
    else {
        userIncorrectFeeback();
        }
    });
    }

//correctFeedback -- this function conditionally run when the userAnswerVal === correctAnwer.  It provides the user affirmation they
//answered the question correctly and generates a quote associated with the questionNum position in the QUOTES array.  It also generates
//the html for the stats div
//The else section runs when the last question is asked so that the js-results-button is returned, rather than the js-next-button when
//there are more questions to be asked.  
function userCorrectFeedback() {
    userScore++; 
    if (questionNum+1 < STORE.length) {
        $('.user-feedback').html(`
            <h4>Correct! <br> Enjoy a beer.... quote:</h4>
            <p class="quote">"${QUOTES[questionNum]}</p>
            <button class="js-next-button">Let's have another!</button>`
        );
        $('.stats').html(`
                <div class="stats user-feedback">
                    <span class="quiz-progress">Question: ${questionNum+1} of 5</span>
                    <span class="current-score">Score: ${userScore}/${questionNum+1}</span>
                </div>`
        );
        showResults();
    }
    else {
        $('.user-feedback').html(`
        <h4>Correct! <br> Enjoy a beer.... quote:</h4>
        <p class="quote">${QUOTES[questionNum]}</p>
        <button class="js-results-button">The End <br> See results</button>`
    );
    $('.stats').html(`
            <div class="stats user-feedback">
                <span class="quiz-progress">Question: ${questionNum+1} of 5</span>
                <span class="current-score">Score: ${userScore}/${questionNum+1}</span>
            </div>`
    );
        showResults();
    }
}

//incorrectFeeback -- this function conditionally run when  userAnswerVal === correctAnwer is false.  It provides the user feedback that they
//answered the question incorrectly and provides them the correct answer. It also generates
//the html for the stats div
//The else section runs when the last question is asked so that the js-results-button is returned, rather than the js-next-button when
//there are more questions to be asked.
function userIncorrectFeeback() {
    if (questionNum+1 < STORE.length) {
        $('.user-feedback').html(`
            <h4>Bummer, you got that one Incorrect!</h4>
            <p class="quote">The correct answer is: ${STORE[questionNum].correctAnswer}</p>
            <button class="js-next-button">I'll drown my sorrows in another question</button>`
        );
        $('.stats').html(`
                <div class="stats user-feedback">
                    <span class="quiz-progress">Question: ${questionNum+1} of 5</span>
                    <span class="current-score">Score: ${userScore}/${questionNum+1}</span>
                </div>`
        );
        showResults();
    }
    else {
        $('.user-feedback').html(`
            <h4>Bummer, you got that one Incorrect!</h4>
            <p class="quote">While this might seem like an opinion question, the best beer is in fact: ${STORE[questionNum].correctAnswer}</p>
            <button class="js-results-button">The End <br> See results</button>`
        );
        $('.stats').html(`
                <div class="stats user-feedback">
                    <span class="quiz-progress">Question: ${questionNum+1} of 5</span>
                    <span class="current-score">Score: ${userScore}/${questionNum+1}</span>
                </div>`
        );
        console.log('Incorrect feedback ran');
        showResults();
    }
}

//take user to next question from the question feedback
function handleNextButton() {
    $('.user-feedback').on('click', '.js-next-button', function(event) {
        event.preventDefault();
        $('.user-feedback').addClass('hidden');
        $('.quiz').removeClass('hidden');
        nextQuestion();
    })
}

//show final results -- this function takes user to a Final Score display with a button to restart the quiz
function showResults() {
    $('.user-feedback').on('click', '.js-results-button', function(event) {
    $('.quiz').addClass('hidden');
    $('.user-feedback').addClass('hidden');
    $('.results').html(`
    <div class="results">
        <h3>Final Score: ${userScore}/${questionNum+1}</h3>
        <button class="js-restart">Another Round</button>
    </div>`)
    });
}

//handleRestartButton -- this funcction resets the userScore and questionNum variables and restarts the quiz
function handleRestartButton() {
    $('.results').on('click', '.js-restart', function(event) {
        userScore = 0;
        questionNum = 0;
        $('.quiz-start').removeClass('hidden');
        $('.results').addClass('hidden');
    })
}

//initialize all app functions
function runQuizApp() { 
    generateQuestion();
    handleStartButton();
    handleSubmitButton();
    handleRestartButton();
    handleNextButton();
}

$(runQuizApp);

