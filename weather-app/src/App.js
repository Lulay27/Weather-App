import MainPage from './components/MainPage';

import './styles/global.css';

function App() {
  return (
    <div>
      <MainPage />
    </div>
  );
}

export default App;

// notes

// weather app components

// searchbar user input with magnifyglass button can use enter to submit form

// background main for now just a random dark color

// weather data displayed under searchbar

// users login in... can favorite city searches
// store favorites...
// since removing Recent Searches instead of displaying latest array
// display submited form input? thus instead of storing all searches
// only store Favorite searches for each user

// set up logic for when logged in...remove sign in button etc
// signing out makes sign in btn appear again
// if signed in etc..
// store each accounts favorite cities

// same problem of thinking!! do i move the signinwithGoogle
// const into main page and pass down that prob into SignIn.jsx??
