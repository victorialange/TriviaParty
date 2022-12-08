// this will be the form that shows the quiz content (questions, answer choices) from the Trivia API


import { useState } from "react";
import { Fragment } from "react";
import './App.css';

// importing ArrowUp and ArrowDown from ArrowDown and ArrowUp components
import ArrowUp from "./ArrowUp.js";
import ArrowDown from "./ArrowDown.js";

const DisplayForm = ( props ) => {

    // create a piece of state to hold the user's choice when switching in between radio inputs (in order to update the onChange of the )
    const [userChoice, setUserChoice] = useState("");

    // creating variables that store string value of button, one for when the user still needs to submit an answer, and another one for when user has already submitted
    const needSubmit = "Submit answer";
    const submitted = "Submitted :)";
    // stateful variable for string value of submit button, default value set to needSubmit (so before the user has submitted anything)
    const [submit, setSubmit] = useState(needSubmit);

    // variables for aria-label values of buttons (start and new question)
    const startLabel = "Click this button to start the quiz game!";
    const newLabel = "Click this button to either skip the current question or in order to continue getting a new one after you submitted your answer";
    // stateful variable firstLabel for aria-labels of buttons (start and new question); default value of startLabel (before the user hit start to see quiz)
    const [firstLabel, setFirstLabel] = useState(startLabel);
   
    // isActive as a stateful variable that represents state of submit button (isActive set to true means answer submitted and vice versa), important for later in feedback field to "toggle" between classes based on conditional rendering (when there is no submission and therefore no feedback message to display, give it class so that it takes up less or normal space vs when there is one, style accordingly)
    const [isActive, setActive] = useState(false);
 
    // stateful variable that represents disabled state of radio input and submit button, set to false by default so that user can make a selection and submit, then later in handleSubmit set to true (so that user can no longer change value, or submit) and in anotherClickHandler set to the inital state again (disabled=false)
    const [limitSubmit, setLimitSubmit] = useState(false);

    // limitSubmitMessage state that represents message to user when the input and submit button are disabled, instructions on how to keep playing; initial value set to empty string, only gets updated upon form submission, returns back to empty string when user decides to leave/return to start
    const [limitSubmitMessage, setLimitSubmitMessage] = useState("");

    // num as a stateful variable to hold index number of individual items of customWrong and customRight array, default value 0 (randomizing it with Math.random later on in func in order to get individual value of array in randomized order)
    const [num, setNum] = useState(0);

    // variables to pass into customRight array as items
    const rightOne = "100% correct! Nice job 👊";
    const rightTwo = "Wowwww!!! You're like a genius or something 🤯";
    const rightThree = "Yayyyy, you got it right! Happy dance 🕺";
    const rightFour = "Are you sure you're not cheating 👀 I guess you're a trivia pro after all!";
    const rightFive = "Well look at you. So smart!! 🧠 And so handsome! 😍 (Not that we can actually see you, but it sounds kinda nice, doesn't it? 😜)";

    // defining my own custom array that holds feedback for when user has selected correct answer (randomizing it with num as index number later on, along with passing it to message state)
    const customRight = [rightOne, rightTwo, rightThree, rightFour, rightFive];

    // defining variable as consistent attached message to items for customWrong array (tells the user what would have been the right answer)
    const shouldHave = `The correct answer would have been: ${props.correctAnswer}`

    // variables to pass into customWrong array as items with shouldHave variable
    const wrongOne = `Oh no! You got it wrong 😞😢 ${shouldHave}. Not ${userChoice}`;
    const wrongTwo = `It's ok, it's ok, just take a few deep breaths, real nice and slow, come back later and try again ☺️ I know you can do it 😉${shouldHave}. Not ${userChoice}`;
    const wrongThree = `Hmmm, maybe you like submitted the wrong answer by accident 🤔🙃 ${shouldHave}. Not ${userChoice}`;
    const wrongFour = `Wrong! And you're out. Nah, just kidding, you can try as many times as you like, we're nice after all 😃😁 ${shouldHave}. Not ${userChoice}`;
    const wrongFive = `Are you ok? Do you need a break? Or a hug 🫂 Anyway, trivia isn't always for everyone, but keep practicing and you'll get better 😉 ${shouldHave}. Not ${userChoice}`;

    // defining my own custom array that holds feedback for when user has selected incorrect answer (randomizing it with num as index number later on, along with passing it to message state)
    const customWrong = [wrongOne, wrongTwo, wrongThree, wrongFour, wrongFive];

    // message as stateful variable that will hold the customRight and the customWrong array with randomized index number num, default value set to empty string, as message will only get displayed when user submits the form
    const [message, setMessage] = useState("");

    // score state to count how many questions the user has gotten right when submitted
    const [score, setScore] = useState(0);

    // total questions state for when user has submitted an answer, counts how many times user has submitted
    const [totalQuestionsAnswered, setTotalQuestionsAnswered] = useState(0);
   
      
    // randomizer function to generate random index number for displayed message according to which array applies
    const randomNumberInRange = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // handleRadioClick function as event handler for when radio input is clicked (sets the userInput defined as a stateful variable userChoice equal to the selected answer)
    const handleRadioClick = (e) => {
        // updates value of userChoice stateful variable to the selected/clicked radio input
        setUserChoice(e.target.value);
    };

    // submitHandler for when user submits an answer
    const submitHandler = (e) => {
        e.preventDefault();
        
        // leave userChoice with its value, so that when submitting the form again with the same answer without reclicking, it will still give the same feedback (stay either right or wrong) (when userChoice value is empty, it will see that as an incorrectAnswer since it's not equal to the correctAnswer from the API, even though the input itself is, but the value of the userChoice doesn't reflect that if it's set to an empty string)

        // update value of stateful variable isActive to true, meaning the form has been submitted, so other events can occur (showing feedback message/ not showing feedback when not submitted and relevant styling based on that)
        setActive(true);

        // update index num of both arrays by calling the randomizer function in between the ranges of 0 and 3 (passing them as arguments)
        setNum(randomNumberInRange(0, 4));

        // conditional rendering to check if userChoice is equal to correct answer (based on value, which is equal to the string value of the API), allows me to destructure/shuffle/randomize order between incorrect and correct answer, as I don't have to rely on index anymore to know whether it's the correct answer or not
        if (userChoice !== props.correctAnswer) {
            // updating the value of message state to array item of customWrong at randomized index number (when incorrect answer chosen)
            setMessage(customWrong[num]);
        } else {
            // updating the value of message state to array item of customRight at randomized index number (when correct answer chosen)
            setMessage(customRight[num]);
        }
        
        // every time user submits an answer regardless of right or wrong, the stateful variable increases by 1 (not to be confused with if the user just clicks new question but hasn't submitted an answer)
        setTotalQuestionsAnswered(totalQuestionsAnswered + 1);

        // setting score value of score state according to whether user has chosen correct answer and submitted (score stays the same when user hasn't submitted or answered correctly)
        if (userChoice === props.correctAnswer) {
            setScore(score + 1);
        }
        else {
            setScore(score);
        }

        // update value of stateful variable limitSubmit to true, so that submit button and radio input are disabled when the user has already submitted the form once 
        setLimitSubmit(true);
        // update state variable submit to submitted variable when user has submitted an answer
        setSubmit(submitted);
        // update the value of the limitSubmitMessage stateful variable to a string that tells the user how to proceed when the button and radio inputs are disabled after submission
        setLimitSubmitMessage(`You submitted an answer, great! Now click on the button above that says "New Question" in order to keep trivia partying 🎊`);
    }

    // creating another click handler function for the different question button to remove the feedback each time when that button is clicked
    const anotherClickHandler = () => {
        // calling clickHandler function created in App.js that calls the async getQuiz(), getRandomQuiz(), getCategoryQuiz or getLevelQuiz function based on the user's selection from dropdown menu
        props.clickHandler();

        // clearing of user choise so that it doesn't keep the old value from the past question
        setUserChoice("");

        setFirstLabel(newLabel);

        // update value of limit submit variable back to starting point/default value
        setLimitSubmit(false);

        // set value of stateful variable submit back to needSubmit, so everytime the user clicks on the new question button
        setSubmit(needSubmit);
        // empty out limit submit message when user clicks new question button
        setLimitSubmitMessage("");

        // if statement to check if message present, set the message's value back to start again, so that it doesn't stay there when user goes to next question, also sets active stateful variable back to false, so that appropriate class with styling based on that gets applied
        if (message) {
            setMessage("");
            setActive(false);
            setLimitSubmitMessage("");
        } 
    } 

    // different click handler function for when user clicks on the leave button, sets generator value of first button (start or new question) back to default state (start), which also encompasses the form with the noContent className, resulting in a display: none of the form (like before showing the quiz same as start/initial display)
    const leaveHandler = () => {

        // calling the leaveClickHandler function from the App.js component, which sets the initial intro stateful variable back to default intro value (same as in initial display)
        props.leaveClickHandler();

        // important to not forget to set the limitSubmitMessage stateful variable back to its initial empty string value when the user returns to the start display/leaves the game
        setLimitSubmitMessage("");
        // set user choice back to empty string so that it doesn't remain with value from submission/selecting after game is over/wants to restart
        setUserChoice("");
        // set limit submit for disabling input and button back to false
        setLimitSubmit(false);
        // set submit button of quiz' string value back to needSubmit
        setSubmit(needSubmit);
        // set score and total questions answered back to 0, so that user can start fresh again after leaving
        setScore(0);
        setTotalQuestionsAnswered(0);
    }


    return(
    <Fragment>
        {/* WRAPPER */}
        <div className="App wrapper inside">
            {/* ternary operator to control whether svg arrow has blue or pink-ish colour based on whether user has clicked the start button or hasn't yet */}
           {
            props.initialIntro === props.next ?
            <Fragment>
                {/* svg arrow down imported from component */}
                {props.errorMessage === false ?
                <ArrowDown size={70}
                // conditional rendering of className in order to change the colour of the arrow according to given button state (either start or new question)
                color={`${props.initialIntro === props.next ? "#2A28BA" : "#A741AC"} `}
                aria-label = "click on the button below to get a new question"
                />
                : null
                }
                
                {/* BUTTON for new question */}
                {props.errorMessage === false ?
                <button 
                // passing in the function definition of anotherClickHandler that calls the clickHandler from App.js for us (which includes making the API call everytime the user clicks that button)
                onClick={anotherClickHandler}

                // pass in the firstLabel stateful variable as the value of aria-label to alternate between labels based on whether it's the start or the new question button
                aria-label={firstLabel}

                // conditional rendering of className based on whether button is start button or generates new question
                className="next">New Question</button> 
                : null
                }

                {/* repetition of userInput from dropdown and ternary operators to control which properties get rendered onto the page and how based on className assignments */}
                { 
                props.userCategory !== "Random" && props.userLevel !== "Random" && props.errorMessage === false ?
                <div className={`${props.errorMessage ? "choiceIteration noRandom" : "choiceIteration noRandom"}`}>
                    {/* category */}
                    <p>Chosen category: {props.userCategory}</p>
                    {/* score container */}
                    <div className="scoreContainer">
                        <p>Your score: {score}/{totalQuestionsAnswered}</p>
                    </div>{/* end score container */}
                    {/* level */}
                    <p>Chosen level: {props.userLevel}</p>
                </div> 
                :
                props.userCategory === "Random" && props.userLevel !== "Random" && props.errorMessage === false ?
                <div className={`${props.errorMessage ? "choiceIteration noRandom" : "choiceIteration noRandom"}`}>
                    <p>Chosen category: {props.userCategory}!</p>
                    {/* score container */}
                    <div className="scoreContainer">
                        <p>Your score: {score}/{totalQuestionsAnswered}</p>
                    </div>{/* end of score container */}
                    <p>Chosen level: {props.userLevel}</p>
                </div> 
                :
                props.userCategory !== "Random" && props.userLevel === "Random" && props.errorMessage === false ?
                <div className={`${props.errorMessage ? "choiceIteration noRandom" : "choiceIteration noRandom"}`}>
                    {/* category */}
                    <p>Chosen category: {props.userCategory}</p>
                    {/* score container */}
                    <div className="scoreContainer">
                        <p>Your score: {score}/{totalQuestionsAnswered}</p>
                    </div>{/* end score container */}
                    {/* level */}
                    <p>Chosen level: {props.userLevel}!</p>        
                </div>
                : 
                props.errorMessage === false && props.userLevel === "Random" && props.userCategory === "Random" ? 
                <div className={`${props.errorMessage ? "choiceIteration random" : "choiceIteration random"}`}>
                    {/* RANDOM!! */}
                    <p>You chose Random!</p>
                    {/* score container */}
                    <div className="scoreContainer">
                        <p>Your score: {score}/{totalQuestionsAnswered}</p>
                    </div>
                    {/* end score container */}
                </div> 
                : null
                }
                
            </Fragment> 
            : null
            } 

            {/* limitSubmitMessage for when user has submitted form and needs instructions on how to keep playing, using conditional rendering (ternary operators: if the button state is disabled/limited and if it's not the start button on the page, only then render the div with the class of alert that has the arrow and the message inside of it) */}
            {
            limitSubmit === true && props.initialIntro === props.next ?
            // alert container for when user has submitted answer/form disabled
            <div className={`${props.userCategory === "Random" && props.userLevel === "Random" ? "randomAlert alert" : "alert"}`}>
                {/* arrow up svg imported from arrow up component */}
                <ArrowUp size={70}
                color="#322fd6"
                aria-hidden="true"
                />
                {/* limit submit message */}
                <div className="limitSubmitMessage">
                    <p>{limitSubmitMessage}</p>
                </div>{/* END LIMIT SUBMIT MESSAGE */}
            </div>// end alert
            : null
            }
        </div>{/* END WRAPPER */}
        
        {/* quiz form section */}
        <section className="quizForm" id="quizGame">
            {/* WRAPPER */}
            <div className="App wrapper">
                {/* FORM CONTAINER */}
                {/* checking with ternary operator if user has hit the start button, submitted the dropdown form from start display */}
                {
                props.initialIntro === props.next && props.errorMessage === false ?
                // form container, if limit submit message comes/form disabled, give it a className so that form is lower
                <div className={`${limitSubmitMessage !== "" ? "formContainer content lowered" : "formContainer content"}`}>
                    <form onSubmit={submitHandler} aria-label="quiz" 
                    className={`
                    ${limitSubmit === true && limitSubmitMessage !== "" ? "loweredForm" : "content"}
                    `}>
                        {/* properties container */}
                        <div className="properties">
                        {/* category property */}
                        {/* conditional rendering in order to avoid getting undefined property onto the page */}
                            {
                            props.userCategory !== "Random" ?  
                            <div className="category">
                                <p>{`Category: ${props.userCategory}`}</p>
                            </div>
                            : <div className="category">
                                <p>{`Category: ${props.category}`}</p>
                            </div> 
                            }
                                    
                            {/* level property */}
                            {/* conditional rendering in order to avoid getting undefined property onto the page */}
                            {
                            props.userLevel!== "Random" ?
                            <div className="level">
                                <p>{`Level: ${props.userLevel}`}</p>
                            </div>
                            : 
                            props.level !== undefined ?
                            <div className="level">
                                <p>{`Level: ${props.level}`}</p>
                            </div> : null
                            }
                                
                        </div>{/* end of properties container */}
                        
                        {/* FIELDSET with question from API as legend and inputs and labels as elements */}    
                        <fieldset>
                            <legend>{props.question}</legend>
                            <div className="inputs">
                            {/* mapping through the allAnswers array that I created inside async getQuiz function that holds incorrectAnswers array and correctAnswer string, order randomized, all inside one array */}
                                {props.allAnswers.map((answer, index) => {
                                return(
                                // remember to use ternary operator when defining a condition for rendering inside return, since map expects return right after arrow and not an if statement, have to use ternary since it returns JSX, also no curlies since it's straight JSX
                                answer ?
                                    // defining different conditions with ternary operators to give answer container (input+labek) classNames based on those conditions (if the value of the user input (userChoice) is equal to the value of the input (answer), then give it a class so that it changes the background colour of that container (stays like that when user has selected the answer, input:checked doesn't work in this case since it is the container I want to change that is a parent of the input and not the input itself or a child); also when input and submit button are disabled (limitSubmit === true) change the default greyish background color)
                                    <div className={`
                                    ${limitSubmit === true ? "weaker answer" : "answer" } 
                                    ${userChoice !== answer ? "" : "selected"} 
                                    ${limitSubmit === true && userChoice === answer && userChoice === props.correctAnswer ? "selectedRight" : ""} 
                                    ${limitSubmit === true && userChoice === answer && userChoice !== props.correctAnswer ? "selectedWrong" : ""}
                                    ${limitSubmit === true && answer === props.correctAnswer ? "idealSelect" : ""}`}       
                                    // make sure to give the key to the parent element inside the return, so the div containing the input and label, and not the children of that container (the input and label themselves)
                                    // also make sure to use a value for the key that's different from the id of the input element, otherwise the whole conditional rendering/ternary operators won't work properly (solution: modifying index, like adding other value) 
                                    key={props.currentQuestionId + index}>
                                        <input
                                        // chose radio button as I want the user to only check one input that gets submitted
                                        type="radio"
                                        // id of each answer input set to index position (keeps incrementing, so unique for each input) 
                                        id={index}
             
                                        // all inputs have the same name, so that they are being grouped together
                                        name="quiz"
             
                                        // giving it the required attribute so that user can't submit without having selected one option
                                        required
             
                                        // value set to string value of each answer
                                        value={answer}
                                        // always make sure to have the right properties defined/set because otherwise one little mistake and the input stays checked, which is not ideal for a quiz   
         
                                        // pass the onClick the handleRadioClick function in order to control the value of the userChoice each time an input gets clicked
                                        onClick={handleRadioClick}
                                        // set disabled attribute equal to stateful variable limitSubmit (so to true after form submission and to false before form submission)
                                        // this will prevent the user from being able to change the answer/resubmitting numerous times, which would make the whole trivia game a bit pointless
                                        // also prevents the input value from constantly changing even after submission
                                        disabled={limitSubmit}
                                        /> 
                                            <label htmlFor={index}>{answer}</label>
                                            {
                                            limitSubmit === true ?
                                            <label htmlFor={index} className="sr-only">
                                            "This option is disabled because you already submitted your answer"
                                            </label>
                                            : null 
                                            }
                                        </div>// end of answer container for input and label
                                        : null 
                                    );// end of return
                                })// end of anonymous callback function inside map
                               }  {/* end of map */}
                            </div>{/* end of input and label container  */}
                        </fieldset>{/* end of fieldset */}
                                 
                        {/* Buttons */}
                        {/* submit button */}
                        <button 
                            type="submit"
                            // disable submit button when user has already submitted once (lock the answer)
                            disabled={limitSubmit}
                            aria-label={`${limitSubmit === true ? "This button is currently disabled because you already submitted an answer" : ""}`}
                            className={`${limitSubmit === true ? "weaker" : "" }`}
                        >{submit}
                        </button>
                        {/* conditional rendering of class for feedback field, if div active after submitting, className="message", else "noMessage", also for whether feedback is for right or wrong answer */}
                        {/* setting up another condition so that when user is leaving quiz and then gets back and starts again he won't see the feedback from the past submit, is the input and button disabled, then show the message, if not then don't show a message */}
                        {
                        limitSubmit ?
                        <div className={`${submitted && limitSubmit ? "message" : "noMessage"}`}>
                            <div className={`${userChoice !== props.correctAnswer && isActive ? "wrong": "right"}`}>
                                <p>{message}</p>
                            </div>    
                        </div> //end of feedback container
                        : 
                        <div className="noMessage"></div>
                        }
                    </form>
                </div> // end of form container
                : null
                } 
                            
                {/* back to top shortcut link */}
                {/* conditional rendering, link only visible when quiz is displayed */}
                {
                props.initialIntro === props.next && props.errorMessage === false ?
                <a href="#intro" className="start">
                    <ArrowUp size={30}
                    color="white"
                    aria-hidden="true"
                    />
                    Go back to top
                </a>
                : null
                }
                
            </div>{/* END WRAPPER */}
        </section>{/* END quiz FORM SECTION */}
        
        {/* leave field section if user has started quiz game */}
        {
        props.errorMessage === false ?
        <section className={`${props.initialIntro === props.next ?
        "leaveField" : "noContent"}`}>
            {/* leaveField container for when user wants to get back to initial display without questions or wants to switch categories/restart game */}
            <div className="App wrapper">
                <p>Feeling tired or just wanna leave the party early? Or maybe you just got bored of the level or category (so smart! 🤓) and feel like choosing something else! Either way we've got you 😃</p>
                <ArrowDown size={70}
                color="black"
                aria-hidden = "true"
                />
                <span className="sr-only">Click the button down below</span>
                {/* leave/restart button */}
                <button 
                className="end"
                // pass in the function definition of leaveHandler, in which it calls the leaveClickHandler function from the App.js component with props, which also includes the initialIntro value set to intro (initial state). Thanks to the ternary operators that check whether the generator state value is start or next, string values and classNames get added or changed accordingly (and then styled fittingly) => if form's className=noContent, that invokes display:none of the whole quiz, which is what I want for when the user either hasn't hit the start button yet or when the user wants to quit the game and return to the initial start display
                onClick={leaveHandler}
                aria-label="Click this button to exit the trivia and return to start">
                Leave Trivia Party/ Restart game
                </button> 
                <p>Sad to see you go 😥  But also, you deserve the break 😊</p>
                <p>Hope you feel like rejoining the party soon 😘</p>
            </div>{/* END LEAVE CONTAINER */}
        </section>// END leave field SECTION *
        : 
        // if the errorMessage is set to true and the quiz is present (user has already clicked start), stop showing the form, and show an ending message instead (recap of how well the user did at the end, end range 20 questions to prevent 429 error of making too many API calls, also to have a reasonable amount per round)
        props.errorMessage !== false && props.initialIntro === props.next ?
        <div className="App wrapper leaveField">    
            {props.userCategory !== "Random" && props.userLevel !== "Random" && props.errorMessage !== false ?
            // choice iteration div
            <div className={`${props.errorMessage ? "choiceIteration noRandom endField" : "choiceIteration noRandom"}`}>
                {/* category */}
                <p>Chosen category: {props.userCategory}</p>
                {/* level */}
                <p>Chosen level: {props.userLevel}</p>
                {/* score container */}
                <div className="scoreContainer">
                    <p>Your score: {score}/{totalQuestionsAnswered}</p>
                </div>{/* end score container */}
            </div> // END choice iteration div
            :
            props.userCategory === "Random" && props.userLevel !== "Random" && props.errorMessage !== false ?
            <div className={`${props.errorMessage ? "choiceIteration noRandom endField" : "choiceIteration noRandom"}`}>
                {/* user category */}
                <p>Chosen category: {props.userCategory}!</p>
                {/* user level */}
                <p>Chosen level: {props.userLevel}</p>
                {/* score container */}
                <div className="scoreContainer">
                    <p>Your score: {score}/{totalQuestionsAnswered}</p>
                </div>{/* end of score container */}
            </div>// end choice iteration 
            :
            props.userCategory !== "Random" && props.userLevel === "Random" && props.errorMessage !== false ?
            <div className={`${props.errorMessage ? "choiceIteration noRandom endField" : "choiceIteration noRandom"}`}>
                {/* category */}
                <p>Chosen category: {props.userCategory}</p>
                {/* level */}
                <p>Chosen level: {props.userLevel}!</p>    
                {/* score container */}
                <div className="scoreContainer">
                    <p>Your score: {score}/{totalQuestionsAnswered}</p>
                </div>{/* end score container */}    
            </div>// end choice iteration
            : props.userLevel === "Random" && props.userCategory === "Random" && props.errorMessage !== false ? 
            <div className={`${props.errorMessage ? "choiceIteration random randomField" :"choiceIteration random" }`}>
                {/* RANDOM!! */}
                <p>You chose Random!</p>
                {/* score container */}
                <div className="scoreContainer">
                    <p>Your score: {score}/{totalQuestionsAnswered}</p>
                </div>
                {/* end score container */}
            </div>// end choice iteration
            : null
            }
            {/* setting up messages at the end for when user either has had a good score or not the best score */}
            {
            score >= 14 ?
            <p>Wow, you're a real pro 💪 But I mean, you probably already knew that 😉</p>
            : score <= 13 ?
            <p>Well...looks like you've still got some work to do. But no worries, you'll get there eventually :)</p>
            : null
            }
            <p>No more questions left for this round. Hope you enjoyed it!</p>
            <p>If you want to restart the game or just leave - either way you are still a champ 🏆 click the button down below!</p>
            {/* black arrow pointing towards leave button */}
            <ArrowDown size={70}
            color="black"
            aria-hidden = "true"
            />
            <span className="sr-only">Click the button down below</span>
            <button 
            className="end"
            // pass in the function definition of leaveHandler, in which it calls the leaveClickHandler function from the App.js component with props, which also includes the initialIntro value set to intro (initial state). Thanks to the ternary operators that check whether the generator state value is start or next, string values and classNames get added or changed accordingly (and then styled fittingly) => if form's className=noContent, that invokes display:none of the whole quiz, which is what I want for when the user either hasn't hit the start button yet or when the user wants to quit the game and return to the initial start display
            onClick={leaveHandler}
            aria-label="Click this button to exit the trivia and return to start">
            Leave Trivia Party/ Restart game
            </button> 
        </div>// END WRAPPER
        : null
        }
        
        {/* BACKGROUND IMG CONTAINER only when user has started quiz, outside of wrapper */}  
        {
        props.initialIntro === props.next ?
        <div className="partingImg"></div>// END BACKGROUND IMG CONTAINER
        : null
        }
 
    </Fragment> 
    )

}

export default DisplayForm;