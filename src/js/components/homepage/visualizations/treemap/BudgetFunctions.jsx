/**
* BudgetFunctions.jsx
* Created by Emily Gullo 05/15/2017
**/

import React from 'react';
import * as d3 from 'd3';
import _ from 'lodash';
import * as MoneyFormatter from 'helpers/moneyFormatter';

import BudgetFunctionCell from './BudgetFunctionCell';
import TreeMapTooltip from './TreeMapTooltip';

const propTypes = {
    categories: React.PropTypes.object,
    colors: React.PropTypes.array,
    alternateColors: React.PropTypes.array,
    tooltipStyles: React.PropTypes.object,
    toggleSubfunction: React.PropTypes.func
};

const defaultProps = {
    showOverlay: true
};

const topFunctions = ["Social Security", "National Defense", "Medicare"];

export default class BudgetFunctions extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            windowWidth: 0,
            visualizationWidth: 0,
            visualizationHeight: 565,
            category: 'none',
            finalNodes: [],
            showOverlay: true,
            hoveredFunction: -1
        };

        this.handleWindowResize = _.throttle(this.handleWindowResize.bind(this), 50);
        this.buildTree = this.buildTree.bind(this);
        this.createTooltip = this.createTooltip.bind(this);
        this.toggleTooltipIn = this.toggleTooltipIn.bind(this);
        this.toggleTooltipOut = this.toggleTooltipOut.bind(this);
        this.toggleTooltipOut = this.toggleTooltipOut.bind(this);
    }

    componentDidMount() {
        this.handleWindowResize();
        window.addEventListener('resize', this.handleWindowResize);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.categories.children.length > 0) {
            this.buildTree(nextProps);
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
                this.buildTree(this.props);
            }
        }
    }

    buildTree(treeProps) {
        // put the data through d3's hierarchy system to sum and sort it
        const root = d3.hierarchy(treeProps.categories)
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
            let cellColor = treeProps.colors[i];
            let strokeColor = 'white';
            let strokeOpacity = 0.5;
            let textColor = treeProps.tooltipStyles.defaultStyle.textColor;
            let textShadow = treeProps.tooltipStyles.defaultStyle.textShadow;
            let textClass = '';

            if (this.state.showOverlay) {
                cellColor = treeProps.alternateColors[i];

                if (topFunctions.indexOf(n.data.name) > -1) {
                    cellColor = treeProps.colors[i];
                    strokeColor = '#F2B733';
                    strokeOpacity = 1;
                }
            }

            // Set highlighted state for hovered function
            if (this.state.hoveredFunction === n.data.id) {
                cellColor = treeProps.tooltipStyles.highlightedStyle.color;
                textColor = treeProps.tooltipStyles.highlightedStyle.textColor;
                textShadow = treeProps.tooltipStyles.highlightedStyle.textShadow;
                textClass = 'chosen';
            }

            if (n.value !== 0) {
                cell = (<BudgetFunctionCell
                    {...treeProps}
                    label={n.data.name}
                    value={n.value}
                    x0={n.x0}
                    x1={n.x1}
                    y0={n.y0}
                    y1={n.y1}
                    total={n.parent.value}
                    key={i}
                    functionID={n.data.id}
                    color={cellColor}
                    strokeColor={strokeColor}
                    strokeOpacity={strokeOpacity}
                    tooltipStyles={treeProps.tooltipStyles}
                    toggleTooltipIn={this.toggleTooltipIn}
                    toggleTooltipOut={this.toggleTooltipOut}
                    textColor={textColor}
                    textShadow={textShadow}
                    textClass={textClass}
                    clickable />);
            }

            return cell;
        });

        this.setState({
            finalNodes: nodes
        });
    }

    toggleTooltipIn(functionID) {
        const category = _.find(this.props.categories.children, 'id', functionID);
        let showOverlay = false;

        if (category !== null && topFunctions.indexOf(category.name) > -1) {
            showOverlay = true;
        }

        this.setState({
            showOverlay,
            hoveredFunction: functionID
        }, () => {
            this.buildTree(this.props);
        });
    }

    toggleTooltipOut() {
        this.setState({
            showOverlay: true,
            hoveredFunction: -1
        }, () => {
            this.buildTree(this.props);
        });
    }

    toggleSubfunction(selection) {
        this.props.toggleSubfunction(selection);
    }

    calculatePercentage() {
        return `${((this.state.individualValue / this.state.total) * 100).toFixed(1)}%`;
    }

    createTooltip() {
        let tooltip = null;
        if (this.state.category !== 'none') {
            tooltip = (<TreeMapTooltip
                name={this.state.category}
                value={MoneyFormatter.formatTreemapValues(this.state.individualValue)}
                percentage={this.calculatePercentage()}
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
