import React, { useState, useEffect } from 'react';

import { Cards, Chart, CountryPicker } from './components'
import styles from './App.module.css';
import { fetchData } from './api'

const App = () => {
    const [data, setData] = useState({});
    const [currentCountry, setCurrentCountry] = useState('');

    useEffect(() => {
        async function getData() {
            setData(await fetchData())
        }
        getData();
    }, []);

    const handleCountryChange = async(country) => {
        const fetchedData = await fetchData(country);
        setData(fetchedData)
        setCurrentCountry(country)
    }

    return ( <
        div className = { styles.container } >
        <
        Cards data = { data }
        />  <
        CountryPicker handleCountryChange = { handleCountryChange }
        />  <
        Chart data = { data }
        country = { currentCountry }
        />  <
        /div>
    )
}

export default App;