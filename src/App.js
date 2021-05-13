import React from 'react';

import { Cards, Chart, CountryPicker } from './components'
import styles from './App.module.css';
import {fetchData} from './api'

class App extends React.Component {
    state = {
        data:{},
        currentCountry:'',
    }

    async componentDidMount(){
        const fetchedData = await fetchData();
        this.setState({data: fetchedData});
    }

    handleCountryChange = async (country) =>{
        const fetchedData = await fetchData(country); // fetch data
        this.setState({data: fetchedData, currentCountry: country}); //set state
        console.log(this.state.currentCountry);
    }

    render() {
        const {data, currentCountry} = this.state;

        return (
        <div className ={styles.container}>
            <Cards data = {data} />
            <CountryPicker handleCountryChange={this.handleCountryChange}/>
            <Chart data={data} country={currentCountry} />
        </div>
        )
    }
}

export default App;