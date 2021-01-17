import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../../context/theme/index';
import BeatLoader from 'react-spinners/BeatLoader';

import './CovidData.css';

interface CovidDataProps {
    covidStats: any,
    loading: boolean,
    statsPopulated: boolean,
}


const CovidData = ({ covidStats, loading, statsPopulated }: CovidDataProps) => {
    const [stats, setStats] = useState<any>({});
    const theme = useContext(ThemeContext);
    useEffect(() => {
        setStats(covidStats);
    }, [covidStats]);
    return (
        <div className="stats">
            <div className="cases">
                <h2 style={{ fontFamily: theme.font, color: "#fffafa" }}>cases:</h2>
                <h2 style={{ fontFamily: theme.font, color: "#fffafa" }} id="cases-txt">{statsPopulated && stats.positive && stats.positive.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h2>
                <BeatLoader color="#E6E6FA" loading={loading} size={15} />
            </div>
            <div className="deaths">
                <h2 style={{ fontFamily: theme.font, color: "#fffafa" }}>deaths:</h2>
                <h2 style={{ fontFamily: theme.font }} id="deaths-txt">{statsPopulated && stats.death && stats.death.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h2>
                <BeatLoader color="#E6E6FA" loading={loading} size={15} />
            </div>
            <div className="recovered">
                <h2 style={{ fontFamily: theme.font, color: "#fffafa" }}>recovered:</h2>
                <h2 style={{ fontFamily: theme.font }} id="recovered-txt">{statsPopulated && stats.recovered && stats.recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h2>
                <BeatLoader color="#E6E6FA" loading={loading} size={15} />
            </div>
        </div>
    )
}


export default CovidData;
