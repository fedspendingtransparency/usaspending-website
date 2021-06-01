/**
 * ObligationsByAwardType.jsx
 * Created by Brett Varney 4/08/21
 */

import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
// import { de } from 'date-fns/locale';

// import * as MoneyFormatter from 'helpers/moneyFormatter';

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

	const resizeChart = () => {
		const rect = chartRef.current.parentElement.getBoundingClientRect();
		if (rect.height !== chartRect[0] || rect.width !== chartRect[1]) {
			setChartRect([rect.height, rect.width]);
		}
	}

	React.useEffect(() => { resizeChart(); }, [windowWidth]);

	const outerLabels = outer.map((d) => d.label);
	const outerData = outer.map((d) => d.value);
	const innerData = inner.map((d) => d.value);

	const labelRadius = Math.min(chartRect[0], chartRect[1]) / 2;
	const outerRadius = labelRadius * .7;
	const outerStrokeWidth = 5;
	const innerRadius = outerRadius * .9;

	// append the svg object to the div
	d3.select('#obl_chart').selectAll('*').remove();
	const svg = d3.select('#obl_chart')
		.append('svg')
		.attr('height', chartRect[0])
		.attr('width', chartRect[1])
		.append('g')
		.attr('transform', `translate(${chartRect[1] / 2}, ${chartRect[0] / 2})`)
		;

	const outerArc = d3.arc().outerRadius(outerRadius).innerRadius(outerRadius - outerStrokeWidth);
	const outerPie = d3.pie().sortValues(null)(outerData);
	const innerPie = d3.pie().sortValues(null)(innerData);

	// outer ring
	svg.selectAll()
		.data(outerPie)
		.enter()
		.append('path')
		.attr('d', outerArc)
		.attr('fill', (d, i) => outer[i].color)
		;

	// inner ring
	svg.selectAll()
		.data(innerPie)
		.enter()
		.append('path')
		.attr('d', d3.arc()
			.outerRadius(innerRadius)
			.innerRadius(innerRadius / 2)
		)
		.attr('fill', (d, i) => inner[i].color)
		;

	// border between categories (assumes only 2 categories)
	const borders = [[0, outerRadius], [0, 0], [outerPie[0].endAngle, outerRadius]];
	svg.selectAll()
		.data([0]) // one polyline, data in borders
		.enter()
		.append('path')
		.attr('d', d3.lineRadial()(borders))
		.attr('stroke', 'white')
		.attr('stroke-width', 3)
		.attr('fill', 'none')
		;

	// labels
	const labelPos = (i, yOffset = 0) => {
		// labels at top left/bottom right or top right/bottom left
		const labelAngle = outerData[0] < outerData[1] ? -.8 : .8;
		const labelDirection = i == 0 ? 1 : -1;

		return [labelRadius * labelDirection * Math.cos(labelAngle), labelRadius * labelDirection * Math.sin(labelAngle) + yOffset];

		// const pos = outerArc.centroid(d);
		// const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
		// pos[0] = labelRadius * (midangle < Math.PI ? 1 : -1);
		// pos[1] += yOffset;
		// const pos = [[70, 55], [-70, -55]]
		// return [pos[d][0], pos[d][1] + yOffset];
	}

	svg.selectAll()
		.data(outerPie)
		.enter()
		.append('text')
		.attr('transform', (d, i) => 'translate(' + labelPos(i) + ')')
		.attr('class', 'callout-labels')
		.text((d, i) => outerLabels[i][0])
		;

	svg.selectAll()
		.data(outerPie)
		.enter()
		.append('text')
		.attr('transform', (d, i) => 'translate(' + labelPos(i, 12) + ')')
		.attr('class', 'callout-labels')
		.text((d, i) => outerLabels[i][1])
		;

	// callout lines
	// svg.selectAll()
	// 	.data(outerPie)
	// 	.enter()
	// 	.append('polyline')
	// 	.attr('points', (d, i) => {
	// 		const label = labelPos(i);
	// 		const tail = label[1] < 0 ? 5 : -5;
	// 		return [[label[0], label[1] + tail], [label[0], label[1] + tail * 2], outerArc.centroid(d)]
	// 	})
	// 	.attr('fill', 'none')
	// 	.attr('stroke', '#757575')
	// 	.attr('stroke-width', 1)
	// 	;

	return <div id='obl_chart' ref={chartRef} />;
}

ObligationsByAwardType.propTypes = propTypes;
