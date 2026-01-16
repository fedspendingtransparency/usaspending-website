/**
 * FederalAccountsTree.jsx
 * Created by Jonathan Hill 5/1/19
 */

import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { hierarchy, treemap, treemapBinary } from 'd3-hierarchy';
import { scaleLinear } from 'd3-scale';
import { remove } from 'lodash-es';

import { measureTreemapHeader, measureTreemapValue } from 'helpers/textMeasurement';
import * as MoneyFormatter from 'helpers/moneyFormatter';
import TreemapCell from 'components/sharedComponents/TreemapCell';
import ResultsTableLoadingMessage from 'components/search/table/ResultsTableLoadingMessage';
import ResultsTableErrorMessage from 'components/search/table/ResultsTableErrorMessage';
import NoResultsMessage from 'components/sharedComponents/NoResultsMessage';

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

const propTypes = {
    data: PropTypes.array,
    width: PropTypes.number,
    height: PropTypes.number,
    goDeeper: PropTypes.func,
    showTooltip: PropTypes.func,
    hideTooltip: PropTypes.func,
    inFlight: PropTypes.bool,
    error: PropTypes.bool
};

const FederalAccountsTree = ({
    data,
    width,
    height = 294,
    goDeeper,
    showTooltip,
    hideTooltip,
    inFlight,
    error
}) => {
    const [virtualChart, setVirtualChart] = useState([]);

    const buildVirtualCell = useCallback((item, scale, usableWidth) => {
        const itemHeight = item.y1 - item.y0;
        const itemWidth = item.x1 - item.x0;

        const amount = item.data._obligatedAmount;
        const units = MoneyFormatter.calculateUnitForSingleValue(amount, 1);
        const formattedSubtitle =
            `${MoneyFormatter.formatMoneyWithPrecision(
                (amount / units.unit), 1
            )}${units.unitLabel}`;
        const name = item.data._federalAccountName;
        const title = truncateText(name, 'title', usableWidth);
        const subtitle = truncateText(formattedSubtitle, 'subtitle', usableWidth);
        const color = scale(amount);

        return {
            width: itemWidth,
            height: itemHeight,
            x: item.x0,
            y: item.y0,
            data: item.data,
            color,
            title: {
                text: title,
                x: (itemWidth / 2),
                // shift it up slightly so the full title + subtitle combo is vertically centered
                y: (itemHeight / 2) - 5
            },
            subtitle: {
                text: subtitle,
                x: (itemWidth / 2),
                y: (itemHeight / 2) + 15 // to place the subtitle below the title
            }
        };
    }, []);

    const buildVirtualChart = useCallback(() => {
        // remove negative values because we can't display those in the treemap
        remove(data, (account) => parseFloat(account._obligatedAmount) <= 0);

        // parse the inbound data into D3's treemap hierarchy structure
        const treemapData = hierarchy({
            children: data
        })
        // tell D3 how to extract the monetary value out of the object
            .sum((d) => d._obligatedAmount)
            .sort((a, b) => b.value - a.value); // sort the objects

        // set up a function for generating the treemap of the specified size and style
        const tree = treemap()
            .size([width, height])
            .tile(treemapBinary)
            .paddingInner(5)
            .round(true);

        // generate the treemap and calculate the individual boxes
        const treeItems = tree(treemapData).leaves();
        if (treeItems.length === 0 || data.length === 0) {
            // we have no data, so don't draw a chart
            setVirtualChart([]);
            return;
        }

        // now generate a function that can return colors given the current range of data
        // to do this, we need the min and max data, since our tree items are now ordered we can
        // just grab the first and last cells
        const maxValue = treeItems[0].data._obligatedAmount;
        const minValue = treeItems[treeItems.length - 1].data._obligatedAmount;

        let scale = scaleLinear()
            .domain([minValue, maxValue])
            .range(['#f2f6f9', '#9bb1cf']);
        if (treeItems.length === 1) {
            // in the event that we only have one data item, mock the scale function to only
            // return one color
            scale = () => '#47BAD9';
        }

        // we can now begin creating the individual treemap cells
        const cells = [];
        treeItems.forEach((item) => {
            const cell = buildVirtualCell(item, scale, width);
            cells.push(cell);
        });

        setVirtualChart(cells);
    }, [buildVirtualCell, data, height, width]);

    useEffect(() => {
        buildVirtualChart();
    }, [buildVirtualChart]);

    const selectedCell = (id, title) => {
        if (goDeeper) {
            goDeeper(id, title);
        }
    };

    if (width <= 0) {
        return null;
    }

    const noResults = virtualChart.length === 0;
    const naming = virtualChart.length === 1 ? 'result' : 'results';

    let loadingMessage = null;
    let errorMessage = null;
    let noResultsMessage = null;
    let resultsCount = null;
    let treeMap = null;

    const cells = virtualChart.map((cell) => (
        <TreemapCell
            {...cell}
            highlightColor="#f49c20"
            key={`${cell.data.federalAccount}${cell.data.fundingAgencyId}`}
            selectedCell={selectedCell}
            showTooltip={showTooltip}
            hideTooltip={hideTooltip} />
    ));

    if (inFlight) {
        loadingMessage = (<ResultsTableLoadingMessage />);
    }
    else if (error) {
        errorMessage = (<ResultsTableErrorMessage />);
    }
    else if (noResults) {
        noResultsMessage = (<NoResultsMessage
            title="Chart Not Available"
            message="No available data to display." />);
    }
    else {
        treeMap = (
            <svg
                className="treemap"
                width="100%"
                height={height}>
                {cells}
            </svg>
        );
        resultsCount = (
            <div className="federal-accounts-treemap-count">
                {`${virtualChart.length} ${naming}`}
            </div>
        );
    }
    return (
        <div>
            <div className="results-table-message-container">
                {loadingMessage}
                {errorMessage}
                {noResultsMessage}
            </div>
            <div className="federal-accounts-treemap">
                {treeMap}
            </div>
            {resultsCount}
        </div>
    );
};

FederalAccountsTree.propTypes = propTypes;
export default FederalAccountsTree;
