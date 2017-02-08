/**
 * RankVisualization.jsx
 * Created by Kevin Li 2/2/17
 */

import React from 'react';

import HorizontalChart from './chart/HorizontalChart';

const defaultProps = {
    labelSeries: [
        'Department of Veterans Affairs',
        'Department of Health and Human Services',
        'Department of Education',
        'Department of Justice',
        'National Aeronautics and Space Administration'
    ],
    dataSeries: [2212019, 2000000, 1240000, -750000, -1010900],
    width: 0,
    height: 330
};

export default class RankVisualization extends React.Component {
    render() {
        return (
            <HorizontalChart {...this.props} />
        );
    }
}

RankVisualization.defaultProps = defaultProps;
