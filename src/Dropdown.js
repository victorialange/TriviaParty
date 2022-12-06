import { useState } from "react";
import { Fragment } from "react";
import './App.css';
import ArrowDown from "./ArrowDown";



const Dropdown = ( props ) => {

    const [userSelect, setUserSelect] = useState("");
    const [otherUserSelect, setOtherUserSelect] = useState("");

    const handleUserSelectOne = (e) => {
        setUserSelect(e.target.value);
        console.log(e.target.value);
        console.log(userSelect);
    }

    const handleUserSelectTwo = (e) => {
        setOtherUserSelect(e.target.value);
        console.log(e.target.value);
        console.log(otherUserSelect);
    }

    const dropDownSubmitHandler = (e) => {
        props.firstSubmitHandler(e, userSelect);
    }



    return(
        <Fragment>
        {/* WRAPPER */}
        <div className="App wrapper">
          
            
            <div className={`${props.initialIntro !== props.next ?"content dropContainer" : "noContent"}`}>
              <form onSubmit={dropDownSubmitHandler}>
                <label htmlFor="category">Play this category:</label>
                <select name="category" id="category" onChange={handleUserSelectOne} value={userSelect} required>
                    <option value="" disabled>Pick one:</option>
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

                {/* <label htmlFor="level">Play at this level:</label>
                <select name="level" id="level" onChange={handleUserSelectTwo} value={otherUserSelect}>
                    <option value="" disabled>Pick one:</option>
                    <option value="easy">easy</option>
                    <option value="medium">medium</option>
                    <option value="hard">hard</option>
                </select> */}
                
                {/* svg arrow up */}
                <ArrowDown size={70}
                    // conditional rendering of className in order to change the colour of the arrow according to given button state (either start or new question)
                    color={`${props.initialIntro === props.next ? "#2A28BA" : "#A741AC"} `}
                    aria-label = "click on the button below to get a new question"
                />

                <button 
                // type="button"
                // change

                // passing in the function definition of anotherClickHandler that calls the clickHandler from App.js for us (which includes making the API call everytime the user clicks that button)
                onSubmit={dropDownSubmitHandler}

                // pass in the firstLabel stateful variable as the value of aria-label to alternate between labels based on whether it's the start or the new question button
                // aria-label={firstLabel}

                // conditional rendering of className based on whether button is start button or generates new question
                className="start"
                >Start
                </button>
            </form>
          </div>{/* end form container div */}
    
          
          {/* <p aria-hidden="true"
          // conditional rendering of className in order to change the colour of the arrow according to given button state (either start or new question)
          className={`${initialIntro === next ? "nextArrow" : "startArrow"} `}
          >⬇</p> */}
          <span className="sr-only">Click the button down below</span>
        </div>{/* END WRAPPER */}

      
      {/* DISPLAY FORM COMPONENT
      <DisplayForm
            // handleSubmit={}
        next={props.next}
        intro={props.intro}
        initialIntro={props.initialIntro}
        clickHandler={props.clickHandler}
        question={props.question}
        allAnswers={props.allAnswers}
        // // incorrectAnswers={incorrectAnswers}
        correctAnswer={props.correctAnswer}
        currentQuestionId={props.currentQuestionId}
        leaveClickHandler={props.leaveClickHandler}
        category={props.category}
        level={props.level}
        answerTwo={props.answerTwo}
        answerThree={props.answerThree}
        // correctAnswer={correctAnswer}
      /> */}



        </Fragment>
    )
}

export default Dropdown;