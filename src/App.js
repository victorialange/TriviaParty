import { useState} from 'react';
// import axios from 'axios';
import DisplayForm from './DisplayForm.js';
import { Fragment } from 'react';
import './App.css';

// importing ArrowDown (arrow as svg file) from ArrowDown component
import ArrowDown from './ArrowDown.js';


function App() {
  
  // state that holds the questions, answer choices and ids from my API
  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [incorrectAnswers, setIncorrectAnswers] = useState( [] );
  // combines incorrect answers array and correct answer string value, important for mapping through whole answers array as opposed to just through the incorrect answers => gonna create a new array inside async function called getQuiz()
  // storing all data with all answers array
  const [allAnswers, setAllAnswers] = useState( [] );
  const [currentQuestionId, setCurrentQuestionId] = useState("");
  const [questionId, setQuestionId] = useState([]);
  // states for category and level
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
    
  // async await function calling API at endpoint where category and difficulty gets selected (not random)
  const getQuiz = async () => {
    const url = new URL('https://the-trivia-api.com/api/questions')
    // setting categories and difficulty params of API data object equal to user selection of the dropdown (not random)
    url.search = new URLSearchParams({
      categories: userCategory,
      limit: 1,
      difficulty: userLevel
    })
      
    // defining response and data as let variables since need to change value later on with another API call if the current question id is inside the question ids array
    let response = await fetch(url);
    let data = await response.json();

    console.log(data);

    setCurrentQuestionId(data[0].id);
    console.log(currentQuestionId);

    // trying to call api again if current question id repeats itself again
    if (questionId.includes(data[0].id)) {
      console.log("Calling API again");

      url.search = new URLSearchParams({
        categories: userCategory,
        limit: 1,
        difficulty: userLevel
      })
        
      response = await fetch(url);
      data = await response.json();
  
      console.log(data);

      console.log(data[0].id);

      // const dataId = data[0].id;
      // console.log(dataId);

      // setQuestionId(current => [...current, data[0].id]);
      console.log(questionId);   
      console.log(data[0].question);

      setCurrentQuestionId(data[0].id);
      console.log(currentQuestionId);  
  
    } 
    // else {
    //   setQuestionId(current => [...current, data[0].id]);
    //   console.log(questionId);
    // }

    // question ids array as state
    setQuestionId(current => [...current, data[0].id]);
    console.log(questionId); 
      
    // question state
    setQuestion(data[0].question);
    console.log(question);

    // incorrect answers array stored into state
    setIncorrectAnswers(data[0].incorrectAnswers);
    // correct answer stored in state, need to do concat to add that to incorrect answers array, in order to be able to map through the allAnswers array in the return/JSX of the DisplayForm component, also for adding randomizer Math.random
    setCorrectAnswer(data[0].correctAnswer);

    // creating new array to add correct answer string value to already from API provided incorrect answers array
    const answers = data[0].incorrectAnswers.concat(data[0].correctAnswer);
    // saving this newly created answers array to state variable allAnswers => allows me to map through whole answers array later on in the DisplayForm component

    // shuffle to randomize order of answers array so that user won't be able to figure out position of correct answer
    const randomAnswers = answers.sort(() => 0.5 - Math.random());
    // stored tha randomized array into the allAnswers state
    setAllAnswers(randomAnswers);

    // setting category and level states
    setCategory(data[0].category);
    setLevel(data[0].difficulty);
  }


  // ANOTHER API CALL for random questions with async and await at different endpoint (only limit specified)
  const getRandomQuiz = async () => {
    const url = new URL('https://the-trivia-api.com/api/questions')

    url.search = new URLSearchParams({
      limit: 1
    })
      
    let response = await fetch(url);
    let data = await response.json();

    console.log(data);

    // trying to call api again if current question id repeats itself again
    if (questionId.includes(data[0].id)) {
      console.log("Calling API Random endpoint again");

      url.search = new URLSearchParams({
        limit: 1
      })
        
      response = await fetch(url);
      data = await response.json();
  
      console.log(data);

      console.log(data[0].id);

      // const dataId = data[0].id;
      // console.log(dataId);

      // setQuestionId(current => [...current, data[0].id]);
      console.log(questionId);   
      console.log(data[0].question);

      setCurrentQuestionId(data[0].id);
      console.log(currentQuestionId);
  
    } 
    // else {
    //   setQuestionId(current => [...current, data[0].id]);
    //   console.log(questionId);
    // }
    setQuestionId(current => [...current, data[0].id]);
    console.log(questionId); 
      
    // store question of data object into state
    setQuestion(data[0].question);
    console.log(question);

    // like in first function store same values into state
    setIncorrectAnswers(data[0].incorrectAnswers);
    setCorrectAnswer(data[0].correctAnswer);
    
    // id string values
    setCurrentQuestionId(data[0].id);
    console.log(currentQuestionId);

    // creating new array to add correct answer string value to already from API provided incorrect answers array
    const answers = data[0].incorrectAnswers.concat(data[0].correctAnswer);
    // saving this newly created answers array to state variable allAnswers => allows me to map through whole answers array later on in the DisplayForm component

    // shuffle to randomize order of answers array so that user won't be able to figure out position of correct answer
    const randomAnswers = answers.sort(() => 0.5 - Math.random());
    setAllAnswers(randomAnswers);

    // updating category and level state values
    setCategory(data[0].category);
    setLevel(data[0].difficulty);
  }


  // OTHER API CALL WHERE USER SELECTS ONLY LEVEL, BUT NO CATEGORY endpoint
  const getLevelQuiz = async () => {
    const url = new URL('https://the-trivia-api.com/api/questions')

    url.search = new URLSearchParams({
      limit: 1,
      difficulty: userLevel
    })
      
    let response = await fetch(url);
    let data = await response.json();

    console.log(data);

    // trying to call api again if current question id repeats itself again
    if (questionId.includes(data[0].id)) {
      console.log("Calling API Level again");

      url.search = new URLSearchParams({
        limit: 1,
        difficulty: userLevel
      })
        
      response = await fetch(url);
      data = await response.json();
  
      console.log(data);

      console.log(data[0].id);

      // const dataId = data[0].id;
      // console.log(dataId);

      // setQuestionId(current => [...current, data[0].id]);
      console.log(questionId);   
      console.log(data[0].question);

      setCurrentQuestionId(data[0].id);
      console.log(currentQuestionId);
  
    } 
    // else {
    //   setQuestionId(current => [...current, data[0].id]);
    //   console.log(questionId);
    // }
    setQuestionId(current => [...current, data[0].id]);
    console.log(questionId); 
      
    setQuestion(data[0].question);
    console.log(question);

    setIncorrectAnswers(data[0].incorrectAnswers);

    setCorrectAnswer(data[0].correctAnswer);
    
    // id string values
    setCurrentQuestionId(data[0].id);
    console.log(currentQuestionId);

    // creating new array to add correct answer string value to already from API provided incorrect answers array
    const answers = data[0].incorrectAnswers.concat(data[0].correctAnswer);
    // saving this newly created answers array to state variable allAnswers => allows me to map through whole answers array later on in the DisplayForm component

    // shuffle to randomize order of answers array so that user won't be able to figure out position of correct answer
    const randomAnswers = answers.sort(() => 0.5 - Math.random());
    setAllAnswers(randomAnswers);

    // setting category and level state
    setCategory(data[0].category);
    setLevel(data[0].difficulty);
  }


  // OTHER API CALL WHERE USER SELECTS ONLY CATEGORY, BUT NO LEVEL endpoint
  const getCategoryQuiz = async () => {
    const url = new URL('https://the-trivia-api.com/api/questions')

    url.search = new URLSearchParams({
      categories: userCategory,
      limit: 1
    })
      
    let response = await fetch(url);
    let data = await response.json();

    console.log(data);

    // trying to call api again if current question id repeats itself again
    if (questionId.includes(data[0].id)) {
      console.log("Calling API Categories again");

      url.search = new URLSearchParams({
        categories: userCategory,
        limit: 1
      })
        
      response = await fetch(url);
      data = await response.json();
  
      console.log(data);

      console.log(data[0].id);

      // const dataId = data[0].id;
      // console.log(dataId);

      // setQuestionId(current => [...current, data[0].id]);
      console.log(questionId);   
      console.log(data[0].question);

      setCurrentQuestionId(data[0].id);
      console.log(currentQuestionId);
  
    } 
    // else {
    //   setQuestionId(current => [...current, data[0].id]);
    //   console.log(questionId);
    // }
    setQuestionId(current => [...current, data[0].id]);
    console.log(questionId); 
      
    setQuestion(data[0].question);
    console.log(question);

    setIncorrectAnswers(data[0].incorrectAnswers);

    setCorrectAnswer(data[0].correctAnswer);

    // id string values
    setCurrentQuestionId(data[0].id);
    console.log(currentQuestionId);

    // creating new array to add correct answer string value to already from API provided incorrect answers array
    const answers = data[0].incorrectAnswers.concat(data[0].correctAnswer);
    // saving this newly created answers array to state variable allAnswers => allows me to map through whole answers array later on in the DisplayForm component

    // shuffle to randomize order of answers array so that user won't be able to figure out position of correct answer
    const randomAnswers = answers.sort(() => 0.5 - Math.random());
    setAllAnswers(randomAnswers);

    // setting category and level
    setCategory(data[0].category);
    setLevel(data[0].difficulty);
  }


  // states to use as conditions for whether start button/intro gets shown or next instruction (outside of API call)
  const intro = "Feeling ready? Then let's get this trivia party started🎈🎉";
  const next = "Not feeling this question or already answered this one?"
  const [initialIntro, setInitialIntro] = useState(intro);  
  const [submitted, setSubmitted] = useState(false);
  // state for user selection of dropdown menu, of both category and level
  const [userCategory, setUserCategory] = useState("");
  const [userLevel, setUserLevel] = useState("");

  // onChange handler for first select dropdown category
  const handleUserCategory = (e) => {
      setUserCategory(e.target.value);
  }

  // on change handler for second select dropdown
  const handleUserLevel = (e) => {
    setUserLevel(e.target.value);
  }

  // submit handler for when user has submitted dropdown form (and chosen sth for both categories, random included)
  const firstSubmitHandler = (e, questionCategory, questionLevel) => {
    // prevent default behaviour of form (refreshing page)
    e.preventDefault();

    // call async function getQuiz() with API data everytime user clicks the get different question button
    // set a few conditions, if no user selection on any properties, call get randomquiz async function with different endpoint than getQuiz (filtered with category and level)
    if (userCategory === "Random" && userLevel === "Random") {
      getRandomQuiz();
    }
    else if (userCategory !== "Random" && userLevel !== "Random") {
      getQuiz();
    }
    else if (userCategory === "Random" && userLevel !== "Random") {
      getLevelQuiz();
    }
    else if (userCategory !== "Random" && userLevel === "Random") {
      getCategoryQuiz();
    }
  
    // when user has submitted next instructions get shown and the user has submitted, so set those states accordingly
    setInitialIntro(next);
    setSubmitted(true);
    
    // customizing alert for when user picks hard level
    if (userLevel === "hard") {
      alert(`Amazing!! You chose ${userCategory} as your category and ${userLevel}. Good luck!!! 🍀 You're gonna need it!`);
    } else if (userCategory !== "Random" && userLevel !== "Random") {
      alert(`Amazing!! You chose ${userCategory} as your category and ${userLevel}. Good luck!!! 🍀`);
    }
    else if (userCategory === "Random" && userLevel === "Random") {
      alert(`Huhh, so you're one of those people who can't decide 🙄 Or maybe you're just feeling Random! Either way have fun! 🥳`);
    }
    else if (userCategory !== "Random" && userLevel === "Random") {
      alert(`Great, you decided to go with ${userCategory} as your category and felt like playing all levels. I hope you're up to the challenge! Good luck 🍀`);
    }
    else if (userCategory === "Random" && userLevel !== "Random") {
      alert(`Awesome, so you went with ${userLevel} and just felt like surprising youself with the categories I guess! Hope you enjoy! 💖`);
    }
  }

  // clickHandler that's gonna be passed into anotherClickHandler in DisplayForm component for the new question button
  const clickHandler = () => {
    // call async function getQuiz() with API data everytime user clicks the get different question button

    // conditions based on user selection like in submit handler
    if (userCategory === "Random" && userLevel === "Random") {
      getRandomQuiz();
    }
    else if (userCategory !== "Random" && userLevel !== "Random") {
      getQuiz();
    }
    else if (userCategory === "Random" && userLevel !== "Random") {
      getLevelQuiz();
    }
    else if (userCategory !== "Random" && userLevel === "Random") {
      getCategoryQuiz();
      
    }
    // keep showing next instruction
    setInitialIntro(next);
  }

  // defining the leaveClickHandler function to pass intro as a prop into another leaveHandler function in DisplayForm component in order to set the initial intro back to intro value and stop displaying the quiz
  const leaveClickHandler = () => {
    setInitialIntro(intro);
    // clear user selection so that when user restarts the game dropdown values are empty and not like they were before when the user chose a property
    setUserCategory("");
    setUserLevel("");
    // setting everything from API data back to empty, so that user has fresh start
    setQuestion("");
    setAllAnswers([]);
    setCorrectAnswer("");
    setIncorrectAnswers([]);
    // set question ids back to empty so that data is cleared every time user goes back to restart
    setQuestionId([]);
    setCurrentQuestionId("");
    setCategory("");
    setLevel("");
  }


  return (
    // Fragment in order to use multiple parent elements and not having to use another div
    <Fragment>
    {/* skip link to main*/}
    <a href="#mainContent" className='skipLink'>
      Skip to main content
    </a>

    {/* HEADER */}
    <header id='home'>
      {/* WRAPPER */}
      <div className="banner">
      {/* background banner goes here */}
      </div>
      {/* background image for whole page goes here outside of wrapper */}
      <div className="backgroundOne">
        <div className="App wrapper">
          <h1>Welcome To My Trivia Party!!!</h1>
          {/* intro container */}
          <div className={`${initialIntro !== intro ? "introContainer" : ""}`}
          id="intro">
            <h2>Let's get nerdy 🤓</h2>
            <p>For each question select only one answer from the four possible answer choices!</p>
            <p>There is no timer to stress you out, this party is meant to be chill 🏖️ So take your sweet precious time to answer each question  ⏳ You could take a bath or go for a nap, we won't be able to tell  😜 </p>
          </div> {/* END intro container */}
        </div>{/* END WRAPPER */}
      </div>{/* end background image container */}
    </header>

    {/* Main with one quiz section*/}
    <main id='mainContent' className={`${initialIntro === next ? "mainWithQuiz" : ""}`}>
      {/* instructions section */}
      <section id='quiz' className={`${initialIntro === intro ? "firstArrow instruction" : "instruction secondArrow"}`}>
        {/* SKIP to quiz */}
        {/* conditional rendering for skip to quiz */}
        {
          initialIntro !== intro ?
          <div className="App wrapper">
            <a href="#quizGame" className='start' aria-label='Click link to go down to the game'>
              <ArrowDown size={30}
              color="white"
              aria-hidden="true"
              />
              <h3>Go down to quiz!</h3>
            </a>
          </div>
          : null
        }
        
        {/* thinking container with background and Wrapper */}
        <div className={`${initialIntro !== intro ? "thinking App wrapper" : "App wrapper"}`}>
          {/* thinking text container */}
          <div className="thinkingText">
            <h3>{initialIntro}</h3>
          </div>{/* END thinking text */}
        </div>{/* end background container and wrapper */}
        {/* WRAPPER */}
        <div className="App wrapper">
            {/* ternary operator checking if user hasn't clicked the start button yet/submitted the form, if user has submitted, make dropdown disappear */}
            <div className={`${initialIntro !== next ?"content dropContainer" : "noContent"}`}>
              <form onSubmit={firstSubmitHandler}>
                <label htmlFor="category">Play this category:</label>
                <select name="category" id="category" onChange={handleUserCategory} value={userCategory} required>
                    <option value="" disabled>Pick one:</option>
                    <option value="Random">Random!</option>
                    <option value="Arts & Literature">Arts & Literature</option>
                    <option value="Film & TV">Film & TV</option>
                    <option value="Food & Drink">Food & Drink</option>
                    <option value="General Knowledge">General Knowledge</option>
                    <option value="Geography">Geography</option>
                    <option value="History">History</option>
                    <option value="Music">Music</option>
                    <option value="Science">Science</option>
                    <option value="Society & Culture">Society & Culture</option>
                    <option value="Sport & Leisure">Sport & Leisure</option>
                </select>

                <label htmlFor="level">Play at this level:</label>
                <select name="level" id="level" onChange={handleUserLevel} value={userLevel} required>
                    <option value="" disabled>Pick one:</option>
                    <option value="Random">Random!</option>
                    <option value="easy">easy</option>
                    <option value="medium">medium</option>
                    <option value="hard">hard</option>
                </select>
                
                {/* svg arrow up */}
                <ArrowDown size={70}
                    // conditional rendering of className in order to change the colour of the arrow according to given button state (either start or new question)
                    color={`${initialIntro === next ? "#2A28BA" : "#A741AC"} `}
                    aria-label = "click on the button below to get a new question"
                />
                {/* submit/start button */}
                <button
                type="submit" 
                className="start"
                >Start
                </button>
            </form>
          </div>{/* end form container div */}
    
          <span className="sr-only">Click the button down below</span>
        </div>{/* END WRAPPER */}

      {/* DISPLAY FORM COMPONENT */}
      {/* if the user has submitted show the quiz game and all the other elements that come with that */}
      {
        submitted === true ?
        <DisplayForm
        next={next}
        intro={intro}
        initialIntro={initialIntro}
        clickHandler={clickHandler}
        question={question}
        allAnswers={allAnswers}
        correctAnswer={correctAnswer}
        currentQuestionId={currentQuestionId}
        leaveClickHandler={leaveClickHandler}
        category={category}
        level={level}
        firstSubmitHandler={firstSubmitHandler}
        userCategory={userCategory}
        userLevel={userLevel}
        incorrectAnswers={incorrectAnswers}
      />
      : null
      }
      </section>
    </main>

    {/* Footer with copyright */}
    <footer>
      {/* wrapper */}
      <div className="App wrapper">
        <p>Copyright ©️  Juno College 2022</p>
      </div>{/* end wrapper */}
    </footer>
   
  </Fragment> 
  );
}

export default App;



// UPDATED PSEUDO CODE
// Get data (questions, incorrectAnswers, correctAnswer, category, difficulty) from the Trivia API and put that data into stateful variables
// use async await function to call the async function that makes the API call only when the user submits the dropdown form/start button (inside submitHandler)
// depending on the user's selection from the dropdown, create different async functions in order to make API calls at different endpoints (based on given URLSearch params, when category is specified in the endpoint, API only provides data for questions that match that filter, and vice versa for difficulty)
// since for the dropdown menu, I have to control the input anyway with stateful variables that hold the values of the user inputs, I can just use those as the values for the categories and difficulty params inside the URLSearch params (when setting up the API call)
// then in order to make sure that no question repeats itself after another, make another API call in order to get different data based on whether the current question id (string value) is included in the question id array. Add that new current id to the question id array (didn't work fully, but better than before)
// set other states that help define conditions whether certain elements get rendered onto the page or not and what classNames are assigned to those elements (if form was submitted, what kind of text/intro is being displayed, colour changes etc)
// update those stateful variables inside the event listener functions, so submitHandler, clickHandler that gets passed into the otherClickHandler inside the DisplayForm button for the new question button, and the userCategory and userLevel states (inside the changeHandlers give those a value of e.target.value, for submitHandler set the submitted state to true, and the initialIntro to next), also define variables for the text and store those into state (for initialIntro the string value of the intro variable is the default value, gets updated accordingly when the user submits/starts the game)
// define the otherClickHandler function in the DisplayForm component and pass in the clickHandler function from App.js as a prop. Also define other necessary states in that component and update the values of those accordingly inside the functions and under certain conditions (if statements) (submitHandler for quiz, then the leaveClick handler where the userInput and other states get cleared, set back to their default value, also defined the leave handler inside the App.js to then use as a prop in the displayForm component)
// use the state values in the return of the displayForm (JSX) as props to display those values onto the page
// map through the newly created randomized allAnswers array, so that user doesn't know where the correct answer is being displayed (created in the async function in App.js, used concat to inser correctAnswer into incorrectAnswers array, returned a new answers array, then used math.random to then store into another array. that array then gets stored into the allAnswers state). wrap the answers in a div that holds the input and the label, so that they're all aligned well (and also to apply styling to the whole container rather than just each individual item)
// only display the displayForm component onto the page if the user submitted the dropdown form
// then add additional elements to display onto the page when the quiz data is shown, so when the user is currently playing (an option to return back to the initial display and choose different categories and levels/restart the game, also further instructions based on whether the user submitted an answer or not, customize the messages based on whether the user submitted AND got the answer either right or wrong, also change background colour accordingly (green for right, red for wrong))
// optional: added in custom messages as an array, one for when the user submitted correct answers, and the other one when he submitted incorrect answers
// then randomized the order of those arrays (with the index numbers), so that user would get a different custom message randomly
// also added in counter for each question that gets submitted and answered correctly and then one for each time the user has submitted an answer regardless whether correct or incorrect, store those into state, update those in the submit handler and empty them out in the leave handler
// for that it's important to clear the state's values, or set them back to their default values






// original PSEUDO CODE

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

// originally:
// lose start button (stretch goal)
// maybe no useEffect, put it in state to have it show up every time user submits/clicks (eventHandler func)
// functionality to check with array ids in state to avoid showing same question

// inputs changed to type=radio to limit user to only one choice (checkbox better for more possible answers, here only one answer)
