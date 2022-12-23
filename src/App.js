import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import { useState } from 'react';


function App() {

const [searchResults, setSearchResults] = useState(JSON)

const [searchValue, setSearchValue] = useState('')

const handleSubmit = (e) => {
  e.preventDefault();
  console.log(searchValue)

  const options = {
    method: 'GET',
    url: process.env.REACT_APP_RAPID_URL,
    params: {
      domain: `${searchValue}`,
      'mashape-key': process.env.REACT_APP_RAPID_API_KEY
    },
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
      'X-RapidAPI-Host': process.env.REACT_APP_RAPID_HOST
    }
  };

  axios.request(options).then(function (response) {
    console.log('api request made');
    setSearchResults(response.data)
  }).catch(function (error) {
    console.log('api had an error');
    console.error(error);
  });
}

  const entries = Object.entries(searchResults)

  return (
    <div className="App">
      <header className="App-header">
       <h1>Domain Search</h1> 
       <form>
        <input className='searchBox' type="text" onChange={(e) => setSearchValue(e.target.value)} placeholder='Search domains' />
        <button type='submit' onClick={handleSubmit}>Search</button>
       </form>
       <div>
        {entries.map((entry) => {
          const {domain, status} = entry[1][0]
          return(<div key={domain}>{domain} {status}</div>)
        })}
       </div>
      </header>
    </div>
  );
}

export default App;
