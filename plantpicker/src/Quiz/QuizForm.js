import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import "./QuizForm.css";

function QuizForm({getData}) {
    
    const [step, setStep] = useState(0)

    const initalAnswers = {
        lighting: '6',
        watering: undefined,
        has_kids: undefined,
        has_pets: undefined,
        does_flower: undefined
    }

    const [quizAnswers, setQuizAnswers] = useState(initalAnswers);
    //stores the checked answers to the question that asks where you would like the plant placedconsole.log(quizAnswers)

    // proceed to next step
    const nextStep = () => {
        let nextStep = step + 1
        setStep(nextStep)
    }
    // proceed to prev step
    const prevStep = () => {
        let prevStep = step - 1;
        setStep(prevStep)
    }

    //handle field changes in form
    const handleChange = (e) => {
        const { name, value } = e.target;

        console.log(e.target.value)
        setQuizAnswers((quizAnswers) => ({
            ...quizAnswers,
            [name] : value
        }))
    }

    const [pos, setPos] = useState('');
    //check which boxes were checked from question 1 and saved the answers   
    function checked(e) {
        const { value } = e.target;

        if (e.target.checked) {

            if (!pos.includes(e.target.value)) {
                setPos((pos) => ([...pos, value]))
                console.log(pos)
            } 
        } else {
            if (pos.includes(e.target.value)) {
                setPos(pos => pos.filter(el => el !== value))
                console.log(pos)
            } 
        }
    }
  
    const history = useHistory();
    function handleSubmit(e) {
        e.preventDefault();

        getData(quizAnswers, pos)
        history.push('/results')

    }

    return (
        <>
            <div className="Quiz-header">
                <p >Answer the questions to the best of your ability to generate results that align most with your preferences.</p>
                                
            </div>

            <form className="Quiz-Form" onSubmit={(e)=> handleSubmit(e) }>
                {step === 0 && <section>
                    <label className="Form-question">Where do you plan on placing your plant?</label>
                    <div>
                        <input
                            type="checkbox"
                            name="pos"
                            value="F"
                            onChange={(e) => checked(e) } 
                        ></input>
                        <label  htmlFor="F">Floor</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            name="pos"
                            value="H"
                            onChange={(e) => checked(e) } 
                        ></input>
                        <label htmlFor="H">Hanging plant!</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            name="pos"
                            value="T"
                            onChange={(e) => checked(e) } 
                        ></input>
                        <label htmlFor="T">Table or a desk</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            name="pos"
                            value="W"
                            onChange={(e) => checked(e) } 
                        ></input>
                        <label htmlFor="W">Window</label>
                    </div>
                </section>}

                
                {step === 1 && <section>
                    <label className="Form-question">How is the lighting in the location you plant on placing your new plant?</label>


                    <div>
                        <label htmlFor="lighting">Dim</label>

                        <input onChange={(e) => handleChange(e)}
                            defaultValue="6"
                            type="range"
                            id="lighting"
                            name="lighting"
                            min="1"
                            max="6"
                            list="lighting">
                        </input>
                        
                        <label htmlFor="lighting">Bright</label>
                    </div>

                </section>}

                {step === 2 && <section>
                    <label className="Form-question">Are there kids around?</label>
                        <div>
                        <input type="radio"
                            id="kids"
                            value="1"
                            name="has_kids"
                            onClick={(e) => handleChange(e)}>
                            
                            </input>
                            <label htmlFor="kids">Yes!</label>
                        </div>
                        <div>
                        <input type="radio"
                            id="kids"
                            value="0"
                            name="has_kids"
                            onClick={(e) => handleChange(e)}>
                            </input>
                            <label htmlFor="kids">Nope</label>
                        </div>
                        <div>
                        <input type="radio"
                            id="kids"
                            value="unsure"
                            name="has_kids"
                            onClick={(e) => handleChange(e)}>
                            </input>
                            <label htmlFor="kids">Not sure</label>
                        </div>
                </section>}

                {step === 3 && <section>
                    <label className="Form-question">Are there pets around?</label>
                        <div>
                        <input type="radio"
                            id="pets"
                            value="1"
                            name="has_pets"
                            onClick={(e) => handleChange(e)}>
                            </input>
                            <label htmlFor="pets">Yes!</label>
                        </div>
                        <div>
                        <input type="radio"
                            id="pets"
                            value="0"
                            name="has_pets"
                            onClick={(e) => handleChange(e)}>
                            </input>
                            <label htmlFor="pets">Nope</label>
                        </div>
                        <div>
                        <input type="radio"
                            id="pets"
                            value="unsure"
                            name="has_pets"
                            onClick={(e) => handleChange(e)}>
                            </input>
                            <label htmlFor="pets">Not sure</label>
                        </div>
                </section>}
 
                {step === 4 && <section>
                    <label className="Form-question">Do you want a flowering plant?</label>
                        <div>
                        <input type="radio"
                            id="flowering"
                            value="1"
                            name="does_flower"
                            onClick={(e) => handleChange(e)}>
                            </input>
                            <label htmlFor="flowering">Yes!</label>
                        </div>
                        <div>
                        <input type="radio"
                            id="flowering"
                            value="0"
                            name="does_flower"
                            onClick={(e) => handleChange(e)}>
                            </input>
                            <label htmlFor="flowering">Noo</label>
                        </div>
                        <div>
                            <input type="radio"
                                id="flowering"
                                value="unsure"
                                name="does_flower"
                                onClick={(e) => handleChange(e)}>
                            </input>
                            <label htmlFor="flowering">Doesn't matter</label>
                        </div>
                </section>}


                {step === 5 && <section>
                    <label className="Form-question">How are you with watering?</label>
                        <div>
                            <input type="radio"
                                id="watering"
                                value='unsure'
                                name="watering"
                                onClick={(e) => handleChange(e)}>
                            </input>
                            <label htmlFor="watering">Not sure</label>
                        </div>
                        <div>
                            <input type="radio"
                                id="watering"
                                value="low"
                                name="watering"
                                onClick={(e) => handleChange(e)}>
                            </input>
                            <label htmlFor="watering">I'm dedicated to keeping them alive!</label>
                        </div>
                        <div>
                            <input type="radio"
                                id="watering"
                                value="medium"
                                name="watering"
                                onClick={(e) => handleChange(e)}>
                            </input>
                            <label htmlFor="watering">I forget now and then</label>
                        </div>
                        <div>
                            <input type="radio"
                                id="watering"
                                value="high"
                                name="watering"
                                onClick={(e) => handleChange(e)}>
                            </input>
                            <label htmlFor="watering">I am pretty forgetful</label>
                        </div>                
                </section>}

                {/* {step > 0 &&  <button type="button" onClick={ prevStep }>Previous</button>} */}
                {step < 6 ? <button type="button" onClick={nextStep}>Next</button> :
                    <button>Submit Form</button>
                }

            </form>
        </>
    )
}

export default QuizForm;