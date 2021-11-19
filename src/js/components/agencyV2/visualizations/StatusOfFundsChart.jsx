import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import * as MoneyFormatter from 'helpers/moneyFormatter';
import { scaleLinear, scaleBand } from 'd3-scale';
import { throttle } from 'lodash';
import { largeScreen } from 'dataMapping/shared/mobileBreakpoints';

const propTypes = {
    data: PropTypes.array
};

export default function StatusOfFundsChart({ data }) {
    const chartRef = useRef();
    const [windowWidth, setWindowWidth] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < largeScreen);
    const viewHeight = 800;
    const viewWidth = 800;
    const margins = {
        top: 40, right: 10, bottom: 10, left: 180
    };
    const chartHeight = viewHeight - margins.top - margins.bottom;
    const chartWidth = viewWidth - margins.left - margins.right;
    let resultNums = [];
    let resultNames = [];
    const formattedAmounts = [];

    useEffect(() => {
        const handleResize = throttle(() => {
            const newWidth = window.innerWidth;
            if (windowWidth !== newWidth) {
                setWindowWidth(newWidth);
                setIsMobile(newWidth < largeScreen);
            }
        }, 50);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // extract amounts to get max value for x axis and store agency names in order
    for (let i = 0; i < data.results.length; i++) {
        resultNums = resultNums.concat(data.results[i].total_budgetary_resources, data.results[i].total_obligations);
        resultNames = resultNames.concat(data.results[i].name);
    }
    const sortedNums = resultNums.sort((a, b) => b - a);
    // format dollar amounts
    for (let i = 0; i < sortedNums.length; i++) {
        formattedAmounts.push(MoneyFormatter.formatMoneyWithUnitsShortLabel(sortedNums[i]));
    }
    // Wrap y axis labels - reference https://bl.ocks.org/mbostock/7555321
    function wrapText(selection) {
        selection.each(function w() {
            const node = d3.select(this);
            const rectWidth = 500;
            let word;
            const words = node.text().split(' ').reverse();
            let line = [];
            const x = node.attr('x');
            const y = node.attr('y');
            let tspan = node.text('').append('tspan').attr('x', x).attr('y', y);
            let lineNumber = 0;
            function addTspan(text) {
                lineNumber += 1;
                return (
                    node
                        .append('tspan')
                        .attr('x', x)
                        .attr('y', y)
                        .attr('dy', `${lineNumber * 16}px`)
                        .text(text)
                );
            }
            while (words.length > 1) {
                word = words.pop();
                line.push(word);
                tspan.text(line.join(' '));
                const tspanLength = tspan.node().getComputedTextLength();
                if (tspanLength > rectWidth && line.length !== 1) {
                    line.pop();
                    tspan.text(line.join(' '));
                    line = [word];
                    tspan = addTspan(word);
                }
            }
            addTspan(words.pop());
        });
    }
    // prevent eslint error for conditional function call to wrapText()
    function wrapTextMobile() {
        return '';
    }
    // setup x and y scales
    const y = scaleBand()
        .range([0, isMobile ? chartHeight + 400 : chartHeight])
        .padding(0.1);
    const x = scaleLinear()
        .range([0, isMobile ? chartWidth + 330 : chartWidth]);

    // append the svg object to the div
    d3.select('#sof_chart').selectAll('*').remove();
    const svg = d3.select('#sof_chart')
        .append('svg')
        .attr('class', 'svg')
        .attr("viewBox", [0, 0, viewWidth + margins.left + margins.right, viewHeight + margins.top + margins.bottom])
        .append('g')
        .attr('transform', `translate(${isMobile ? margins.left - 40 : margins.left}, ${margins.top})`);
    // scale to x and y data points
    x.domain([0, sortedNums[0]]);
    y.domain(resultNames);
    const tickNum = isMobile ? 3 : 5;
    const tickMobileXAxis = isMobile ? 'translate(-130,0)' : 'translate(150, 0)';
    const tickMobileYAxis = isMobile ? 'translate(-140,0)' : 'translate(140, 0)';

    // append x axis (amounts)
    svg.append('g')
        .attr('transform', tickMobileXAxis)
        .style("stroke-width", 2)
        .call(d3.axisTop(x).tickFormat((d) => `${d3.format("$.2s")(d).replace('G', 'B')}`).tickSize(-chartHeight).ticks(tickNum))
        .selectAll('.tick text')
        .attr('dy', '-0.16em')
        .attr('dx', '0.5em')
        .style("font-size", isMobile ? 24 : 18)
        .style("font-family", 'Source Sans Pro')
        .style('fill', '#555');
    // append y axis (names)
    svg.append('g')
        .attr('transform', tickMobileYAxis)
        .attr('stroke-width', 0)
        .call(isMobile ? d3.axisRight(y) : d3.axisLeft(y).tickSize(0))
        .selectAll('.tick text')
        .style("font-size", isMobile ? 24 : 16)
        .style('fill', '#555')
        .style("font-family", 'Source Sans Pro')
        .call(isMobile ? wrapTextMobile : wrapText);

    return (
        <div id="sof_chart" className="status-of-funds__visualization" ref={chartRef} />
    );
}

StatusOfFundsChart.propTypes = propTypes;
