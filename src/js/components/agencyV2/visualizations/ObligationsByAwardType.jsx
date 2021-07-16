/**
 * ObligationsByAwardType.jsx
 * Created by Brett Varney 4/08/21
 */

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import ObligationsByAwardTypeTooltip from './ObligationsByAwardTypeTooltip';

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
            label: PropTypes.string.isRequired,
            value: PropTypes.number.isRequired,
            color: PropTypes.string.isRequired
        })
    ).isRequired,
    windowWidth: PropTypes.number.isRequired
};

export default function ObligationsByAwardType({ outer, inner, windowWidth }) {
    const [chartHeight, setChartHeight] = useState(0);
    const [chartWidth, setChartWidth] = useState(0);
    const chartRef = useRef();

    useEffect(() => {
        const rect = chartRef.current.parentElement.getBoundingClientRect();
        if (rect.height !== chartHeight || rect.width !== chartWidth) {
            setChartHeight(rect.height);
            setChartWidth(rect.width);
        };
    }, [windowWidth]);

    const labelRadius = Math.min(chartHeight, chartWidth) / 2;
    const outerRadius = labelRadius * 0.7;
    const outerStrokeWidth = 3;
    const innerRadius = outerRadius - (outerStrokeWidth * 2);

    // clear & append the svg object to the div
    d3.select('#obl_chart').selectAll('*').remove();
    const svg = d3.select('#obl_chart')
        .append('svg')
        .attr('height', chartHeight)
        .attr('width', chartWidth)
        .append('g')
        .attr('transform', `translate(${chartWidth / 2}, ${chartHeight / 2})`);

    const outerData = outer.map((d) => d.value);
    const outerPie = d3.pie().sortValues(null)(outerData);
    const innerData = inner.map((d) => d.value);
    const innerPie = d3.pie().sortValues(null)(innerData);

    // rotate chart so midpoints are 127deg off vertical
    const rotationAxis = 127;
    const rotation = rotationAxis - ((outerPie[0].endAngle / Math.PI) * 90); // rad => deg
    const chart = svg.append('g').attr('transform', `rotate (${rotation})`);

    // outer ring.
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

    // labels
    const labelPos = (i, yOffset = 0) => {
        if (i === 0) {
            // Financial Assistance, bottom right
            return [labelRadius - 62, ((chartHeight / 2) - 25) + yOffset];
        }
        // Contracts, top left
        return [-(labelRadius) + 18, -(chartHeight / 2) + 29];
    };

    const outerLabels = outer.map((d) => d.label);

    // Financial Assistance legend
    if (outer[0].value > 0) {
        // circle
        svg.selectAll()
            .data(outerPie)
            .enter()
            .append('circle')
            .attr('cx', labelRadius - 70)
            .attr('cy', (chartHeight / 2) - 29)
            .attr('r', 4)
            .style("fill", outer[0].color);
        // text
        svg.selectAll()
            .data(outerPie)
            .enter()
            .append('text')
            .attr('transform', (d, i) => `translate(${labelPos(i)})`)
            .attr('class', 'obligations-by-award-type__label')
            .text((d, i) => outerLabels[i][0]);
    }

    // Contracts legend
    if (outer[1].value > 0) {
        // circle
        svg.selectAll()
            .data(outerPie)
            .enter()
            .append('circle')
            .attr('cx', -labelRadius + 10)
            .attr('cy', -(chartHeight / 2) + 25)
            .attr('r', 4)
            .style("fill", outer[1].color);
        // text
        svg.selectAll()
            .data(outerPie)
            .enter()
            .append('text')
            .attr('transform', (d, i) => `translate(${labelPos(i, 12)})`)
            .attr('class', 'obligations-by-award-type__label')
            .text((d, i) => outerLabels[i][1]);
    }

    return (
        <>
            <div id="obl_chart" className="obligations-by-award-type" ref={chartRef} />
            <div style={{ width: '400px' }}>
                <ObligationsByAwardTypeTooltip awardTypes={inner} />
            </div>
        </>
    );
}

ObligationsByAwardType.propTypes = propTypes;
