import MainPage from './components/MainPage';
import SignedOut from './firebase/SignedOut';
import SignIn from './firebase/SignIn';
import './styles/global.css';

function App() {
  return (
    <div>
      <MainPage />
      <SignIn></SignIn>
      <SignedOut></SignedOut>
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
