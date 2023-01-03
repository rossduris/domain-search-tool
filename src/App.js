import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import { useEffect, useRef, useState } from 'react';


function App() {

const [searchResults, setSearchResults] = useState(JSON)
const [searchValue, setSearchValue] = useState('')
const autoListRef = useRef(undefined)
let searchSuggestion = autoListRef.current

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

  const domainList =  [
    "google.com",
    "abc.com",
    "google.uk",
    "google.us",
    'speedtrain.coffee',
    'guavasoup.com',
    'riftphase.ai',
    'fusionmonkey.co',
    'perfectsetup.trade',
    'prailinetown.com',
    'perfectstuff.org',
    'hariyplanet.com'
  ]

  const [whoisData, setWhoisData] = useState(JSON)
  const [autoCompleteWords, setAutoCompleteWords] = useState(JSON)



  useEffect(() => {    
    if(searchValue.length > 0){
      getDatamuseWords()
      if(searchSuggestion){
        searchSuggestion.style.display = "block"
      }
      
    }
    if(searchValue.length < 1){
      if(searchSuggestion){
        searchSuggestion.style.display = "none"
      }
     
    }
    
  }, [searchValue])


  const getDatamuseWords = async () => {    
    const options = {
      method: 'GET',
    };
  
    try{
      const response = await fetch(`https://api.datamuse.com/words?sp=${searchValue}??`, options)
      const data = await response.json()
      setAutoCompleteWords(data)
    } catch (err) {
      console.log("There was an error" + err)
    }
  }
  
  const handleBlur = () => {
    
    searchSuggestion.style.display = "none"
    
  }
 
  const handleFocus = () => {
    if(searchValue.length > 1){
      searchSuggestion.style.display = "block"
    }
    
    console.log('hide list')
  }

  


  // getDatamuseWords()

  const wordList = Object.entries(autoCompleteWords)
  const entries = Object.entries(searchResults)


  return (
    <div className="App">
      

       <div className='mainWrapper'>
       <h1>Domain Search</h1> 
        <form className='searchForm'>
          <input className='searchBox' type="text" onFocus={handleFocus} onBlur={handleBlur} 
            onChange={(e) => {
            setSearchValue(e.target.value)}
            } 
            placeholder='Search domains' />
          <button type='submit' onClick={handleSubmit}>Search</button>
        </form>
        <div className='autolist' ref={autoListRef}>
          {wordList.map((w) => {      
            return(<li>{JSON.stringify(w[1].word)}</li>)
          })}
        </div>      
        <div className='results'>
          {entries.map((entry) => {
            const {domain, status} = entry[1][0]          
            return(<div key={domain}>{domain} {status.includes('undelegated')?<span style={{color:'green'}}>Available</span>:<span style={{color:'red'}}>Not Available</span>}</div>)
          })}
        </div>
       </div>
      
    </div>
  );
}

export default App;
