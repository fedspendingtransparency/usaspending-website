/**
 * SankeyFlowVertical.jsx
 * Created by Kevin Li 3/27/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { interpolateNumber } from 'd3-interpolate';

const propTypes = {
    width: PropTypes.number,
    description: PropTypes.string,
    style: PropTypes.object
};

const defaultProps = {
    description: ''
};

export default class SankeyFlowVertical extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            path: ''
        };
    }

    componentDidUpdate() {
        this.calculatePath(this.props);
    }

    calculatePath(props) {
        let path = '';

        // start at the startX,-2 position, then move down 2px to account for the 2px offset
        path += `M${props.startX},-2L${props.startX},0`;

        // calculate the curve (going from 2 to length -2 to account for the offset)
        const curve = interpolateNumber(2, props.length);

        path += `C${props.startX},${curve(0.5)}`;
        path += ` ${props.endX},${curve(0.5)}`;

        // move to the end (length, endY), then move right 2px more to account for the offset
        path += ` ${props.endX},${props.length}L${props.endX},${props.length + 2}`;

        // create the height by moving downard height px
        path += ` L${props.endX + props.width},${props.length + 2}`;
        // move left 2px to account for the offset
        path += `L${props.endX + props.width},${props.length}`;
        // go back to the start but at the bottom
        path += `C${props.endX + props.width},${curve(0.5)}`;
        path += ` ${props.startX + props.width},${curve(0.5)}`;
        // end 2px to the right of the starting point due to the offset
        path += ` ${props.startX + props.width},0`;
        // now move left 2px to end the path
        path += `L${props.startX + props.width},-2`;

        // close the path
        path += 'Z';

        this.setState({
            path
        });
    }

    render() {
        if (this.props.width <= 0) {
            return null;
        }

        return (
            <g
                transform="translate(0,0)"
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

SankeyFlowVertical.propTypes = propTypes;
SankeyFlowVertical.defaultProps = defaultProps;
