/**
 * StackedBarGroup.jsx
 * Created by Kevin Li 7/26/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import StackedBar from './StackedBar';
import OutlayLine from './OutlayLine';

const propTypes = {
    xPos: PropTypes.number,
    stack: PropTypes.array,
    hitzone: PropTypes.object,
    tooltip: PropTypes.object,
    showTooltip: PropTypes.func,
    hideTooltip: PropTypes.func,
    toggleTooltip: PropTypes.func
};

export default class StackedBarGroup extends React.Component {
    constructor(props) {
        super(props);

        this.mouseEntered = this.mouseEntered.bind(this);
        this.mouseExited = this.mouseExited.bind(this);
        this.barTouched = this.barTouched.bind(this);
    }

    mouseEntered() {
        this.props.showTooltip(this.props.tooltip);
    }

    mouseExited() {
        this.props.hideTooltip();
    }

    barTouched() {
        this.props.toggleTooltip(this.props.tooltip);
    }

    render() {
        const items = this.props.stack.map((item) => {
            if (item.type === 'bar') {
                return (<StackedBar
                    {...item}
                    key={`${item.name}-${item.xValue}`} />);
            }
            return (
                <OutlayLine
                    {...item}
                    key={`${item.name}-${item.xValue}`} />);
        });

        return (
            <g
                className="bar-group"
                transform={`translate(${this.props.xPos},0)`}>
                {items}
                <rect
                    className="hit-zone"
                    fill="rgba(0,0,0,0)"
                    x={0}
                    y={0}
                    width={this.props.hitzone.width}
                    height={this.props.hitzone.height}
                    onMouseEnter={this.mouseEntered}
                    onMouseLeave={this.mouseExited}
                    onTouchStart={this.barTouched} />
            </g>
        );
    }
}

StackedBarGroup.propTypes = propTypes;
