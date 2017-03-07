/**
 * AwardLabelsLine.jsx
 * Created by Emily Gullo 03/02/2017
 **/

import React from 'react';


const propTypes = {
    labelDistance: React.PropTypes.number,
    type: React.PropTypes.string,
    path: React.PropTypes.string
};

export default class AwardLabelsLine extends React.Component {

    render() {
        let line = null;
        if (this.props.type === "line") {
            line = (<line
                fill="none"
                strokeWidth="1"
                className="label-line"
                x1={5}
                x2={5 + this.props.labelDistance}
                y1={0}
                y2={0} />);
        }
        else if (this.props.type === "poly") {
            line = (<polyline
                fill="none"
                strokeWidth="1"
                className="label-line"
                points={this.props.path} />);
        }
        return line;
    }
}
AwardLabelsLine.propTypes = propTypes;
