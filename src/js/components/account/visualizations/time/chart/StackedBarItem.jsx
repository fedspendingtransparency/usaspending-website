/**
 * StackedBarItem.jsx
 * Created by Kevin Li 4/3/17
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    deregisterBar: PropTypes.func,
    identifier: PropTypes.string,
    selectBar: PropTypes.func,
    deselectBar: PropTypes.func,
    description: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    color: PropTypes.string,
    graphHeight: PropTypes.number
};

export default class StackedBarItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            active: false
        };

        this.mouseEntered = this.mouseEntered.bind(this);
        this.mouseExited = this.mouseExited.bind(this);
        this.touchedBar = this.touchedBar.bind(this);
    }

    componentWillUnmount() {
        this.props.deregisterBar(this.props.identifier);
    }

    mouseEntered() {
        this.props.selectBar(this.props.identifier);
    }

    mouseExited() {
        this.props.deselectBar();
    }

    touchedBar() {
        // fallback for touch interfaces, which don't have hover capability
        this.props.selectBar(this.props.identifier, true);
    }

    updateActive(currentActive) {
        this.setState({
            active: currentActive === this.props.identifier
        });
    }

    render() {
        // generate an invisible hitbox that spans the full height of the graph and matches the
        // width of the data point bar to trigger hover events anywhere along the Y axis for the
        // data point
        let hoverClass = '';
        if (this.state.active) {
            hoverClass = ' hover';
        }
        return (
            <g aria-label={this.props.description}>
                <desc>{this.props.description}</desc>
                <rect
                    className={`stacked-bar-item${hoverClass}`}
                    x={this.props.x}
                    y={this.props.y}
                    width={this.props.width}
                    height={this.props.height}
                    fill={this.props.color} />
                <rect
                    className="hover-hitbox"
                    x={this.props.x}
                    y={0}
                    width={this.props.width}
                    height={this.props.graphHeight}
                    onMouseOver={this.mouseEntered}
                    onMouseOut={this.mouseExited}
                    onTouchStart={this.touchedBar} />
            </g>
        );
    }
}

StackedBarItem.propTypes = propTypes;
