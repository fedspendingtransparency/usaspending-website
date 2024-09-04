/**
 * AwardBreakdownTreeMap.jsx
 * Created by Lizzie Salita 5/16/18
 */

import React, { useEffect, useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { hierarchy, treemap, treemapBinary, treemapSlice } from 'd3-hierarchy';
import { remove, find } from 'lodash';
import * as MoneyFormatter from 'helpers/moneyFormatter';
import { formatMoneyWithUnitsShortLabel } from 'helpers/moneyFormatter';
import * as TreemapHelper from 'helpers/treemapHelper';
import { awardTypeLabels } from 'dataMapping/state/awardTypes';
// import { labelColorFromBackground } from 'helpers/colorHelper';
// import { stateTreemapColorsNoToggle, stateTreemapColorsWithToggle } from "../../../../helpers/treemapHelper";

import AwardTypeCell from './AwardTypeCell';
import AwardTypeTooltip from './AwardTypeTooltip';

const propTypes = {
    awardBreakdown: PropTypes.array,
    totalAmount: PropTypes.number,
    toggleState: PropTypes.bool
};

const AwardBreakdownTreeMap = (props) => {
    const [windowWidth, setWindowWidth] = useState(0);
    const [visualizationWidth, setVisualizationWidth] = useState(0);
    const [virtualChart, setVirtualChart] = useState([]);
    const [hoveredAwardType, setHoveredAwardType] = useState('');
    const sectionWrapper = useRef(null);
    const visualizationHeight = 175;

    const buildVirtualCell = (data, i) => {
        // let cellColor = TreemapHelper.stateTreemapColors[i];
        // let textColor = labelColorFromBackground(TreemapHelper.stateTreemapColors[i]);

        // todo - use these two lines, along with the new arrays to return colors in treemapHelper,
        //  when finishing the toggle functionality; the two lines above will not be used
        let cellColor = props.toggleState ? TreemapHelper.stateTreemapColorsWithToggle[i] : TreemapHelper.stateTreemapColorsNoToggle[i];
        let textColor = TreemapHelper.stateTooltipStyles.defaultStyle.textColor;

        let textClass = '';

        // Set highlighted state for hovered award type
        if (hoveredAwardType === data.data.type) {
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
            total: props.totalAmount,
            awardType: data.data.type,
            color: cellColor,
            textColor,
            textClass,
            labelView,
            width,
            height,
            percentView
        };
    };

    const buildVirtualTree = useCallback(() => {
        const amountType = props.toggleState ? "totalOutlays" : "amount";
        const data = props.awardBreakdown;
        // remove the negative values from the data because they can't be displayed in the treemap
        remove(data, (v) => v[amountType] <= 0);

        // parse the inbound data into D3's treemap hierarchy structure
        const treemapData = hierarchy({
            children: data
        })
            .sum((d) => d[amountType]) // tell D3 how to extract the monetary value out of the object
            .sort((a, b) => b[amountType] - a[amountType]); // sort the objects

        // set up a treemap object and pass in the root
        let tileStyle = treemapBinary;
        if (window.innerWidth < 1) {
            tileStyle = treemapSlice;
        }

        // We have to check for the existence of the ref so that Firefox doesn't die
        let offsetWidth = 0;
        if (sectionWrapper.current) {
            offsetWidth = sectionWrapper.current.offsetWidth;
        }

        // set up a function for generating the treemap of the specified size and style
        const tree = treemap()
            .size([offsetWidth, visualizationHeight])
            .tile(tileStyle)
            .round(true);

        // generate the treemap and calculate the individual boxes
        const treeItems = tree(treemapData).leaves();

        if (treeItems.length === 0 || data.length === 0) {
            // we have no data, so don't draw a chart
            setVirtualChart([]);
            return;
        }

        // create the individual treemap cells
        const cells = [];
        treeItems.forEach((item, index) => {
            const cell = buildVirtualCell(item, index);
            cells.push(cell);
        });

        setVirtualChart(cells);
    });

    const handleWindowResize = () => {
        // determine if the width changed
        const tempWindowWidth = window.innerWidth;
        if (tempWindowWidth !== windowWidth) {
            // width changed, update the visualization width
            setWindowWidth(tempWindowWidth);
            if (sectionWrapper.current) {
                setVisualizationWidth(sectionWrapper.current.offsetWidth);
            }
            if (props.awardBreakdown.length > 0) {
                buildVirtualTree(props);
            }
        }
    };

    const toggleTooltipIn = (awardTypeId) => {
        setHoveredAwardType(awardTypeId);
    };

    const toggleTooltipOut = () => {
        setHoveredAwardType('');
    };

    const createTooltip = () => {
        let tooltip = null;

        // We have to check for the existence of the ref so that Firefox doesn't die
        let sectionHeight = 0;
        if (sectionWrapper.current) {
            sectionHeight = sectionWrapper.current.getBoundingClientRect().height;
        }

        if (hoveredAwardType) {
            const awardType = find(props.awardBreakdown,
                { type: `${hoveredAwardType}` });

            const awardTypeDefinition = awardTypeLabels[hoveredAwardType];

            const node = find(virtualChart,
                { awardType: `${hoveredAwardType}` });

            tooltip = (
                <AwardTypeTooltip
                    value={formatMoneyWithUnitsShortLabel(awardType.amount)}
                    percentage={MoneyFormatter.calculatePercentage(
                        awardType.amount, props.totalAmount)
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
    };

    const cells = virtualChart.map((cell) => (
        <AwardTypeCell
            {...cell}
            key={cell.awardType}
            strokeColor="white"
            strokeOpacity={0.5}
            tooltipStyles={TreemapHelper.stateTooltipStyles}
            toggleTooltipIn={toggleTooltipIn}
            toggleTooltipOut={toggleTooltipOut}
            opacity={1} />
    ));

    useEffect(() => {
        handleWindowResize();
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, [handleWindowResize]);

    useEffect(() => {
        if (props.awardBreakdown.length > 0) {
            buildVirtualTree(props);
        }
    }, [buildVirtualTree, hoveredAwardType, props]);

    return (
        <div className="award-breakdown__treemap">
            <div className="usa-da-treemap-section">
                <div className="treemap-inner-wrap">
                    {createTooltip()}
                    <div
                        className="tree-wrapper"
                        ref={sectionWrapper}>
                        <svg
                            width={visualizationWidth}
                            height={visualizationHeight}
                            className="treemap-svg overlay">
                            {cells}
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

AwardBreakdownTreeMap.propTypes = propTypes;
export default AwardBreakdownTreeMap;
