/**
* BudgetFunctions.jsx
* Created by Emily Gullo 05/15/2017
**/

import React from 'react';
import { hierarchy, treemap, treemapBinary, treemapSlice } from 'd3-hierarchy';
import _ from 'lodash';
import * as MoneyFormatter from 'helpers/moneyFormatter';

import BudgetFunctionCell from './BudgetFunctionCell';
import TreeMapTooltip from '../TreeMapTooltip';

const propTypes = {
    categories: React.PropTypes.object,
    descriptions: React.PropTypes.array,
    toggleSubfunction: React.PropTypes.func,
    totalNumber: React.PropTypes.number,
    showSubfunctions: React.PropTypes.bool
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
            finalNodes: [],
            showOverlay: true,
            hoveredFunction: -1
        };

        this.handleWindowResize = _.throttle(this.handleWindowResize.bind(this), 50);
        this.buildTree = this.buildTree.bind(this);
        this.createTooltip = this.createTooltip.bind(this);
        this.toggleTooltipIn = this.toggleTooltipIn.bind(this);
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
        const root = hierarchy(treeProps.categories)
        .sum((d) => (d.value))
        .sort((a, b) => b.height - a.height || b.value - a.value);

        // set up a treemap object and pass in the root
        let tileStyle = treemapBinary;
        if (window.innerWidth < 768) {
            tileStyle = treemapSlice;
        }

        const budgetFunctionTreemap = treemap()
            .round(true)
            .tile(tileStyle)
            .size([this.sectionWrapper.offsetWidth, this.state.visualizationHeight])(root).leaves();

        // build the tiles
        const nodes = budgetFunctionTreemap.map((n, i) => {
            let cell = '';
            let cellColor = treeProps.colors[i];
            let strokeColor = 'white';
            let strokeOpacity = 0.5;
            let opacity = 1;
            let textColor = treeProps.tooltipStyles.defaultStyle.textColor;
            let textClass = '';

            if (this.state.showOverlay) {
                cellColor = treeProps.alternateColors[i];
                opacity = 0.7;

                if (topFunctions.indexOf(n.data.name) > -1) {
                    cellColor = treeProps.colors[i];
                    strokeColor = '#F2B733';
                    strokeOpacity = 1;
                    opacity = 1;
                }
            }

            // Set highlighted state for hovered function
            if (this.state.hoveredFunction === n.data.id) {
                cellColor = treeProps.tooltipStyles.highlightedStyle.color;
                textColor = treeProps.tooltipStyles.highlightedStyle.textColor;
                textClass = 'chosen';
            }

            // Calculate display params
            let labelView = 'block';
            let percentView = 'block';

            const width = (n.x1 - n.x0);
            const height = (n.y1 - n.y0);

            if (height < 26 || width < 50) {
                labelView = 'none';
            }
            if (height < 40 || width < 60) {
                percentView = 'none';
            }

            // Finally, create the cell
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
                    opacity={opacity}
                    textColor={textColor}
                    textClass={textClass}
                    labelView={labelView}
                    width={width}
                    height={height}
                    percentView={percentView}
                    clickable />);
            }

            return cell;
        });

        this.setState({
            finalNodes: nodes
        });
    }

    toggleTooltipIn(functionID) {
        this.setState({
            showOverlay: false,
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

    createTooltip() {
        let tooltip = null;

        if (this.state.hoveredFunction > -1) {
            const category = _.find(
                this.props.categories.children,
                { id: this.state.hoveredFunction });
            const description = _.find(
                this.props.descriptions,
                { id: this.state.hoveredFunction });
            const node = _.find(
                this.state.finalNodes,
                { key: `${this.state.hoveredFunction}` });

            tooltip = (<TreeMapTooltip
                name={category.name}
                value={MoneyFormatter.formatTreemapValues(category.value)}
                percentage={MoneyFormatter.calculateTreemapPercentage(
                    category.value, this.props.totalNumber)
                }
                description={description.value}
                x={node.props.x0}
                y={node.props.y0}
                width={node.props.width}
                height={node.props.height}
                showSubfunctions={this.props.showSubfunctions}
                sectionHeight={this.sectionWrapper.getBoundingClientRect().height}
                isSubfunctions={false} />);
        }

        return tooltip;
    }

    render() {
        let hoverOverlay = null;
        if (this.state.showOverlay && window.innerWidth >= 768) {
            hoverOverlay = (<div className="treemap-hover-instructions">
                Hover over a block to learn more about Spending by Budget Function in 2016.
            </div>);
        }

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
                    {hoverOverlay}
                </div>
            </div>
        );
    }

}
BudgetFunctions.propTypes = propTypes;
BudgetFunctions.defaultProps = defaultProps;
