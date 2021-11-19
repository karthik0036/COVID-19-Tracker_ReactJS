import React, { useState, useEffect } from 'react'
import { fetchDailyData } from '../../api'
import { Line, Bar } from 'react-chartjs-2'
import styles from './Charts.module.css'

export default function Charts({ data: { confirmed, recovered, deaths }, country }) {
    const [dailyData, setDailydata] = useState([])

    useEffect(() => {
        const fetchApi = async () => {
            setDailydata(await fetchDailyData())
        }

        fetchApi()
    }, [])

    const lineChart = (

        dailyData.length
            ? (<Line data={
                {
                    labels: dailyData.map(({ date }) => date),
                    datasets: [{
                        data: dailyData.map(({ confirmed }) => confirmed),
                        label: "Infected",
                        borderColor: '#3333ff',
                        fill: true,

                    }, {
                        data: dailyData.map(({ deaths }) => deaths),
                        label: "Deaths",
                        borderColor: 'red',
                        backgroundColor: "rgba(255,0,0,0.5)",
                        fill: true,

                    }]
                }} />) : null

    )
    console.log(confirmed, recovered, deaths);

    const barChart = (
        confirmed
            ? (
                <Bar
                    data={{
                        labels: ["Infected", "Recovered", "Deaths"],
                        datasets: [{
                            label: 'people',
                            backgroundColor: ["blue", "green", "red"],
                            data: [confirmed.value, recovered.value, deaths.value]
                        }]

                    }}
                    options={{
                        legend: { display: false },
                        title: { display: true, text: `Current state in ${country}` },
                    }}

                />) : null)
    return (
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>
    )
}
