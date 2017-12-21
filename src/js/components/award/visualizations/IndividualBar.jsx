/**
 * IndividualBar.jsx
 * Created by Emily Gullo 03/02/2017
 **/

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    name: PropTypes.string,
    yValue: PropTypes.number,
    barValue: PropTypes.object
};

export default class IndividualBar extends React.Component {
    render() {
        return (
            <g
                className={`${this.props.name}-group`}
                transform={`translate(200,${this.props.yValue})`}>
                {this.props.barValue}
            </g>
        );
    }
}
IndividualBar.propTypes = propTypes;
