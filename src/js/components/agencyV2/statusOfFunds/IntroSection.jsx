/**
 * IntroSection.jsx
 * Created by Brian Petway 11/04/21
 */

import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from "react-redux";

const propTypes = {
    fy: PropTypes.string
};

const IntroSection = ({ fy }) => {
    const { name } = useSelector((state) => state.agencyV2.overview);

    return (
        <div className="status-of-funds__intro-wrapper">
            <div className="status-of-funds__intro-section-title">
                <span >How were funds distributed in FY {fy} for the {name}?</span>
            </div>
            <div className="status-of-funds__intro-section-text" >
                <span >
                    In... fiscal year var {fy}, the... agency name var {name}, then amount var
                </span>
            </div>
            <div className="status-of-funds__intro-section-italic-text">
                <span >
                    Select a segment in the chart below to dive deeper into the data.
                </span>
            </div>
        </div>
    );
};

IntroSection.propTypes = propTypes;
export default IntroSection;
