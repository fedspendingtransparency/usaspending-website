/**
* MinimizedBudgetFunctions.jsx
* Created by Emily Gullo 05/15/2017
**/

import React from 'react';
import { hierarchy, treemap, treemapDice } from 'd3-hierarchy';
import { throttle, find } from 'lodash';
import * as MoneyFormatter from 'helpers/moneyFormatter';

import MinimizedBudgetFunctionsCell from './MinimizedBudgetFunctionsCell';
import MinimizedBudgetFunctionsTooltip from './MinimizedBudgetFunctionsTooltip';

const propTypes = {
    alternateColors: React.PropTypes.array,
    categories: React.PropTypes.object,
    changeActiveSubfunction: React.PropTypes.func,
    colors: React.PropTypes.array,
    descriptions: React.PropTypes.array,
    selected: React.PropTypes.number,
    tooltipStyles: React.PropTypes.object,
    totalNumber: React.PropTypes.number
};

export default class BudgetFunctionsMinimized extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            windowWidth: 0,
            visualizationWidth: 0,
            visualizationHeight: 565,
            finalNodes: [],
            hoveredFunction: -1
        };

        this.handleWindowResize = throttle(this.handleWindowResize.bind(this), 50);
        this.buildTree = this.buildTree.bind(this);
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
        const mapHeight = 25;
        const mapWidth = this.sectionWrapper.offsetWidth;

        const budgetFunctionsMinimizedTreemap = treemap()
            .round(true)
            .tile(treemapDice)
            .size([mapWidth, mapHeight])(root).leaves();

        // build the tiles
        const nodes = budgetFunctionsMinimizedTreemap.map((n, i) => {
            let cellColor = treeProps.alternateColors[i];
            // Set regular state for both selected and hovered functions
            if (i === treeProps.selected || i === this.state.hoveredFunction) {
                cellColor = treeProps.colors[i];
            }

            const width = (n.x1 - n.x0);

            const cell = (<MinimizedBudgetFunctionsCell
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
                strokeColor="white"
                tooltipStyles={treeProps.tooltipStyles}
                toggleTooltipIn={this.toggleTooltipIn}
                toggleTooltipOut={this.toggleTooltipOut}
                width={width}
                height={25}
                changeActiveSubfunction={treeProps.changeActiveSubfunction}
                clickable />);

            return cell;
        });

        this.setState({
            finalNodes: nodes,
            visualizationHeight: mapHeight
        });
    }

    toggleTooltipIn(functionID) {
        this.setState({
            hoveredFunction: functionID
        }, () => {
            this.buildTree(this.props);
        });
    }

    toggleTooltipOut() {
        this.setState({
            hoveredFunction: -1
        }, () => {
            this.buildTree(this.props);
        });
    }

    createTooltip() {
        let tooltip = null;

        if (this.state.hoveredFunction > -1) {
            const category = find(
                this.props.categories.children,
                { id: this.state.hoveredFunction });
            const description = find(
                this.props.descriptions,
                { id: this.state.hoveredFunction });
            const node = find(
                this.state.finalNodes,
                { key: `${this.state.hoveredFunction}` });

            tooltip = (<MinimizedBudgetFunctionsTooltip
                name={category.name}
                value={MoneyFormatter.formatTreemapValues(category.value)}
                percentage={MoneyFormatter.calculateTreemapPercentage(
                    category.value, this.props.totalNumber)
                }
                description={description.value}
                x={node.props.x0}
                y={node.props.y0}
                width={node.props.width}
                height={node.props.height + 2} />);
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
                        className="treemap-svg overlay minimized">
                        { this.state.finalNodes }
                    </svg>
                </div>
            </div>
        );
    }

}
BudgetFunctionsMinimized.propTypes = propTypes;
