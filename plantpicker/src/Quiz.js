import React, { useState } from 'react';

function Quiz() {
	const questions = [
		{
			questionText: 'Where do you plan on placing your plant?',
			answerOptions: [
				{ answerText: 'Floor', isCorrect: false },
				{ answerText: 'Table', isCorrect: false },
				{ answerText: 'I want a hanging plant', isCorrect: true }
			],
		},
		{
			questionText: 'How is the lighting in the room?',
			answerOptions: [
				{ answerText: 'Low', isCorrect: false },
				{ answerText: 'Medium', isCorrect: true },
				{ answerText: 'Bright', isCorrect: false }
			],
		},
		{
			questionText: 'Are there kids around?',
			answerOptions: [
				{ answerText: 'Yes', isCorrect: true },
				{ answerText: 'No', isCorrect: false }
			],
		},
		{
			questionText: 'Are there pets around?',
			answerOptions: [
				{ answerText: 'Yes', isCorrect: true },
				{ answerText: 'No', isCorrect: false }
			],
		},
		{
			questionText: 'Do you want a a flowering plant? ',
			answerOptions: [
				{ answerText: 'Yes', isCorrect: false },
				{ answerText: 'No', isCorrect: true },
				{ answerText: "Doesn't matter", isCorrect: false }
			],
		},
		{
			questionText: 'How are you with watering?',
			answerOptions: [
				{ answerText: "Not sure, I'm a beginner", isCorrect: false },
				{ answerText: "I'm dedicated to keeping them alive", isCorrect: true },
				{ answerText: "I'm pretty forgetful", isCorrect: false }
			],
		}
	];

    const [currentQuestion, setCurrentQuestion] = useState(0);

	return (
		<div className='app'>
			{/* HINT: replace "false" with logic to display the 
      score when the user has answered all the questions */}
			{false ? (
				<div className='score-section'>You scored 1 out of {questions.length}</div>
			) : (
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span>Question 1</span>/{questions.length}
						</div>
						<div className='question-text'>{questions[0].questionText}</div>
					</div>
					<div className='answer-section'>
                        {questions[0].answerOptions.map((answerOption, index) => (
                            <button>{answerOption.answerText}</button>
                        ))}
					</div>
				</>
			)}
		</div>
	);
}

export default Quiz;