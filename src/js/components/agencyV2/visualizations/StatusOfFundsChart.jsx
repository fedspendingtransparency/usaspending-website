import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import * as MoneyFormatter from 'helpers/moneyFormatter';
import { scaleLinear, scaleBand } from 'd3-scale';
import { throttle } from 'lodash';
import { largeScreen } from 'dataMapping/shared/mobileBreakpoints';

const propTypes = {
    data: PropTypes.object,
    fy: PropTypes.string
};

const StatusOfFundsChart = ({ data, fy }) => {
    const chartRef = useRef();
    const [windowWidth, setWindowWidth] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < largeScreen);
    const viewHeight = 1000;
    const viewWidth = 1000;
    const margins = {
        top: 40, right: 10, bottom: 10, left: 180
    };
    const chartHeight = viewHeight - margins.top - margins.bottom;
    const chartWidth = viewWidth - margins.left - margins.right;
    let resultNums = [];
    let resultNames = [];
    let totalObligationsData = [];
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
        totalObligationsData = totalObligationsData.concat(data.results[i].name, data.results[i].total_obligations, data.results[i].total_budgetary_resources);
    }
    const sortedNums = data.results.sort((a, b) => (a.total_budgetary_resources > b.total_obligations ? b.total_budgetary_resources - a.total_budgetary_resources : b.total_obligations - a.total_obligations));
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
        .range([0, chartHeight])
        .padding(0.2);
    const x = scaleLinear()
        .range([0, isMobile ? chartWidth + 330 : chartWidth + 80]);

    // append the svg object to the div
    d3.select('#sof_chart').selectAll('*').remove();
    const svg = d3.select('#sof_chart')
        .append('svg')
        .attr('class', 'svg')
        .attr("viewBox", [0, 0, viewWidth + margins.left + margins.right, viewHeight + margins.top + margins.bottom + 20])
        .append('g')
        .attr('transform', `translate(${isMobile ? margins.left - 40 : margins.left}, ${margins.top})`);
    // scale to x and y data points
    x.domain([0, Math.max(sortedNums[0].total_budgetary_resources, sortedNums[0].total_obligations)]);
    y.domain(resultNames);
    const tickMobileXAxis = isMobile ? 'translate(-130,0)' : 'translate(90, 0)';
    const tickMobileYAxis = isMobile ? 'translate(-150,0)' : 'translate(60, 0)';

    // append x axis (amounts)
    svg.append('g')
        .attr('transform', tickMobileXAxis)
        .attr('class', 'tickLines-vertical')
        .style("stroke-width", 2)
        .call(d3.axisTop(x).tickFormat((d) => `${d3.format("$.2s")(d).replace('G', 'B').replace('0.0', '0')}`).tickSize(isMobile ? -chartHeight - 12 : -chartHeight + 18).ticks(3))
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
        .style("font-size", isMobile ? 24 : 18)
        .style('fill', '#555')
        .style("font-family", 'Source Sans Pro')
        .call(isMobile ? wrapTextMobile : wrapText, 240);
    svg.selectAll("horizontalGridlines")
        .attr('transform', tickMobileXAxis)
        .data(sortedNums)
        .enter()
        .append("rect")
        .attr("x", isMobile ? -140 : 80)
        .attr("y", (d) => (isMobile ? y(d.name) + 70 : y(d.name) + 40))
        .attr("width", isMobile ? chartWidth + 340 : chartWidth + 90)
        .attr("height", y.bandwidth() - 40)
        .attr("fill", "none")
        .attr("stroke", "#f1f1f1");
    // append total budgetary resources bars
    svg.selectAll("totalBudgetaryResourcesRect")
        .attr('transform', tickMobileXAxis)
        .data(sortedNums)
        .enter()
        .append("rect")
        .attr("x", isMobile ? -140 : 80)
        .attr("y", (d) => (isMobile ? y(d.name) + 70 : y(d.name) + 40))
        .attr("width", (d) => x(d.total_budgetary_resources) + 11)
        .attr("height", y.bandwidth() - 40)
        .attr("fill", "#BBDFC7");
    // append total obligations bars
    svg.selectAll("totalObligationsRect")
        .attr('transform', tickMobileXAxis)
        .data(sortedNums)
        .enter()
        .append("rect")
        .attr("x", isMobile ? -140 : 80)
        .attr("y", (d) => (isMobile ? y(d.name) + 70 : y(d.name) + 40))
        .attr("width", (d) => x(d.total_obligations) + 11)
        .attr("height", y.bandwidth() - 40)
        .attr("fill", "#2B71B8");
    svg.append('line')
        .attr('transform', tickMobileXAxis)
        .style("stroke", "#d6d7d9")
        .style("stroke-width", 1)
        .attr("x1", -250)
        .attr("y1", chartHeight + 30)
        .attr("x2", isMobile ? chartWidth + 330 : chartWidth + 100)
        .attr("y2", chartHeight + 30);
    // append labels for legend below chart
    svg.append("circle")
        .attr("cx", 200)
        .attr("cy", chartHeight + 60)
        .attr("r", 6)
        .style("fill", "#2B71B8");
    svg.append("circle")
        .attr("cx", 400)
        .attr("cy", chartHeight + 60)
        .attr("r", 6)
        .style("fill", "#BBDFC7");
    svg.append("text")
        .attr("x", 220)
        .attr("y", chartHeight + 60)
        .text(`FY${fy[2]}${fy[3]} Obligations`)
        .style("font-size", "18px")
        .style('fill', '#555')
        .attr("alignment-baseline", "middle");
    svg.append("text")
        .attr("x", 420)
        .attr("y", chartHeight + 60)
        .text(`FY${fy[2]}${fy[3]} Total Budgetary Resources`)
        .style("font-size", "18px")
        .style('fill', '#555')
        .attr("alignment-baseline", "middle");

    return (
        <div id="sof_chart" className="status-of-funds__visualization" ref={chartRef} />
    );
};

StatusOfFundsChart.propTypes = propTypes;
export default StatusOfFundsChart;
