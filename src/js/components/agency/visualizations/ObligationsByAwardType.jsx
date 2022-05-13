/**
 * ObligationsByAwardType.jsx
 * Created by Brett Varney 4/08/21
 */

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import { TooltipWrapper } from 'data-transparency-ui';
import { mapToFullCategoryName, getCategoryNameByAwardType, getActiveCategoryType, getOuterCategoryId } from 'helpers/agency/visualizations/ObligationsByAwardTypeHelper';
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
            color: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired
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
    const [categoryHover, setCategoryHover] = useState(null);
    const chartRef = useRef();

    const renderChart = () => {
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

        const pie = d3.pie()
            .value((d) => d.value)
            .sortValues(null)(inner);

        // rotate chart so midpoints are 127deg off vertical
        const rotationAxis = 357;
        const rotation = rotationAxis - ((pie[0].endAngle / Math.PI) * 90); // rad => deg
        const chart = svg
            .append('g')
            .attr('transform', `rotate (${rotation})`)
            .attr('class', 'obligations-by-award-type__donut')
            .attr('role', 'list');

        // invisible outer ring to force tooltip to close when mousing out of the donut
        chart.selectAll()
            .data(pie)
            .enter()
            .append('path')
            .attr('d', d3.arc()
                .outerRadius(outerRadius + 75)
                .innerRadius(outerRadius + 1))
            .attr('fill', 'white')
            .style('cursor', 'default')
            .on('mouseenter', null)
            .on('mouseenter', () => {
                // store the award type of the section the user is hovering over
                setActiveType(null);
            })
            .on('mouseleave', () => {
                setActiveType(null);
            });

        // outer ring.
        chart.selectAll()
            .data(pie)
            .enter()
            .append('path')
            .attr('d', d3.arc()
                .outerRadius(outerRadius)
                .innerRadius(outerRadius - outerStrokeWidth))
            .attr('fill', (d, i) => {
                const activeCategory = getCategoryNameByAwardType(activeType, categoryMapping);
                const currentCategory = getCategoryNameByAwardType(inner[i].label, categoryMapping);
                const currentCategoryId = getOuterCategoryId(currentCategory, outer);

                // Use the faded color when another section is hovered over
                if (activeType && !isMobile && activeCategory !== currentCategory) {
                    return outer[currentCategoryId].fadedColor;
                }
                return outer[currentCategoryId].color;
            })
            .style('cursor', 'pointer')
            .on('mouseenter', (d) => {
                // store the award type of the section the user is hovering over
                setActiveType(d.data.label);
                setCategoryHover(mapToFullCategoryName(d.data.type));
            })
            .on('mouseleave', () => {
                setActiveType(null);
                setCategoryHover(null);
            })
            .attr('aria-label', (d) => `${d.data.label}: ${d3.format("($,.2f")(d.value)}`)
            .attr('role', 'listitem');

        // white ring
        chart.selectAll()
            .data(pie)
            .enter()
            .append('path')
            .attr('d', d3.arc()
                .outerRadius(outerRadius - outerStrokeWidth)
                .innerRadius(innerRadius)
            )
            .attr('fill', 'white')
            .style('cursor', 'pointer')
            .on('mouseenter', (d) => {
                // store the award type of the section the user is hovering over
                setActiveType(d.data.label);
            })
            .on('mouseleave', () => {
                setActiveType(null);
            })
            .attr('role', 'listitem');


        // inner ring
        chart.selectAll()
            .data(pie)
            .enter()
            .append('path')
            .attr('d', d3.arc()
                .outerRadius(innerRadius)
                .innerRadius(innerRadius / 2)
            )
            .attr('fill', (d, i) => {
                if (categoryHover && categoryHover === mapToFullCategoryName(d.data.type) && !isMobile) {
                    return inner[i].color;
                }

                // Use the faded color when another section is hovered over
                return ((activeType && activeType !== inner[i].label) && !isMobile) ? inner[i].fadedColor : inner[i].color;
            })
            .style('cursor', 'pointer')
            .on('mouseover', (d) => {
                // store the award type of the section the user is hovering over
                setActiveType(d.data.label);
            })
            .on('mouseout', () => setActiveType(null))
            .on('focus', (d) => {
                // store the award type of the section the user is hovering over
                setActiveType(d.data.label);
            })
            .on('blur', () => setActiveType(null))
            .attr('aria-label', (d) => `${d.data.label}: ${d3.format("($,.2f")(d.value)}`)
            .attr('role', 'listitem')
            .attr('tabIndex', 0);


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
                .data(pie)
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
                .data(pie)
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
    };

    useEffect(() => {
        if (chartWidth && chartHeight) {
            renderChart();
        }
    }, [chartWidth, chartHeight]);

    useEffect(() => {
        const rect = chartRef.current.parentElement.getBoundingClientRect();
        if (rect.height !== chartHeight || rect.width !== chartWidth) {
            setChartHeight(rect.height);
            setChartWidth(rect.width);
        }
    }, [windowWidth]);

    return (
        <TooltipWrapper
            className="obligations-by-award-type"
            tooltipPosition="bottom"
            tooltipComponent={(
                <ObligationsByAwardTypeTooltip
                    awardTypes={inner}
                    fiscalYear={fiscalYear}
                    activeType={activeType}
                    categoryType={getActiveCategoryType(activeType, categoryMapping)}
                    isCategoryHover={categoryHover?.length > 0} />)}
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
