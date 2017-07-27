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
    stack: PropTypes.array
};

export default class StackedBarGroup extends React.Component {
    render() {
        const items = this.props.stack.map((item) => {
            if (item.type === 'bar') {
                return (<StackedBar
                    {...item}
                    key={item.name} />);
            }
            return (
                <OutlayLine
                    {...item}
                    key={item.name} />);
        });

        return (
            <g
                className="bar-group"
                transform={`translate(${this.props.xPos},0)`}>
                {items}
            </g>
        );
    }
}

StackedBarGroup.propTypes = propTypes;
