/**
 * SankeyFlow.jsx
 * Created by Kevin Li 3/27/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { interpolateNumber } from 'd3-interpolate';
import { isEqual } from 'lodash';

const propTypes = {
    height: PropTypes.number,
    description: PropTypes.string,
    style: PropTypes.object
};

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

    componentDidUpdate(prevProps) {
        if (!isEqual(prevProps, this.props)) {
            this.calculatePath(this.props);
        }
    }

    calculatePath(props) {
        let path = '';

        // start at the 0, startY position, then move right 2px to account for the 2px offset
        path += `M0,${props.startY}L2,${props.startY}`;

        // calculate the curve (going from 2 to length -2 to account for the offset)
        const curve = interpolateNumber(2, props.length);

        path += `C${curve(0.5)},${props.startY}`;
        path += ` ${curve(0.5)},${props.endY}`;

        // move to the end (length, endY), then move right 2px more to account for the offset
        path += ` ${props.length},${props.endY}L${props.length + 4},${props.endY}`;

        // create the height by moving downard height px
        path += ` L${props.length + 4},${props.endY + props.height}`;
        // move left 2px to account for the offset
        path += `L${props.length},${props.endY + props.height}`;
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
        if (this.props.height <= 0) {
            return null;
        }

        return (
            <g
                transform="translate(-2,0)"
                aria-label={this.props.description}>
                <desc>{this.props.description}</desc>
                <path
                    className="flow-path"
                    d={this.state.path}
                    style={this.props.style} />
            </g>
        );
    }
}

SankeyFlow.propTypes = propTypes;
SankeyFlow.defaultProps = defaultProps;
