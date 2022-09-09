import MainPage from './components/MainPage';
import Overview from './components/Overview';
import { SearchBar } from './components/SearchBar';
import './styles/global.css';

function App() {
  return (
    <div>
      {/* header
      main
      footer */}
      <MainPage />
      {/* <SearchBar /> */}
    </div>
  );
}

export default App;

// notes

// weather app components

// searchbar user input with magnifyglass button can use enter to submit form

// background main for now just a random dark color

// weather data displayed under searchbar

// display temp , feels like, humidity, description, country,
// can also display country from geo api
