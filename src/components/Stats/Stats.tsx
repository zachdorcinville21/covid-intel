import React, { useState, useContext } from 'react';
import { ThemeContext } from '../../context/theme/index';
import { StateSelect } from './Stats.styled';
import { stateOptions, stateMap } from './stateList';
import StatsContainer from './Stats.styled';
import CovidData from '../CovidData/CovidData';

import './Stats.css';
import Nav from '../Nav/Nav';

const API_URL = "https://api.covidtracking.com";

const Stats = () => {
    const [stats, setStats] = useState<any>({});
    const [selectedState, setSelectedState] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const statsPopulated: boolean = Object.keys(stats).length > 0;
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

    return (
        <StatsContainer>
            <Nav isStatsPage />
            <div className="stats-heading">
                <h1 style={{ fontFamily: theme.font, color: "#fffafa" }}>
                    COVID-19 stats for: {selectedState}
                </h1>
                {statsPopulated && <small style={{ fontFamily: theme.font, color: "#F0E68C" }}>
                    Last updated: {stats.lastUpdateEt?.slice(0, 9)}
                </small>}
            </div>
            <div className="state-select">
                <StateSelect name="states" id="states" onChange={onStateSelect}>
                    {stateOptions}
                </StateSelect>
            </div>
            <CovidData
                covidStats={stats}
                loading={loading}
                statsPopulated={statsPopulated}
            />
        </StatsContainer>
    );
};



export default Stats;