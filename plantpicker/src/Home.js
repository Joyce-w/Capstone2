import "./Home.css";
import { Link } from 'react-router-dom';


function Home() {

    
    return (
        <div className="Home">
            <img alt="monsterea plant" src="https://images.unsplash.com/photo-1572969057162-d3b00f790462?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1955&q=80"></img>

            <div className="Home-leftDiv">
                <div className="Home-div" aria-label="Plant picture by @domain on Unsplash.com">
                    <h1> Plant + Pot</h1>
                    <p>New empty space you want to fill?</p>
                    <p>Want to gift some greenery but not sure what? </p>
                    <p>Take the quiz to help you get matched with the perfect plant. Create an account to save plants for later or make some lists so you can create that jungle room you always wanted.</p>

                    <br></br>
                    <br></br>
                <Link to="/register"><button className="Home-signup-btn">Signup</button></Link>                    
                <Link to="/quiz"><button className="Home-quiz-btn">Start Quiz</button>  </Link>                  
                </div>

            </div>

                     
        </div>

    )
}

export default Home;