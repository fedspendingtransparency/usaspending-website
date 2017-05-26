/**
 * BudgetSubfunctionsMap.jsx
 * Created by Emily Gullo 03/15/2017
 **/

import React from 'react';
import { hierarchy, treemap, treemapBinary, treemapSlice } from 'd3-hierarchy';
import _ from 'lodash';

import TreeMapCell from './TreeMapCell';
import TreeMapTooltip from './TreeMapTooltip';

const propTypes = {
    subfunctions: React.PropTypes.object,
    colors: React.PropTypes.array,
    topFunction: React.PropTypes.string,
    showSub: React.PropTypes.bool,
    tooltipStyles: React.PropTypes.object,
    chosen: React.PropTypes.string,
    formatFriendlyString: React.PropTypes.func
};

const defaultProps = {
    subfunctions: {},
    topFunction: ''
};

export default class BudgetSubfunctionsMap extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            windowWidth: 0,
            visualizationWidth: 0,
            category: 'none',
            description: '',
            subfunctions: {},
            finalNodes: [],
            selected: ''
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
        if (nextProps.subfunctions[nextProps.topFunction].children.length > 0) {
            this.buildTree(nextProps.subfunctions[nextProps.topFunction], nextProps.colors,
            nextProps.tooltipStyles);
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
            if (this.props.subfunctions[this.props.topFunction].children.length > 0) {
                this.buildTree(
                    this.props.subfunctions[this.props.topFunction], this.props.colors,
                    this.props.tooltipStyles);
            }
        }
    }

    buildTree(cats, colors, styles) {
        // put the data through d3's hierarchy system to sum and sort it
        const root = hierarchy(cats)
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
            .size([this.sectionWrapper.offsetWidth, 286])(root).leaves();

        // build the tiles
        const nodes = budgetSubfunctionsTreemap.map((n, i) => {
            let cell = '';
            if (n.value !== 0) {
                cell = (<TreeMapCell
                    label={n.data.name}
                    value={n.value}
                    x0={n.x0}
                    x1={n.x1}
                    y0={n.y0}
                    y1={n.y1}
                    total={n.parent.value}
                    categoryID={n.data.id}
                    key={i}
                    color={colors[i]}
                    chosen={this.props.chosen}
                    tooltipStyles={styles}
                    toggleTooltipIn={this.toggleTooltipIn}
                    toggleTooltipOut={this.toggleTooltipOut}
                    showSub={this.props.showSub}
                    clickable={false}
                    formatFriendlyString={this.props.formatFriendlyString} />);
            }
            return cell;
        });
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
                height={(this.state.height / 2) + 50} />);
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
                        height="286">
                        { this.state.finalNodes }
                    </svg>
                </div>
            </div>
        );
    }

}
BudgetSubfunctionsMap.propTypes = propTypes;
BudgetSubfunctionsMap.defaultProps = defaultProps;
