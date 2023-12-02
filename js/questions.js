// css objs 


let quizContainer = document.getElementById('quiz');
let resultsContainer = document.getElementById('results');
let submitButton = document.getElementById('submit');

generateQuiz(questions, quizContainer, resultsContainer, submitButton);

function generateQuiz(questions, quizContainer, resultsContainer, submitButton) {

    function showQuestions(questions, quizContainer) {
        // we'll need a place to store the output and the answer choices
        let output = [];
        let answers;


        // for each question...
        for (let i = 0; i < questions.length; i++) {

            // first reset the list of answers
            answers = [];

            // makes a question
             let questionDiv = document.createElement('div')
            questionDiv.classList.add('question')
            questionDiv.innerHTML = 'question ' + (i + 1) + ' : ' + questions[i].question

            // makes an answer div
            let answerDiv = document.createElement('div')
            answerDiv.classList.add('answers')


            // for each available answer...
            for (letter in questions[i].answers) {

                let answerLabel = document.createElement('label')
                let answerIs = `${letter} : ${questions[i].answers[letter]}`
                let answerInput = document.createElement('input')

                answerInput.setAttribute('type', 'radio')
                answerInput.setAttribute('name', `question${i}`)
                answerInput.value = letter


                answerLabel.append(answerInput, answerIs)
                answerDiv.append(answerLabel)
            }

            
            // add this question and its answers to the output
            questionDiv.append(answerDiv)


            //add this to the main page
            quizContainer.append(questionDiv)
        }

    }


    function showResults(questions, quizContainer, resultsContainer) {

        let resultArr = [];

        // gather answer containers from our quiz
        let answerContainers = quizContainer.querySelectorAll('.answers');

        // keep track of user's answers
        let userAnswer = '';
        let numCorrect = 0;

        // for each question...
        for (let i = 0; i < questions.length; i++) {


            // find selected answer
            userAnswer = (answerContainers[i].querySelector('input[name=question' + i + ']:checked') || {});

            resultArr[i] = userAnswer.value

            // if answer is correct
            if (userAnswer.value === questions[i].correctAnswer) {
                // add to the number of correct answers
                numCorrect++;
            }

        }

        // show number of correct answers out of total
        resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;

    }

    // show questions right away
    showQuestions(questions, quizContainer);

    // on submit, show results
    submitButton.onclick = function () {
        showResults(questions, quizContainer, resultsContainer);
    }

}