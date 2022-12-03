// this will be the form that shows the quiz content (questions, answer choices) from the Trivia API


import { useState } from "react";
import { Fragment } from "react";
import './App.css';

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
    const right = "Result: Yayyy you're right!";
    
    const wrong = `Result: Nooo, you were wrong! 
        The right answer would have been: "${props.correctAnswer}".`
     ;
    const [feedback, setFeedback] = useState("");

    const start = "Start";
    const next = "New question";
    const [generator, setGenerator] = useState(start);
   
    const [isActive, setActive] = useState(false);

    const [leaving, setLeaving] = useState(false);

    const handleChange = (e) => {

       
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
        setUserChoice(e.target.value);
        // setUserString()
        console.log(e.target.value);
        // console.log(formData);
        
    };

    // const resetRadioState = () => {
        
    // }

    const submitHandler = (e) => {
        e.preventDefault();
        // console.log(formData);
        // setFormData("");
        
            setUserChoice("");
            console.log(userChoice);
            
            // setFormData("");
            // console.log(formData);
            setActive(true);
            // conditional rendering to check if userChoice is equal to correct answer (based on value, which is equal to the string value of the API), allows me to destructure/shuffle/randomize order between incorrect and correct answer
            
            if (userChoice !== props.correctAnswer) {
                setFeedback(wrong);
            } else {
                setFeedback(right);
            } 
        
        

        
    }

    // let index = 0;

    // creating another click handler function for the different question button to remove the feedback each time when that button is clicked
    const anotherClickHandler = () => {
        // calling clickHandler function created in App.js that calls the async getQuiz() function
        props.clickHandler();
        // clearing of feedback
        setGenerator(next);
        // setting leaving back to false, so that leavingField appears again, when generator is set back to next
        setLeaving(false);
        if (feedback) {
            setFeedback("");
            setUserChoice("");
            setActive(false);
        }
    } 

    const leaveHandler = () => {
        props.leaveClickHandler();
        // setUserChoice("");
        setLeaving(true);
        // setting generator back to start, which invokes form/quiz disappearing, all I needed to make entire form disappear since it's the same value when user hits start button
        setGenerator(start);
    }


    return(
    <Fragment>
        
        <button 
        // type="button"
        onClick={anotherClickHandler}
        // conditional rendering of className based on whether button is start button or generates next question
        className={
        `${generator === start ? "start" : "next"}`
        }
        >{generator}
        </button>
         {/* FORM WITH API CONTENT for quiz  */}
        
        <form onSubmit={submitHandler} aria-label="quiz" className={`${generator === next ? "content" : "noContent"}`}
        >
       
            
            <fieldset>
                <legend>{props.question}</legend>
                <div className="inputs" onChange={handleChange}>
                {/* mapping through created array inside async getQuiz function that allAnswers (incorrect and correct)  */}
                {props.allAnswers.map((answer, index) => {
                    return(
                        <div className="answer">
                            
                           <input
                            type="radio" 
                            id={index}
                            // index="0"
                            name="quiz"
                            required 
                            // onChange={handleFirstChange}
                            value={answer}
                            key={props.id + index}
                            
                            // checked={userChoice === 'firstAnswer'} 
                            /> 
                            <label htmlFor={props.allAnswers[index]}>  
                            {answer}
                        </label>
                        </div>
                    );
                })}
                
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
                // onClick= {submitHandler}
            >Submit answer
            </button>
            {/* conditional rendering of class for feedback field, if div active after submitting, className="message", else "noMessage", also for whether feedback is for right or wrong answer */}
            <div className={`${isActive ? "message" : "noMessage"} ${feedback === right && isActive ? "right": ""} ${feedback === wrong && isActive ? "wrong": "" } `}>
                <p>{feedback}</p>
            </div>
        </form>
        <div className={
            `${generator!== next || leaving === true ? "noContent" : "leaveField"}`
        }>
            <p>Feeling tired or just wanna leave the party early?</p>
            <p aria-hidden="true">⬇</p>
            <span className="visually-hidden">Click the button down below</span>
            <button 
            className="end"
            onClick={leaveHandler}
            >
                Leave Trivia Party
            </button> 
            <p>Sad to see you go 😥  But also, you deserve it 😊</p>
            <p>Hope you feel like rejoining the party soon 🤩</p>
        </div>
        
    </Fragment> 
    )

}

export default DisplayForm;