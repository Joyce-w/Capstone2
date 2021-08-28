import "./Home.css";

function Home() {
    return (
        <div className="Home">
            <img alt="monsterea plant" src="https://images.unsplash.com/photo-1572969057162-d3b00f790462?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1955&q=80"></img>

            <div className="Home-leftDiv">
                <div className="Home-div" aria-label="Plant picture by @domain on Unsplash.com">
                    <h1> Plant + Pot</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                <button className="Home-signup-btn">Signup</button>                    
                </div>

            </div>

                     
        </div>

    )
}

export default Home;