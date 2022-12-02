// this will be the form that shows the quiz content (questions, answer choices) from the Trivia API

const DisplayForm = ( props ) => {
    return(
        <form>
            <fieldset>
                <legend>{props.question}:</legend>
                {/* first answer choice (incorrect) */}
                <input type="checkbox" id="answerOne"/>
                <label htmlFor="answerOne">{props.answerOne}</label>
                {/* second answer choice (incorrect) */}
                
                <input type="checkbox" id="answerTwo" />
                <label htmlFor="answerTwo">{props.answerTwo}</label>
                <input type="checkbox" id="answerThree" />
                <label htmlFor="answerThree">{props.answerThree}</label>
                <input type="checkbox" id="answerFour" />
                <label htmlFor="answerFour">{props.correctAnswer}</label>
                <button>Get a different question</button>
                <button type="submit">Submit answer</button>
            </fieldset>
        </form>
    )
}

export default DisplayForm;