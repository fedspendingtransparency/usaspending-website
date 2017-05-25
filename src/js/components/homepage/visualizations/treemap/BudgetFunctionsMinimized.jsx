/**
* BudgetFunctionsMinimized.jsx
* Created by Emily Gullo 05/15/2017
**/

import React from 'react';
import * as d3 from 'd3';
import _ from 'lodash';

import TreeMapCell from './TreeMapCell';
import TreeMapTooltip from './TreeMapTooltip';

const propTypes = {
    categories: React.PropTypes.object,
    colors: React.PropTypes.array,
    alternateColors: React.PropTypes.array,
    showSub: React.PropTypes.bool,
    changeActiveSubfunction: React.PropTypes.func,
    tooltipStyles: React.PropTypes.object,
    chosen: React.PropTypes.string,
    formatFriendlyString: React.PropTypes.func
};

export default class BudgetFunctionsMinimized extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            windowWidth: 0,
            visualizationWidth: 0,
            visualizationHeight: 565,
            category: 'none',
            description: '',
            finalNodes: '',
            individualValue: '',
            selected: '',
            showSub: this.props.showSub
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
        if (nextProps.categories.children.length > 0) {
            this.buildTree(nextProps.categories, nextProps.alternateColors,
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
            let colors = this.props.colors;
            if (this.state.showSub) {
                colors = this.props.alternateColors;
            }
            if (this.props.categories.children.length > 0) {
                this.buildTree(this.props.categories, colors, this.props.tooltipStyles);
            }
        }
    }

    buildTree(cats, colors, styles) {
        // put the data through d3's hierarchy system to sum and sort it
        const root = d3.hierarchy(cats)
        .sum((d) => (d.value))
        .sort((a, b) => b.height - a.height || b.value - a.value);

        // set up a treemap object and pass in the root
        const mapHeight = 25;
        const mapWidth = this.sectionWrapper.offsetWidth;
        this.setState({
            visualizationHeight: mapHeight
        });
        const treemap = d3.treemap()
        .round(true)
        .tile(d3.treemapDice)
        .size([mapWidth, mapHeight])(root).leaves();

        // build the tiles
        const nodes = treemap.map((n, i) =>
            <TreeMapCell
                label={n.data.name}
                value={n.value}
                x0={n.x0}
                x1={n.x1}
                y0={n.y0}
                y1={n.y1}
                total={n.parent.value}
                key={i}
                categoryID={n.data.id}
                color={colors[i]}
                chosenColor={this.props.colors[i]}
                chosen={this.props.chosen}
                toggleTooltipIn={this.toggleTooltipIn}
                toggleTooltipOut={this.toggleTooltipOut}
                tooltipStyles={styles}
                showSub={this.state.showSub}
                changeActiveSubfunction={this.props.changeActiveSubfunction}
                clickable />
        );
        this.setState({
            finalNodes: nodes
        });
    }

    toggleTooltipIn(categoryID, height, width) {
        const category = _.find(this.state.finalNodes, { key: `${categoryID}` });

        this.setState({
            category: category.props.label,
            description: category.props.description,
            individualValue: category.props.value,
            total: category.props.total,
            x: category.props.x0,
            y: category.props.y0,
            width,
            height
        });
    }

    toggleTooltipOut(height, width) {
        this.setState({
            category: 'none',
            description: '',
            individualValue: '',
            x: 0,
            y: 0,
            width,
            height
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
                height={(this.state.height / 2) + 50}
                showSub={this.state.showSub} />);
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
