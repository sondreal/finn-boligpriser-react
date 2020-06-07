import React, { useState, useEffect } from 'react'
import { FormControl, NativeSelect } from '@material-ui/core';

import styles from './DatePicker.module.css';
import { fetchPropertyData } from '../../api';

export const DatePicker = ({ handleDateChange }) => {
    const [dates, setDates] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            try {
                const { data } = await fetchPropertyData();
                let dates = []
                for (let [key] of Object.entries(data)) {
                    dates.push(key);
                }
                
                setDates(dates.slice(-30).reverse());
            } catch (err) {
                console.log(err);
            }
        }

        fetchAPI();
    }, [])

    const handleChange = (date) => {
        handleDateChange(date);
    }

    return (
        <FormControl className={styles.form}>
            <NativeSelect
                className={styles.selector}
                defaultValue=""
                onChange={(e) => handleChange(e.target.value)}
                variant="filled"
            >
            <option value="">Utvikling siste 30 dager...</option>
            {dates.map((date, i) => <option key={i} value={date}>{date}</option>)}
            </NativeSelect>
        </FormControl>
    )
}
