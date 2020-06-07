import React, { useState, useEffect } from 'react';
import { Chip } from '@material-ui/core';


import styles from './Chips.module.css';
import { fetchPropertyData } from '../../api';

export const Chips = ({ handleLocationChange, currentLocation }) => {
    const [locations, setLocations] = useState("");

    useEffect(() => {
        const fetchAPI = async () => {
            try {
                const { data } = await fetchPropertyData();
                const today = Object.keys(data).slice(-1);
                const locs = Object.keys(data[today])
                .filter((loc) => loc !== "Gjennomsnittspris")
                .map((loc, i) => {
                    return {
                        key: i, 
                        label: loc, 
                        active: false
                    }
                });
                
                setLocations(locs);
            } catch (err) {
                console.log(err);
            }
        }

        fetchAPI();
    }, [])

    const handleClick = (location) => {
        handleLocationChange(location);
    }

    const locs = (
        locations ? (
            <ul>
                {locations.map((loc) => {     
                    const inputProps = {
                        label: loc.label,
                        onClick: (l) => handleClick(loc.label)
                    }
                    if(loc.label === currentLocation){
                        inputProps.color="primary"
                    }           
                    return (
                        <li key={loc.key}>
                            <Chip
                                {...inputProps}
                            />
                        </li>
                    );
                })}
            </ul>
        ) : null
    )    

    return (
        <div className={styles.locations}>
            {locs}
        </div>
    )
}
