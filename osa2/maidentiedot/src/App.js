import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'



function App() {
  const [ newName, setNewName ] = useState('')
  const [ countries, setCountries] = useState([])
  const [allCountries, setAllCountries] = useState([])

  const handleNameChange = (event) =>{
      console.log(event.target.value)
      setNewName(event.target.value)
      setCountries(allCountries.map(country => country.name.common).filter(name => name.toLowerCase().includes(event.target.value.toLowerCase())))
  }
  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setAllCountries(response.data)
      })
  }
  useEffect(hook, [])

  console.log(allCountries[0])
  return (
<div>
  find countries <input value={newName} onChange={handleNameChange}/>
<Countries listOfCountries={countries} allCountries={allCountries} setCountries={setCountries}/>
  
</div>
  );
}

export default App;
