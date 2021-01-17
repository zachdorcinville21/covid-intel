import React from 'react';
import { TestingLocation } from '../locationModel/index';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from "@material-ui/core/styles";

interface TestLocationProps {
    location: TestingLocation,
    font: string, 
    key: number,
}

const styles = makeStyles({
    location: {
        padding: '25px 15px',
        backgroundColor: "transparent",
        color: "#FAEBD7",
    },
});

const TestLocation = ({ location, font, key }: TestLocationProps) => {
    const classes = styles();
    return (
        <Paper className={classes.location} elevation={20} key={key}>
            <p style={{ fontFamily: font, fontWeight: 700, marginBottom: "10px", }}>{location.centername}</p>
            <p style={{ fontFamily: font, fontWeight: 400, marginBottom: "10px" }}>{location.address}</p>
            <a href={location.url} target="_blank" rel="noreferrer" style={{ fontFamily: font, fontWeight: 400, color: "#fffafa" }}>More info</a>
        </Paper>
    )
}




export default TestLocation;
