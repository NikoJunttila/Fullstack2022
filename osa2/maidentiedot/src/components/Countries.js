const CountryInfo = ({country, allCountries}) =>{
    const info = allCountries.filter(x => x.name.common.toLowerCase() === country.toLowerCase())[0]

    return(
        <div>
            <h1>{info.name.common}</h1>
            capital: {info.capital}<br/>
            population: {info.population}<br/>
            Area: {info.area}
            
            <h2>Languages:</h2>
            {JSON.stringify(info.languages)}
            <br></br>
            <img 
                src={info.flags.svg}
                alt ="flag" 
                height="90px"
                width="150px" />
        </div>
    )
}


const Countries = ({listOfCountries, allCountries, setCountries}) =>{

    const size = listOfCountries.length

    if(size === 1){
        return(<CountryInfo country={listOfCountries[0]} allCountries={allCountries}/>)
    }else if(size >= 10){
        return(<div>Too many matches, specify another filter</div>)
    }else{ 
        return(listOfCountries.map(country => <div key={country}>{country}<button onClick={() => setCountries([].concat(country))}>show</button></div>))
    }
  
}

export default Countries