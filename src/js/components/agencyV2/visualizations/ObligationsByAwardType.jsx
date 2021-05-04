/**
 * ObligationsByAwardType.jsx
 * Created by Brett Varney 4/08/21
 */

import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

// import * as MoneyFormatter from 'helpers/moneyFormatter';

const propTypes = {
	height: PropTypes.number.isRequired,
	width: PropTypes.number.isRequired,
	outer: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string.isRequired,
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
	).isRequired
};

export default function ObligationsByAwardType({ height, width, outer, inner }) {


	console.log('drawing chart');
	console.log(JSON.parse(JSON.stringify( outer)));
	console.log(JSON.parse(JSON.stringify( inner)));


	const outerLabels = outer.map((d) => d.label);
	const outerData = outer.map((d) => d.value);
	const innerData = inner.map((d) => d.value);

	const labelRadius = Math.min(width, height) / 2 * .7;
	const outerRadius = labelRadius * .9;
	const outerStrokeWidth = 5;
	const innerRadius = labelRadius * .8;

	// append the svg object to the div
	d3.select('#obl_chart').selectAll('*').remove();
	const svg = d3.select('#obl_chart')
		.append('svg')
		.attr('width', width)
		.attr('height', height)
		.append('g')
		.attr('transform', `translate(${width / 2}, ${height / 2})`)
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

	const labelPos = d => {
		const pos = outerArc.centroid(d);
		const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
		pos[0] = labelRadius * (midangle < Math.PI ? 1 : -1);
		return pos;
	}

	// callout labels
	svg.selectAll()
		.data(outerPie)
		.enter()
		.append('text')
		.attr('transform', (d) => 'translate(' + labelPos(d) + ')')
		.attr('class', 'callout-labels')
		.text((d, i) => outerLabels[i])
		;

	// callout lines
	svg.selectAll()
		.data(outerPie)
		.enter()
		.append('polyline')
		.attr('points', (d) => [labelPos(d), outerArc.centroid(d)])
		.attr('stroke', 'black')
		.attr('stroke-width', 3)
		;

	return <div id='obl_chart' style={{ width: '100%' }} />;
}

ObligationsByAwardType.propTypes = propTypes;
