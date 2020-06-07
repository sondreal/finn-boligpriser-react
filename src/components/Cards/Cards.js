import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography } from '@material-ui/core';
import cx from 'classnames';
import CountUp from 'react-countup';

import styles from './Cards.module.css';

export const Cards = ({ data, currentDate }) => {
    const [numListings, setNumListings] = useState(0);
    const [avgPrice, setAvgPrice] = useState(0);
    const [avgSqm, setAvgSqm] = useState(0);

    const current = currentDate || Object.keys(data).slice(-1)[0];

    if(Object.keys(data).length > 0) {
        const today = data[current];
        const number = Object.keys(today).reduce((acc, place) => acc + (today[place][2] || 0), 0);
        if(number !== numListings) {
            setNumListings(number);
        }
        
        const averagePrice = today["Gjennomsnittspris"];
        if(averagePrice !== avgPrice){
            setAvgPrice(averagePrice);
        }

        const totalSqm = Object.keys(today).reduce((acc, place) => acc + (today[place][1] || 0), 0);
        const avg = totalSqm / number;
        if(avg !== avgSqm) {
            setAvgSqm(avg);
        }

    }

    return (
        <div className={styles.container}>
            <Grid container spacing={3} justify="center" className={styles.gridwidth}>
                <Grid item xs={12} md={3} component={Card} className={cx(styles.card, styles.number)}>
                    <CardContent>
                        <Typography color="textPrimary" gutterBottom>
                            Pris
                        </Typography>
                        <Typography variant="h4" component="h3">
                            <CountUp start={0} end={avgPrice} duration={2.75} separator="," />
                        </Typography>
                        <Typography color="textSecondary">
                            {current}
                        </Typography>
                        <Typography variant="body2" component="p">
                            Gjennomsnittlig pris per kvadratmeter.
                        </Typography>
                    </CardContent>
                </Grid>
                <Grid item xs={12} md={3} component={Card} className={cx(styles.card, styles.price)}>
                    <CardContent>
                        <Typography color="textPrimary" gutterBottom>
                            Størrelse
                        </Typography>
                        <Typography variant="h4" component="h6">
                            <CountUp start={0} end={avgSqm} duration={2.75} separator="," />
                        </Typography>
                        <Typography color="textSecondary">
                            {current}
                        </Typography>
                        <Typography variant="body2" component="p">
                            Gjennomsnittlig størrelse på boliger.
                        </Typography>
                    </CardContent>
                </Grid>
                <Grid item xs={12} md={3} component={Card} className={cx(styles.card, styles.average)}>
                    <CardContent>
                        <Typography color="textPrimary" gutterBottom>
                            Antall annonser
                        </Typography>
                        <Typography variant="h4" component="h3">
                            <CountUp start={0} end={numListings} duration={2.75} separator="," />
                        </Typography>
                        <Typography color="textSecondary">
                            {current}
                        </Typography>
                        <Typography variant="body2" component="p">
                            Antall boliger på oppgitt dato.
                        </Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    )
}
