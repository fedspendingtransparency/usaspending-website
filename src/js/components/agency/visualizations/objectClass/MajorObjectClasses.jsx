/**
 * MajorObjectClasses.jsx
 * Created by michaelbray on 6/8/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { hierarchy, treemap, treemapBinary, treemapSlice } from 'd3-hierarchy';
import { throttle, remove, orderBy, find, isEqual } from 'lodash';
import * as MoneyFormatter from 'helpers/moneyFormatter';
import * as TreemapHelper from 'helpers/treemapHelper';
import { objectClassDefinitions } from 'dataMapping/agency/objectClassDefinitions';
import { labelColorFromBackground } from 'helpers/colorHelper';

import ObjectClassCell from './ObjectClassCell';
import ObjectClassTooltip from './ObjectClassTooltip';

const propTypes = {
    majorObjectClasses: PropTypes.object,
    toggleMinorObjectClass: PropTypes.func,
    showMinorObjectClass: PropTypes.bool,
    totalObligation: PropTypes.number,
    hasNegatives: PropTypes.bool
};

export default class MajorObjectClasses extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            windowWidth: 0,
            visualizationWidth: 0,
            visualizationHeight: 286,
            finalNodes: [],
            showOverlay: true,
            hoveredObjectClass: -1
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

    componentDidUpdate(prevProps) {
        if (!isEqual(prevProps, this.props) && this.props.majorObjectClasses.children.length > 0) {
            this.buildTree(this.props);
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
            if (this.props.majorObjectClasses.children.length > 0) {
                this.buildTree(this.props);
            }
        }
    }

    buildTree(treeProps) {
    // grab the major object class data
        const objectClasses = treeProps.majorObjectClasses;

        // remove negative values from the children, as we can't display those in the treemap
        remove(objectClasses.children, (v) => parseFloat(v.obligated_amount) <= 0);

        // order by value, descending, after converting `obligated_amount` strings to floats
        const finalObjectClasses = {
            children: orderBy(objectClasses.children,
                (oc) => parseFloat(oc.obligated_amount),
                'desc')
        };

        // put the data through d3's hierarchy system to sum it
        const root = hierarchy(finalObjectClasses)
            .sum((d) => (d.obligated_amount));

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

        const objectClassTreemap = treemap()
            .round(true)
            .tile(tileStyle)
            .size([offsetWidth, this.state.visualizationHeight])(root).leaves();

        // build the tiles
        const nodes = objectClassTreemap.map((n, i) => {
            let cell = '';
            let cellColor = TreemapHelper.treemapColors[i];
            let textColor = labelColorFromBackground(TreemapHelper.treemapColors[i]);
            let textClass = '';

            // Set highlighted state for hovered object class
            if (this.state.hoveredObjectClass === n.data.major_object_class_code) {
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
                    label={n.data.major_object_class_name}
                    value={n.value}
                    x0={n.x0}
                    x1={n.x1}
                    y0={n.y0}
                    y1={n.y1}
                    total={treeProps.totalObligation}
                    key={n.data.major_object_class_code}
                    objectClassID={n.data.major_object_class_code}
                    color={cellColor}
                    strokeColor="white"
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

                return cell;
            }

            return null;
        });

        this.setState({
            finalNodes: nodes
        });
    }

    toggleTooltipIn(objectClassId) {
        this.setState({
            hoveredObjectClass: objectClassId
        }, () => {
            this.buildTree(this.props);
        });
    }

    toggleTooltipOut() {
        this.setState({
            hoveredObjectClass: -1
        }, () => {
            this.buildTree(this.props);
        });
    }

    toggleMinorObjectClass(selection) {
        this.props.toggleMinorObjectClass(selection);
    }

    createTooltip() {
        let tooltip = null;

        // We have to check for the existence of the ref so that Firefox doesn't die
        let sectionHeight = 0;
        if (this.sectionWrapper) {
            sectionHeight = this.sectionWrapper.getBoundingClientRect().height;
        }

        if (this.state.hoveredObjectClass > -1) {
            const objectClass = find(this.props.majorObjectClasses.children,
                { major_object_class_code: `${this.state.hoveredObjectClass}` });

            const objectClassDefinition = objectClassDefinitions[this.state.hoveredObjectClass];

            const node = find(this.state.finalNodes,
                { key: `${this.state.hoveredObjectClass}` });

            const obligatedAmount = parseFloat(objectClass.obligated_amount);

            tooltip = (<ObjectClassTooltip
                name={objectClass.major_object_class_name}
                value={MoneyFormatter.formatTreemapValues(obligatedAmount)}
                percentage={MoneyFormatter.calculatePercentage(
                    obligatedAmount, this.props.totalObligation)
                }
                description={objectClassDefinition.description}
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
                        {this.state.finalNodes}
                    </svg>
                </div>
            </div>
        );
    }
}

MajorObjectClasses.propTypes = propTypes;
