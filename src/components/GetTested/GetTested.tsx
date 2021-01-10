import React, { useState, useContext } from 'react';
import { ThemeContext } from '../../context/theme/index';
import { TestingLocation } from './locationModel/index';
import { StateSelect } from '../Stats/Stats.styled';
import { stateOptions } from '../Stats/stateList';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from "@material-ui/core/styles";
import medicineIcon from './images/medicine.svg';
import RingLoader from 'react-spinners/RingLoader';
import { CityInput } from './GetTested.styled';
import Nav from '../Nav/Nav';
import Pagination from '@material-ui/lab/Pagination';

import './GetTested.css';

const API_URL = "https://sheetlabs.com/NCOR/covidtestcentersinUS";

const styles = makeStyles({
    location: {
        padding: '25px 15px',
        backgroundColor: "transparent",
        color: "#FAEBD7",
        marginBottom: "20px",
    },

    pag: {
        paddingBottom: "30px",
        whiteSpace: "nowrap",
    }
});

const GetTested = () => {
    const [locations, setLocations] = useState<TestingLocation[]>([]);
    const [customLocations, setCustoms] = useState<TestingLocation[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [currentPage, setPage] = useState<number>(0);
    const locationsNotEmpty = Object.keys(locations).length > 0;
    const theme = useContext(ThemeContext);
    const offset = 5*currentPage;

    const onStateSelect = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLocations([]);
        setCustoms([]);
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}?state=${e.currentTarget.value}`);
            const data = await response.json();
            if (data) {
                setLocations(data);
                setCustoms(data.slice(offset, offset + 5));
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const onCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.value === "" || e.currentTarget.value === null) {
            setCustoms(locations.slice(offset, offset + 5));
        } else {
            const newLocations = locations.filter((location: TestingLocation) =>
                location.address.toLowerCase().includes(e.currentTarget.value.toLowerCase()));
            setCustoms(newLocations);
        }
    }

    const onPageChange = (e: object, page: number) => {
        const listOffset = 5*page;
        setPage(page);
        setCustoms(locations.slice(listOffset, listOffset + 5));
    }

    const classes = styles();

    return (
        <div className="gt-container" style={{
            backgroundColor: theme.testedBackground,
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            overflowY: "scroll"
        }}>
            <Nav isStatsPage={false}/>
            <div className="gt-innerContainer">
                <div className="gt-heading">
                    <h1 style={{ fontFamily: theme.font, fontWeight: 700 }} id="gtheading-txt"><img alt="medical" src={medicineIcon} style={{ width: "40px", height: "40px", position: "relative", top: "8px" }} /> View COVID-19 Testing Locations</h1>
                </div>
                <div className="gt-locationSelect">
                    <StateSelect name="state-select" onChange={onStateSelect} autoFocus>
                        {stateOptions}
                    </StateSelect>
                    <CityInput id="city-input" placeholder="Enter city/county" onChange={onCityChange} />
                </div>
                <div className="test-locations">
                    {locationsNotEmpty && customLocations.map((location: TestingLocation, idx: number) => (
                        <Paper className={classes.location} elevation={20} key={idx}>
                            <p style={{ fontFamily: theme.font, fontWeight: 700, marginBottom: "10px", }}>{location.centername}</p>
                            <p style={{ fontFamily: theme.font, fontWeight: 400, marginBottom: "10px" }}>{location.address}</p>
                            <a href={location.url} target="_blank" rel="noreferrer" style={{ fontFamily: theme.font, fontWeight: 400, color: "#fffafa" }}>More info</a>
                        </Paper>
                    ))}
                    <RingLoader color={"red"} loading={loading} size={50} />
                </div>
                <Pagination count={Math.floor(locations.length / 5)} onChange={onPageChange} className={classes.pag} />
            </div>
        </div>
    );
};




export default GetTested;

