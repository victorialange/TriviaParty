// this will be the form that shows the quiz content (questions, answer choices) from the Trivia API


import { useState } from "react";
import { Fragment } from "react";
import './App.css';
// import { ArrowUp } from "./index.js";
// importing ArrowUp and ArrowDown from ArrowDown and ArrowUp components
import ArrowUp from "./ArrowUp.js";
import ArrowDown from "./ArrowDown.js";

const DisplayForm = ( props ) => {

    // create a piece of state to hold the user's choice when switching in between radio inputs (in order to update the onChange of the )
    const [userChoice, setUserChoice] = useState("");
    // const [userString, setUserString] = useState("");

    // const [formData, setFormData] = useState({
    //     answerOne: "",
    //     answerTwo: "",
    //     answerThree: "",
    //     answerFour: ""
    // });

    // variables that holds feedback for either right or wrong answer
    // const right = "Result: Yayyy you're right!";
    
    // const wrong = `Result: Nooo, you were wrong! 
    //     The right answer would have been: "${props.correctAnswer}".`
    //  ;
    // stateful variable for feedback/message upon form submission
    // const [feedback, setFeedback] = useState("");

    // creating variables that store string value of button, one for when the user still needs to submit an answer, and another one for when user has already submitted
    const needSubmit = "Submit answer";
    const submitted = "Submitted :)";
    // stateful variable for string value of submit button, default value set to needSubmit (so before the user has submitted anything)
    const [submit, setSubmit] = useState(needSubmit);
    

    // setting variables to pass into generator state for start/new question button later on in anotherClickHandler function
    const start = "Start";
    const next = "New Question";
    // stateful variable for text inside start or new question button (setting default value to start variable, so that it gets displayed with that string before api call)
    const [generator, setGenerator] = useState(start);

    // variables for aria-label values of buttons (start and new question)
    const startLabel = "Click this button to start the quiz game!";
    const newLabel = "Click this button to either skip the current question or in order to continue getting a new one after you submitted your answer";
    // stateful variable firstLabel for aria-labels of buttons (start and new question); default value of startLabel (before the user hit start to see quiz)
    const [firstLabel, setFirstLabel] = useState(startLabel);
   
    // isActive as a stateful variable that represents state of submit button (isActive set to true means answer submitted and vice versa), important for later in feedback field to "toggle" between classes based on conditional rendering (when there is no submission and therefore no feedback message to display, give it class so that it takes up less or normal space vs when there is one, style accordingly)
    const [isActive, setActive] = useState(false);

    // leaving as stateful variable that represents whether leavingField is returned or not (here initial value set to false, because I only want to return it when the quiz is displayed, before quiz gets displayed, only have the start button and instructions there on the page)
    const [leaving, setLeaving] = useState(false);

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
    const rightFive = "Well look at you. So smart!! 🧠 And so handsome! ✨ (Not that we can actually see you, but it sounds kinda nice, doesn't it? 😜)"

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

// setCustomRight(randomRight);
// setCustomWrong(randomWrong);
    //   const rightArray = [rightOne, rightTwo, rightThree, rightFour];
      
      // setCustomRight([rightOne, rightTwo, rightThree, rightFour]);
      // console.log(customRight);
    //   const randomRight = rightArray.sort(() => 0.5 - Math.random());
    //   console.log(randomRight);

    //   const wrongArray = [wrongOne, wrongTwo, wrongThree, wrongFour];
    //   const randomWrong = wrongArray.sort(() => 0.5 - Math.random());
    //   console.log(randomWrong);
      
    // randomizer function to generate random index number for displayed message according to which array applies
    const randomNumberInRange = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // handleRadioClick function as event handler for when radio input is clicked (sets the userInput defined as a stateful variable userChoice equal to the selected answer)
    const handleRadioClick = (e) => {

        // const id= ref.current.id;
        // const {id, value} = e.target;
        // const id = e.target.id;
        // const value = e.target.value;
        // setFormData((previousData) => {
        //     // 
        //     return{
        //         // ...prevFormData,
        //         ...previousData,
        //         [id]: value
        //     };
        // })

        // updates value of userChoice stateful variable to the selected/clicked radio input
        setUserChoice(e.target.value);
        // setUserString()
        // setRadioClick(true);
        console.log(e.target.value);
        // console.log(formData);
        
    };

    // const resetRadioState = () => {
        
    // }

    const submitHandler = (e) => {
        e.preventDefault();
        // console.log(formData);
        // setFormData("");
        
        // leave userChoice with its value, so that when submitting the form again with the same answer without reclicking, it will still give the same feedback (stay either right or wrong) (when userChoice value is empty, it will see that as an incorrectAnswer since it's not equal to the correctAnswer from the API, even though the input itself is, but the value of the userChoice doesn't reflect that if it's set to an empty string)
        // setUserChoice("");
        // console.log(userChoice);
            
        // setFormData("");
        // console.log(formData);

        // update value of stateful variable isActive to true, meaning the form has been submitted, so other events can occur (showing feedback message/ not showing feedback when not submitted and relevant styling based on that)
        setActive(true);

        // update index num of both arrays by calling the randomizer function in between the ranges of 0 and 3 (passing them as arguments)
        setNum(randomNumberInRange(0, 4));

        // conditional rendering to check if userChoice is equal to correct answer (based on value, which is equal to the string value of the API), allows me to destructure/shuffle/randomize order between incorrect and correct answer, as I don't have to rely on index anymore to know whether it's the correct answer or not
        if (userChoice !== props.correctAnswer) {
            // updating the value of message state to array item of customWrong at randomized index number (when incorrect answer chosen)
            setMessage(customWrong[num]);
            console.log(customWrong);
            console.log(num);
        } else {
            // setCustomRight({num});
            // updating the value of message state to array item of customRight at randomized index number (when correct answer chosen)
            setMessage(customRight[num]);
            console.log(customRight);
            console.log(num);
        }

        // update value of stateful variable limitSubmit to true, so that submit button and radio input are disabled when the user has already submitted the form once 
        setLimitSubmit(true);
        // update state variable submit to submitted variable when user has submitted an answer
        setSubmit(submitted);
        // update the value of the limitSubmitMessage stateful variable to a string that tells the user how to proceed when the button and radio inputs are disabled after submission
        setLimitSubmitMessage(`You submitted an answer, great! Now click on the button above that says "New Question" in order to keep trivia partying 🎊`);
    }

    // let index = 0;

    // creating another click handler function for the different question button to remove the feedback each time when that button is clicked
    const anotherClickHandler = () => {
        // calling clickHandler function created in App.js that calls the async getQuiz() function
        // if (props.questionId.some(value => value.id === props.currentQuestionId) === false) {
        
        props.clickHandler();
        // if it's showing same question skip over it
        // if (props.currentQuestionId === props.questionId ) {
        //     props.clickHandler();
        // }
        // }
        // clearing of feedback
        // setUserChoice("");
        // update value of generator to next variable (so that it its text is displayed as new question instead of start)
        setGenerator(next);
        setFirstLabel(newLabel);
        // update value of limit submit variable back to starting point/default value
        setLimitSubmit(false);
        // set value of stateful variable submit back to needSubmit, so everytime the user clicks on the new question button
        setSubmit(needSubmit);
        // setting leaving back to false, so that leavingField appears again, when generator's value is set back to next variable
        setLeaving(false);
        
        // if statement to check if message present, set the message's value back to start again, so that it doesn't stay there when user goes to next question, also sets active stateful variable back to false, so that appropriate class with styling based on that gets applied
        if (message) {
            setMessage("");
            setActive(false);
            setLimitSubmitMessage("");
            // setUserChoice("");
        } 
        
    } 

    // different click handler function for when user clicks on the leave button, sets generator value of first button (start or new question) back to default state (start), which also encompasses the form with the noContent className, resulting in a display: none of the form (like before showing the quiz same as start/initial display)
    const leaveHandler = () => {

        // calling the leaveClickHandler function from the App.js component, which sets the initial intro stateful variable back to default intro value (same as in initial display)
        props.leaveClickHandler();
        // keep userChoice saved
        // setUserChoice("");

        // update stateful variable leaving to true, so that leavingField div is returned later on in JSX (set as condition)
        setLeaving(true);

        // setting generator back to start, which invokes form/quiz disappearing, all I needed to make entire form disappear since it's the same value when user hits start button
        setGenerator(start);
        // setUserChoice("");

        // important to not forget to set the limitSubmitMessage stateful variable back to its inital empty string value when the user return to the start display/leaves the game
        setLimitSubmitMessage("");
    }


    return(
    <Fragment>
        <div className="App wrapper inside">
            <button 
            // type="button"
            // change

            // passing in the function definition of anotherClickHandler that calls the clickHandler from App.js for us (which includes making the API call everytime the user clicks that button)
            onClick={anotherClickHandler}

            // pass in the firstLabel stateful variable as the value of aria-label to alternate between labels based on whether it's the start or the new question button
            aria-label={firstLabel}

            // conditional rendering of className based on whether button is start button or generates new question
            className={
            `${generator === start ? "start" : "next"}`
            }>{generator}</button>

            {/* limitSubmitMessage for when user has submitted form and needs instructions on how to keep playing, using conditional rendering (ternary operators: if the button state is disabled/limited and if it's not the start button on the page, only then render the div with the class of alert that has the arrow and the message inside of it) */}
            {
                limitSubmit === true && generator !== start ?
                <div className="alert">
                    <ArrowUp size={70}
                    color="violet"
                    aria-hidden="true"
                    />
                    {/* <p aria-hidden="true">⬆</p>  */}
                    <div className="limitSubmitMessage"
                    // {`${limitSubmitMessage ? "limitSubmitMessage" : ""}`
                    // }
                    >
                        <p>{limitSubmitMessage}</p>
                    </div>{/* END LIMIT SUBMIT MESSAGE */}
                </div>
                : ""
            }
            
        </div> 
        {/* quiz form section */}
        <section className="quizForm" id="quizGame">
            {/* WRAPPER */}
            <div className="App wrapper">
                {/* FORM CONTAINER */}
                <div className={`${generator === next ? "content formContainer" : "noContent"} ${limitSubmit === true ? "submitAlert" : ""}`}>
        
        
                    {/* FORM WITH API CONTENT for quiz  */}
                    <form onSubmit={submitHandler} aria-label="quiz" 
                    className={`
                    ${generator === next ? "content" : "noContent"}
                    ${limitSubmit === true && limitSubmitMessage !== "" ? "loweredForm" : ""}
                    `}
                    >
                        {/* properties container */}
                        <div className="properties">
                            {/* category property */}
                            {/* conditional rendering in order to avoid getting undefined property onto the page */}
                            {
                            props.category ?  
                            <div className="category">
                                <p>{`Category: ${props.category}`}</p>
                            </div>
                            : null  
                            }
                            
                                
                            {/* level property */}
                            {/* conditional rendering in order to avoid getting undefined property onto the page */}
                            {
                            props.level !== undefined ?
                            <div className="level">
                                <p>{`Level: ${props.level}`}</p>
                            </div>
                            : null
                            }
                            
                        </div>
                        
                        {/* FIELDSET with question from API as legend and inputs and labels as elements */}
                        <fieldset>
                            <legend
                            // className={`${generator === next ? "content" : "noContent"}`}
                            >{props.question}</legend>
                            <div className="inputs" 
                            // onChange={handleChange}
                            >
                            {/* mapping through the allAnswers array that I created inside async getQuiz function that holds incorrectAnswers array and correctAnswer string, all inside one array */}
                            {/* also good for later in case I decide to randomize/shuffle through the order of the array so that user can't predict where the correct answer is positioned */}
                            {props.allAnswers.map((answer, index) => {
                                // add an if statement checking if answer parameter (represents each item of allAnswers array) is truthy, so that no empty answer div gets returned, most times there is 4 answers (3 incorrect ones, and 1 correct one), but I just came across one question, where there was only 3 answers (2 incorrect and 1 correct one), maybe not best practice since return comes before anything else inside map
                                // if (answer) {

                                return(
                                    // remember to use ternary operator when defining a condition for rendering inside return, since map expects return right after arrow and not an if statement, have to use ternary since it returns JSX, also no curlies since it's straight JSX
                                    answer ?
                                    <div className={`
                                    ${limitSubmit === true ? "weaker answer" : "answer" } 
                                    ${limitSubmit === true && userChoice === answer ? "selectedFinal" : ""} 
                                    ${userChoice !== answer ? "" : "selected"} 
                                    ${limitSubmit === true && userChoice === answer && userChoice === props.correctAnswer ? "selectedRight" : ""} 
                                    ${limitSubmit === true && userChoice === answer && userChoice !== props.correctAnswer ? "selectedWrong" : ""}
                                    ${limitSubmit === true && answer === props.correctAnswer ? "idealSelect" : ""}`} 
                                    // id={``}
                                    
                                    // make sure to give the key to the parent element inside the return, so the div containing the input and label, and not the children of that container (the input and label themselves)
                                    // also make sure to use a value for the key that's different from the id of the input element, otherwise the whole conditional rendering/ternary operators won't work properly (solution: modifying index, like adding other value) 
                                    key={props.currentQuestionId + index}
                                    >
                                        <input
                                        // chose radio button as I want the user to only check one input that gets submitted
                                        type="radio"
                                        // id of each answer input set to index position (keeps incrementing, so unique for each input) 
                                        id={index}
                                        // index="0"
    
                                        // all inputs have the same name, so that they are being grouped together
                                        name="quiz"
    
                                        // giving it the required attribute so that user can't submit without having selected one option
                                        required 
                                        // onChange={handleFirstChange}
    
                                        // value set to string value of each answer
                                        value={answer}
                                        // always make sure to have the right properties defined/set because otherwise one little mistake and the input stays checked, which is not ideal for a quiz   

                                        // pass the onClick the handleRadioClick function in order to control the value of the userChoice each time an input gets clicked
                                        onClick={handleRadioClick}
                                        // set disabled attribute equal to stateful variable limitSubmit (so to true after form submission and to false before form submission)
                                        // this will prevent the user from being able to change the answer/resubmitting numerous times, which would make the whole trivia game a bit pointless
                                        // also prevents the input value from constantly changing even after submission
                                        disabled={limitSubmit}
                                        // checked={userChoice === 'firstAnswer'} 
                                        // className={`${limitSubmit === true && userChoice === answer ? "submittedInput" : ""}`}
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

                                  // }// end of if statement outside return

                                })// end of anonymous callback function inside map
                            }  {/* end of map */}
                                
                                
                                
                            
                            {/* second answer choice (incorrect) */}
                                {/* <input 
                                    type="radio" 
                                    id="answerTwo" 
                                    name="quiz"
                                    // onChange={handleSecondChange}
                                    value='secondAnswer'
                                    onClick={() => setFormData({radioChecked: true})}
                                    // checked={userChoice === 'secondAnswer'} 
                                />
                                <label htmlFor="answerTwo">{triviaSet.incorrectAnswers}</label> */}
                                {/* third answer choice (incorrect) */}
                                {/* <input 
                                    type="radio" 
                                    id="answerThree" 
                                    name="quiz"
                                    // onChange={handleThirdChange}
                                    value="thirdAnswer"
                                    onClick={() => setFormData({radioChecked: true})}
                                    // checked={userChoice === 'thirdAnswer'}  
                                /> */}
                                {/* <label htmlFor="answerThree">{props.answerThree}</label>
                                {/* fourth answer choice (correct) */}
                                {/* <label htmlFor="answerFour">
                                    <input 
                                    type="radio" 
                                    id="answerFour" 
                                    name="quiz" 
                                    // onChange={handleLastChange}
                                    value="correctAnswer"
                                    // onClick={() => setFormData({radioChecked: true})}
                                    // checked={userChoice === 'lastAnswer'}  
                                    />{props.correctAnswer}
                                </label> */}
                            </div>
                        </fieldset>  
                        
                        
                        {/* Buttons */}
                    
                        {/* submit button */}
                        <button 
                            type="submit"
                            // disabled={`${isActive === false ? "true" : ""}`}
                            // onClick= {submitHandler}
                            // disable submit button when user has already submitted once (lock the answer)
                            disabled={limitSubmit}
                            aria-label={`${limitSubmit === true ? "This button is currently disabled because you already submitted an answer" : ""}`}
                            className={`${limitSubmit === true ? "weaker" : "" }`}
                        >{submit}
                        </button>
                        {/* conditional rendering of class for feedback field, if div active after submitting, className="message", else "noMessage", also for whether feedback is for right or wrong answer */}
                        {/* <div className={`${isActive ? "message" : "noMessage"} ${feedback === right && isActive ? "right": ""} ${feedback === wrong && isActive ? "wrong": "" } `}>
                            <p>{feedback}</p>
                        </div> */}
                        <div className={`${isActive ? "message" : "noMessage"}`}>
                            <div className={`${userChoice !== props.correctAnswer && isActive ? "wrong": "right"}`}>
                                <p>{message}</p>
                            </div>    
                        </div>  
                                
                            
                    

                        {/* {
                            limitSubmit === true && radioCli  ?
                            alert("You have already submitted your answer. Please go to the next question.")
                            : ""
                        } */}
                    </form>{/* END FORM */}
                </div>{/* END FORM CONTAINER */}
                {/* back to top shortcut link */}
                {/* conditional rendering, only visible when quiz is displayed */}
                {
                    generator === next ?
                    <a href="#intro" className="start">
                        <ArrowUp size={30}
                        color="white"
                        aria-hidden="true"
                        />
                        Go back to top
                    </a>
                    : ""
                }
                
            </div>{/* END WRAPPER */}
        </section>{/* END FORM SECTION */}
        
        {/* END SECTION */}
        <section className=
                {
                    `${generator!== next || leaving === true ? "noContent" : "leaveField"}`
                }>
      
            {/* leaveField container for when user wants to get back to initial display without questions */}
            <div className="App wrapper"
                // {
                //     `${generator!== next || leaving === true ? "noContent showImg wrapper" : "leaveField"}`
                // }
                >
                <p>Feeling tired or just wanna leave the party early?</p>
                <ArrowDown size={70}
                // conditional rendering of className in order to change the colour of the arrow according to given button state (either start or new question)
                color="black"
                aria-hidden = "true"
                />
                {/* <p aria-hidden="true">⬇</p> */}
                <span className="sr-only">Click the button down below</span>
                <button 
                    className="end"
                    // pass in the function definition of leaveHandler, in which it calls the leaveClickHandler function from the App.js component with props, which also includes the initialIntro value set to intro (initial state). Thanks to the ternary operators that check whether the generator state value is start or next, string values and classNames get added or changed accordingly (and then styled fittingly) => if form's className=noContent, that invokes display:none of the whole quiz, which is what I want for when the user either hasn't hit the start button yet or when the user wants to quit the game and return to the initial start display
                    onClick={leaveHandler}
                    aria-label="Click this button to exit the trivia and return to start"
                >Leave Trivia Party</button> 
                <p>Sad to see you go 😥  But also, you deserve the break 😊</p>
                <p>Hope you feel like rejoining the party soon 😘</p>
                
            </div>{/* END LEAVE CONTAINER */}
            {/* BACKGROUND IMG CONTAINER */}
            <div className="partingImg">
            </div>{/* END BACKGROUND IMG CONTAINER */}
        </section>{/* END FINAL SECTION */}
        
        
        
    </Fragment> 
    )

}

export default DisplayForm;