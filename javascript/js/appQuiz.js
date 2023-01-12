( function app () {
    function buildQuiz() {
        // variable to store the HTML output
        const output = [];

        // for each question..
        myQuestions.forEach(
            (currentQuestion, questionNumber) => {

                // variable to store the list of possible answers
                const answers = [];

                // and for each available answer...
                for (letter in currentQuestion.answers) {

                    // ...add an HTML radio button
                    answers.push(
                        `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
                </label>`
                    );
                }

                // add this question and its answers to the output
                output.push(
                    `<div class="slide">
                <div class="question">${currentQuestion.question}</div>
            <div class="answers"> ${answers.join('')} </div>
                </div>`
                );
            }
        );

        // combine the output list into one string of html and put it on the page.
        quizContainer.innerHTML = output.join('');
    }

    function showResults( ) {

        // gather answer containers from our quiz, and score container
        let answerContainers = quizContainer.querySelectorAll('.answers');

        // keep track of user's answers, initalise 
        // var numCorrect = 0;

        // for each question...
        myQuestions.forEach((currentQuestion, questionNumber) => {

            // find selected answer
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;

            // if answer is correct
            if (userAnswer === currentQuestion.correctAnswer) {
                // add to the number of correct answers
                numCorrect++;
                // color the answers green
                answerContainers[questionNumber].style.color = 'lightgreen';

            }
            // if answer is wrong or blank
            else {
                // color the answers red
                answerContainers[questionNumber].style.color = 'red';

            }
        });

        // show number of correct answers out of total
        if (numCorrect == 0) {resultsContainer.innerHTML =
             `You scored ${numCorrect} out of ${myQuestions.length}: Find a better way to esspresso yourself`}
        else if (numCorrect == 1) {resultsContainer.innerHTML =
            `You scored ${numCorrect} out of ${myQuestions.length}: You have beans messing around`}
         else if (numCorrect == 2) {resultsContainer.innerHTML =
                `You scored ${numCorrect} out of ${myQuestions.length}: Almost there, stay grounded`}
         else if (numCorrect == 3) {resultsContainer.innerHTML =
                 `You scored ${numCorrect} out of ${myQuestions.length}: You are cappaccigenous`};


         // show the restart quiz button
        restartButton.style.display = 'inline-block';

        // set count to zero to stop timer
         count = 0;

         // remove hint button, and review button
         trigger.remove();
        submitButton.remove();

        // save the score in local storage
            localStorage.setItem('mostRecentScore', numCorrect);
    }

    function showSlide(n) {
        slides[currentSlide].classList.remove('active-slide');
        slides[n].classList.add('active-slide');
        currentSlide = n;
        if (currentSlide === 0) {
            previousButton.style.display = 'none';
            reviewButton.style.display = 'none';
            restartButton.style.display = 'none';
            toEndPage.style.display = "none";
        }
        else {
            previousButton.style.display = 'inline-block';
            toEndPage.style.display = "none";
        }
        if (currentSlide === slides.length - 1) {
            nextButton.style.display = 'none';
            submitButton.style.display = 'inline-block';
            reviewButton.style.display = 'inline-block';
            toEndPage.style.display = "none";
        }
        else {
            nextButton.style.display = 'inline-block';
            submitButton.style.display = 'none';
            toEndPage.style.display = "none";
        }
    }

    function showNextSlide() {
        showSlide(currentSlide + 1);
    }

    function showPreviousSlide() {
        showSlide(currentSlide - 1);
    }

    function reviewFunction(){
            if (currentSlide == 0){
                slides[currentSlide].classList.add('active-slide');
                slides[currentSlide + 1].classList.add('active-slide','second-slide');
                slides[currentSlide + 2].classList.add('active-slide', 'third-slide');
                }
                if ( currentSlide == 1){
                slides[currentSlide - 1].classList.add('active-slide');
                slides[currentSlide].classList.add('active-slide', 'second-slide');
                slides[currentSlide + 1].classList.add('active-slide', 'third-slide');
                }
                if (currentSlide == 2){
                    slides[currentSlide - 2].classList.add('active-slide');
                slides[currentSlide - 1 ].classList.add('active-slide', 'second-slide');
                slides[currentSlide].classList.add('active-slide', 'third-slide');
                }
                previousButton.style.display = 'none'; 
                // trigger.remove();
                onReview = true;
    };

    function restartFunction(){
        window.location.reload();
    };

    function countDown( ){
        var counterSchedule;
        const timerDisp = document.getElementById('timerSec');

        function stopCounterAnimation(){
            if (count == 0){
            clearInterval(counterSchedule)};
        }
        function startCounterAnimation(){
            //start the counter animation
            counterSchedule = setInterval(showCounter, 1000);
            }
        function showCounter(){
                // show counter function
                var element = document.getElementById("myprogressBar");
                if ( count > 0) {
                count --;
                 timerDisp.innerHTML = `You have ${count} seconds left`;
                 }
                else if (count == 0){
                stopCounterAnimation();
                timerDisp.innerHTML = `Game Over`;
                    reviewFunction();
                    showResults();
                    nextButton.remove();
                    element.style.width = '100%';
                    submitButton.remove();
                   
                };
            };
            startCounterAnimation();
            }      

function toggleModal(){

    if (currentSlide == 0){
        hint.innerHTML = "There are two words in this answer";
    }
    else if (currentSlide == 1){
        hint.innerHTML = "Milk will add a bit of color to coffee"
    }
    else if (currentSlide == 2){
        hint.innerHTML = "Invented by an Italian, but not in Italy"
    };
    if (onReview == true){
        hint.innerHTML = `<p>Q1 There are two words in this answer Q2 Milk will add a bit of color to coffee 
                Q3 Invented by an Italian, but not in Italy<p>`;
    }

    modal.classList.toggle("show-modal");
}

    // variables
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');    
    const restartButton = document.getElementById('restart');
    const modal = document.querySelector(".modal");
    const trigger = document.querySelector("#trigger");
    const closeButton = document.querySelector(".close-button");
    const toEndPage = document.querySelector("#enterScore");
    var numCorrect = 0;
    let count = 50;
    let onReview = false;
    let myQuestions = [
        {
            question: "Where are the first records of coffee?",
            answers: {
                a: "Europe",
                b: "Latin America",
                c: "Middle East",
            },
            correctAnswer: "c",
        },
        {
            question: "Which of these types of coffees contains milk?",
            answers: {
                a: "Cappuccino",
                b: "Long Black",
                c: "Esspresso"
            },
            correctAnswer: "a"
        },
        {
            question: "Where is the birthplace of the cappuccino?",
            answers: {
                a: "Austria",
                b: "Poland",
                c: "Italy",
                d: "Canada",
            },
            correctAnswer: "a",
        }
    ];


    // kick things off
    buildQuiz();

    // Pagination
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const reviewButton = document.getElementById('review');
    let slides = document.querySelectorAll(".slide");

    let currentSlide = 0;

    // Pagination function
    showSlide(currentSlide);

    // Event listeners
    document.addEventListener('onload', countDown());
    submitButton.addEventListener('click', showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener('click', showNextSlide);
    reviewButton.addEventListener('click', reviewFunction);
    restartButton.addEventListener('click', restartFunction);
    trigger.addEventListener("click", toggleModal);
    closeButton.addEventListener("click", toggleModal);


    // define progress display (number and bar)
    function displayProgress() {
        //variables
        var element = document.getElementById("myprogressBar");
        var queNumDis = document.getElementById('questionNumberDisplay');
        var currentNumber = currentSlide + 1;

        // function to display Qnumber and Progbar
        function showProg() {
            queNumDis.innerHTML = `Question ${currentNumber}/${myQuestions.length}`;
            element.style.width = `${currentSlide / myQuestions.length * 100}` + '%';
        }

        // event listeners to dislay current question, and progress bar
        // onload
        document.addEventListener('onLoad', showProg())
        //next button
        nextButton.addEventListener('click', () => {
            currentNumber++;
            showProg();
        });
        //prev button
        previousButton.addEventListener('click', () => {
            currentNumber--;
            showProg();
        });
        // submit button
        submitButton.addEventListener('click', () => {
            element.style.width = '100%';
            previousButton.remove();
            submitButton.remove();
            reviewButton.remove();
            toEndPage.style.display = "inline-block";
            
        })
    }
    // call display progress
    displayProgress();

})();