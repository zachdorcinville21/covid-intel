import React, { useState, useContext } from 'react';
import { ThemeContext } from '../../context/theme/index';
import { TestingLocation } from './locationModel/index';
import { StateSelectGT } from './GetTested.styled';
import { stateOptions } from '../Stats/stateList';
import { makeStyles } from "@material-ui/core/styles";
import medicineIcon from './images/medicine.svg';
import RingLoader from 'react-spinners/RingLoader';
import { CityInput } from './GetTested.styled';
import Nav from '../Nav/Nav';
import Pagination from '@material-ui/lab/Pagination';
import TestLocation from './TestLocation/TestLocation';

import './GetTested.css';

const API_URL = "https://sheetlabs.com/NCOR/covidtestcentersinUS";

const styles = makeStyles({
    pag: {
        paddingBottom: "30px",
        whiteSpace: "nowrap",
       display: "inline-block",
    }
});

const GetTested = () => {
    const [locations, setLocations] = useState<TestingLocation[]>([]);
    const [customLocations, setCustoms] = useState<TestingLocation[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [currentPage, setPage] = useState<number>(0);
    const locationsPopulated: boolean = locations.length > 0;
    const theme = useContext(ThemeContext);
    const offset = 3 * currentPage;

    const onStateSelect = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLocations([]);
        setCustoms([]);
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}?state=${e.currentTarget.value}`);
            const data = await response.json();
            if (data) {
                setLocations(data);
                setCustoms(data.slice(offset, offset + 3));
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const onCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.value === "" || e.currentTarget.value === null) {
            setCustoms(locations.slice(offset, offset + 3));
        } else {
            const newLocations = locations.filter((location: TestingLocation) =>
                location.address.toLowerCase().includes(e.currentTarget.value.toLowerCase()));
            setCustoms(newLocations);
        }
    }

    const onPageChange = (e: object, page: number) => {
        const listOffset = 3 * page;
        setPage(page);
        setCustoms(locations.slice(listOffset, listOffset + 3));
    }

    const classes = styles();

    return (
        <div className="gt-container" style={{
            backgroundImage: theme.testedBackground,
            backgroundSize: "cover",
            width: "100%",
            minHeight: "100vh",
            textAlign: "center"
        }}>
            <Nav isStatsPage={false} />
            <div className="gt-innerContainer" style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "100px",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <div className="gt-heading">
                    <h1 style={{ fontFamily: theme.font, fontWeight: 700 }} id="gtheading-txt"><img alt="medical" src={medicineIcon} style={{ width: "40px", height: "40px", }} /> View COVID-19 Testing Locations</h1>
                </div>
                <div className="gt-locationSelect">
                    <StateSelectGT name="state-select" onChange={onStateSelect}>
                        {stateOptions}
                    </StateSelectGT>
                    <CityInput id="city-input" placeholder="Enter city/county" onChange={onCityChange} />
                </div>
            </div>
            <div className="test-locations">
                {locationsPopulated && customLocations.map((location: TestingLocation, idx: number) => (
                    <TestLocation
                        location={location}
                        font={theme.font}
                        key={idx}
                    />
                ))}
                {/* <RingLoader color={"red"} loading={loading} size={50} /> */}
            </div>
            <div style={{ 
                display: "flex",
                justifyContent: "center"
            }}><RingLoader color={"red"} loading={loading} size={50} /></div>
            <Pagination count={Math.floor(locations.length / 3)} onChange={onPageChange} className={classes.pag} />
        </div>
    );
};



export default GetTested;

