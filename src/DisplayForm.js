// this will be the form that shows the quiz content (questions, answer choices) from the Trivia API

import { useState } from "react";

const DisplayForm = ( props ) => {

    // create a piece of state to hold the user's choice when switching in between radio inputs (in order to update the onChange of the )
    const [userChoice, setUserChoice] = useState("");

    // handleChange function, gets called whenever user changes radio button choice
    const handleFirstChange = () => {
      // set new value of checked radio button to state with setState func (async)
      setUserChoice('firstAnswer');
      console.log(userChoice);
    }
    
    const handleSecondChange = () => {
        // set new value of checked radio button to state with setState func (async)
        setUserChoice('secondAnswer');
        console.log(userChoice);
    }

    const handleThirdChange = () => {
        // set new value of checked radio button to state with setState func (async)
        setUserChoice('thirdAnswer');
        console.log(userChoice);
    }

    const handleLastChange = () => {
        // set new value of checked radio button to state with setState func (async)
        setUserChoice('lastAnswer');
        console.log(userChoice);
    }

    // const resetRadioState = () => {
    //     setUserChoice('');
    // }

    return(
        <form>
            <fieldset>
                <legend>{props.question}:</legend>
                {/* first answer choice (incorrect) */}
                <input 
                    type="radio" 
                    id="answerOne" 
                    name="quiz" 
                    onChange={handleFirstChange}
                    checked={userChoice === 'firstAnswer'}
                    // checked={userChoice === 'firstAnswer'} 
                />
                <label htmlFor="answerOne">{props.answerOne}</label>
                {/* second answer choice (incorrect) */}
                <input 
                    type="radio" 
                    id="answerTwo" 
                    name="quiz" 
                    onChange={handleSecondChange}
                    checked={userChoice === 'secondAnswer'}
                    // checked={userChoice === 'secondAnswer'} 
                />
                <label htmlFor="answerTwo">{props.answerTwo}</label>
                {/* third answer choice (incorrect) */}
                <input 
                    type="radio" 
                    id="answerThree" 
                    name="quiz" 
                    onChange={handleThirdChange}
                    checked={userChoice === "thirdAnswer"}
                    // checked={userChoice === 'thirdAnswer'}  
                />
                <label htmlFor="answerThree">{props.answerThree}</label>
                {/* fourth answer choice (correct) */}
                <input 
                    type="radio" 
                    id="answerFour" 
                    name="quiz" 
                    onChange={handleLastChange}
                    checked={userChoice === "lastAnswer"}
                    // checked={userChoice === 'lastAnswer'}  
                />
                <label htmlFor="answerFour">{props.correctAnswer}</label>
                {/* Buttons */}
                <button>Get a different question</button>
                <button 
                type="submit"
                // onClick={resetRadioState}
                >
                    Submit answer
                </button>
            </fieldset>
        </form>
    )
}

export default DisplayForm;