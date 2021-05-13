import React, {useState, useEffect} from 'react';
import {fetchCountries} from '../../api'
import {NativeSelect, FormControl} from '@material-ui/core';

import styles from './CountryPicker.module.css'

const CountryPicker = ({handleCountryChange}) => {
    const [countryFetch, setCountryFetch] = useState([]);

    useEffect(()=>{
        const fetchCountryAPI = async() =>{
            setCountryFetch(await fetchCountries());
        }

        fetchCountryAPI();
    }, [countryFetch]);

    return(
        <FormControl className={styles.form}>
            <NativeSelect defaultValue="" onChange={(e)=>handleCountryChange(e.target.value)}>
                <option value=""> Global </option>
                {countryFetch.map(
                    (country, i)=> <option key={i} value={country}>{country}</option>
                )}
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker;