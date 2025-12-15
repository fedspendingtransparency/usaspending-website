/**
 * AwardBreakdownTreeMap.jsx
 * Created by Lizzie Salita 5/16/18
 */

import React, { useEffect, useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { hierarchy, treemap, treemapBinary, treemapSlice } from 'd3-hierarchy';
import { remove } from 'lodash-es';

import * as TreemapHelper from 'helpers/treemapHelper';
import { awardTypeLabels } from 'dataMapping/state/awardTypes';
import AwardBreakdownTreeMapCells from "./AwardBreakdownTreeMapCells";
import useEventListener from "../../../../hooks/useEventListener";
import CreateAwardTypeTooltip from "./CreateAwardTypeTooltip";

const propTypes = {
    awardBreakdown: PropTypes.array,
    totalAmount: PropTypes.number,
    toggleState: PropTypes.bool
};

const AwardBreakdownTreeMap = ({
    awardBreakdown,
    totalAmount,
    toggleState
}) => {
    const [visualizationWidth, setVisualizationWidth] = useState(0);
    const [virtualChart, setVirtualChart] = useState([]);
    const [hoveredAwardType, setHoveredAwardType] = useState('');

    const amountType = useRef(toggleState ? "total_outlays" : "amount");
    const sectionWrapper = useRef(null);
    const awardRef = useRef(awardBreakdown);

    const visualizationHeight = 175;

    const buildVirtualCell = useCallback((data, i) => {
        // todo - use these two lines, along with the new arrays to return colors in treemapHelper,
        //  when finishing the toggle functionality; the two lines above will not be used
        let cellColor = amountType.current === 'total_outlays' ?
            TreemapHelper.stateTreemapColorsWithToggle[i] :
            TreemapHelper.stateTreemapColorsNoToggle[i];
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
            total: totalAmount,
            awardType: data.data.type,
            color: cellColor,
            textColor,
            textClass,
            labelView,
            width,
            height,
            percentView
        };
    }, [hoveredAwardType, totalAmount]);

    const buildVirtualTree = useCallback((data, type) => {
        // remove the negative values from the data because they can't be displayed in the treemap
        remove(data, (v) => v[type] <= 0);

        // parse the inbound data into D3's treemap hierarchy structure
        const treemapData = hierarchy({
            children: data
        })
            .sum((d) => d[type]) // tell D3 how to extract the monetary value out of the object
            .sort((a, b) => b[type] - a[type]); // sort the objects

        // set up a treemap object and pass in the root
        let tileStyle = treemapBinary;
        if (window.innerWidth < 768) {
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
    }, [buildVirtualCell]);

    const handleWindowResize = useCallback(() => {
        // width changed, update the visualization width
        if (sectionWrapper.current) {
            setVisualizationWidth(sectionWrapper.current.offsetWidth);
        }
        if (awardRef.current.length > 0) {
            buildVirtualTree(awardRef.current, amountType.current);
        }
    }, [buildVirtualTree]);

    useEffect(() => {
        // run once to get initial width
        handleWindowResize();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEventListener('resize', handleWindowResize);

    useEffect(() => {
        awardRef.current = awardBreakdown;
        if (awardBreakdown.length > 0) {
            buildVirtualTree(awardRef.current, amountType.current);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [awardBreakdown, amountType.current]);

    useEffect(() => {
        amountType.current = toggleState ? "total_outlays" : "amount";
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [toggleState]);

    return (
        <div className="award-breakdown__treemap">
            <div className="usa-da-treemap-section">
                <div className="treemap-inner-wrap">
                    <CreateAwardTypeTooltip
                        sectionWrapper={sectionWrapper}
                        hoveredAwardType={hoveredAwardType}
                        awardBreakdown={awardBreakdown}
                        virtualChart={virtualChart}
                        amountType={amountType}
                        totalAmount={totalAmount}
                        toggleState={toggleState} />
                    <div
                        className="tree-wrapper"
                        ref={sectionWrapper}>
                        <svg
                            width={visualizationWidth}
                            height={visualizationHeight}
                            className="treemap-svg overlay">
                            <AwardBreakdownTreeMapCells
                                virtualChart={virtualChart}
                                setHoveredAwardType={setHoveredAwardType} />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

AwardBreakdownTreeMap.propTypes = propTypes;
export default AwardBreakdownTreeMap;
