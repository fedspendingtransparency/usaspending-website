/**
 * BudgetSubfunctionsMap.jsx
 * Created by Emily Gullo 03/15/2017
 **/

import React from 'react';
import { hierarchy, treemap, treemapBinary, treemapSlice } from 'd3-hierarchy';
import _ from 'lodash';
import * as MoneyFormatter from 'helpers/moneyFormatter';

import BudgetFunctionCell from '../BudgetFunctions/BudgetFunctionCell';
import TreeMapTooltip from '../TreeMapTooltip';

const propTypes = {
    category: React.PropTypes.object,
    colors: React.PropTypes.array,
    selected: React.PropTypes.number,
    subfunction: React.PropTypes.object,
    tooltipStyles: React.PropTypes.object
};

const defaultProps = {
    subfunctions: {},
    selected: -1
};

export default class BudgetSubfunctionsMap extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            windowWidth: 0,
            visualizationWidth: 0,
            visualizationHeight: 286,
            finalNodes: [],
            hoveredFunction: -1
        };

        this.handleWindowResize = _.throttle(this.handleWindowResize.bind(this), 50);
        this.buildTree = this.buildTree.bind(this);
        this.toggleTooltipIn = this.toggleTooltipIn.bind(this);
        this.toggleTooltipOut = this.toggleTooltipOut.bind(this);
    }

    componentDidMount() {
        this.handleWindowResize();
        window.addEventListener('resize', this.handleWindowResize);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.subfunction.children.length > 0) {
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
            if (this.props.subfunction.children.length > 0) {
                this.buildTree(this.props);
            }
        }
    }

    buildTree(treeProps) {
        // put the data through d3's hierarchy system to sum and sort it
        const root = hierarchy(treeProps.subfunction)
        .sum((d) => (d.value))
        .sort((a, b) => b.height - a.height || b.value - a.value);

        // set up a treemap object and pass in the root
        let tileStyle = treemapBinary;
        if (window.innerWidth < 768) {
            tileStyle = treemapSlice;
        }

        const budgetSubfunctionsTreemap = treemap()
            .round(true)
            .tile(tileStyle)
            .size([this.sectionWrapper.offsetWidth, this.state.visualizationHeight])(root).leaves();

        // build the tiles
        const nodes = budgetSubfunctionsTreemap.map((n, i) => {
            let cell = '';

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
                    color={treeProps.colors[i]}
                    strokeColor={'white'}
                    strokeOpacity={0.5}
                    tooltipStyles={treeProps.tooltipStyles}
                    toggleTooltipIn={this.toggleTooltipIn}
                    toggleTooltipOut={this.toggleTooltipOut}
                    textColor={treeProps.tooltipStyles.defaultStyle.textColor}
                    textShadow={treeProps.tooltipStyles.defaultStyle.textShadow}
                    textClass={''}
                    labelView={labelView}
                    width={width}
                    height={height}
                    percentView={percentView}
                    clickable={false} />);
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

    createTooltip() {
        let tooltip = null;

        if (this.state.hoveredFunction > -1) {
            const category = _.find(
                this.props.subfunction.children,
                { id: this.state.hoveredFunction });

            const node = _.find(
                this.state.finalNodes,
                { key: `${this.state.hoveredFunction}` });

            tooltip = (<TreeMapTooltip
                name={category.name}
                value={MoneyFormatter.formatTreemapValues(category.value)}
                percentage={MoneyFormatter.calculateTreemapPercentage(
                    category.value, this.props.category.value)
                }
                description={category.description}
                x={node.props.x0}
                y={node.props.y0}
                width={node.props.width}
                height={(node.props.height / 2) + 50} />);
        }

        return tooltip;
    }

    render() {
        return (
            <div>
                { this.createTooltip() }
                <div
                    className="tree-wrapper"
                    ref={(sr) => {
                        this.sectionWrapper = sr;
                    }}>
                    <svg
                        className="treemap-svg"
                        width={this.state.visualizationWidth}
                        height={286}>
                        { this.state.finalNodes }
                    </svg>
                </div>
            </div>
        );
    }

}

BudgetSubfunctionsMap.propTypes = propTypes;
BudgetSubfunctionsMap.defaultProps = defaultProps;
