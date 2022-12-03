import { useEffect, useState} from 'react';
// import axios from 'axios';
import DisplayForm from './DisplayForm.js';

import './App.css';



function App() {
  // let answerObjects = [
  //   '', '','', '' 
  // ];

  // state that holds the questions, answer choices and ids from my API
  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [incorrectAnswers, setIncorrectAnswers] = useState( [] );
  // combines incorrect answers array and correct answer string value
  const [allAnswers, setAllAnswers] = useState( [
    '', '','', '' 
  ] );
  const [id, setId] = useState('');
  // const [answers, setAnswers] = useState( [] );

  // const [quiz, setQuiz] = useState( [] );
  // used concatenation to combine incorrect answerw with correct answer
  // const [answers, setAnswers] = useState( [] );
  // first answer (incorrect answer)
  // const [answerOne, setAnswerOne] = useState('');
  // second answer (incorrect answer)
  // const [answerTwo, setAnswerTwo] = useState('');
  // third answer (incorrect answer)
  // const [answerThree, setAnswerThree] = useState('');
  
  // const [questionId, setQuestionId] = useState(''); 

  // useEffect( () => { 
  // axios
    const getQuiz = async () => {
      const url = new URL('https://the-trivia-api.com/api/questions')

      url.search = new URLSearchParams({
        limit: 1
      })
      
      const response = await fetch(url);
      const data = await response.json();

      console.log(data);

      // console.log(response.data[0].question);
      
      // setIncorrectAnswers(response.data[0].incorrectAnswers);
      // setCorrectAnswer(response.data[0].correctAnswer);
      // setIncorrectAnswers(response.data[0].incorrectAnswers);
      // console.log(response.data[0].incorrectAnswers, response.data[0].correctAnswer);

      // const answerChoices = response.data[0].incorrectAnswers.concat(response.data[0].correctAnswer);
      // const quizSet = response.data[0].incorrectAnswers.concat(response.data[0].correctAnswer, response.data[0].question);
      // console.log(quizSet);
      // setQuiz(quizSet.reverse());
      // console.log(quiz);

      // find will grab first value of array
      // setAnswerOne(response.data[0].incorrectAnswers[0]);
      // console.log(answerOne);
      
      setQuestion(data[0].question);
      console.log(question);

      setIncorrectAnswers(data[0].incorrectAnswers);
      console.log(incorrectAnswers);

      setCorrectAnswer(data[0].correctAnswer);
      console.log(correctAnswer);

      // const answers = data[0].incorrectAnswers.concat(data[0].correctAnswer);
      // console.log(answers);

      let answers = data[0].incorrectAnswers.concat(data[0].correctAnswer);
      console.log(answers);
      setAllAnswers(answers);
      console.log(allAnswers);

      // console logging state can be misleading, value is stored in stateful variable even if not visible in the console right away

      // const newAnswers = answers.map( (answer) => {
      //    return answer.correctAnswer;
      // } )
      // console.log(newAnswers);


      // setAllAnswers(answers);
      // console.log(allAnswers);

      // const cloneAnswers = [...answers];
      // console.log(cloneAnswers);

      // const incorrectArray = data[0].incorrectAnswers;


      // setAllAnswers();
      // console.log(allAnswers);

      setId(data[0].id);

    }
    


  

  // clickHandler function to refresh page and show new question
  const clickHandler = () => {
    // call asyn function getQuiz with API data everytime user clicks the get different question button
    getQuiz();
    
      // setQuestion(question);
      // console.log(question);

      // setIncorrectAnswers(incorrectAnswers);
      // console.log(incorrectAnswers);

      // setCorrectAnswer(correctAnswer);
      // console.log(correctAnswer);

      // setId(id);
  }


  return (
    <div className="App wrapper">
      <h1>Trivia!</h1>
      <h2>Come play a game!</h2>
      <p>Only check one possible answer from the 4 choices below!</p>
      <p>If you don't like a question</p>

      {/* refresh button */}
      <button 
        // type="button"
        onClick={clickHandler}
        >Get a different question
      </button>
      <DisplayForm
        // handleSubmit={}
        question={question}
        allAnswers={allAnswers}
        // incorrectAnswers={incorrectAnswers}
        correctAnswer={correctAnswer}
        id={id}
          
          // answerTwo={answerTwo}
          // answerThree={answerThree}
          // correctAnswer={correctAnswer}
      />
  
    </div>
  );
}

export default App;


// PSEUDO CODE

// Get data (questions, category, incorrectAnswers, correctAnswer) from the Trivia API when App.js mounts
// Use (import) Axios to make the API call
// Only make the API call once when the App.js mounts, so for that use useEffect with an empty dependency array (import useEffect).

// Have a button on the page that lets user start the trivia question. On pressing the button (click), start displaying question and answer possibilities (label and checkbox, can only check one). Also have a return to start or get a different question button, in case the user doesn't like this question (for this also an event listener onClick that lets user return to start display, when clicked)

// Add an event listener function clickHandler to only display the data from the API, when the user has clicked the button.

// Use map to return new array with the data and render it onto the page. For that use useState (import useState), which will trigger a re-render to the page and allows me to return new JSX with the questions and choices on the page.

// Display the questions and answers from the API in its own component(DisplayQuestions) and import the component into App.js. Use props inside the component to pass down functions from App.js. In there write JSX to display the questions and answer choices, plus a sumbit button and another restart button. Also include an if statement, that returns either a "GOOD JOB!" or a "BETTER LUCK NEXT TIME!" statement based on whether the user chose the right or wrong anwer (userChoice == correctAnswer, or userChoice !== incorrectAnswers) and a button that lets user start a new game with a different question (anotherOnClick) (all inside another event listener function upon form submission - submitHandler).

// inside the onSubmitHandler make submit button from quiz and the restart disappear, and based on the if statement (which conditions apply), display either right or wrong statement and the option to start a new game (newGameClickHandler).

// whole quiz == form
// question == label
// possible answers == inputs with type=checkbox
// buttons (return and submit answer)
// submit answer button with type=submit

// lose start button (stretch goal)
// maybe no useEffect, put it in state to have it show up every time user submits/clicks (eventHandler func)
// functionality to check with array ids in state to avoid showing same question
// no new pages

// inputs changed to type=radio to limit user to only one choice (checkbox better for more possible answers, here only one answer)

// or maybe use ul with li items instead of form element