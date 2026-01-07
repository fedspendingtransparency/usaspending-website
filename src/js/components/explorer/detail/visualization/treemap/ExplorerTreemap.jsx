/**
 * ExplorerTreemap.jsx
 * Created by Kevin Li 8/17/17
 */

import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { hierarchy, treemap, treemapBinary } from 'd3-hierarchy';
import { scaleLinear } from 'd3-scale';

import { measureTreemapHeader, measureTreemapValue } from 'helpers/textMeasurement';


import LoadingSpinner from 'components/sharedComponents/LoadingSpinner';
import TreemapCell from 'components/sharedComponents/TreemapCell';

const propTypes = {
    isLoading: PropTypes.bool,
    width: PropTypes.number,
    height: PropTypes.number,
    total: PropTypes.number,
    data: PropTypes.object,
    goDeeper: PropTypes.func,
    showTooltip: PropTypes.func,
    hideTooltip: PropTypes.func,
    goToUnreported: PropTypes.func
    // activeSubdivision: PropTypes.object
};

export const ExplorerTreemap = ({
    isLoading,
    width,
    height = 530,
    total,
    data,
    goDeeper,
    showTooltip,
    hideTooltip,
    goToUnreported
}) => {
    const [virtualChart, setVirtualChart] = useState([]);

    const truncateText = (text, type, maxWidth) => {
    // calculate the text width of the full label
        let label = text;
        let labelWidth = 0;
        if (type === 'title') {
            labelWidth = measureTreemapHeader(text);
        }
        else if (type === 'subtitle') {
            labelWidth = measureTreemapValue(text);
        }

        // check to see if the full label will fit
        if (labelWidth > maxWidth) {
            // label won't fit, let's cut it down
            // determine the average character pixel width
            const characterWidth = Math.ceil(labelWidth / text.length);
            // give an additional 30px for the ellipsis
            const availableWidth = maxWidth - 30;
            let availableLength = Math.floor(availableWidth / characterWidth);
            if (availableLength < 1) {
                // we must show at least one character
                availableLength = 1;
            }

            // substring the label to this length
            if (availableLength < text.length) {
                label = `${label.substring(0, availableLength)}...`;
            }
        }

        return label;
    };

    const buildVirtualCell = useCallback((item, scale, localTotal) => {
        const localHeight = item.y1 - item.y0;
        const localWidth = item.x1 - item.x0;

        const amount = item.data.amount;
        const percent = amount / localTotal;
        const percentString = `${(Math.round(percent * 1000) / 10)}%`;

        // the available width is 40px less than the box width to account for 20px of padding on
        // each side
        const usableWidth = localWidth - 40;
        let name = item.data.name;
        const isUnreported = item.data.name === "Unreported Data";
        if (isUnreported) {
            name = "Unreported Data*";
        }
        const title = truncateText(name, 'title', usableWidth);
        const subtitle = truncateText(percentString, 'subtitle', usableWidth);
        let color = scale(amount);

        if (isUnreported) {
            // use the gray color for unreported data, instead of the usual calculated
            // color
            color = 'rgb(103,103,103)';
        }

        const cell = {
            width: localWidth,
            height: localHeight,
            x: item.x0,
            y: item.y0,
            data: Object.assign({}, item.data, {
                percent,
                percentString
            }),
            color,
            title: {
                text: title,
                x: (localWidth / 2),
                y: (localHeight / 2) - 5 // shift it up slightly so the full title + subtitle combo is vertically centered
            },
            subtitle: {
                text: subtitle,
                x: (localWidth / 2),
                y: (localHeight / 2) + 15 // to place the subtitle below the title
            }
        };

        return cell;
    }, []);

    const selectedCell = useCallback((id, title) => {
        goDeeper(id, title);
    }, [goDeeper]);

    const buildVirtualChart = useCallback(() => {
        const localData = data.toJS();
        // parse the inbound data into D3's treemap hierarchy structure
        const treemapData = hierarchy({ children: localData })
            .sum((d) => d.amount); // tell D3 how to extract the monetary value out of the object

        // set up a function for generating the treemap of the specified size and style
        const tree = treemap()
            .size([width, height])
            .tile(treemapBinary)
            .paddingInner(5)
            .round(true);

        // generate the treemap and calculate the individual boxes
        const treeItems = tree(treemapData).leaves();

        if (treeItems.length === 0 || localData.length === 0) {
            // we have no data, so don't draw a chart
            setVirtualChart([]);

            return;
        }

        // now generate a function that can return colors given the current range of data
        // to do this, we need the min and max data, since our tree items are now ordered we can
        // just grab the first and last cells
        const maxValue = treeItems[0].data.amount;
        const minValue = treeItems[treeItems.length - 1].data.amount;

        let scale = scaleLinear()
            .domain([minValue, maxValue])
            .range(['#47BAD9', '#1C4956']);
        if (treeItems.length === 1) {
            // in the event that we only have one data item, mock the scale function to only
            // return one color
            scale = () => '#47BAD9';
        }

        // we can now begin creating the individual treemap cells
        const cells = [];
        treeItems.forEach((item) => {
            const cell = buildVirtualCell(item, scale, total);
            cells.push(cell);
        });

        setVirtualChart(cells);
    }, [data, width, height, buildVirtualCell, total]);

    useEffect(() => {
        buildVirtualChart();
    }, [buildVirtualChart]);

    if (width <= 0) {
        return null;
    }

    const cells = virtualChart.map((cell) => (
        <TreemapCell
            {...cell}
            key={`${cell.data.name}-${cell.data.id}`}
            selectedCell={selectedCell}
            showTooltip={showTooltip}
            hideTooltip={hideTooltip}
            goToUnreported={goToUnreported} />
    ));

    let loadingMessage = null;
    if (isLoading) {
        loadingMessage = (
            <div className="explorer-detail-content__loading">
                <div className="explorer-detail-content__loading-message">
                    <LoadingSpinner />
                    <div className="explorer-detail-content__loading-title">Gathering your data...</div>
                    <div className="explorer-detail-content__loading-subtitle">Updating Spending Explorer.</div>
                    <div>This should only take a few moments...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="explorer-treemap">
            {loadingMessage}
            <svg
                className="treemap"
                width="100%"
                height={height}>
                {cells}
            </svg>
        </div>
    );
};

ExplorerTreemap.propTypes = propTypes;

export default ExplorerTreemap;

