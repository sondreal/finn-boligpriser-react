import React, { useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';

import styles from './Chart.module.css';

export const Chart = ({ data, currentDate, currentLocation }) => {
    const [numListings, setNumListings] = useState([]);
    let dates = []
    
    if(data){
        for(let [key] of Object.entries(data)){
            dates.push(key);
        }
        dates = dates.slice(-30)
        
        const arrayOfData = Object.keys(data).map(dateData => data[dateData]);
        const arrayOfNumbers = arrayOfData.map(obj => Object.keys(obj).reduce((acc, place) => acc + (obj[place][2] || 0), 0));
        if(JSON.stringify(arrayOfNumbers) !== JSON.stringify(numListings)){
            setNumListings(arrayOfNumbers);
        }
    }

    const lineChart = (
        data ? (
            <Line data={{
                labels: dates,
                datasets: [{
                    data: Object.keys(data).map((date) => data[date]["Gjennomsnittspris"]).slice(-30),
                    label: 'Pris',
                    borderColor: '#1e88e5',
                    fill: true,
                    backgroundColor: "rgba(30,136,229, 0.1)"
                  },
                  {
                    data: numListings,
                    label: 'Antall boliger',
                    borderColor: '#8e24aa',
                    fill: true,
                    backgroundColor: "rgba(142,36,170, 0.3)"  
                  },
                  {
                    data: Object.keys(data).map(date => data[date]["Ny i dag"][3]).slice(-30),
                    label: 'Nye siste døgnet',
                    borderColor: '#00897b',
                    fill: true,
                    backgroundColor: "rgba(0, 137, 123, 0.1)"  
                  }
                ],
                
            }}/>

            
        ) : null
    );

    const barChart = (
        currentDate ? (
            <Bar
                data={{
                labels: Object.keys(data[currentDate]),
                datasets: [
                    {
                    label: 'Pris',
                    backgroundColor: ['rgba(229,57,53,0.5)', 'rgba(216,27,96, 0.5)', 'rgba(142,36,170,0.5)',
                                        'rgba(103,58,183,0.5)', 'rgba(33,150,243, 0.5)', 'rgba(0,188,212, 0.5)',
                                        'rgba(0,150,136, 0.5)', 'rgba(76,175,80, 0.5)', 'rgba(139,195,74, 0.5)',
                                        'rgba(255,235,59, 0.5)', 'rgba(255,152,0, 0.5)', 'rgba(255,87,34, 0.5)', 'rgba(96,125,139, 0.5)'],
                    data: Object.keys(data[currentDate]).map(place => (data[currentDate][place][3] || data[currentDate][place])),
                    },
                ],
                }}
                options={{
                legend: { display: false },
                title: { display: true, text: `Priser per ${currentDate}` },
                }}
            />
        ) : null
    );

    const locationChart = (
        currentLocation ? (
            <Line data={{
                labels: dates,
                datasets: [{
                    data: Object.keys(data).map(date => (data[date][currentLocation][3] || data[date][currentLocation])).slice(-30),
                    label: `Prisutvikling ${currentLocation}`,
                    borderColor: '#1e88e5',
                    fill: true,
                    backgroundColor: "rgba(30,136,229, 0.1)"
                  },
                ],
                
            }}/>
        ) : null
    );

    let chart;
    if(currentLocation){
        chart = locationChart;
    } else if(currentDate){
        chart = barChart;
    } else {
        chart = lineChart;
    }

    return (
        <div className={styles.container}>
            {chart}
        </div>
    )
}
