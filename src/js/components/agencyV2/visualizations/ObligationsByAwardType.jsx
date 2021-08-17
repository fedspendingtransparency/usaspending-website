/**
 * ObligationsByAwardType.jsx
 * Created by Brett Varney 4/08/21
 */

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import { TooltipWrapper } from 'data-transparency-ui';
import ObligationsByAwardTypeTooltip from './ObligationsByAwardTypeTooltip';

const categoryMapping = {
    'All Contracts': ['Contracts', 'IDVs'],
    'All Financial': ['Grants', 'Loans', 'Direct Payments', 'Other Financial Assistance']
};

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
    windowWidth: PropTypes.number.isRequired,
    fiscalYear: PropTypes.number,
    isMobile: PropTypes.bool
};

export default function ObligationsByAwardType({
    outer,
    inner,
    windowWidth,
    fiscalYear,
    isMobile
}) {
    const [chartHeight, setChartHeight] = useState(0);
    const [chartWidth, setChartWidth] = useState(0);
    const [activeType, setActiveType] = useState(null);
    const chartRef = useRef();

    useEffect(() => {
        const rect = chartRef.current.parentElement.getBoundingClientRect();
        if (rect.height !== chartHeight || rect.width !== chartWidth) {
            setChartHeight(rect.height);
            setChartWidth(rect.width);
        }
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

    const outerPie = d3.pie()
        .value((d) => d.value)
        .sortValues(null)(outer);
    const innerPie = d3.pie()
        .value((d) => d.value)
        .sortValues(null)(inner);

    // rotate chart so midpoints are 127deg off vertical
    const rotationAxis = 127;
    const rotation = rotationAxis - ((outerPie[0].endAngle / Math.PI) * 90); // rad => deg
    const chart = svg
        .append('g')
        .attr('transform', `rotate (${rotation})`)
        .attr('class', 'obligations-by-award-type__donut')
        .attr('role', 'list');

    // outer ring.
    chart.selectAll()
        .data(outerPie)
        .enter()
        .append('path')
        .attr('d', d3.arc()
            .outerRadius(outerRadius)
            .innerRadius(outerRadius - outerStrokeWidth))
        .attr('fill', (d, i) => (
            // Use the faded color when another section is hovered over
            ((activeType && !categoryMapping[outer[i].label[0]].includes(activeType)) && !isMobile)
                ? outer[i].fadedColor : outer[i].color)
        )
        .attr('aria-label', (d) => `${d.data.label}: ${d3.format("($,.2f")(d.value)}`)
        .attr('role', 'listitem');

    // inner ring
    chart.selectAll()
        .data(innerPie)
        .enter()
        .append('path')
        .attr('d', d3.arc()
            .outerRadius(innerRadius)
            .innerRadius(innerRadius / 2)
        )
        .attr('fill', (d, i) => (
            // Use the faded color when another section is hovered over
            ((activeType && activeType !== inner[i].label) && !isMobile)
                ? inner[i].fadedColor : inner[i].color)
        )
        .attr('aria-label', (d) => `${d.data.label}: ${d3.format("($,.2f")(d.value)}`)
        .on('mouseenter', (d) => {
            // store the award type of the section the user is hovering over
            setActiveType(d.data.label);
        })
        .on('mouseleave', () => setActiveType(null))
        .attr('role', 'listitem');

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
        return [-(labelRadius) + 18, -(chartHeight / 2) + 29 + yOffset];
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
            .data(outerLabels[0])
            .enter()
            .append('text')
            .attr('transform', (d, i) => `translate(${labelPos(0, i * 12)})`)
            .attr('class', 'obligations-by-award-type__label')
            .text((d) => d);
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
            .data(outerLabels[1])
            .enter()
            .append('text')
            .attr('transform', (d, i) => `translate(${labelPos(1, i * 12)})`)
            .attr('class', 'obligations-by-award-type__label')
            .text((d) => d);
    }

    return (
        <TooltipWrapper
            className="obligations-by-award-type"
            tooltipPosition="bottom"
            tooltipComponent={(
                <ObligationsByAwardTypeTooltip
                    awardTypes={inner}
                    fiscalYear={fiscalYear}
                    activeType={activeType} />)}
            controlledProps={{
                isControlled: true,
                isVisible: activeType && !isMobile,
                showTooltip: () => {},
                closeTooltip: () => {}
            }}>
            <div id="obl_chart" className="obligations-by-award-type__chart" ref={chartRef} />
        </TooltipWrapper>
    );
}

ObligationsByAwardType.propTypes = propTypes;
