/**
 * AwardLabelsLine.jsx
 * Created by Emily Gullo 03/02/2017
 **/

import React from 'react';


const propTypes = {
    labelDistance: React.PropTypes.number
};

export default class AwardLabelsLine extends React.Component {

    render() {
        return (<line
            fill="none"
            strokeWidth="1"
            className="label-line"
            x1={5}
            x2={5 + this.props.labelDistance}
            y1={0}
            y2={0} />);
    }
}
AwardLabelsLine.propTypes = propTypes;
