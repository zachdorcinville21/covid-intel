import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../context/theme/index';

import './Nav.css';

interface NavProps {
    isStatsPage: boolean,
}

const Nav = ({ isStatsPage }: NavProps) => {
    const theme = useContext(ThemeContext);
    const linkStyle = {
        textDecoration: "none",
        color: "#fffafa",
        fontFamily: theme.font,
    }


    return (
        <div className="nav-container">
            <Link style={linkStyle} to="/">Stats</Link>
            <Link style={linkStyle} to="/get-tested">Get tested</Link>
        </div>
    );
};




export default Nav;
