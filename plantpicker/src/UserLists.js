import "./UserLists.css";
import { Link } from 'react-router-dom';


function UserLists() {

    
    return (
        <div className="UserLists">
            <img alt="monsterea plant" src="https://images.unsplash.com/photo-1572969057162-d3b00f790462?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1955&q=80"></img>

            <div className="UserLists-leftDiv">
                <div className="UserLists-div" aria-label="Plant picture by @domain on Unsplash.com">
                    <h1> Plant + Pot</h1>
                    <p>New empty space you want to fill? Want to gift some greenery? Take the quiz to help you get started with the perfect plant. Create an account so you can save plants for later or make build on some list so you can create that jungle room.</p>

                <button className="UserLists-signup-btn"><Link to="/register">Signup</Link></button>                    
                <button className="UserLists-quiz-btn"><Link to="/quiz">Start Quiz</Link></button>                    
                </div>

            </div>

                     
        </div>

    )
}

export default UserLists;