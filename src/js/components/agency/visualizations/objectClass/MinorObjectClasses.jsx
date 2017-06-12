/**
 * MinorObjectClasses.jsx
 * Created by michaelbray on 6/8/17.
 */

import React from 'react';
import { hierarchy, treemap, treemapBinary, treemapSlice } from 'd3-hierarchy';
import _ from 'lodash';
import * as MoneyFormatter from 'helpers/moneyFormatter';
import * as TreemapHelper from 'helpers/treemapHelper';

import ObjectClassCell from './ObjectClassCell';
import ObjectClassTooltip from './ObjectClassTooltip';

const propTypes = {
    minorObjectClasses: React.PropTypes.object,
    toggleMinorObjectClass: React.PropTypes.func,
    showMinorObjectClass: React.PropTypes.bool,
    totalMinorObligation: React.PropTypes.number
};

export default class MinorObjectClasses extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            windowWidth: 0,
            visualizationWidth: 0,
            visualizationHeight: 286,
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
        if (nextProps.minorObjectClasses.children.length > 0) {
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
            if (this.props.minorObjectClasses.children.length > 0) {
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

        // We have to check for the existence of the ref so that Firefox doesn't die
        let offsetWidth = 0;
        if (this.sectionWrapper) {
            offsetWidth = this.sectionWrapper.offsetWidth;
        }

        const budgetFunctionTreemap = treemap()
            .round(true)
            .tile(tileStyle)
            .size([offsetWidth, this.state.visualizationHeight])(root).leaves();

        // build the tiles
        const nodes = budgetFunctionTreemap.map((n, i) => {
            let cell = '';
            let cellColor = TreemapHelper.treemapColors[i];
            let textColor = TreemapHelper.tooltipStyles.defaultStyle.textColor;
            let textClass = '';

            // Set highlighted state for hovered object class
            if (this.state.hoveredObjectClass === n.data.object_class_code) {
                cellColor = TreemapHelper.tooltipStyles.highlightedStyle.color;
                textColor = TreemapHelper.tooltipStyles.highlightedStyle.textColor;
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
                cell = (<ObjectClassCell
                    {...treeProps}
                    label={n.data.object_class_name}
                    value={n.value}
                    x0={n.x0}
                    x1={n.x1}
                    y0={n.y0}
                    y1={n.y1}
                    total={n.parent.value}
                    key={n.data.object_class_code}
                    objectClassID={n.data.object_class_code}
                    color={cellColor}
                    strokeColor={'white'}
                    strokeOpacity={0.5}
                    tooltipStyles={TreemapHelper.tooltipStyles}
                    toggleTooltipIn={this.toggleTooltipIn}
                    toggleTooltipOut={this.toggleTooltipOut}
                    opacity={1}
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

        // We have to check for the existence of the ref so that Firefox doesn't die
        let sectionHeight = 0;
        if (this.sectionWrapper) {
            sectionHeight = this.sectionWrapper.getBoundingClientRect().height;
        }

        if (this.state.hoveredFunction > -1) {
            const objectClass = _.find(this.props.minorObjectClasses.children,
                { object_class_code: `${this.state.hoveredObjectClass}` });

            const node = _.find(this.state.finalNodes,
                { key: `${this.state.hoveredObjectClass}` });

            tooltip = (<ObjectClassTooltip
                name={objectClass.object_class_name}
                value={MoneyFormatter.formatTreemapValues(objectClass.obligated_amount)}
                percentage={MoneyFormatter.calculateTreemapPercentage(
                    objectClass.obligated_amount, this.props.totalMinorObligation)
                }
                description={''}
                x={node.props.x0}
                y={node.props.y0}
                width={node.props.width}
                height={node.props.height}
                showMinorObjectClass={this.props.showMinorObjectClass}
                sectionHeight={sectionHeight} />);
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

MinorObjectClasses.propTypes = propTypes;
