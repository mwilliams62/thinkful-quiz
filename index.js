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


//generate question html
function generateQuestion() {
   //if (questionNum+1 < STORE.length) {
        return  `
        <div class="quiz">
        <h3>${STORE[questionNum].question}</h2>
        <form>
            <fieldset>
                <label class="choices">
                <input type="radio" value="${STORE[questionNum].answers[0]}" name="answer" required checked="checked">
                <span>${STORE[questionNum].answers[0]}</span>
                </label>
                <label class="choices">
                <input type="radio" value="${STORE[questionNum].answers[1]}" name="answer" required>
                <span>${STORE[questionNum].answers[1]}</span>
                </label>
                <label class="choices">
                <input type="radio" value="${STORE[questionNum].answers[2]}" name="answer" required>
                <span>${STORE[questionNum].answers[2]}</span>
                </label>
                <label class="choices">
                <input type="radio" value="${STORE[questionNum].answers[3]}" name="answer" required>
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

//handleStartButton
// function handleStartButton() {
//     console.log('handleStartButton ran');
//     console.log('In handleStart the value of questionNum is '+questionNum)
//     $('#js-start-button').click(function(event) {
//     // $('.quiz-start').remove();
//     // $('.quiz').css('display', 'block');
//     nextQuestion();
//     });
// }

function handleStartButton() {
    $('.js-start-button').click(event => {
        console.log('The start button was clicked');
        $('.quiz-start').addClass('hidden');
        $('.quiz').removeClass('hidden');
        $('.quiz').html(generateQuestion);
        console.log('handleStartButton ran, questionNum is now'+questionNum);

    });
}

//questionNumber
function nextQuestion() {
    questionNum++;
    $('.quiz').html(generateQuestion);
    console.log('nextQuestion ran and questionNum is now '+questionNum);
}


//handleSubmitButton
function handleSubmitButton() {
     $('.quiz').on('click', '.js-submit-button', function(event) { 
     event.preventDefault();
     console.log('handleSubmitButton ran');
     const userAnswer = $('input:checked');
     const userAnswerVal = userAnswer.val();
     const correctAnswer = `${STORE[questionNum].correctAnswer}`;
     console.log(`UserAnswer is ${userAnswerVal}`);
     console.log(`Correct answer ${correctAnswer}`);
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

//correctFeedback
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
        console.log('Correct feedback ran');
        console.log(userScore);
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
        console.log('Correct feedback ran');
        console.log(userScore);
        showResults();
    }
}

//incorrectFeeback
function userIncorrectFeeback() {
    if (questionNum+1 < STORE.length) {
        $('.user-feedback').html(`
            <h4>Bummer, you missed that one</h4>
            <p class="quote">The correct answer is: ${STORE[questionNum].correctAnswer}</p>
            <button class="js-next-button">I'll drown my sorrows in another question</button>`
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
    else {
        $('.user-feedback').html(`
            <h4>Bummer, you missed that one</h4>
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

//take user to next question from results
function handleNextButton() {
    $('.user-feedback').on('click', '.js-next-button', function(event) {
        event.preventDefault();
        $('.user-feedback').addClass('hidden');
        $('.quiz').removeClass('hidden');
        nextQuestion();
    })
}

//show final results
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

//handleRestartButton
function handleRestartButton() {
    $('.results').on('click', '.js-restart', function(event) {
        userScore = 0;
        questionNum = 0;
        $('.quiz-start').removeClass('hidden');
        $('.results').addClass('hidden');
    })
}

// //testing
// function buttonClick() {
//     $('.js-start-button').click(event => 
//     $('.output').text(`Button clicked: `+$(event.currentTarget).text())
// );
// }
// function submitButtonClick() {
//     $('.quiz').on('click', '.js-submit-button', function(event) {
//         console.log(`The Cheers button was clicked`);
//         nextQuestion();
// });
// }

//call all functions
function runQuizApp() {
    console.log(questionNum); 
    console.log(userScore);   
    generateQuestion();
    handleStartButton();
    handleSubmitButton();
    handleRestartButton();
    handleNextButton();
}


$(runQuizApp);

