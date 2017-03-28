/**
 * SankeyFlow.jsx
 * Created by Kevin Li 3/27/17
 */

import React from 'react';
import { interpolateNumber } from 'd3-interpolate';

const defaultProps = {
    description: ''
};

export default class SankeyFlow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            path: ''
        };
    }

    componentWillReceiveProps(nextProps) {
        this.calculatePath(nextProps);
    }

    calculatePath(props) {
        let path = '';

        // start at the 0, startY position, then move right 2px to account for the 2px offset
        path += `M0,${props.startY}L2,${props.startY}`;

        // calculate the curve (going from 2 to length -2 to account for the offset)
        const curve = interpolateNumber(2, props.length - 2);

        path += `C${curve(0.5)},${props.startY}`;
        path += ` ${curve(0.5)},${props.endY}`;

        // move to the end (length, endY), then move right 2px more to account for the offset
        path += ` ${props.length - 2},${props.endY}L${props.length},${props.endY}`;

        // create the height by moving downard height px
        path += ` L${props.length},${props.endY + props.height}`;
        // move left 2px to account for the offset
        path += `L${props.length - 2},${props.endY + props.height}`;
        // go back to the start but at the bottom
        path += `C${curve(0.5)},${props.endY + props.height}`;
        path += ` ${curve(0.5)},${props.startY + props.height}`;
        // end 2px to the right of the starting point due to the offset
        path += ` 2,${props.startY + props.height}`;
        // now move left 2px to end the path
        path += `L0,${props.startY + props.height}`;

        // close the path
        path += 'Z';

        this.setState({
            path
        });
    }

    render() {
        return (
            <g aria-label={this.props.description}>
                <desc>{this.props.description}</desc>
                <path
                    className="flow-path"
                    d={this.state.path}
                    style={this.props.style} />
            </g>
        );
    }
}

SankeyFlow.defaultProps = defaultProps;
