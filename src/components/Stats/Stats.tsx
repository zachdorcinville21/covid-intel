import React, { useState, useContext } from 'react';
import { ThemeContext } from '../../context/theme/index';
import { StateSelect } from './Stats.styled';
import { stateOptions, stateMap } from './stateList';
import BeatLoader from 'react-spinners/BeatLoader';

import './Stats.css';
import Nav from '../Nav/Nav';

const API_URL = "https://api.covidtracking.com";
const WINDOW_WIDTH = window.screen.width;

const Stats = () => {
    const [stats, setStats] = useState<any>({});
    const [selectedState, setSelectedState] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const statsNotEmpty: boolean = Object.keys(stats).length > 0;
    const theme = useContext(ThemeContext);

    const onStateSelect = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStats({});
        setLoading(true);
        setSelectedState(stateMap[e.currentTarget.value]);
        try {
            const response = await fetch(`${API_URL}/v1/states/${e.currentTarget.value}/current.json`);
            const data = await response.json();
            if (data) {
                setStats(data);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getHeight = (): string => {
        let height: string = "";
        if (WINDOW_WIDTH <= 520 && statsNotEmpty) {
            height = "auto";
        } else if (WINDOW_WIDTH <= 520 && statsNotEmpty === false) {
            height = "100vh";
        } else {
            height = "100vh";
        }
        return height;
    }

    return (
        <div className="stats-container" style={{
            width: "100%",
            height: getHeight(),
            backgroundColor: theme.statsBackground,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Nav isStatsPage />
            <div className="stats-innerContainer" style={{
                width: "50%",
                display: "flex",
                flexDirection: "column",
                gap: "100px",
                alignItems: "center",
                justifyContent: "center",
                paddingBottom: "100px",
            }}>
                <div className="stats-heading">
                    <h1 style={{ fontFamily: theme.font, color: "#fffafa", marginBottom: "5px", }}>COVID-19 stats for: {selectedState}</h1>
                    {statsNotEmpty && <small style={{ fontFamily: theme.font, color: "#F0E68C" }}>Last updated: {stats.lastUpdateEt.slice(0, 9)}</small>}
                </div>
                <div className="state-select">
                    <StateSelect name="states" id="states" onChange={onStateSelect}>
                        {stateOptions}
                    </StateSelect>
                </div>
                <div className="stats">
                    <div className="cases">
                        <h2 style={{ fontFamily: theme.font, color: "#fffafa" }}>cases:</h2>
                        <h2 style={{ fontFamily: theme.font, color: "#fffafa" }} id="cases-txt">{statsNotEmpty && stats.positive && stats.positive.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h2>
                        <BeatLoader color="#4169E1" loading={loading} size={15} />
                    </div>
                    <div className="deaths">
                        <h2 style={{ fontFamily: theme.font, color: "#fffafa" }}>deaths:</h2>
                        <h2 style={{ fontFamily: theme.font }} id="deaths-txt">{statsNotEmpty && stats.death && stats.death.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h2>
                        <BeatLoader color="#4169E1" loading={loading} size={15} />
                    </div>
                    <div className="recovered">
                        <h2 style={{ fontFamily: theme.font, color: "#fffafa" }}>recovered:</h2>
                        <h2 style={{ fontFamily: theme.font }} id="recovered-txt">{statsNotEmpty && stats.recovered && stats.recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h2>
                        <BeatLoader color="#4169E1" loading={loading} size={15} />
                    </div>
                </div>
            </div>
        </div>
    );
};



export default Stats;