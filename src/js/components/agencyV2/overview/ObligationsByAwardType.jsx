/**
 * ObligationsByAwardType.jsx
 * Created by Brett Varney 4/08/21
 */

import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

import * as MoneyFormatter from 'helpers/moneyFormatter';

export default class ObligationsByAwardType extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    height: PropTypes.number.required,
    width: PropTypes.number.required,
  };
  // static defaultProps = {
  // };

  // componentDidMount = () => this.setState({ prerender: false });

  // shouldComponentUpdate = () => this.state.prerender;

  render = () => {
    var margin = 10;
    var radius = Math.min(this.props.width, this.props.height) / 2 - margin;

    // append the svg object to the div called 'my_dataviz'
    d3.select('#obl_chart').selectAll('*').remove();
    var svg = d3.select('#obl_chart')
      .append('svg')
      .attr('width', this.props.width)
      .attr('height', this.props.height)
      .append('g')
      .attr('transform', 'translate(' + this.props.width / 2 + ',' + this.props.height / 2 + ')')
      ;

    // Create dummy data
    var data1 = [9, 20, 30, 5, 12, 10];
    var data2 = [64, 22, 8];

    const categoriesArc = d3.arc().outerRadius(radius).innerRadius(radius - 5);
    const pie = d3.pie().sortValues(null);
    const categoriesPie = pie(data2);
    const categoriesColors = d3.scaleOrdinal(['#FFBC78', '#A9ADD1']); // [Assistance, Contracts]
    const detailsPie = pie(data1);
    const detailsColors = d3.scaleOrdinal(['#C05600', '#FA9441', '#E66F0E', '#FFBC78', '#545BA3', '#A9ADD1']); // [Grants, Loans, Direct Payments, Other FA, Contract IDV, Contracts]

    // categories
    svg
      .selectAll()
      .data(categoriesPie)
      .enter()
      .append('path')
      .attr('d', categoriesArc)
      .attr('fill', (d, i) => categoriesColors(i))
      ;

    // details
    svg
      .selectAll()
      .data(detailsPie)
      .enter()
      .append('path')
      .attr('d', d3.arc()
        .outerRadius(radius - 10)
        .innerRadius(radius / 2)
      )
      .attr('fill', (d, i) => detailsColors(i))
      ;

    // border between categories (assumes only 2)
    const borders = [[0, radius], [0, 0], [categoriesPie[0].endAngle, radius]];
    svg
      .selectAll()
      .data([0])
      .enter()
      .append('path')
      .attr('d', d3.lineRadial()(borders))
      .attr('stroke', 'white')
      .attr('stroke-width', '3')
      .attr('fill', 'none')
      ;

    // callout lines
    svg
      .selectAll()
      .data(categoriesPie)
      .enter()
      .append('polyline')
      .attr('points', d => [[0, 0], categoriesArc.centroid(d)])
      .attr('stroke', 'black')
      .attr('stroke-width', '3')
      .attr('fill', 'none')
      ;

    return <div id='obl_chart' style={{ width: '100%' }} />;
  }
}
