/**
 * FakeScreens.jsx
 * Created by Kevin Li 8/23/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { sortBy } from 'lodash';
import DetailHeader from './header/DetailHeader';

const FakeScreen = () => {
    const randomPercents = [Math.random(), Math.random()];
    const remaining = 1 - (randomPercents[0] + randomPercents[1]);
    randomPercents.push(remaining);

    const values = sortBy(randomPercents);
    const leftStyle = { width: `${values[2] * 100}%` };
    const middleStyle = { width: `${values[1] * 100}%` };
    const rightStyle = { width: `${values[0] * 100}%` };

    return (
        <div className="fake-screen">
            <DetailHeader
                type="agency"
                title="Lorem Ipsum"
                fy="1789"
                total={Math.random() * 10000000} />

            <div className="explorer-visualization-wrapper">
                <div className="toolbar">
                    <div className="breakdown-menu">
                        <div className="breakdown-label">
                            See the breakdown by:
                        </div>
                    </div>
                </div>

                <div className="explorer-treemap">
                    <div className="fake-treemap">
                        <div
                            style={leftStyle}
                            className="left-block" />
                        <div
                            style={middleStyle}
                            className="middle-block" />
                        <div
                            style={rightStyle}
                            className="right-block" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const propTypes = {
    position: PropTypes.string,
    transitionSteps: PropTypes.number
};

const FakeScreens = (props) => {
    const fakes = [];
    for (let i = 0; i < Math.abs(props.transitionSteps); i++) {
        fakes.push(<FakeScreen key={i} />);
    }
    return (
        <div className={`fake-screens ${props.position}`}>
            {fakes}
        </div>
    );
};

FakeScreens.propTypes = propTypes;

export default FakeScreens;
