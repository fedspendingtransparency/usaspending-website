/**
 * AccountTimeVisualizationSection.jsx
 * Created by Kevin Li 3/21/17
 */

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash-es';
import { SectionHeader } from "data-transparency-ui";
import AccountTimeVisualizationPeriodButton from './AccountTimeVisualizationPeriodButton';

import TimeVisualization from './TimeVisualization';

const propTypes = {
    data: PropTypes.object,
    loading: PropTypes.bool,
    visualizationPeriod: PropTypes.string,
    changePeriod: PropTypes.func,
    hasFilteredObligated: PropTypes.bool
};

const AccountTimeVisualizationSection = ({
    data,
    loading,
    visualizationPeriod,
    changePeriod,
    hasFilteredObligated
}) => {
    const [windowWidth, setWindowWidth] = useState(0);
    const [visualizationWidth, setVisualizationWidth] = useState(0);

    const sectionHr = useRef(null);

    const handleWindowResize = throttle(() => {
    // determine if the width changed
        const windowWidthLocal = window.innerWidth;
        if (windowWidthLocal !== windowWidth) {
            // width changed, update the visualization width
            setWindowWidth(windowWidthLocal);
            setVisualizationWidth(sectionHr.current.offsetWidth);
        }
    }, 50);

    useEffect(() => {
        handleWindowResize();
        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div
            className="results-visualization-time-section"
            id="results-section-time">
            <SectionHeader
                title="Spending Over Time"
                titleTooltip={{ component: false }}
                descTooltip={{ component: false }} />
            <hr
                className="results-divider"
                ref={(hr) => {
                    sectionHr.current = hr;
                }} />

            <div className="visualization-top">
                <div className="visualization-description">
                    <div className="content">
                        Spot trends in spending by years or quarters.
                        Filter your chosen results (at left) and watch this graph update automatically.
                    </div>
                </div>
                <div className="visualization-period">
                    <div className="content">
                        <ul>
                            <li>
                                <AccountTimeVisualizationPeriodButton
                                    value="year"
                                    label="Years"
                                    active={visualizationPeriod === 'year'}
                                    changePeriod={changePeriod} />
                            </li>
                            <li>
                                <AccountTimeVisualizationPeriodButton
                                    value="quarter"
                                    label="Quarters"
                                    active={visualizationPeriod === 'quarter'}
                                    changePeriod={changePeriod} />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <TimeVisualization
                loading={loading}
                data={data}
                width={visualizationWidth}
                hasFilteredObligated={hasFilteredObligated} />
        </div>
    );
};

AccountTimeVisualizationSection.propTypes = propTypes;
export default AccountTimeVisualizationSection;
