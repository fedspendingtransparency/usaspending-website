/**
 * HorizontalSingleStackedBarViz.jsx
 * Created by Afna Saifudeen
 **/

import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import { scaleLinear } from 'd3-scale';
import { throttle } from 'lodash';

const BarVizData = PropTypes.shape({
    rawValue: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    color: PropTypes.string,
    improper: PropTypes.object,
    isImproper: PropTypes.bool,
    labelSortOrder: PropTypes.number,
    labelPosition: PropTypes.string,
    denominatorValue: PropTypes.number,
    barWidthOverrides: PropTypes.shape({
        rawValue: PropTypes.number,
        denominatorValue: PropTypes.number
    }),
    children: PropTypes.arrayOf(PropTypes.shape({
        rawValue: PropTypes.number,
        value: PropTypes.string,
        text: PropTypes.string,
        color: PropTypes.string
    }))
});
const propTypes = {
    numerator: BarVizData,
    numerator2: BarVizData,
    denominator: BarVizData
};

const HorizontalSingleStackedBarViz = ({
    numerator,
    numerator2,
    denominator
}) => {
    const chartRef = useRef();
    const [windowWidth, setWindowWidth] = useState(0);
    const height = 400;
    const propsArr = [];

    const propValuesToArr = (num, num2, den) => {
        if (numerator.className === 'loan-subsidy') {
            propsArr.push(den.rawValue, num.rawValue, num2.rawValue);
        }
        else {
            propsArr.push(den.rawValue, num.rawValue, num.children[0].rawValue, num2.rawValue);
        }
    };
    propValuesToArr(numerator, numerator2, denominator);

    const currentAmountValue = numerator.value;
    const currentAmountLabel = numerator.text;
    const outlayedAmountValue = numerator2.value;
    const outlayedAmountLabel = numerator2.text;
    const outlayedAmountColor = numerator2.color;
    const obligatedAmountValue = numerator.children[0].value;
    const obligatedAmountLabel = numerator.children[0].text;
    const obligatedAmountColor = numerator.children[0].color;
    const potentialAmountValue = denominator.value;
    const potentialAmountLabel = denominator.text;
    const potentialAmountColor = denominator.color;
    const isNffZero = numerator.className === 'asst-non-federal-funding' && numerator.value === '$0';

    useEffect(() => {
        const renderBarChart = () => {
            // append the svg object to the div
            d3.select('#aa_chart').selectAll('*').remove();
            const chartSvg = d3.select('#aa_chart')
                .append('svg')
                .attr("height", height)
                .attr("width", "100%");
            // set x scale (potential amount as max domain)
            const x = scaleLinear()
                .range([0, windowWidth]);
            x.domain([0, propsArr[0]]);
            // parent g for nested bars (adjust y and height by constant factor to add more layers)
            // This does nothing
            chartSvg.append('g')
                .attr('class', 'parent-g')
                .selectAll('.bar-group');
            // outer rect
            chartSvg.append("rect")
                .attr("x", 0)
                .attr("y", height / 2.5)
                .attr("width", x(propsArr[0]))
                .attr("height", '50')
                .attr("fill", potentialAmountColor);
            // grants, direct payments, other
            if (numerator.className === "asst-non-federal-funding") {
                // obligated rect
                chartSvg.append("rect")
                    .attr("x", 0)
                    .attr("y", (height / 2.5) + 5)
                    .attr("width", x(propsArr[2]))
                    .attr("height", '40')
                    .attr("fill", obligatedAmountColor);
                // outlayed rect
                chartSvg.append("rect")
                    .attr("x", 0)
                    .attr("y", (height / 2.5) + 10)
                    .attr("width", x(propsArr[3]))
                    .attr("height", '30')
                    .attr("fill", outlayedAmountColor);
                if (!isNffZero) {
                    // nff rect
                    chartSvg.append("rect")
                        .attr("x", x(propsArr[2]) + 2)
                        .attr("y", (height / 2.5) + 7)
                        .attr("width", x(propsArr[0]))
                        .attr("height", '36')
                        .attr("fill", "none")
                        .attr("stroke", "#47AAA7")
                        .style("stroke-width", 4);
                    // current label
                    chartSvg.append("foreignObject")
                        .attr('width', x(propsArr[1]) - 10)
                        .attr('height', 70)
                        .attr('x', 0)
                        .attr('y', 230)
                        .html(`<div className="award-amounts-viz-outlays__desc-text"><strong>${currentAmountValue}</strong><br />${currentAmountLabel}</div>`)
                        .select('div')
                        .style('float', 'right')
                        .style('text-align', 'right')
                        .select('strong')
                        .style('font-size', '20px');
                }
                // potential line
                chartSvg.append("line")
                    .attr("x1", x(propsArr[0]) - 2)
                    .attr("y1", (height / 2.5))
                    .attr("x2", x(propsArr[0]) - 2)
                    .attr("y2", height - 50)
                    .style("stroke-width", 4)
                    .style("stroke", potentialAmountColor)
                    .style("fill", "none");
                // outlay line
                chartSvg.append("line")
                    .attr("x1", x(propsArr[3]) - 2)
                    .attr("y1", 20)
                    .attr("x2", x(propsArr[3]) - 2)
                    .attr("y2", (height / 2.5) + 35)
                    .style("stroke-width", 4)
                    .style("stroke", outlayedAmountColor)
                    .style("fill", "none");
                // obligated line
                chartSvg.append("line")
                    .attr("x1", x(propsArr[2]) - 2)
                    .attr("y1", 90)
                    .attr("x2", x(propsArr[2]) - 2)
                    .attr("y2", (height / 2.5) + 45)
                    .style("stroke-width", 4)
                    .style("stroke", obligatedAmountColor)
                    .style("fill", "none");
                if (!isNffZero) {
                    // current line
                    chartSvg.append("line")
                        .attr("x1", x(propsArr[1]) - 2)
                        .attr("y1", (height / 2.5) + 5)
                        .attr("x2", x(propsArr[1]) - 2)
                        .attr("y2", 275)
                        .style("stroke-width", 4)
                        .style("stroke", numerator.className === "asst-non-federal-funding" ? "#47AAA7" : "#8aa6c9")
                        .style("fill", "none");
                }
                // obligated label
                chartSvg.append("foreignObject")
                    .attr('width', x(propsArr[0]) - x(propsArr[2]) <= 100 ? x(propsArr[2]) - x(propsArr[3]) - 10 : x(propsArr[0]) - x(propsArr[2]) - 10)
                    .attr('height', 70)
                    .attr('x', x(propsArr[0]) - x(propsArr[2]) <= 100 ? x(propsArr[3]) : x(propsArr[2]) + 10)
                    .attr('y', 90)
                    .html(`<div className="award-amounts-viz-outlays__desc-text"><strong>${obligatedAmountValue}</strong><br />${obligatedAmountLabel}</div>`)
                    .select('div')
                    .style('float', x(propsArr[0]) - x(propsArr[2]) <= 100 ? 'right' : 'left')
                    .style('text-align', x(propsArr[0]) - x(propsArr[2]) <= 100 ? 'right' : 'left')
                    .select('strong')
                    .style('font-size', '20px');
            }
            else {
                // current rect
                chartSvg.append("rect")
                    .attr("x", 0)
                    .attr("y", (height / 2.5) + 5)
                    .attr("width", x(propsArr[1]))
                    .attr("height", '40')
                    .attr("fill", "#8aa6c9");
                // obligated rect
                if (obligatedAmountValue.indexOf("$0") < 0) {
                    chartSvg.append("rect")
                        .attr("x", 0)
                        .attr("y", (height / 2.5) + 10)
                        .attr("width", x(propsArr[2]))
                        .attr("height", '30')
                        .attr("fill", obligatedAmountColor);
                }
                // outlayed rect
                if (outlayedAmountValue.indexOf("$0") < 0) {
                    chartSvg.append("rect")
                        .attr("x", 0)
                        .attr("y", (height / 2.5) + 15)
                        .attr("width", x(propsArr[3]))
                        .attr("height", '20')
                        .attr("fill", outlayedAmountColor);
                }
                // potential line
                chartSvg.append("line")
                    .attr("x1", x(propsArr[0]) - 2)
                    .attr("y1", (height / 2.5))
                    .attr("x2", x(propsArr[0]) - 2)
                    .attr("y2", height - 50)
                    .style("stroke-width", 4)
                    .style("stroke", potentialAmountColor)
                    .style("fill", "none");
                // current line
                chartSvg.append("line")
                    .attr("x1", x(propsArr[1]) - 2)
                    .attr("y1", (height / 2.5) + 5)
                    .attr("x2", x(propsArr[1]) - 2)
                    .attr("y2", 275)
                    .style("stroke-width", 4)
                    .style("stroke", numerator.className === "asst-non-federal-funding" ? "#47AAA7" : "#8aa6c9")
                    .style("fill", "none");
                // obligated line
                if (obligatedAmountValue.indexOf("$0") < 0) {
                    chartSvg.append("line")
                        .attr("x1", x(propsArr[2]) > 100 ? x(propsArr[2]) - 2 : x(propsArr[2]) + 2)
                        .attr("y1", 90)
                        .attr("x2", x(propsArr[2]) > 100 ? x(propsArr[2]) - 2 : x(propsArr[2]) + 2)
                        .attr("y2", (height / 2.5) + 40)
                        .style("stroke-width", 4)
                        .style("stroke", obligatedAmountColor)
                        .style("fill", "none");
                }
                // outlay line
                if (outlayedAmountValue.indexOf("$0") < 0) {
                    chartSvg.append("line")
                        .attr("x1", x(propsArr[3]) > 100 ? x(propsArr[3]) - 2 : x(propsArr[3]) + 2)
                        .attr("y1", 20)
                        .attr("x2", x(propsArr[3]) > 100 ? x(propsArr[3]) - 2 : x(propsArr[3]) + 2)
                        .attr("y2", (height / 2.5) + 35)
                        .style("stroke-width", 4)
                        .style("stroke", outlayedAmountColor)
                        .style("fill", "none");
                }
                // current label
                chartSvg.append("foreignObject")
                    .attr('width', x(propsArr[1]) - 10)
                    .attr('height', 70)
                    .attr('x', 0)
                    .attr('y', 230)
                    .html(`<div className="award-amounts-viz-outlays__desc-text"><strong>${currentAmountValue}</strong><br />${currentAmountLabel}</div>`)
                    .select('div')
                    .style('float', 'right')
                    .style('text-align', 'right')
                    .select('strong')
                    .style('font-size', '20px');
                // obligated label
                if (obligatedAmountValue.indexOf("$0") < 0) {
                    chartSvg.append("foreignObject")
                        .attr('width', x(propsArr[0]) - x(propsArr[2]) <= 100 ? x(propsArr[2]) - 10 : x(propsArr[0]) - x(propsArr[2]) - 10)
                        .attr('height', 70)
                        .attr('x', x(propsArr[0]) - x(propsArr[2]) <= 100 ? 0 : x(propsArr[2]) + 10)
                        .attr('y', 90)
                        .html(`<div className="award-amounts-viz-outlays__desc-text"><strong>${obligatedAmountValue}</strong><br />${obligatedAmountLabel}</div>`)
                        .select('div')
                        .style('float', x(propsArr[0]) - x(propsArr[2]) <= 100 ? 'right' : 'left')
                        .style('text-align', x(propsArr[0]) - x(propsArr[2]) <= 100 ? 'right' : 'left')
                        .select('strong')
                        .style('font-size', '20px');
                }
            }
            // outer rect label
            chartSvg.append("foreignObject")
                .attr('width', x(propsArr[0]) - 10)
                .attr('height', 60)
                .attr('x', 0)
                .attr('y', 300)
                .html(`<div className="award-amounts-viz-outlays__desc-text"><strong>${potentialAmountValue}</strong><br />${potentialAmountLabel}</div>`)
                .select('div')
                .style('float', 'right')
                .style('text-align', 'right')
                .select('strong')
                .style('font-size', '20px');
            // outlay label
            if (outlayedAmountValue.indexOf("$0") < 0) {
                chartSvg.append("foreignObject")
                    .attr('width', x(propsArr[0]) - x(propsArr[3]) <= 100 ? x(propsArr[3]) - 10 : x(propsArr[0]) - x(propsArr[3]) - 10)
                    .attr('height', 70)
                    .attr('x', x(propsArr[0]) - x(propsArr[3]) <= 100 ? 0 : x(propsArr[3]) + 10)
                    .attr('y', 20)
                    .html(`<div className="award-amounts-viz-outlays__desc-text"><strong>${outlayedAmountValue}</strong><br />${outlayedAmountLabel}</div>`)
                    .select('div')
                    .style('float', x(propsArr[0]) - x(propsArr[3]) <= 100 ? 'right' : 'left')
                    .style('text-align', x(propsArr[0]) - x(propsArr[3]) <= 100 ? 'right' : 'left')
                    .select('strong')
                    .style('font-size', '20px');
            }
        };
        // for Loans award type only
        const renderBarChartLoans = () => {
            // append the svg object to the div
            d3.select('#aa_chart').selectAll('*').remove();
            const chartSvg = d3.select('#aa_chart')
                .append('svg')
                .attr("height", height)
                .attr("width", '100%');
            // set x scale (potential amount as max domain)
            const x = scaleLinear()
                .range([0, windowWidth]);
            x.domain([0, propsArr[0]]);
            // parent g for nested bars (adjust y and height by constant factor to add more layers)
            chartSvg.append('g')
                .attr('class', 'parent-g')
                .selectAll('.bar-group');
            // face value of direct loan rect
            chartSvg.append("rect")
                .attr("x", 0)
                .attr("y", height / 2.5)
                .attr("width", x(propsArr[0]))
                .attr("height", '50')
                .attr("fill", "#ded5db");
            // subsidy cost rect
            chartSvg.append("rect")
                .attr("x", 0)
                .attr("y", (height / 2.5) + 5)
                .attr("width", x(propsArr[1]))
                .attr("height", '40')
                .attr("fill", "#8c6e86");
            // outlayed rect
            chartSvg.append("rect")
                .attr("x", 0)
                .attr("y", (height / 2.5) + 10)
                .attr("width", x(propsArr[2]) < 8 ? 8 + x(propsArr[2]) : x(propsArr[2]))
                .attr("height", '30')
                .attr("fill", outlayedAmountColor);
            // face value line
            chartSvg.append("line")
                .attr("x1", x(propsArr[0]) - 2)
                .attr("y1", (height / 2.5) + 5)
                .attr("x2", x(propsArr[0]) - 2)
                .attr("y2", 275)
                .style("stroke-width", 4)
                .style("stroke", "#ded5db")
                .style("fill", "none");
            // subsidy line
            chartSvg.append("line")
                .attr("x1", x(propsArr[1]) - 2)
                .attr("y1", 90)
                .attr("x2", x(propsArr[1]) - 2)
                .attr("y2", (height / 2.5) + 45)
                .style("stroke-width", 4)
                .style("stroke", "#8c6e86")
                .style("fill", "none");
            // outlay line
            chartSvg.append("line")
                .attr("x1", (x(propsArr[2]) - 2) < 8 ? 8 + (x(propsArr[2]) - 2) : (x(propsArr[2]) - 2))
                .attr("y1", 20)
                .attr("x2", (x(propsArr[2]) - 2) < 8 ? 8 + (x(propsArr[2]) - 2) : (x(propsArr[2]) - 2))
                .attr("y2", (height / 2.5) + 40)
                .style("stroke-width", 4)
                .style("stroke", "#0b2e5a")
                .style("fill", "none");
            // subsidy label
            chartSvg.append("foreignObject")
                .attr('width', x(propsArr[0]) - x(propsArr[1]) <= 100 ? x(propsArr[1]) - 10 : x(propsArr[0]) - x(propsArr[1]) - 10)
                .attr('height', 70)
                .attr('x', x(propsArr[0]) - x(propsArr[1]) <= 100 ? 0 : x(propsArr[1]) + 10)
                .attr('y', 90)
                .html(`<div className="award-amounts-viz-outlays__desc-text"><strong>${currentAmountValue}</strong><br />${currentAmountLabel}</div>`)
                .select('div')
                .style('float', x(propsArr[0]) - x(propsArr[1]) <= 100 ? 'right' : 'left')
                .style('text-align', x(propsArr[0]) - x(propsArr[1]) <= 100 ? 'right' : 'left')
                .select('strong')
                .style('font-size', '20px');
            const outlayLabelMinXPos = (outlayScaled) => {
                if (outlayScaled <= 16) {
                    return 16;
                }
                return outlayScaled + 10;
            };
            // outlay label
            chartSvg.append("foreignObject")
                .attr('width', x(propsArr[0]) - x(propsArr[2]) <= 100 ? x(propsArr[2]) - 10 : x(propsArr[0]) - x(propsArr[2]) - 10)
                .attr('height', 70)
                .attr('x', x(propsArr[0]) - x(propsArr[2]) <= 100 ? 0 : outlayLabelMinXPos(x(propsArr[2])))
                .attr('y', 20)
                .html(`<div className="award-amounts-viz-outlays__desc-text"><strong>${outlayedAmountValue}</strong><br />${outlayedAmountLabel}</div>`)
                .select('div')
                .style('float', x(propsArr[0]) - x(propsArr[2]) <= 100 ? 'right' : 'left')
                .style('text-align', x(propsArr[0]) - x(propsArr[2]) <= 100 ? 'right' : 'left')
                .select('strong')
                .style('font-size', '20px');
            // face value label
            chartSvg.append("foreignObject")
                .attr('width', x(propsArr[0]) - 10)
                .attr('height', 70)
                .attr('x', 0)
                .attr('y', 230)
                .html(`<div className="award-amounts-viz-outlays__desc-text"><strong>${potentialAmountValue}</strong><br />${potentialAmountLabel}</div>`)
                .select('div')
                .style('float', 'right')
                .style('text-align', 'right')
                .select('strong')
                .style('font-size', '20px');
        };
        // init width if 0 to prevent first render bug
        if (windowWidth === 0) {
            const newWidth = chartRef.current.getBoundingClientRect().width;
            setWindowWidth(newWidth);
        }
        if (numerator.className === 'loan-subsidy') {
            renderBarChartLoans();
        }
        else {
            renderBarChart();
        }
    }, [windowWidth, propsArr]);

    useEffect(() => {
        const handleResize = throttle(() => {
            const newWidth = chartRef.current.getBoundingClientRect().width;
            setWindowWidth(newWidth);
        }, 50);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="award-amounts-viz">
            <div id="aa_chart" className="award-amounts-viz-outlays" ref={chartRef} />
        </div>
    );
};

export default HorizontalSingleStackedBarViz;
HorizontalSingleStackedBarViz.propTypes = propTypes;
