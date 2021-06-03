/**
 * ObligationsByAwardType.jsx
 * Created by Brett Varney 4/08/21
 */

import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

const propTypes = {
    outer: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
            value: PropTypes.number.isRequired,
            color: PropTypes.string.isRequired
        })
    ).isRequired,
    inner: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
            value: PropTypes.number.isRequired,
            color: PropTypes.string.isRequired
        })
    ).isRequired,
    windowWidth: PropTypes.number.isRequired
};

export default function ObligationsByAwardType({ outer, inner, windowWidth }) {
    const [chartRect, setChartRect] = React.useState([0, 0]); // height, width
    const chartRef = React.useRef();

    React.useEffect(() => {
        const rect = chartRef.current.parentElement.getBoundingClientRect();
        if (rect.height !== chartRect[0] || rect.width !== chartRect[1]) {
            setChartRect([rect.height, rect.width]);
        };
    }, [windowWidth]);

    const labelRadius = Math.min(chartRect[0], chartRect[1]) / 2;
    const outerRadius = labelRadius * 0.7;
    const outerStrokeWidth = 3;
    const innerRadius = outerRadius - (outerStrokeWidth * 2);

    // clear & append the svg object to the div
    d3.select('#obl_chart').selectAll('*').remove();
    const svg = d3.select('#obl_chart')
        .append('svg')
        .attr('height', chartRect[0])
        .attr('width', chartRect[1])
        .append('g')
        .attr('transform', `translate(${chartRect[1] / 2}, ${chartRect[0] / 2})`);

    const outerData = outer.map((d) => d.value);
    const outerPie = d3.pie().sortValues(null)(outerData);
    const innerData = inner.map((d) => d.value);
    const innerPie = d3.pie().sortValues(null)(innerData);

    // rotate chart so midpoints are 127deg off vertical
    const rotationAxis = 127;
    const rotation = rotationAxis - ((outerPie[0].endAngle / Math.PI) * 90);
    const chart = svg.append('g').attr('transform', `rotate (${rotation})`);

    // outer ring
    chart.selectAll()
        .data(outerPie)
        .enter()
        .append('path')
        .attr('d', d3.arc()
            .outerRadius(outerRadius)
            .innerRadius(outerRadius - outerStrokeWidth))
        .attr('fill', (d, i) => outer[i].color);

    // inner ring
    chart.selectAll()
        .data(innerPie)
        .enter()
        .append('path')
        .attr('d', d3.arc()
            .outerRadius(innerRadius)
            .innerRadius(innerRadius / 2)
        )
        .attr('fill', (d, i) => inner[i].color);

    // border between categories
    const borders = [[0, outerRadius], [0, 0], [outerPie[0].endAngle, outerRadius]];
    chart.selectAll()
        .data([0]) // one polyline, data in borders
        .enter()
        .append('path')
        .attr('d', d3.lineRadial()(borders))
        .attr('stroke', 'white')
        .attr('stroke-width', 3)
        .attr('fill', 'none');

    // labels -- commented-out as starting point for DEV-7421
    // const labelPos = (i, yOffset = 0) => {
    //         // labels at top left/bottom right or top right/bottom left, depending on relative values
    //         const labelAngle = outerData[0] < outerData[1] ? -.8 : .8;
    //         const labelPos = i == 0 ? labelRadius : -labelRadius;

    //         return [labelPos * Math.cos(labelAngle), labelPos * Math.sin(labelAngle) + yOffset];
    //     }

    // const outerLabels = outer.map((d) => d.label);

    // svg.selectAll()
    //     .data(outerPie)
    //     .enter()
    //     .append('text')
    //     .attr('transform', (d, i) => 'translate(' + labelPos(i) + ')')
    //     .attr('class', 'callout-labels')
    //     .text((d, i) => outerLabels[i][0])
    //     ;

    // svg.selectAll()
    //     .data(outerPie)
    //     .enter()
    //     .append('text')
    //     .attr('transform', (d, i) => 'translate(' + labelPos(i, 12) + ')')
    //     .attr('class', 'callout-labels')
    //     .text((d, i) => outerLabels[i][1])
    //     ;

    return <div id="obl_chart" ref={chartRef} />;
}

ObligationsByAwardType.propTypes = propTypes;
