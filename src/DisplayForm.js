// this will be the form that shows the quiz content (questions, answer choices) from the Trivia API

import { useState } from "react";
import { Fragment } from "react";


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

    const [feedback, setFeedback] = useState("");

    const [generator, setGenerator] = useState("Start");

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

        // conditional rendering to check if userChoice is equal to correct answer (based on value, which is equal to the string value of the API), allows me to destructure/shuffle/randomize order between incorrect and correct answer
        if (userChoice !== props.correctAnswer) {
            setFeedback("Result: Nooo, you were wrong!");
        } else {
            setFeedback("Result: Yayyy you're right!");
        }
    }

    // let index = 0;

    // creating another click handler function for the different question button to remove the feedback each time when that button is clicked
    const anotherClickHandler = () => {
        // calling clickHandler function created in App.js that calls the async getQuiz() function
        props.clickHandler();
        // clearing of feedback
        setGenerator("New question");
        if (feedback) {
            setFeedback("");
        }
    } 

    return(
    <Fragment>
       <button 
        // type="button"
        onClick={anotherClickHandler}
        >{generator}
        </button>
         {/* FORM WITH API CONTENT for quiz  */}
        <form onSubmit={submitHandler}>
            <fieldset>
                <legend>{props.question}:</legend>
                <div className="inputs" onChange={handleChange}>
                {/* all answer choice (incorrect and correct)  */}
                {props.allAnswers.map((answer, index) => {
                    return(
                        <div className="answers">
                            
                           <input 
                            type="radio" 
                            id={answer}
                            // index="0"
                            name="quiz"
                            required 
                            // onChange={handleFirstChange}
                            value={answer}
                            key={index}
                            // onClick={() => setFormData({radioChecked: true})}
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
        <div>
            {feedback}
        </div>
        </form>
    </Fragment> 
    )

}

export default DisplayForm;