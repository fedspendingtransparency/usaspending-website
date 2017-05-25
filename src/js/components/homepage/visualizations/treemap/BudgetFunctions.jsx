/**
* BudgetFunctions.jsx
* Created by Emily Gullo 05/15/2017
**/

import React from 'react';
import * as d3 from 'd3';
import _ from 'lodash';

import TreeMapCell from './TreeMapCell';
import TreeMapTooltip from './TreeMapTooltip';

const defaultProps = {
    showOverlay: true
};

const propTypes = {
    categories: React.PropTypes.object,
    colors: React.PropTypes.array,
    alternateColors: React.PropTypes.array,
    tooltipStyles: React.PropTypes.object,
    formatFriendlyString: React.PropTypes.func
};

export default class BudgetFunctions extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            windowWidth: 0,
            visualizationWidth: 0,
            visualizationHeight: 565,
            category: 'none',
            finalNodes: [],
            showOverlay: true
        };
        this.handleWindowResize = _.throttle(this.handleWindowResize.bind(this), 50);
        this.createTooltip = this.createTooltip.bind(this);
    }

    componentDidMount() {
        this.handleWindowResize();
        window.addEventListener('resize', this.handleWindowResize);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.categories.children.length > 0) {
            this.buildTree(nextProps.categories, nextProps.colors, nextProps.alternateColors,
                this.props.tooltipStyles);
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
    }

    handleWindowResize() {
        // determine if the width changed
        const windowWidth = window.innerWidth;
        if (this.state.windowWidth !== windowWidth) {
            // width changed, update the visualization width
            this.setState({
                windowWidth,
                visualizationWidth: this.sectionWrapper.offsetWidth
            });
            if (this.props.categories.children.length > 0) {
                this.buildTree(this.props.categories, this.props.colors, this.props.alternateColors,
                    this.props.tooltipStyles);
            }
        }
    }

    buildTree(cats, colors, altColors, styles) {
        // put the data through d3's hierarchy system to sum and sort it
        const root = d3.hierarchy(cats)
        .sum((d) => (d.value))
        .sort((a, b) => b.height - a.height || b.value - a.value);

        // set up a treemap object and pass in the root
        let tileStyle = d3.treemapBinary;
        if (window.innerWidth < 768) {
            tileStyle = d3.treemapSlice;
        }
        const treemap = d3.treemap()
        .round(true)
        .tile(tileStyle)
        .size([this.sectionWrapper.offsetWidth, this.state.visualizationHeight])(root).leaves();

        // build the tiles
        const nodes = treemap.map((n, i) => {
            let cell = '';
            let cellColor = '';
            let strokeColor = 'white';

            if (this.state.showOverlay) {
                cellColor = altColors[i];

                if (n.data.name === "Social Security" ||
                    n.data.name === "National Defense" ||
                    n.data.name === "Medicare") {
                    strokeColor = '#F2B733';
                    cellColor = colors[i];
                }
            }
            else if (!this.state.showOverlay) {
                cellColor = colors[i];
            }
            if (n.value !== 0) {
                // emily, passing down this.props will give 'em the functions
                cell = (<TreeMapCell
                    {...this.props}
                    label={n.data.name}
                    value={n.value}
                    x0={n.x0}
                    x1={n.x1}
                    y0={n.y0}
                    y1={n.y1}
                    total={n.parent.value}
                    key={i}
                    categoryID={n.data.id}
                    color={cellColor}
                    strokeColor={strokeColor}
                    tooltipStyles={styles}
                    toggleTooltipIn={this.toggleTooltipIn}
                    toggleTooltipOut={this.toggleTooltipOut}
                    clickable />);
            }
            return cell;
        });
        this.setState({
            finalNodes: nodes
        });
    }

    createTooltip() {
        let tooltip = null;
        if (this.state.category !== 'none') {
            tooltip = (<TreeMapTooltip
                name={this.state.category}
                value={this.props.formatFriendlyString(this.state.individualValue)}
                percentage={`${((this.state.individualValue / this.state.total) *
                    100).toFixed(1)}%`}
                description={this.state.description}
                x={this.state.x}
                y={this.state.y}
                width={this.state.width}
                height={(this.state.height / 2) + 50} />);
        }
        return tooltip;
    }

    render() {
        return (
            <div className="treemap-inner-wrap">
                { this.createTooltip() }
                <div
                    className="tree-wrapper"
                    ref={(sr) => {
                        this.sectionWrapper = sr;
                    }}>
                    <svg
                        width={this.state.visualizationWidth}
                        height={this.state.visualizationHeight}
                        className="treemap-svg overlay">
                        { this.state.finalNodes }
                    </svg>
                </div>
            </div>
        );
    }

}
BudgetFunctions.propTypes = propTypes;
BudgetFunctions.defaultProps = defaultProps;
