import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import { scaleLinear, scaleBand } from 'd3-scale';
import { throttle } from 'lodash';
import { largeScreen, mediumScreen, smallScreen } from 'dataMapping/shared/mobileBreakpoints';
import { FlexGridRow, TooltipWrapper } from 'data-transparency-ui';

const propTypes = {
    fy: PropTypes.string,
    results: PropTypes.array,
    level: PropTypes.number.isRequired,
    setLevel: PropTypes.func,
    toggle: PropTypes.bool
};

const StatusOfFundsChart = ({
    results, fy, setLevel, level, toggle
}) => {
    const chartRef = useRef();

    const [windowWidth, setWindowWidth] = useState(0);
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth < largeScreen);
    const [isMediumScreen, setIsMediumScreen] = useState(window.innerWidth < mediumScreen && window.innerWidth > smallScreen);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
    const [isNegative, setIsNegative] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [mouseValue, setMouseValue] = useState({ x: 0, y: 0 });
    const [sortedNums, setSortedNums] = useState(null);
    const [hoverData, setHoverData] = useState(null);

    let viewHeight;
    if (!toggle) {
        viewHeight = 760;
    } else {
        viewHeight = 1200;
    }
    const viewWidth = 1000;
    const margins = {
        top: 40, right: 0, bottom: 10, left: isLargeScreen ? 180 : 245
    };
    const chartHeight = viewHeight - margins.top - margins.bottom;
    const chartWidth = (viewWidth - margins.left - margins.right) + 60;
    let resultNames = [];

    const [textScale, setTextScale] = useState(viewWidth / viewWidth);

    const handleClick = (data) => {
        setLevel(1, data);
    };

    const setMouseData = throttle((e) => {
        const browser = window.navigator.userAgent;
        if (browser.includes('Chrome')) {
            setMouseValue({
                x: e.clientX - document.getElementById('sof_chart').getBoundingClientRect().left,
                y: (e.clientY - document.getElementById('sof_chart').getBoundingClientRect().top) + 5
            });
        }
        else if (browser.includes('Firefox') || browser.includes('Safari')) {
            setMouseValue({
                x: e.clientX - document.getElementById('sof_chart').getBoundingClientRect().left,
                y: e.clientY - document.getElementById('sof_chart').getBoundingClientRect().top
            });
        }
        else {
            setMouseValue({
                x: e.offsetX || e.clientX,
                y: e.offsetY || e.clientY
            });
        }
    }, 100);

    useEffect(() => {
        document?.getElementById('sof_chart')?.addEventListener('mousemove', setMouseData);
        return () => document?.getElementById('sof_chart')?.removeEventListener('mousemove', setMouseData);
    }, []);

    useEffect(() => {
        setTextScale(viewWidth / chartRef.current.getBoundingClientRect().width);

        const handleResize = throttle(() => {
            setTextScale(viewWidth / chartRef.current.getBoundingClientRect().width);
            const newWidth = window.innerWidth;
            if (windowWidth !== newWidth) {
                setWindowWidth(newWidth);
                setIsLargeScreen(newWidth < largeScreen);
                setIsMobile(newWidth < 600);
                setIsMediumScreen(newWidth < mediumScreen && newWidth > smallScreen);
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
            if (!toggle) {
                if (isMediumScreen) {
                    return chartHeight + 200;
                }
                return chartHeight + 575;
            }
            return chartHeight + 550;
        }
        return chartHeight;
    };
    const chartHeightViewBox = () => {
        if (window.innerWidth >= 992 && window.innerWidth < 1200 && toggle) {
            return viewHeight * 1.5;
        } else if (isMobile) {
            if (toggle) {
                return viewHeight * 2.54;
            }
            return (viewHeight + 10) * 2.4;
        } else if (isMediumScreen) {
            if (!toggle) {
                return 800 + margins.top + margins.bottom;
            }
            return 1600 + margins.top + margins.bottom;
        } else if (isLargeScreen) {
            if (!toggle) {
                return 1300 + margins.top + margins.bottom;
            }
            return 1500 + margins.top + margins.bottom;
        }

        return viewHeight * 1.06;
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
    const fontSizeScreenWidth = () => {
        if (isLargeScreen) {
            return 26;
        }
        return 18;
    };

    const tooltip = (data) => {
        if (hoverData) {
            return (
                <div className="sof-chart-tooltip">
                    <div className="tooltip__title">
                        {data.name}
                    </div>
                    <div className="tooltip__text">
                        <div className="tooltip__item">
                            <div
                                className="tooltip__circle"
                                style={!toggle ? { backgroundColor: '#2B71B8' } : { backgroundColor: '#FFBE2E' }} />
                            {!toggle && <div className="tooltip__text-label">FY{fy[2]}{fy[3]} Obligations</div> }
                            {!toggle && <div className="tooltip__text-amount">{data.obligations}</div>}
                            {toggle && <div className="tooltip__text-label">FY{fy[2]}{fy[3]} Outlays</div> }
                            {toggle && <div className="tooltip__text-amount">{data.outlays}</div>}
                        </div>
                        <div className="tooltip__item">
                            <div
                                className="tooltip__circle"
                                style={!toggle ? { backgroundColor: '#BBDFC7' } : { backgroundColor: 'transparent' }} />
                            {!toggle && <div className="tooltip__text-label">FY{fy[2]}{fy[3]} Total Budgetary<br />Resources</div>}
                            {!toggle && <div className="tooltip__text-amount">{data.budgetaryResources}</div>}
                        </div>
                        {level === 0 && (<><hr /><div className="tooltip__text-note">Click bar to view Federal Accounts</div></>)}
                    </div>
                </div>
            );
        }
        return '';
    };

    const renderChart = () => {
        if (!toggle) {
            // setup x and y scales
            const y = scaleBand()
                .range([0, isMobile ? viewHeight * 2.3 : chartHeightYScale()])
                .padding(isMobile ? 0.5 : paddingResize());
            const x = scaleLinear()
                .range([0, isLargeScreen ? chartWidth + 289 : chartWidth + 80]);

            const drawNegativeObligations = (data) => {
                if (data._obligations < 0) {
                    return (Math.abs(x(0) - x(data._obligations))) + 7;
                }
                return (Math.abs(x(0) - x(data._obligations))) + 2;
            };

            // append the svg object to the div
            d3.select('#sof_chart').selectAll('*').remove();
            const svg = d3.select('#sof_chart')
                .append('svg')
                .attr('class', 'svg')
                .on('mouseleave', () => {
                    setIsHovered(false);
                    setHoverData(null);
                })
                .attr('xmlns:xlink', 'http://www.w3.org/1999/xlink')
                .attr('preserveAspectRatio', 'none')
                .attr("viewBox", [0, 0, viewWidth + margins.left + margins.right, chartHeightViewBox()])
                .append('g')
                .attr('transform', `translate(${isLargeScreen ? margins.left - 40 : margins.left}, ${margins.top})`)
                .on('mouseleave', () => {
                    setIsHovered(false);
                    setHoverData(null);
                });
            const tickMobileXAxis = isLargeScreen ? 'translate(-130,0)' : 'translate(90, 0)';
            const tickMobileYAxis = () => {
                if (window.innerWidth >= 992 && window.innerWidth < 1200) {
                    return 'translate(-150,-60)';
                } else if (isLargeScreen) {
                    return 'translate(-150,-35)';
                }
                return 'translate(60,0)';
            };
            // scale to x and y data points
            if (sortedNums[sortedNums.length - 1]._obligations < 0) {
                x.domain(d3.extent(sortedNums, (d) => d._obligations)).nice(2);
            }
            else {
                x.domain([0, Math.max(sortedNums[0]._budgetaryResources, sortedNums[0]._obligations)]).nice(2);
            }
            // extract sorted agency names
            for (let i = 0; i < sortedNums.length; i++) {
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
                .call(d3.axisTop(x).tickFormat((d) => `${d3.format("$.2s")(d).replace('G', 'B').replace('0.0', '0')}`).tickSize(isLargeScreen ? -chartHeight - 510 : -chartHeight - 4).ticks(isLargeScreen ? 2 : 5))
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
                .style('font-size', isMobile ? '1.3rem' : '1.45rem')
                .attr("transform", `scale(${textScale} ${textScale})`)
                .on('mouseenter', () => {
                    setIsHovered(false);
                    setHoverData(null);
                });

            // shift x axis labels to match mock
            const tickTexts = d3.selectAll(".tick text");
            tickTexts.each(function mobileTextCount(d, i, n) {
                if (i === n.length - 1) d3.select(this).attr('dx', '-1.2em');
                if (isMobile) {
                    if (i === 0) d3.select(this).attr('dx', '0.2em');
                }
            });

            // manually add horizontal x axis line since we are removing .domain to hide the y axis line
            svg.append('line')
                .attr('transform', tickMobileXAxis)
                .style("stroke", "#d6d7d9")
                .style("stroke-width", 3)
                .attr("x1", -10)
                .attr("y1", 0)
                .attr("x2", () => {
                    if (sortedNums[0]._obligations < 0) {
                        return x(0);
                    }
                    return isLargeScreen ? chartWidth + 330 : chartWidth + 81;
                })
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
                .call(isLargeScreen ? wrapTextMobile : wrapText)
                .on('mouseenter', () => {
                    setIsHovered(false);
                    setHoverData(null);
                });
            const tickLabelsY = d3.selectAll(".y-axis-labels");
            tickLabelsY.each(function removeTicks(d) {
                if (isMobile) {
                    d3.select(this).attr('dx', '-0.25em');
                    d3.select(this).attr('dy', '-0.4em');
                }
                if (!isNaN(d)) {
                    d3.select(this).remove();
                }
            });
            // create bar group <g>'s for each bar component
            const barGroups = svg.append('g')
                .attr('class', 'parent-g')
                .on('mouseleave', () => {
                    setIsHovered(false);
                    setHoverData(null);
                })
                .selectAll('.bar-group')
                .data(sortedNums)
                .enter()
                .append('g')
                .attr('class', 'bar-group')
                .attr('tabindex', 0);
            barGroups.append("rect")
                .attr('transform', tickMobileXAxis)
                .attr("x", -8)
                .attr("y", (d) => {
                    if (isLargeScreen) {
                        if (isMediumScreen) {
                            return y(d.name) + 10;
                        }
                        return y(d.name);
                    }
                    return y(d.name) + 40;
                })
                .attr("width", isLargeScreen ? chartWidth + 340 : chartWidth + 90)
                .attr("height", () => {
                    if (!isMobile) {
                        if (isMediumScreen) {
                            return "31.12";
                        }
                        return "42.37";
                    }
                    return "63.63";
                })
                .attr("fill", "#fff")
                .attr("stroke", "#f1f1f1")
                .attr('class', 'hbars')
                .attr('id', 'hlines');
            // append total budgetary resources bars
            barGroups.append("rect")
                .attr('transform', tickMobileXAxis)
                .attr("x", -8)
                .attr("y", (d) => {
                    if (isLargeScreen) {
                        if (isMediumScreen) {
                            return y(d.name) + 10;
                        }
                        return y(d.name);
                    }
                    return y(d.name) + 40;
                })
                .attr("width", (d) => x(d._budgetaryResources) + 11)
                .attr("height", () => {
                    if (!isMobile) {
                        if (isMediumScreen) {
                            return "31.12";
                        }
                        return "42.37";
                    }
                    return "63.63";
                })
                .attr("fill", "#BBDFC7")
                .attr('class', 'hbars')
                .attr('id', 'tbr-bar');
            // append total obligations bars
            barGroups.append("rect")
                .attr('transform', tickMobileXAxis)
                .attr("x", (d) => {
                    if (d._obligations < 0) {
                        return x(Math.min(0, d._obligations)) - 8;
                    }
                    if (!isNegative) {
                        return x(0) - 8;
                    }
                    return x(0);
                })
                .attr("y", (d) => {
                    if (isLargeScreen) {
                        if (isMediumScreen) {
                            return y(d.name) + 10;
                        }
                        return y(d.name);
                    }
                    return y(d.name) + 40;
                })
                .attr("width", (d) => {
                    if (isNegative) {
                        return drawNegativeObligations(d);
                    }
                    if (d._obligations === 0) {
                        return 0;
                    }
                    return x(d._obligations) + 11;
                })
                .attr("height", () => {
                    if (!isMobile) {
                        if (isMediumScreen) {
                            return "31.12";
                        }
                        return "42.37";
                    }
                    return "63.63";
                })
                .attr("fill", "#2B71B8")
                .attr('class', 'hbars')
                .attr('id', 'obl-bar');


            if (isNegative) {
                svg.selectAll('#tbr-bar').remove();
            }
            // on click drilldown
            svg.selectAll(".bar-group").on('click', (event, d) => {
                handleClick(d);
            });
            svg.selectAll(".bar-group").on('touchend', (event, d) => {
                handleClick(d);
            });
            // tab through and enter key functionality
            svg.selectAll(".bar-group").on("keypress", (event, d) => {
                if (event.keyCode === 13) {
                    handleClick(d);
                }
            });
            // tooltip hover for bar groups
            svg.selectAll(".bar-group").on('mouseenter', (event, d) => {
                setIsHovered(true);
                setHoverData(d);
                tooltip(hoverData);
            });
            svg.selectAll(".bar-group").on('mouseleave', () => {
                setIsHovered(false);
                setHoverData(null);
            });

            // tooltip hover for label text
            svg.selectAll(".y-axis-labels").append("svg:title")
                .text((d) => d);
            if (level === 1) {
                svg.selectAll(".bar-group").on('click', null);
                svg.selectAll(".bar-group").on('keypress', null);
                svg.selectAll(".bar-group").on('touchend', null);
            }
            // horizontal border above legend
            svg.append('line')
                .attr('transform', tickMobileXAxis)
                .style("stroke", "#aeb0b5")
                .style("stroke-width", 1)
                .attr("x1", -320)
                .attr("y1", isMobile ? chartHeight + 1020 : horizontalBorderYPos())
                .attr("x2", isLargeScreen ? chartWidth + 330 : chartWidth + 85)
                .attr("y2", isMobile ? chartHeight + 1020 : horizontalBorderYPos());
            if (isNegative) {
                svg.append('line')
                    .attr('transform', tickMobileXAxis)
                    .style("stroke", "#aeb0b5")
                    .style("stroke-width", 3)
                    .attr("x1", x(0))
                    .attr("y1", 0)
                    .attr("x2", x(0))
                    .attr("y2", isLargeScreen ? chartHeight + 500 : chartHeight + 4);
            }
        }
        else {
            // setup x and y scales
            const y = scaleBand()
                .range([0, isMobile ? viewHeight * 2.5 : chartHeightYScale()])
                .padding(isMobile ? 0.7 : paddingResize());
            const x = scaleLinear()
                .range([0, isLargeScreen ? chartWidth + 289 : chartWidth + 80]);

            const drawNegativeOutlays = (data) => {
                if (data._outlays < 0) {
                    return (Math.abs(x(0) - x(data._outlays))) + 7;
                }
                return (Math.abs(x(0) - x(data._outlays))) + 2;
            };

            // append the svg object to the div
            d3.select('#sof_chart').selectAll('*').remove();
            const svg = d3.select('#sof_chart')
                .append('svg')
                .attr('class', 'svg')
                .on('mouseleave', () => {
                    setIsHovered(false);
                    setHoverData(null);
                })
                .attr('xmlns:xlink', 'http://www.w3.org/1999/xlink')
                .attr('preserveAspectRatio', 'none')
                .attr("viewBox", [0, 0, viewWidth + margins.left + margins.right, chartHeightViewBox()])
                .append('g')
                .attr('transform', `translate(${isLargeScreen ? margins.left - 40 : margins.left}, ${margins.top})`)
                .on('mouseleave', () => {
                    setIsHovered(false);
                    setHoverData(null);
                });
            const tickMobileXAxis = isLargeScreen ? 'translate(-130,0)' : 'translate(90, 0)';
            const tickMobileYAxis = () => {
                if (window.innerWidth >= 992 && window.innerWidth < 1200) {
                    return 'translate(-150,-85)';
                } else if (isMediumScreen && !isMobile) {
                    return 'translate(-150,-90)';
                } else if (!isLargeScreen) {
                    return 'translate(60,0)';
                }
                return 'translate(-150,-135)';
            };

            // scale to x and y data points
            if (sortedNums[sortedNums.length - 1]._outlays < 0) {
                x.domain(d3.extent(sortedNums, (d) => d._outlays)).nice(2);
            }
            else {
                x.domain([0, Math.max(sortedNums[0]._budgetaryResources, sortedNums[0]._outlays)]).nice(2);
            }
            // extract sorted agency names
            for (let i = 0; i < sortedNums.length; i++) {
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
                .call(d3.axisTop(x).tickFormat((d) => `${d3.format("$.2s")(d).replace('G', 'B').replace('0.0', '0')}`).tickSize(isLargeScreen ? -chartHeight - 510 : -chartHeight - 4).ticks(isLargeScreen ? 2 : 5))
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
                .style('font-size', isMobile ? '1.3rem' : '1.45rem')
                .attr("transform", `scale(${textScale} ${textScale})`)
                .on('mouseenter', () => {
                    setIsHovered(false);
                    setHoverData(null);
                });

            // shift x axis labels to match mock
            const tickTexts = d3.selectAll(".tick text");
            tickTexts.each(function mobileTextCount(d, i, n) {
                if (i === n.length - 1) d3.select(this).attr('dx', '-1.2em');
                if (isMobile) {
                    if (i === 0) d3.select(this).attr('dx', '0.2em');
                }
            });

            // manually add horizontal x axis line since we are removing .domain to hide the y axis line
            svg.append('line')
                .attr('transform', tickMobileXAxis)
                .style("stroke", "#d6d7d9")
                .style("stroke-width", 3)
                .attr("x1", -10)
                .attr("y1", 0)
                .attr("x2", () => {
                    if (sortedNums[0]._outlays < 0) {
                        return x(0);
                    }
                    return isLargeScreen ? chartWidth + 330 : chartWidth + 81;
                })
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
                .call(isLargeScreen ? wrapTextMobile : wrapText)
                .on('mouseenter', () => {
                    setIsHovered(false);
                    setHoverData(null);
                });
            const tickLabelsY = d3.selectAll(".y-axis-labels");
            tickLabelsY.each(function removeTicks(d) {
                if (isMobile) {
                    d3.select(this).attr('dx', '-0.25em');
                    d3.select(this).attr('dy', '-0.4em');
                }
                if (!isNaN(d)) {
                    d3.select(this).remove();
                }
            });
            // create bar group <g>'s for each bar component
            const barGroups = svg.append('g')
                .attr('class', 'parent-g')
                .on('mouseleave', () => {
                    setIsHovered(false);
                    setHoverData(null);
                })
                .selectAll('.bar-group')
                .data(sortedNums)
                .enter()
                .append('g')
                .attr('class', 'bar-group')
                .attr('tabindex', 0)
                .attr('transform', !isMobile ? "translate(0,-10)" : "translate(0,0)");
            barGroups.append("rect")
                .attr('transform', tickMobileXAxis)
                .attr("x", -8)
                .attr("y", (d) => {
                    if (!isMobile) {
                        if (isMediumScreen) {
                            return y(d.name) + 40;
                        }
                        return y(d.name) + 100;
                    }
                    return y(d.name) - 10;
                })
                .attr("width", isLargeScreen ? chartWidth + 340 : chartWidth + 90)
                .attr("height", () => {
                    if (!isMobile) {
                        if (isMediumScreen) {
                            return "31.12";
                        }
                        return "42.37";
                    }
                    return "63.63";
                })
                .attr("fill", "#fff")
                .attr("stroke", "#f1f1f1")
                .attr('class', 'hbars')
                .attr('id', 'hlines');
            // append total budgetary resources bars
            barGroups.append("rect")
                .attr('transform', tickMobileXAxis)
                .attr("x", -8)
                .attr("y", (d) => {
                    if (!isMobile) {
                        if (isMediumScreen || (window.innerWidth >= 992 && window.innerWidth < 1200)) {
                            return y(d.name);
                        }
                        return y(d.name) + 50;
                    }
                    return y(d.name) - 90;
                })
                .attr("width", (d) => x(d._budgetaryResources) + 11)
                .attr("height", () => {
                    if (!isMobile) {
                        if (isMediumScreen) {
                            return "31.12";
                        }
                        return "42.37";
                    }
                    return "63.63";
                })
                .attr('class', 'hbars')
                .attr('id', 'tbr-bar')
                .attr("style", "outline: thin solid #D7D8D9;")
                .attr('aria-disabled', "true")
                .attr("stroke-width", 2)
                .attr('fill', 'url(#diagonalHatch)');

            // append total outlay bars
            barGroups.append("rect")
                .attr('transform', tickMobileXAxis)
                .attr("x", (d) => {
                    if (d._outlays < 0) {
                        return x(Math.min(0, d._outlays)) - 8;
                    }
                    if (!isNegative) {
                        return x(0) - 8;
                    }
                    return x(0);
                })
                .attr("y", (d) => {
                    if (!isMobile) {
                        if (window.innerWidth >= 992 && window.innerWidth < 1200) {
                            return y(d.name) + 50;
                        } else if (isMediumScreen) {
                            return y(d.name) + 40;
                        }
                        return y(d.name) + 100;
                    }
                    return y(d.name) - 10;
                })
                .attr("width", (d) => {
                    if (isNegative) {
                        return drawNegativeOutlays(d);
                    }
                    if (d._outlays === 0) {
                        return 0;
                    }
                    return x(d._outlays) + 11;
                })
                .attr("height", () => {
                    if (!isMobile) {
                        if (isMediumScreen) {
                            return "31.12";
                        }
                        return "42.37";
                    }
                    return "63.63";
                })
                .attr("fill", "#FFBE2E")
                .attr('class', 'hbars')
                .attr('id', 'out-bar');

            if (isNegative) {
                svg.selectAll('#tbr-bar').remove();
            }
            // on click drilldown
            svg.selectAll("#out-bar").on('click', (event, d) => {
                handleClick(d);
            });
            svg.selectAll("#out-bar").on('touchend', (event, d) => {
                handleClick(d);
            });
            // tab through and enter key functionality
            svg.selectAll(".bar-group").on("keypress", (event, d) => {
                if (event.keyCode === 13) {
                    handleClick(d);
                }
            });
            // tooltip hover for bar groups
            svg.selectAll(".bar-group").on('mouseenter', (event, d) => {
                setIsHovered(true);
                setHoverData(d);
                tooltip(hoverData);
            });
            svg.selectAll(".out-bar").on('mouseleave', () => {
                setIsHovered(false);
                setHoverData(null);
            });

            // tooltip hover for label text
            svg.selectAll(".y-axis-labels").append("svg:title")
                .text((d) => d);
            if (level === 1) {
                svg.selectAll(".bar-group").on('click', null);
                svg.selectAll(".bar-group").on('keypress', null);
                svg.selectAll(".bar-group").on('touchend', null);
                svg.selectAll("#out-bar").on('click', null);
                svg.selectAll("#out-bar").on('keypress', null);
                svg.selectAll("#out-bar").on('touchend', null);
            }
            // horizontal border above legend
            svg.append('line')
                .attr('transform', tickMobileXAxis)
                .style("stroke", "#aeb0b5")
                .style("stroke-width", 1)
                .attr("x1", -320)
                .attr("y1", isMobile ? chartHeight + 1740 : horizontalBorderYPos())
                .attr("x2", isLargeScreen ? chartWidth + 330 : chartWidth + 85)
                .attr("y2", isMobile ? chartHeight + 1740 : horizontalBorderYPos());
            if (isNegative) {
                svg.append('line')
                    .attr('transform', tickMobileXAxis)
                    .style("stroke", "#aeb0b5")
                    .style("stroke-width", 3)
                    .attr("x1", x(0))
                    .attr("y1", 0)
                    .attr("x2", x(0))
                    .attr("y2", isLargeScreen ? chartHeight + 500 : chartHeight + 4);
            }
            svg.append('defs')
                .append('pattern')
                .attr("x", "0")
                .attr("y", "0")
                .attr('id', 'diagonalHatch')
                .attr('patternUnits', 'userSpaceOnUse')
                .attr('width', 1)
                .attr('height', 12)
                .attr("patternTransform", "rotate(-130, 4, 4)")
                .append('path')
                .attr('d', 'M -1,2 l 6,0')
                .attr('stroke', '#d7d8d9')
                .attr('stroke-width', 3);
        }
    };

    useEffect(() => {
        if (sortedNums?.length > 0) {
            renderChart(toggle);
        }
    }, [renderChart, sortedNums, textScale, hoverData, toggle]);

    useEffect(() => {
        if (results?.length > 0) {
            if (!toggle) {
                setSortedNums(results.sort((a, b) => (a._budgetaryResources > b._obligations ? b._budgetaryResources - a._budgetaryResources : b._obligations - a._obligations)));
                if (results[results.length - 1]._obligations < 0) {
                    setSortedNums(results.sort((a, b) => (a.obligations > b._obligations ? b._budgetaryResources - a._budgetaryResources : b._obligations - a._obligations)));
                    setIsNegative(true);
                }
            }
            else {
                setSortedNums(results.sort((a, b) => (a._budgetaryResources > b._outlays ? b._budgetaryResources - a._budgetaryResources : b._outlays - a._outlays)));
                if (results[results.length - 1]._obligations < 0) {
                    setSortedNums(results.sort((a, b) => (a.obligations > b._outlays ? b._budgetaryResources - a._budgetaryResources : b._outlays - a._outlays)));
                    setIsNegative(true);
                }
            }
        }
    }, [results, toggle]);


    return (
        <>
            {
                isHovered &&
                <TooltipWrapper
                    className="sof_chart-tt"
                    width={288}
                    styles={!toggle ? {
                        position: 'absolute',
                        transform: `translate(${mouseValue.x - 144}px,${mouseValue.y - 230}px)`
                    } : {
                        position: 'absolute',
                        transform: `translate(${mouseValue.x - 144}px,${mouseValue.y - 200}px)`
                    }}
                    tooltipPosition="bottom"
                    tooltipComponent={tooltip(hoverData)}
                    controlledProps={{
                        isControlled: true,
                        isVisible: isHovered,
                        showTooltip: () => { },
                        closeTooltip: () => { }
                    }} />
            }
            {isMobile &&
            <FlexGridRow className="legend" style={{ flexDirection: isLargeScreen ? 'column' : 'row' }}>
                <div className="legend__item">
                    <div
                        className="legend__circle"
                        style={!toggle ? { backgroundColor: '#2B71B8' } : { backgroundColor: '#FFBE2E' }} />
                    {!toggle && <div className="legend__text">FY{fy[2]}{fy[3]} Obligations</div>}
                    {toggle && <div className="legend__text">FY{fy[2]}{fy[3]} Outlays</div>}
                &nbsp;&nbsp;&nbsp;&nbsp;
                </div>
                <div className="legend__item">
                    <div
                        className="legend__circle"
                        style={!toggle ? { backgroundColor: '#BBDFC7' } : { display: 'transparent' }} />
                    {!toggle && <div className="legend__text">FY{fy[2]}{fy[3]} Total Budgetary Resources</div>}
                </div>
            </FlexGridRow>
            }
            <div id="sof_chart" className="status-of-funds__visualization" ref={chartRef} />
            {!isMobile &&
                <FlexGridRow className="legend" style={{ flexDirection: isLargeScreen ? 'column' : 'row' }}>
                    <div className="legend__item">
                        <div
                            className="legend__circle"
                            style={!toggle ? { backgroundColor: '#2B71B8' } : { backgroundColor: '#FFBE2E' }} />
                        {!toggle && <div className="legend__text">FY{fy[2]}{fy[3]} Obligations</div>}
                        {toggle && <div className="legend__text">FY{fy[2]}{fy[3]} Outlays</div>}
                        &nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                    <div className="legend__item">
                        <div
                            className="legend__circle"
                            style={!toggle ? { backgroundColor: '#BBDFC7' } : { display: 'transparent' }} />
                        {!toggle && <div className="legend__text">FY{fy[2]}{fy[3]} Total Budgetary Resources</div>}
                    </div>
                </FlexGridRow>
            }
        </>
    );
};

StatusOfFundsChart.propTypes = propTypes;
export default StatusOfFundsChart;
