/**
 * AboutTheDataDrilldown.jsx
 * Created by Andrea Blackwell 11/14/22
 */

import React from 'react';
import { AngleLeft } from 'components/sharedComponents/icons/Icons';
import Gtas from "content/about-the-data/descriptions/gtas.md";
import PropTypes from 'prop-types';

const propTypes = {
    section: PropTypes.string,
    name: PropTypes.string,
    clearDrilldown: PropTypes.func
};

const AboutTheDataDrilldown = ({ section, name, clearDrilldown }) => {
    const handleKeyUp = (e) => {
        if (e.key === "Enter") {
            clearDrilldown();
        }
    };

    return (<>
        <div className="atd__back" role="button" onKeyUp={(e) => handleKeyUp(e)} tabIndex="0" onClick={() => clearDrilldown()}>
            <AngleLeft alt="Back" />
            <span className="atd__back__label">
                Back
            </span>
        </div>
        <div className="atd__drilldown">
            <div className="atd__overline">{ section }</div>
            <div className="atd__drilldown__heading">{ name }</div>
            <div className="atd__copy"><Gtas /></div>
        </div>

    </>);
};

AboutTheDataDrilldown.propTypes = propTypes;
export default AboutTheDataDrilldown;
