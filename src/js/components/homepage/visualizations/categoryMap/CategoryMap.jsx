/**
 * CategoryMap.jsx
 * Created by Emily Gullo 03/15/2017
 **/

import React from 'react';
import { hierarchy, treemap, treemapDice, treemapSlice } from 'd3-hierarchy';
import { throttle, find } from 'lodash';
import { HandDrawnArrow } from 'components/sharedComponents/icons/Icons';

import CategoryMapCell from './CategoryMapCell';
import CategoryMapTooltip from './CategoryMapTooltip';
import BudgetLine from './BudgetLine';

const propTypes = {
    breakdown: React.PropTypes.object,
    colors: React.PropTypes.array,
    tooltipStyles: React.PropTypes.object
};

export default class CategoryMap extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            windowWidth: 0,
            visualizationWidth: 0,
            category: 'none',
            description: '',
            finalNodes: '',
            individualValue: '',
            dollarValue: '',
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            geoPortion: 0
        };

        this.handleWindowResize = throttle(this.handleWindowResize.bind(this), 50);
        this.buildTree = this.buildTree.bind(this);
        this.toggleTooltipIn = this.toggleTooltipIn.bind(this);
        this.toggleTooltipOut = this.toggleTooltipOut.bind(this);
        this.createTooltip = this.createTooltip.bind(this);
    }

    componentDidMount() {
        this.handleWindowResize();
        window.addEventListener('resize', this.handleWindowResize);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.breakdown.children.length > 0) {
            this.buildTree(nextProps.breakdown, nextProps.colors, nextProps.tooltipStyles);
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
            if (this.props.breakdown !== null) {
                this.buildTree(this.props.breakdown, this.props.colors, this.props.tooltipStyles);
            }
        }
    }

    buildTree(cats, colors, tooltipStyles) {
        // put the data through d3's hierarchy system to sum and sort it
        const root = hierarchy(cats)
        .sum((d) => (d.value))
        .sort((d) => (d.id));

        // set up a treemap object and pass in the root
        let tileStyle = treemapDice;
        let height = 140;
        if (this.state.windowWidth < 768) {
            tileStyle = treemapSlice;
            height = 900;
        }
        const treemapLayout = treemap()
            .round(true)
            .tile(tileStyle)
            .size([this.state.visualizationWidth, height])(root).leaves();

        let geoPortion = 0;

        // build the tiles
        const nodes = treemapLayout.map((n, i) => {
            let cell = '';
            if (n.value !== 0) {
                if (i + 1 < treemapLayout.length) {
                    geoPortion += (n.x1 - n.x0);
                }
                cell = (<CategoryMapCell
                    label={n.data.name}
                    value={n.data.value}
                    dollar={n.data.dollar}
                    description={n.data.description}
                    x0={n.x0}
                    x1={n.x1}
                    y0={n.y0}
                    y1={n.y1}
                    key={i}
                    categoryID={n.data.id}
                    color={colors[i]}
                    tooltipStyles={tooltipStyles}
                    toggleTooltipIn={this.toggleTooltipIn}
                    toggleTooltipOut={this.toggleTooltipOut} />);
            }
            return cell;
        });

        this.setState({
            geoPortion,
            finalNodes: nodes
        });
    }

    toggleTooltipIn(categoryID, height, width) {
        const category = find(this.state.finalNodes, { key: `${categoryID}` });
        this.setState({
            category: category.props.label,
            description: category.props.description,
            individualValue: category.props.value,
            dollarValue: category.props.dollar,
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
            dollarValue: '',
            x: 0,
            y: 0,
            width,
            height
        });
    }

    createTooltip() {
        let tooltip = null;
        if (this.state.category !== 'none') {
            tooltip = (<CategoryMapTooltip
                name={this.state.category}
                value={this.state.individualValue}
                dollar={this.state.dollarValue}
                description={this.state.description}
                x={this.state.x}
                y={this.state.y}
                width={this.state.width}
                height={(this.state.height / 2) + 50} />);
        }
        return tooltip;
    }

    render() {
        let line = (<BudgetLine
            size="large"
            gTransform={`translate(${this.state.visualizationWidth / 2.75},0)rotate(0)`}
            rectTransform="translate(0,0)rotate(0)"
            textTransform="translate(77,15)rotate(0)"
            label="3.06 trillion" />);
        if (this.state.windowWidth < 768) {
            line = (<BudgetLine
                size="small"
                gTransform="translate(15,300)rotate(180)"
                rectTransform="translate(20, -78)rotate(90)"
                textTransform="translate(0, 0)rotate(90)"
                label="3.06 trillion" />);
        }
        return (<div className="by-category-section-wrap">
            <div className="inner-wrap">
                <h3>Almost <strong>80%</strong> of total spending in 2016 was awarded to individuals,
                private contractors, and local governments.</h3>
                { line }
                <div className="by-category-vis">
                    { this.createTooltip() }
                    <div
                        className="tree-wrapper"
                        ref={(sr) => {
                            this.sectionWrapper = sr;
                        }}>
                        <svg
                            width={this.state.visualizationWidth}>
                            { this.state.finalNodes }
                        </svg>
                    </div>
                </div>
                <div className="map-segue">
                    <h4>The geographic breakdown of this portion of the budget is shown below</h4>
                    <div className="icon-wrap">
                        <HandDrawnArrow />
                    </div>
                </div>
            </div>
        </div>
        );
    }

}
CategoryMap.propTypes = propTypes;
