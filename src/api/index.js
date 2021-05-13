import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async(country) => {
    let dynamicUrl = country ? `${url}/countries/${country}` : url;

    try {
        const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(dynamicUrl);
        return { confirmed, recovered, deaths, lastUpdate };

    } catch (err) {
        alert("Cannot load Data");
        console.log(err)
    }
}

export const fetchDailyData = async() => {
    try {
        const { data } = await axios.get(`${url}/daily`);
        const needData = data.map((dataItem) => ({
            confirmed: dataItem.confirmed.total,
            deaths: dataItem.deaths.total,
            date: dataItem.reportDate,
        }));
        return needData;

    } catch (err) {
        alert("Cannot load Data");
        console.log(err)
    }
}

export const fetchCountries = async() => {
    try {
        const { data: { countries } } = await axios.get(`${url}/countries`);
        return countries.map((country) => country.name)

    } catch (error) {
        alert("Cannot load Country Data");
        console.log(error);
    }
}