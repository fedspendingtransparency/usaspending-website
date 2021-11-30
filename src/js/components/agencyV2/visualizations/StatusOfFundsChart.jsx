import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import * as MoneyFormatter from 'helpers/moneyFormatter';
import { scaleLinear, scaleBand } from 'd3-scale';
import { throttle } from 'lodash';
import { largeScreen } from 'dataMapping/shared/mobileBreakpoints';

const propTypes = {
    data: PropTypes.object
};

const StatusOfFundsChart = ({ data }) => {
    const chartRef = useRef();
    const [windowWidth, setWindowWidth] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < largeScreen);
    const viewHeight = 800;
    const viewWidth = 1000;
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
    function wrapText(text, width) {
        text.each(function w() {
            const textNode = d3.select(this);
            const words = textNode.text().split(/\s+/).reverse();
            let word;
            let line = [];
            const lineNumber = 0;
            const lineHeight = 1.1; // ems
            const y = textNode.attr("y");
            const dy = 1;
            let tspan = textNode.text(null).append("tspan").attr("x", 0).attr("y", y)
                .attr("dy", `${dy}em`);
            while (words.length) {
                word = words.pop();
                line.push(word);
                tspan.text(line.join(" "));
                if (tspan.node().getComputedTextLength() > width) {
                    line.pop();
                    tspan.text(line.join(" "));
                    line = [word];
                    tspan = textNode.append("tspan").attr("x", 0).attr("y", y).attr("dy", `${(lineNumber * lineHeight) + dy}em`)
                        .text(word);
                }
            }
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
        .range([0, isMobile ? chartWidth + 330 : chartWidth + 80]);

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
    const tickMobileXAxis = isMobile ? 'translate(-130,0)' : 'translate(90, 0)';
    const tickMobileYAxis = isMobile ? 'translate(-140,0)' : 'translate(70, 0)';

    // append x axis (amounts)
    svg.append('g')
        .attr('transform', tickMobileXAxis)
        .attr('class', 'tickLines-vertical')
        .style("stroke-width", 2)
        .call(d3.axisTop(x).tickFormat((d) => `${d3.format("$.2s")(d).replace('G', 'B').replace('0.0', '0')}`).tickSize(-chartHeight).ticks(3))
        .call((g) => g.select(".domain").remove())
        .selectAll('.tick text')
        .attr('id', 'tick-labels-axis')
        .attr('dy', '-0.16em')
        .attr('dx', '0em')
        .style("font-size", isMobile ? 24 : 18)
        .style("font-family", 'Source Sans Pro')
        .style('fill', '#555');

    // d3 axis.ticks method does not precisely render tick count so we call a
    // function on each tick to display 3 ticks for 20 results
    const ticks = d3.selectAll(".tick");
    ticks.each(function mobileTicksCount(d, i) {
        if (isMobile) {
            if (i === 1 || i === 3) d3.select(this).remove();
        }
    });

    // shift x axis labels to match mock
    const tickTexts = d3.selectAll(".tick text");
    tickTexts.each(function mobileTextCount(d, i) {
        if (isMobile) {
            if (i === 2) d3.select(this).attr('dx', '-1em');
        }
        if (i === 4) d3.select(this).attr('dx', '-1em');
    });

    // manually add horizontal x axis line since we are removing .domain to hide the y axis line
    svg.append('line')
        .attr('transform', tickMobileXAxis)
        .style("stroke", "#d6d7d9")
        .style("stroke-width", 3)
        .attr("x1", -10)
        .attr("y1", 0)
        .attr("x2", isMobile ? chartWidth + 330 : chartWidth + 81)
        .attr("y2", 0);
    // append y axis (names)
    svg.append('g')
        .attr('transform', tickMobileYAxis)
        .style('stroke-width', 0)
        .call(isMobile ? d3.axisRight(y) : d3.axisLeft(y).tickSize(0))
        .selectAll('.tick text')
        .style("font-size", isMobile ? 24 : 16)
        .style('fill', '#555')
        .style("font-family", 'Source Sans Pro')
        .call(isMobile ? wrapTextMobile : wrapText, 220);

    return (
        <div id="sof_chart" className="status-of-funds__visualization" ref={chartRef} />
    );
};

StatusOfFundsChart.propTypes = propTypes;
export default StatusOfFundsChart;
