/**
* BudgetFunctions.jsx
* Created by Emily Gullo 05/15/2017
**/

import React from 'react';
import * as d3 from 'd3';
import _ from 'lodash';
import * as MoneyFormatter from 'helpers/moneyFormatter';

import TreeMapCell from './TreeMapCell';
import TreeMapTooltip from './TreeMapTooltip';

const propTypes = {
    categories: React.PropTypes.object,
    descriptions: React.PropTypes.array,
    colors: React.PropTypes.array,
    alternateColors: React.PropTypes.array,
    showSub: React.PropTypes.bool,
    toggleSubfunction: React.PropTypes.func,
    changeActiveSubfunction: React.PropTypes.func
};

export default class BudgetFunctions extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            windowWidth: 0,
            visualizationWidth: 0,
            visualizationHeight: 565,
            category: 'none',
            description: '',
            descriptions: {},
            finalNodes: '',
            individualValue: '',
            showOverlay: true,
            selected: '',
            showSub: this.props.showSub
        };

        this.handleWindowResize = _.throttle(this.handleWindowResize.bind(this), 50);
        this.buildTree = this.buildTree.bind(this);
        this.toggleTooltip = this.toggleTooltip.bind(this);
        this.toggleOverlay = this.toggleOverlay.bind(this);
    }

    componentDidMount() {
        this.handleWindowResize();
        window.addEventListener('resize', this.handleWindowResize);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.categories.children.length > 0) {
            this.buildTree(nextProps.categories, nextProps.alternateColors, null,
                this.props.showSub);
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
                this.buildTree(this.props.categories, colors, null, this.props.showSub);
            }
        }
    }

    buildTree(cats, colors, chosen) {
        // put the data through d3's hierarchy system to sum and sort it
        const root = d3.hierarchy(cats)
        .sum((d) => (d.value))
        .sort((a, b) => b.height - a.height || b.value - a.value);

        // set up a treemap object and pass in the root
        let tileStyle = d3.treemapBinary;
        const mapHeight = 565;
        const mapWidth = this.state.visualizationWidth;
        if (this.state.windowWidth < 768) {
            tileStyle = d3.treemapSlice;
        }
        this.setState({
            visualizationHeight: mapHeight
        });
        const treemap = d3.treemap()
        .round(true)
        .tile(tileStyle)
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
                color={colors[i]}
                chosenColor={this.props.colors[i]}
                chosen={chosen}
                toggleTooltip={this.toggleTooltip}
                showOverlay={this.state.showOverlay}
                showSub={this.state.showSub}
                toggleSubfunction={this.props.toggleSubfunction}
                changeActiveSubfunction={this.props.changeActiveSubfunction}
                clickable />
        );
        this.setState({
            finalNodes: nodes
        });
    }

    toggleTooltip(set) {
        const descSet = this.props.descriptions;
        // find index of object item on matching cat name
        let descIndex = '0';
        if (set.cat !== 'none') {
            descIndex = _.findIndex(descSet, { name: set.cat });
        }

        // set it to desc value
        let desc = '';
        if (set.cat !== 'none') {
            desc = descSet[descIndex].value;
        }

        // set the state
        this.setState({
            category: set.cat,
            description: desc,
            individualValue: set.value,
            x: set.xStart,
            y: set.yStart,
            width: set.width,
            height: set.height,
            total: set.total
        });
        if (this.state.showOverlay !== false) {
            this.toggleOverlay(set.cat);
        }
    }

    toggleOverlay(cat) {
        this.buildTree(this.props.categories, this.props.colors, cat, false);
        this.setState({
            showOverlay: false
        });
    }

    formatFriendlyString(value) {
        // format the ceiling and current values to be friendly strings
        const units = MoneyFormatter.calculateUnitForSingleValue(value);
        // only reformat at a million or higher
        if (units.unit < MoneyFormatter.unitValues.MILLION) {
            units.unit = 1;
            units.unitLabel = '';
            units.longLabel = '';
        }
        const formattedValue = value / units.unit;
        let precision = 1;
        if (formattedValue % 1 === 0) {
            // whole number
            precision = 0;
        }

        const formattedCurrency =
        MoneyFormatter.formatMoneyWithPrecision(formattedValue, precision);

        // don't add an extra space when there's no units string to display
        let longLabel = '';
        if (units.unit > 1) {
            longLabel = ` ${units.longLabel}`;
        }

        return `${formattedCurrency}${longLabel}`;
    }

    createTooltip() {
        let tooltip = null;
        if (this.state.category !== 'none') {
            tooltip = (<TreeMapTooltip
                name={this.state.category}
                value={this.formatFriendlyString(this.state.individualValue)}
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
                        className="treemap-svg overlay">
                        { this.state.finalNodes }
                    </svg>
                </div>
            </div>
        );
    }

}
BudgetFunctions.propTypes = propTypes;
