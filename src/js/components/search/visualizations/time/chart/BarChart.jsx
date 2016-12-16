/**
 * BarChart.jsx
 * Created by Kevin Li 12/16/16
 */

import React from 'react';

import BarItem from './BarItem';

const propTypes = {

};

export default class BarChart extends React.Component {
    render() {
        const items = this.props.data.map((item, i) => {
            // add a data point
            return <BarItem key={i} data={item} />;
        });

        return (
            <svg className="bar-graph" width={this.props.width} height={this.props.height}>
                {items}
            </svg>
        );
    }
}

BarChart.propTypes = propTypes;
