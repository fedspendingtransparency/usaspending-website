/**
 * IndividualBar.jsx
 * Created by Emily Gullo 03/02/2017
 **/

import React from 'react';

const propTypes = {
    name: React.PropTypes.string,
    yValue: React.PropTypes.number,
    barValue: React.PropTypes.object
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
