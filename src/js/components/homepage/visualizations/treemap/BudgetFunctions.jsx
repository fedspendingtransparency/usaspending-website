/**
* BudgetFunctions.jsx
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
    toggleSubfunction: React.PropTypes.func,
    changeActiveSubfunction: React.PropTypes.func,
    showOverlay: React.PropTypes.bool,
    tooltipStyles: React.PropTypes.object,
    formatFriendlyString: React.PropTypes.func
};

const defaultProps = {
    showOverlay: true,
    showSub: false
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
            finalNodes: [],
            individualValue: '',
            showOverlay: props.showOverlay
        };

        this.handleWindowResize = _.throttle(this.handleWindowResize.bind(this), 50);
        this.buildTree = this.buildTree.bind(this);
        this.createTooltip = this.createTooltip.bind(this);
        this.toggleTooltipIn = this.toggleTooltipIn.bind(this);
        this.toggleTooltipOut = this.toggleTooltipOut.bind(this);
        this.toggleOverlay = this.toggleOverlay.bind(this);
    }

    componentDidMount() {
        this.handleWindowResize();
        window.addEventListener('resize', this.handleWindowResize);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.showOverlay !== this.state.showOverlay) {
            this.setState({
                showOverlay: nextProps.showOverlay
            }, () => {
                this.buildTree(nextProps.categories,
                    nextProps.colors,
                    nextProps.alternateColors,
                    nextProps.tooltipStyles);
            });
        }

        if (nextProps.categories.children.length > 0) {
            this.buildTree(nextProps.categories, nextProps.colors, nextProps.alternateColors,
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
            if (this.props.categories.children.length > 0) {
                this.buildTree(this.props.categories, this.props.colors,
                    this.props.alternateColors, this.props.tooltipStyles);
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
            if (n.value !== 0) {
                cell = (<TreeMapCell
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
                    alternateColor={altColors[i]}
                    chosenColor={this.props.colors[i]}
                    showOverlay={this.state.showOverlay}
                    showSub={this.props.showSub}
                    toggleSubfunction={this.props.toggleSubfunction}
                    changeActiveSubfunction={this.props.changeActiveSubfunction}
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

    toggleOverlay() {
        this.setState({
            showOverlay: false
        }, () => {
            this.buildTree(this.props.categories,
                this.props.colors,
                this.props.alternateColors,
                this.props.tooltipStyles);
        });
    }

    toggleTooltipIn(categoryID, height, width) {
        if (this.state.showOverlay !== false) {
            this.toggleOverlay();
        }
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
            total: '',
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

