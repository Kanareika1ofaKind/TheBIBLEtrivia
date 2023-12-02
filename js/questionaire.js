


const theQuiz = document.getElementById('theQuiz');
const quizResults = document.getElementById('quizResults');

let quizContainer = document.getElementById('quiz');
let resultsContainer = document.getElementById('results')
let submitButton = document.getElementById('submit')

let questionareTitle = document.getElementById('questionareTitle')
let questionaireImage = document.getElementById('questionaireImage')

let passRate = 70;

generateQuiz(quizData, quizContainer, resultsContainer, submitButton, theQuiz, quizResults, passRate)

function generateQuiz(questionSets, quizContainer, resultsContainer, submitButton, theQuiz, quizResults, passRate) {

    quizResults.classList.add('hidden');

    function showQuestions(questionSets, quizContainer) {
        // resets quiz container
        quizContainer.innerHTML = '';

        for (let qs = 0; qs < questionSets.length; qs++) {

            let questions = questionSets[qs].questions;

            let questionBlock = document.createElement('div')
            questionBlock.classList.add('questionBlock')

            for (let q = 0; q < questions.length; q++) {

                // first reset the list of answers
                answers = [];

                // makes a question
                let questionDiv = document.createElement('div')
                questionDiv.classList.add('question')
                questionDiv.innerHTML = `(${q + 1} of ${questions.length}) : ${questions[q].question} `

                // makes an answer div
                let answerDiv = document.createElement('ol')
                answerDiv.classList.add('answers')


                // for each available answer...

   //             let filCount = 0;

                for (letter in questions[q].answers) {

    //                filCount++
                   

                    let answerLi = document.createElement('li')
                    let answerLabel = document.createElement('label')



                    let answerIs = `${questions[q].answers[letter]}`
                    let answerInput = document.createElement('input')
                    answerInput.setAttribute('type', 'radio')
                    answerInput.setAttribute('name', `question${qs}-${q}`)
                    answerInput.value = letter


                    answerLabel.append(answerIs, answerInput)
                    answerLi.append(answerLabel)
                    answerDiv.append(answerLi)
                }
             //   for (let x = filCount; x < 4; x++) {
             //       let answerLi = document.createElement('li')
             //       answerDiv.append(answerLi)
             //   }

                // add this question and its answers to question div
                questionDiv.append(answerDiv)


                //add the question div to the question block
                questionBlock.append(questionDiv)
            }

            // adds the question block to the quiz container
            quizContainer.append(questionBlock)
        }

    }


    function showResults(questionSets, quizContainer, resultsContainer, theQuiz, quizResults, passRate) {

        quizResults.classList.remove('hidden');
        theQuiz.classList.add('hidden');

        // gather answer containers from our quiz
        let questionBlock = quizContainer.querySelectorAll('.questionBlock');

        // keep track of user's answers
        let userAnswer = '';
        let numCorrect = [];
        let totalResults = 0;
        let totalCorrect = 0;
        let qSet = [];
        let test = '';

        let results = '';

        const resultsGroupContainer = document.createElement('div')



        //for each question set 
        for (let si = 0; si < questionSets.length; si++) {

            let answerContainers = questionBlock[si].querySelectorAll('.answers');

            const resultsGroupTitle = document.createElement('h2')
            resultsGroupTitle.innerHTML = questionSets[si].title

            const resultsGroupQuestions = document.createElement('div')


            numCorrect[si] = 0;
            qSet[si] = questionSets[si].questions;

 
            // for each question...
            for (let i = 0; i < qSet[si].length; i++) {

                

                // find selected answer
                userAnswer = (answerContainers[i].querySelector(`input[name=question${si}-${i}]:checked`) || '');


                if (userAnswer.value === qSet[si][i].correctAnswer) {
                    // add to the number of correct answers
                    numCorrect[si]++;
                    totalCorrect++
                }



                const resultsQuestionTitle = document.createElement('div')
                resultsQuestionTitle.classList.add('question')
                resultsQuestionTitle.innerHTML = qSet[si][i].question

                const resultsQuestionAnswer = document.createElement('div')
                resultsQuestionAnswer.innerHTML = `Your Answer: ${qSet[si][i].answers[userAnswer.value] || '-'}`

                const resultsQuestionCorrect = document.createElement('div')
                resultsQuestionCorrect.innerHTML = `(${(userAnswer.value == qSet[si][i].correctAnswer) ? 'Correct Answer' : 'Incorrect Answer'})`
                resultsQuestionCorrect.style.color = (userAnswer.value == qSet[si][i].correctAnswer) ? 'green' : 'red'


                resultsGroupQuestions.append(resultsQuestionTitle, resultsQuestionAnswer, resultsQuestionCorrect)


                totalResults++



            }

            let totalDiv = document.createElement('div')
            totalDiv.classList.add('sub-results')
            totalDiv.innerHTML = `${numCorrect[si]} out of ${qSet[si].length} questions are correct (${Math.round(numCorrect[si] / qSet[si].length * 100 * 10) / 10}%)`



            resultsGroupContainer.append(resultsGroupTitle, resultsGroupQuestions, totalDiv)
        }


        let finalScore = document.createElement('h3')
        finalScore.innerHTML = `The total score = ${totalCorrect} of ${totalResults} (${Math.round(totalCorrect / totalResults * 100 * 10) / 10}%)`

        let passFailDiv = document.createElement('h1')
        passFailDiv.style.color = (Math.round(totalCorrect / totalResults * 100 * 10) / 10) >= passRate ? 'green' : 'red'
        passFailDiv.innerHTML = (Math.round(totalCorrect / totalResults * 100 * 10) / 10) >= passRate ? 'you passed' : 'you failed'



            console.log(`${(Math.round(totalCorrect / totalResults * 100 * 10) / 10)} ${passRate} ${totalResults}`)

        resultsContainer.append(resultsGroupContainer, finalScore, passFailDiv)

    }


    showQuestions(questionSets, quizContainer)


    submitButton.onclick = function () {
        showResults(quizData, quizContainer, resultsContainer, theQuiz, quizResults, passRate);
    }


}
