import React, {useState, useEffect} from 'react'
import {Line, Bar} from 'react-chartjs-2'

import {fetchDailyData} from '../../api'
import styles from './Chart.module.css'

const Charts = ({data:{confirmed, recovered, deaths}, country}) => {
    const [dailyData, setDailyData] = useState([]);

    useEffect(()=>{
        const fetchChartAPI = async()=>{
            setDailyData(await fetchDailyData());
        }

        fetchChartAPI();
    }, []);

    const lineChart = (
        dailyData.length !== 0 ? 
        (<Line data = {
            {labels:dailyData.map(({date})=>date),
            datasets:[{
                label: 'Infected',
                data:dailyData.map(({confirmed}) => confirmed),
                borderColor: '#3333ff',
                fill: true,
            }, {
                label: 'Deaths',
                data:dailyData.map(({deaths}) => deaths),
                borderColor: '#FF0000',
                fill: false,
            }]}
        }/>) 
        : null
    );

    const barChart = (
        confirmed ?
        (<Bar data={
            {
                labels:['Infected','Recovered','Deaths'],
                datasets:[{
                    label: 'People',
                    data:[confirmed.value, recovered.value, deaths.value],
                    backgroundColor: ['rgba(0, 0, 225, 0.5)','rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)',],
                }]
            }
            }
            options={
                {
                    legend:{display:false},
                    title:{display: true, text:`Current state in ${country}`}
                }
            }/>)
        : null
    )
    
    return(
        <div className={styles.container}>
            {country ? barChart: lineChart}
        </div>
    )
}

export default Charts;