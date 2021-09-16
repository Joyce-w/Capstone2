import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form'

function QuizForm() {
    
    const [step, setStep] = useState(0)

    const initalAnswers = {
        lighting: '',
        watering: '',
        has_kids: '',
        has_pets: '',
        does_flower: '',
        pos:''
    }

    const [quizAnswers, setQuizAnswers] = useState(initalAnswers);

    // proceed to next step
    const nextStep = () => {
        let nextStep = step + 1

        // if (nextStep > 5) {
        //     alert("Go to results page")
        // }

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

    const { register, watch, handleSubmit, setValue } = useForm();
    console.log(watch())

    function checked(e) {
        console.log(e.target.value)
    }
    return (
        <>
            <form onSubmit={ handleSubmit((data) => console.log(data))}>
                {step === 0 && <section>
                    <label>Where do you plan on placing your plant?</label>
                    <div>
                        <input
                            type="checkbox"
                            name="pos"
                            value="F"
                            onChange={(e) => checked(e) } 
                        ></input>
                        <label  for="F">Floor</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            name="pos"
                            value="H"
                            onChange={(e) => checked(e) } 
                        ></input>
                        <label for="H">Hanging plant!</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            name="pos"
                            value="T"
                            onChange={(e) => checked(e) } 
                        ></input>
                        <label for="T">Table or a desk</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            name="pos"
                            value="W"
                            onChange={(e) => checked(e) } 
                        ></input>
                        <label for="W">Window</label>
                    </div>
                </section>}

                
                {step === 1 && <section>
                    <label>How much lighting will that it get?</label>
                    <div>
                        <input type="checkbox" id="low" name="low"></input>
                        <label for="low">low/dim</label>
                    </div>
                    <div>
                        <input type="checkbox" id="medium" name="medium"></input>
                        <label for="medium">Lighting but not blinding</label>
                    </div>
                    <div>
                        <input type="checkbox" id="bright" name="high"></input>
                        <label for="high">Bright and gets pretty warm</label>
                    </div>
                    <div>
                        <input type="checkbox" id="bright" name="unsure"></input>
                        <label for="unsure">Not sure</label>
                    </div>
                </section>}

                {step === 2 && <section>
                    <label>Are there kids around?</label>
                        <div>
                        <input type="radio"
                            id="kids" {...register("has_kids")}
                            onClick={() => setValue("has_kids", true)}>
                            
                            </input>
                            <label for="kids">Yes!</label>
                        </div>
                        <div>
                        <input type="radio"
                            id="kids" {...register("has_kids")}
                            onClick={() => setValue("has_kids", true)}>
                            </input>
                            <label for="kids">Nope</label>
                    </div>
                </section>}

                {step === 3 && <section>
                    <label>Are there pets around?</label>
                        <div>
                        <input type="radio"
                            id="pets" {...register("has_pets")} >
                            
                            </input>
                            <label for="pets">Yes!</label>
                        </div>
                        <div>
                        <input type="radio"
                            id="pets" {...register("has_pets")} >
                            
                            </input>
                            <label for="pets">Nope</label>
                        </div>
                </section>}
 
                {step === 4 && <section>
                    <label>Do you want a flowering plant?</label>
                        <div>
                        <input type="radio"
                            id="flowering" {...register("flowering")} >
                            </input>
                            <label for="flowering">Yes!</label>
                        </div>
                        <div>
                        <input type="radio"
                            id="flowering" {...register("flowering")} >
                            </input>
                            <label for="flowering">Noo</label>
                        </div>
                        <div>
                        <input type="radio"
                            id="flowering" {...register("flowering")} >
                            </input>
                            <label for="flowering">Doesn't matter</label>
                    </div>
                </section>}


                {step === 5 && <section>
                    <label>How are you with watering?</label>
                        <div>
                            <input type="radio" 
                            id="watering" 
                            {...register("watering")} >
                            </input>
                            <label for="watering">Not sure, I'm a beginner</label>
                        </div>
                        <div>
                            <input type="radio" 
                            id="watering" 
                            {...register("watering")} >
                            </input>
                            <label for="watering">I'm dedicated to keeping them alive!</label>
                        </div>
                        <div>
                            <input type="radio" 
                            id="watering" 
                            {...register("watering")} >
                            </input>
                            <label for="watering">I forget now and then</label>
                        </div>
                        <div>
                            <input type="radio" 
                            id="watering" 
                            {...register("watering")} >
                            </input>
                            <label for="watering">I am pretty forgetful</label>
                        </div>                
                </section>}

                {step > 0 &&  <button type="button" onClick={ prevStep }>Previous</button>}
                {step < 6 ? <button type="button" onClick={nextStep}>Next</button> :
                <button>Submit Form</button>
                }

            </form>
        </>
    )
}

export default QuizForm;