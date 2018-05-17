/**
 * AwardBreakdownTreeMap.jsx
 * Created by Lizzie Salita 5/16/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { hierarchy, treemap, treemapBinary, treemapSlice } from 'd3-hierarchy';
import { throttle, remove, orderBy, find } from 'lodash';
import * as MoneyFormatter from 'helpers/moneyFormatter';
import * as TreemapHelper from 'helpers/treemapHelper';
import { awardTypeGroupLabels } from 'dataMapping/search/awardType';
import { labelColorFromBackground } from 'helpers/colorHelper';

import AwardTypeCell from './AwardTypeCell';
import AwardTypeTooltip from './AwardTypeTooltip';

const propTypes = {
    awardBreakdown: PropTypes.object,
    totalAmount: PropTypes.number,
    hasNegatives: PropTypes.bool
};

export default class AwardBreakdownTreeMap extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            windowWidth: 0,
            visualizationWidth: 0,
            visualizationHeight: 175,
            finalNodes: [],
            showOverlay: true,
            hoveredAwardType: ''
        };

        this.handleWindowResize = throttle(this.handleWindowResize.bind(this), 50);
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
        if (nextProps.awardBreakdown.children.length > 0) {
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
            if (this.props.awardBreakdown.children.length > 0) {
                this.buildTree(this.props);
            }
        }
    }

    buildTree(treeProps) {
        // grab the award type data
        const awardTypes = treeProps.awardBreakdown;

        // remove negative values from the children, as we can't display those in the treemap
        remove(awardTypes.children, (v) => parseFloat(v.amount) <= 0);

        // order by value, descending
        const finalAwardTypes = {
            children: orderBy(awardTypes.children,
                (type) => parseFloat(type.amount),
                'desc')
        };

        // put the data through d3's hierarchy system to sum it
        const root = hierarchy(finalAwardTypes)
            .sum((d) => (d.amount));

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

        const awardBreakdownTreemap = treemap()
            .round(true)
            .tile(tileStyle)
            .size([offsetWidth, this.state.visualizationHeight])(root).leaves();

        // build the tiles
        const nodes = awardBreakdownTreemap.map((n, i) => {
            let cell = '';
            let cellColor = TreemapHelper.stateTreemapColors[i];
            let textColor = labelColorFromBackground(TreemapHelper.stateTreemapColors[i]);
            let textClass = '';

            // Set highlighted state for hovered award type
            if (this.state.hoveredAwardType === n.data.type) {
                cellColor = TreemapHelper.stateTooltipStyles.highlightedStyle.color;
                textColor = TreemapHelper.stateTooltipStyles.highlightedStyle.textColor;
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
                cell = (
                    <AwardTypeCell
                        {...treeProps}
                        label={awardTypeGroupLabels[n.data.type]}
                        value={n.value}
                        x0={n.x0}
                        x1={n.x1}
                        y0={n.y0}
                        y1={n.y1}
                        total={treeProps.totalAmount}
                        key={n.data.type}
                        awardTypeID={n.data.type}
                        color={cellColor}
                        strokeColor="white"
                        strokeOpacity={0.5}
                        tooltipStyles={TreemapHelper.stateTooltipStyles}
                        toggleTooltipIn={this.toggleTooltipIn}
                        toggleTooltipOut={this.toggleTooltipOut}
                        opacity={1}
                        textColor={textColor}
                        textClass={textClass}
                        labelView={labelView}
                        width={width}
                        height={height}
                        percentView={percentView} />
                );

                return cell;
            }

            return null;
        });

        this.setState({
            finalNodes: nodes
        });
    }

    toggleTooltipIn(awardTypeId) {
        this.setState({
            hoveredAwardType: awardTypeId
        }, () => {
            this.buildTree(this.props);
        });
    }

    toggleTooltipOut() {
        this.setState({
            hoveredAwardType: ''
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

        if (this.state.hoveredAwardType !== '') {
            const awardType = find(this.props.awardBreakdown.children,
                { type: `${this.state.hoveredAwardType}` });

            const awardTypeDefinition = awardTypeGroupLabels[this.state.hoveredAwardType];

            const node = find(this.state.finalNodes,
                { key: `${this.state.hoveredAwardType}` });

            tooltip = (
                <AwardTypeTooltip
                    value={MoneyFormatter.formatTreemapValues(awardType.amount)}
                    percentage={MoneyFormatter.calculateTreemapPercentage(
                        awardType.amount, this.props.totalAmount)
                    }
                    description={awardTypeDefinition}
                    x={node.props.x0}
                    y={node.props.y0}
                    width={node.props.width}
                    height={node.props.height}
                    sectionHeight={sectionHeight} />
            );
        }

        return tooltip;
    }

    render() {
        let greatThanOneHundredDescription = null;
        if (this.props.hasNegatives) {
            greatThanOneHundredDescription = (
                <p>
                    <em><strong>Note:</strong> The object classes below add up to more
                        than 100% due to negative values not shown here.
                    </em>
                </p>
            );
        }
        return (
            <div className="award-breakdown__treemap">
                <div className="usa-da-treemap-section">
                    <div className="treemap-inner-wrap">
                        {greatThanOneHundredDescription}
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
                </div>
            </div>
        );
    }
}

AwardBreakdownTreeMap.propTypes = propTypes;
