/**
 * ObligationsByAwardType.jsx
 * Created by Brett Varney 4/08/21
 */

import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import { useSelector } from 'react-redux';

import { fetchObligationsByAwardType } from 'apis/agencyV2';
// import * as MoneyFormatter from 'helpers/moneyFormatter';

export default function ObligationsByAwardType({ height, width, fiscalYear }) {
	React.useEffect(() => { drawChart() });

	// reduce api data into 2 arrays, one for each ring
	const categories = [0, 0];
	const details = [];

	// set other data-related values
	const categoriesColors = d3.scaleOrdinal(['#FFBC78', '#A9ADD1']); // parallel to categories
	const categoriesLabels = ['Financial/nAssistance', 'Contracts'];
	const detailsColors = d3.scaleOrdinal(['#C05600', '#FA9441', '#E66F0E', '#FFBC78', '#545BA3', '#A9ADD1']); // parallel to details
	const detailsLabels = ['Grants', 'Loans', 'Direct Payments', 'Other', 'IDVs', 'Contracts'];

	const { id } = useSelector((state) => state.agencyV2.overview);
	const apiData = fetchObligationsByAwardType(id, fiscalYear);
	apiData.promise.then(res => { console.log(res) });

	function getData() {
		const raw = [
			{
				"category": "contracts",
				"aggregated_amount": 30
			},
			{
				"category": "direct_payments",
				"aggregated_amount": 50
			},
			{
				"category": "grants",
				"aggregated_amount": 10
			},
			{
				"category": "idvs",
				"aggregated_amount": 20
			},
			{
				"category": "loans",
				"aggregated_amount": 90
			},
			{
				"category": "other",
				"aggregated_amount": 15
			}
		];

		raw.forEach((datum) => {
			switch (datum.category) {
				case 'grants':
					categories[0] += datum.aggregated_amount;
					details[0] = datum.aggregated_amount;
					break;
				case 'loans':
					categories[0] += datum.aggregated_amount;
					details[1] = datum.aggregated_amount;
					break;
				case 'direct_payments':
					categories[0] += datum.aggregated_amount;
					details[2] = datum.aggregated_amount;
					break;
				case 'other':
					categories[0] += datum.aggregated_amount;
					details[3] = datum.aggregated_amount;
					break;
				case 'idvs':
					categories[1] += datum.aggregated_amount;
					details[4] = datum.aggregated_amount;
					break;
				case 'contracts':
					categories[1] += datum.aggregated_amount;
					details[5] = datum.aggregated_amount;
					break;
				default:
					console.error('Category name from API not recognized: ' + category);
			};
		});
	}

	function drawChart() {
		getData();

		const labelRadius = Math.min(width, height) / 2 * .7;
		const categoriesRadius = labelRadius * .9;
		const categoriesStrokeWidth = 5;
		const detailsRadius = labelRadius * .8;

		// append the svg object to the div called 'my_dataviz'
		d3.select('#obl_chart').selectAll('*').remove();
		const svg = d3.select('#obl_chart')
			.append('svg')
			.attr('width', width)
			.attr('height', height)
			.append('g')
			.attr('transform', `translate(${width / 2}, ${height / 2})`)
			;

		const categoriesArc = d3.arc().outerRadius(categoriesRadius).innerRadius(categoriesRadius - categoriesStrokeWidth);
		const categoriesPie = d3.pie().sortValues(null)(categories);
		const detailsPie = d3.pie().sortValues(null)(details);

		// categories
		svg.selectAll()
			.data(categoriesPie)
			.enter()
			.append('path')
			.attr('d', categoriesArc)
			.attr('fill', (d, i) => categoriesColors(i))
			;

		// details
		svg.selectAll()
			.data(detailsPie)
			.enter()
			.append('path')
			.attr('d', d3.arc()
				.outerRadius(detailsRadius)
				.innerRadius(detailsRadius / 2)
			)
			.attr('fill', (d, i) => detailsColors(i))
			;

		// border between categories (assumes only 2 categories)
		const borders = [[0, categoriesRadius], [0, 0], [categoriesPie[0].endAngle, categoriesRadius]];
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
			const pos = categoriesArc.centroid(d);
			const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
			pos[0] = labelRadius * (midangle < Math.PI ? 1 : -1);
			return pos;
		}

		// callout labels
		svg.selectAll()
			.data(categoriesPie)
			.enter()
			.append('text')
			.attr('transform', (d) => 'translate(' + labelPos(d) + ')')
			.attr('class', 'callout-labels')
			.text((d, i) => categoriesLabels[i])
			;

		// callout lines
		svg.selectAll()
			.data(categoriesPie)
			.enter()
			.append('polyline')
			.attr('points', (d) => [labelPos(d), categoriesArc.centroid(d)])
			.attr('stroke', 'black')
			.attr('stroke-width', 3)
			;
	}

	return <div id='obl_chart' style={{ width: '100%' }} />;
}

ObligationsByAwardType.propTypes = {
	height: PropTypes.number.isRequired,
	width: PropTypes.number.isRequired,
	fiscalYear: PropTypes.number
};
