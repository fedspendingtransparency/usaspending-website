import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import { scaleLinear, scaleBand } from 'd3-scale';
import { throttle } from 'lodash';
import { largeScreen } from 'dataMapping/shared/mobileBreakpoints';

const propTypes = {
    fy: PropTypes.string,
    results: PropTypes.array,
    level: PropTypes.number.isRequired,
    setLevel: PropTypes.func
};

const StatusOfFundsChart = ({
    results, fy, setLevel, level
}) => {
    const chartRef = useRef();
    const [windowWidth, setWindowWidth] = useState(0);

    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth < largeScreen);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
    const [sortedNums, setSortedNums] = useState(null);
    const viewHeight = 760;
    const viewWidth = 1000;
    const margins = {
        top: 40, right: 10, bottom: 10, left: isLargeScreen ? 180 : 245
    };
    const chartHeight = viewHeight - margins.top - margins.bottom;
    const chartWidth = viewWidth - margins.left - margins.right;
    let resultNames = [];

    const [textScale, setTextScale] = useState(viewWidth / viewWidth);

    const handleClick = (data) => {
        setLevel(1, data);
    };

    useEffect(() => {
        setTextScale(viewWidth / chartRef.current.getBoundingClientRect().width);

        const handleResize = throttle(() => {
            setTextScale(viewWidth / chartRef.current.getBoundingClientRect().width);
            const newWidth = window.innerWidth;
            if (windowWidth !== newWidth) {
                setWindowWidth(newWidth);
                setIsLargeScreen(newWidth < largeScreen);
                setIsMobile(newWidth < 600);
            }
        }, 50);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    // Wrap y axis labels - reference https://bl.ocks.org/mbostock/7555321
    function wrapText(text) {
        text.each(function w() {
            const textWidth = chartRef.current.getBoundingClientRect().width * 0.3;
            const textNode = d3.select(this);
            const words = textNode.text().split(/\s+/).reverse();
            let word;
            let line = [];
            const y = textNode.attr("y");
            let tspan = textNode.text(null).append("tspan").attr("x", 0).attr("y", y)
                .attr("dy", '1.1em');
            while (words.length) {
                word = words.pop();
                line.push(word);
                tspan.text(line.join(" "));
                if (tspan.node().getComputedTextLength() > textWidth) {
                    line.pop();
                    tspan.text(line.join(" "));
                    line = [word];
                    tspan = textNode.append("tspan").attr("x", 0).attr("y", y).attr("dy", '1.3em')
                        .text(word);
                }
            }
        });
    }
    const truncateTextLabel = (text) => {
        if (level === 1 && text.length > 35) {
            return `${text.substring(0, 30)}...`;
        }
        return text;
    };
    // prevent eslint error for conditional function call to wrapText()
    function wrapTextMobile() {
        return '';
    }
    // d3 responsiveness tweaks
    const chartHeightYScale = () => {
        if (isLargeScreen) {
            return chartHeight + 500;
        }
        return chartHeight;
    };
    const chartHeightViewBox = () => {
        if (isLargeScreen) {
            return 1300 + margins.top + margins.bottom + 20;
        }
        return viewHeight + margins.top + margins.bottom + 20;
    };
    const paddingResize = () => {
        if (isLargeScreen) {
            return 0.3;
        }
        return 0;
    };
    const horizontalBorderYPos = () => {
        if (isLargeScreen) {
            return chartHeight + 530;
        }
        return chartHeight + 40;
    };
    const legendObligationsYPos = () => {
        if (isLargeScreen) {
            return chartHeight + 560;
        }
        return chartHeight + 70;
    };
    const legendResourcesYPos = () => {
        if (isLargeScreen) {
            return chartHeight + 605;
        }
        return chartHeight + 70;
    };
    const fontSizeScreenWidth = () => {
        if (isLargeScreen) {
            return 26;
        }
        return 18;
    };

    const renderChart = () => {
        // setup x and y scales
        const y = scaleBand()
            .range([0, isMobile ? viewHeight * 2.3 : chartHeightYScale()])
            .padding(isMobile ? 0.5 : paddingResize());
        const x = scaleLinear()
            .range([0, isLargeScreen ? chartWidth + 330 : chartWidth + 80]);

        // append the svg object to the div
        d3.select('#sof_chart').selectAll('*').remove();
        const svg = d3.select('#sof_chart')
            .append('svg')
            .attr('class', 'svg')
            .attr('xmlns:xlink', 'http://www.w3.org/1999/xlink')
            .attr('preserveAspectRatio', 'none')
            .attr("viewBox", [0, 0, viewWidth + margins.left + margins.right, isMobile ? viewHeight * 2.6 : chartHeightViewBox()])
            .append('g')
            .attr('transform', `translate(${isLargeScreen ? margins.left - 40 : margins.left}, ${margins.top})`);

        const tickMobileXAxis = isLargeScreen ? 'translate(-130,0)' : 'translate(90, 0)';
        const tickMobileYAxis = isLargeScreen ? 'translate(-150,16)' : 'translate(60, 0)';
        // scale to x and y data points
        x.domain([0, Math.max(sortedNums[0]._budgetaryResources, sortedNums[0]._obligations)]);
        // extract sorted agency names
        for (let i = 0; i < sortedNums.length; i++) {
            // resultNames = resultNames.concat(sortedNums[i].name.split(',')[0]);
            resultNames = resultNames.concat(sortedNums[i].name);
        }
        if (sortedNums.length < 10) {
            for (let i = sortedNums.length; i < 10; i++) {
                resultNames.push(i);
            }
        }
        y.domain(resultNames);

        // append x axis (amounts)
        svg.append('g')
            .attr('transform', tickMobileXAxis)
            .attr('class', 'tickLines-vertical')
            .style("stroke-width", 2)
            .call(d3.axisTop(x).tickFormat((d) => `${d3.format("$.2s")(d).replace('G', 'B').replace('0.0', '0')}`).tickSize(isLargeScreen ? -chartHeight - 510 : -chartHeight - 4).ticks(3))
            .call((g) => g.select(".domain").remove())
            .selectAll('.tick text')
            .attr('id', 'tick-labels-axis')
            .attr('tabindex', 0)
            .attr('aria-describedby', (d) => `x axis label-${d}`)
            .attr('dy', '-0.16em')
            .attr('dx', '0em')
            .style("font-size", isMobile ? 36 : fontSizeScreenWidth())
            .style("font-family", 'Source Sans Pro')
            .style('fill', '#555')
            .style('font-size', '1.45rem')
            .attr("transform", `scale(${textScale} ${textScale})`);

        // d3 axis.ticks method does not precisely render tick count so we call a
        // function on each tick to display 3 ticks for 20 results
        const ticks = d3.selectAll(".tick");
        ticks.each(function mobileTicksCount(d, i) {
            if (isLargeScreen) {
                if (i === 1 || i === 3) d3.select(this).remove();
            }
        });

        // shift x axis labels to match mock
        const tickTexts = d3.selectAll(".tick text");
        tickTexts.each(function mobileTextCount(d, i) {
            if (isMobile) {
                if (i === 0) d3.select(this).attr('dx', '0.2em');
            }
            if (isLargeScreen) {
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
            .attr("x2", isLargeScreen ? chartWidth + 330 : chartWidth + 81)
            .attr("y2", 0);
        // append y axis (names)
        svg.append('g')
            .attr('transform', tickMobileYAxis)
            .style('stroke-width', 0)
            .call(isLargeScreen ? d3.axisRight(y) : d3.axisLeft(y).tickSize(0))
            .selectAll('.tick text')
            .attr('class', 'y-axis-labels')
            .attr('tabindex', 0)
            .attr('aria-describedby', (d) => `y axis label-${d}`)
            .style('fill', '#555')
            .style("font-family", 'Source Sans Pro')
            .style('font-size', '1.45rem')
            .attr("transform", `scale(${textScale} ${textScale})`)
            .text((d) => truncateTextLabel(d))
            .call(isLargeScreen ? wrapTextMobile : wrapText);
        const tickLabelsY = d3.selectAll(".y-axis-labels");
        tickLabelsY.each(function removeTicks(d) {
            if (!isNaN(d)) {
                d3.select(this).remove();
            }
        });
        // create bar group <g>'s for each bar component
        const barGroups = svg.append('g')
            .attr('class', 'parent-g')
            .selectAll('.bar-group')
            .data(sortedNums)
            .enter()
            .append('g')
            .attr('class', 'bar-group')
            .attr('tabindex', 0);
        barGroups.append("rect")
            .attr('transform', tickMobileXAxis)
            .attr("x", -8)
            .attr("y", (d) => (isLargeScreen ? y(d.name) + 80 : y(d.name) + 40))
            .attr("width", isLargeScreen ? chartWidth + 340 : chartWidth + 90)
            .attr("height", y.bandwidth() - 36)
            .attr("fill", "#fff")
            .attr("stroke", "#f1f1f1")
            .attr('class', 'hbars')
            .attr('id', 'hlines');
        // append total budgetary resources bars
        barGroups.append("rect")
            .attr('transform', tickMobileXAxis)
            .attr("x", -8)
            .attr("y", (d) => (isLargeScreen ? y(d.name) + 80 : y(d.name) + 40))
            .attr("width", (d) => x(d._budgetaryResources) + 11)
            .attr("height", y.bandwidth() - 36)
            .attr("fill", "#BBDFC7")
            .attr('class', 'hbars');
        // append total obligations bars
        barGroups.append("rect")
            .attr('transform', tickMobileXAxis)
            .attr("x", -8)
            .attr("y", (d) => (isLargeScreen ? y(d.name) + 80 : y(d.name) + 40))
            .attr("width", (d) => x(d._obligations) + 11)
            .attr("height", y.bandwidth() - 36)
            .attr("fill", "#2B71B8")
            .attr('class', 'hbars');
        // on click drilldown
        svg.selectAll(".bar-group").on('click', (d) => {
            handleClick(d);
        });
        // tab through and enter key functionality
        svg.selectAll(".bar-group").on("keypress", (d) => {
            if (d3.event.keyCode === 13) {
                handleClick(d);
            }
        });
        // tooltip hover for label text
        svg.selectAll(".y-axis-labels").append("svg:title")
            .text((d) => d);
        if (level === 1) {
            svg.selectAll(".bar-group").on('click', null);
            svg.selectAll(".bar-group").on('keypress', null);
        }
        // horizontal border above legend
        svg.append('line')
            .attr('transform', tickMobileXAxis)
            .style("stroke", "#aeb0b5")
            .style("stroke-width", 1)
            .attr("x1", -250)
            .attr("y1", isMobile ? chartHeight + 1040 : horizontalBorderYPos())
            .attr("x2", isLargeScreen ? chartWidth + 330 : chartWidth + 100)
            .attr("y2", isMobile ? chartHeight + 1040 : horizontalBorderYPos());
        // append labels for legend below chart
        svg.append("circle")
            .attr("cx", isLargeScreen ? -130 : 180)
            .attr("cy", isMobile ? chartHeight + 1080 : legendObligationsYPos())
            .attr("r", 6)
            .style("fill", "#2B71B8");
        svg.append("circle")
            .attr("cx", isLargeScreen ? -130 : 375)
            .attr("cy", isMobile ? chartHeight + 1150 : legendResourcesYPos())
            .attr("r", 6)
            .style("fill", "#BBDFC7");
        svg.append("text")
            .attr("x", isLargeScreen ? -115 : 195)
            .attr("y", isMobile ? chartHeight + 1081 : legendObligationsYPos() + 1)
            .text(`FY${fy[2]}${fy[3]} Obligations`)
            .attr('class', 'y-axis-labels')
            .style('fill', '#555')
            .attr("alignment-baseline", "middle");
        svg.append("text")
            .attr("x", isLargeScreen ? -115 : 390)
            .attr("y", isMobile ? chartHeight + 1151 : legendResourcesYPos() + 1)
            .text(`FY${fy[2]}${fy[3]} Total Budgetary Resources`)
            .attr('class', 'y-axis-labels')
            .style('fill', '#555')
            .attr("alignment-baseline", "middle");
    };

    useEffect(() => {
        if (sortedNums?.length > 0) {
            renderChart();
        }
    }, [sortedNums, textScale]);

    useEffect(() => {
        if (results?.length > 0) {
            setSortedNums(results.sort((a, b) => (a._budgetaryResources > b._obligations ? b._budgetaryResources - a._budgetaryResources : b._obligations - a._obligations)));
        }
    }, [results]);


    return (
        <div id="sof_chart" className="status-of-funds__visualization" ref={chartRef} />
    );
};

StatusOfFundsChart.propTypes = propTypes;
export default StatusOfFundsChart;
