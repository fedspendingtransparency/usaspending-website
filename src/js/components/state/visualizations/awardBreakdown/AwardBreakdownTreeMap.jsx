/**
 * AwardBreakdownTreeMap.jsx
 * Created by Lizzie Salita 5/16/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { hierarchy, treemap, treemapBinary, treemapSlice } from 'd3-hierarchy';
import { throttle, remove, find, isEqual } from 'lodash';
import * as MoneyFormatter from 'helpers/moneyFormatter';
import * as TreemapHelper from 'helpers/treemapHelper';
import { awardTypeLabels } from 'dataMapping/state/awardTypes';
import { labelColorFromBackground } from 'helpers/colorHelper';

import AwardTypeCell from './AwardTypeCell';
import AwardTypeTooltip from './AwardTypeTooltip';

const propTypes = {
    awardBreakdown: PropTypes.array,
    totalAmount: PropTypes.number
};

export default class AwardBreakdownTreeMap extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            windowWidth: 0,
            visualizationWidth: 0,
            visualizationHeight: 175,
            virtualChart: [],
            showOverlay: true,
            hoveredAwardType: ''
        };

        this.handleWindowResize = throttle(this.handleWindowResize.bind(this), 50);
        this.buildVirtualTree = this.buildVirtualTree.bind(this);
        this.createTooltip = this.createTooltip.bind(this);
        this.toggleTooltipIn = this.toggleTooltipIn.bind(this);
        this.toggleTooltipOut = this.toggleTooltipOut.bind(this);
    }

    componentDidMount() {
        this.handleWindowResize();
        window.addEventListener('resize', this.handleWindowResize);
    }

    componentDidUpdate(prevProps) {
        if (!isEqual(prevProps, this.props) && this.props.awardBreakdown.length > 0) {
            this.buildVirtualTree(this.props);
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
            if (this.props.awardBreakdown.length > 0) {
                this.buildVirtualTree(this.props);
            }
        }
    }

    buildVirtualTree(props) {
        const data = props.awardBreakdown;
        // remove the negative values from the data because they can't be displayed in the treemap
        remove(data, (v) => v.amount <= 0);

        // parse the inbound data into D3's treemap hierarchy structure
        const treemapData = hierarchy({
            children: data
        })
            .sum((d) => d.amount) // tell D3 how to extract the monetary value out of the object
            .sort((a, b) => b.amount - a.amount); // sort the objects

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

        // set up a function for generating the treemap of the specified size and style
        const tree = treemap()
            .size([offsetWidth, this.state.visualizationHeight])
            .tile(tileStyle)
            .round(true);

        // generate the treemap and calculate the individual boxes
        const treeItems = tree(treemapData).leaves();

        if (treeItems.length === 0 || data.length === 0) {
            // we have no data, so don't draw a chart
            this.setState({
                virtualChart: []
            });
            return;
        }

        // create the individual treemap cells
        const cells = [];
        treeItems.forEach((item, index) => {
            const cell = this.buildVirtualCell(item, index);
            cells.push(cell);
        });

        this.setState({
            virtualChart: cells
        });
    }

    buildVirtualCell(data, i) {
        let cellColor = TreemapHelper.stateTreemapColors[i];
        let textColor = labelColorFromBackground(TreemapHelper.stateTreemapColors[i]);
        let textClass = '';

        // Set highlighted state for hovered award type
        if (this.state.hoveredAwardType === data.data.type) {
            cellColor = TreemapHelper.stateTooltipStyles.highlightedStyle.color;
            textColor = TreemapHelper.stateTooltipStyles.highlightedStyle.textColor;
            textClass = 'chosen';
        }

        // Calculate display params
        let labelView = 'block';
        let percentView = 'block';

        const width = (data.x1 - data.x0);
        const height = (data.y1 - data.y0);

        if (height < 26 || width < 50) {
            labelView = 'none';
        }
        if (height < 40 || width < 60) {
            percentView = 'none';
        }

        return {
            label: awardTypeLabels[data.data.type],
            value: data.value,
            x0: data.x0,
            x1: data.x1,
            y0: data.y0,
            y1: data.y1,
            total: this.props.totalAmount,
            awardType: data.data.type,
            color: cellColor,
            textColor,
            textClass,
            labelView,
            width,
            height,
            percentView
        };
    }

    toggleTooltipIn(awardTypeId) {
        this.setState({
            hoveredAwardType: awardTypeId
        }, () => {
            this.buildVirtualTree(this.props);
        });
    }

    toggleTooltipOut() {
        this.setState({
            hoveredAwardType: ''
        }, () => {
            this.buildVirtualTree(this.props);
        });
    }

    createTooltip() {
        let tooltip = null;

        // We have to check for the existence of the ref so that Firefox doesn't die
        let sectionHeight = 0;
        if (this.sectionWrapper) {
            sectionHeight = this.sectionWrapper.getBoundingClientRect().height;
        }

        if (this.state.hoveredAwardType) {
            const awardType = find(this.props.awardBreakdown,
                { type: `${this.state.hoveredAwardType}` });

            const awardTypeDefinition = awardTypeLabels[this.state.hoveredAwardType];

            const node = find(this.state.virtualChart,
                { awardType: `${this.state.hoveredAwardType}` });

            tooltip = (
                <AwardTypeTooltip
                    value={MoneyFormatter.formatTreemapValues(awardType.amount)}
                    percentage={MoneyFormatter.calculatePercentage(
                        awardType.amount, this.props.totalAmount)
                    }
                    description={awardTypeDefinition}
                    x={node.x0}
                    y={node.y0}
                    width={node.width}
                    height={node.height}
                    sectionHeight={sectionHeight} />
            );
        }

        return tooltip;
    }

    render() {
        const cells = this.state.virtualChart.map((cell) => (
            <AwardTypeCell
                {...cell}
                key={cell.awardType}
                strokeColor="white"
                strokeOpacity={0.5}
                tooltipStyles={TreemapHelper.stateTooltipStyles}
                toggleTooltipIn={this.toggleTooltipIn}
                toggleTooltipOut={this.toggleTooltipOut}
                opacity={1} />
        ));
        return (
            <div className="award-breakdown__treemap">
                <div className="usa-da-treemap-section">
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
                                {cells}
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

AwardBreakdownTreeMap.propTypes = propTypes;
