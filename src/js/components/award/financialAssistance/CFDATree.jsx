/**
 * CFDATree.jsx
 * Created by Jonathan Hill 03/18/20
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { hierarchy, treemap, treemapBinary } from 'd3-hierarchy';
import { scaleLinear } from 'd3-scale';
import { remove } from 'lodash';

import Note from 'components/sharedComponents/Note';
import { measureTreemapHeader, measureTreemapValue } from 'helpers/textMeasurement';
import * as MoneyFormatter from 'helpers/moneyFormatter';
import TreemapCell from 'components/sharedComponents/TreemapCell';
import NoResultsMessage from 'components/sharedComponents/NoResultsMessage';

const propTypes = {
    data: PropTypes.array,
    width: PropTypes.number,
    height: PropTypes.number,
    showTooltip: PropTypes.func,
    hideTooltip: PropTypes.func,
    onTreeClick: PropTypes.func
};

const message = 'Results with federal action obligations of zero or less than zero for this award have been omitted in the treemap view. To view all results, click the table button above this chart.';

const CFDATree = ({
    data,
    width,
    height = 294,
    showTooltip,
    hideTooltip,
    onTreeClick
}) => {
    const [virtualChart, setVirtualChart] = useState([]);
    const [isPartialTree, setIsPartialTree] = useState(false);

    const chartLength = virtualChart.length;
    const naming = chartLength === 1 ? 'result' : 'results';

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

    const buildVirtualCell = (item, scale) => {
        const heightLocal = item.y1 - item.y0;
        const widthLocal = item.x1 - item.x0;

        const amount = item.data._federalActionOblicationAmount;
        const units = MoneyFormatter.calculateUnitForSingleValue(amount, 1);
        const formattedSubtitle =
            `${MoneyFormatter.formatMoneyWithPrecision(
                (amount / units.unit), 1
            )}${units.unitLabel}`;
        const name = `${item.data.cfdaNumber} - ${item.data.cfdaTitle}`;
        const title = truncateText(name, 'title', widthLocal);
        const subtitle = truncateText(formattedSubtitle, 'subtitle', widthLocal);
        const color = scale(amount);

        return {
            width: widthLocal,
            height: heightLocal,
            x: item.x0,
            y: item.y0,
            data: {
                ...item.data,
                id: item.data.cfdaNumber
            },
            color,
            title: {
                text: title,
                x: (widthLocal / 2),
                // shift it up slightly so the full title + subtitle combo is vertically centered
                y: (heightLocal / 2) - 5
            },
            subtitle: {
                text: subtitle,
                x: (widthLocal / 2),
                y: (heightLocal / 2) + 15 // to place the subtitle below the title
            }
        };
    };

    const buildVirtualChart = () => {
        // remove negative values because we can't display those in the treemap
        const removedCFDAs = remove(
            data,
            (account) => parseFloat(account._federalActionOblicationAmount) <= 0
        );

        // parse the inbound data into D3's treemap hierarchy structure
        const treemapData = hierarchy({
            children: data
        })
        // tell D3 how to extract the monetary value out of the object
            .sum((d) => d._federalActionOblicationAmount)
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
        const maxValue = treeItems[0].data._federalActionOblicationAmount;
        const minValue = treeItems[treeItems.length - 1].data._federalActionOblicationAmount;

        let scale = scaleLinear()
            .domain([minValue, maxValue])
            .range(['#f2f6f9', '#9bb1cf']);
        if (treeItems.length === 1) {
            // in the event that we only have one data item, mock the scale function to only
            // return one color
            scale = () => '#47BAD9';
        }

        // we can now begin creating the individual treemap cells
        const cellsLocal = [];
        treeItems.forEach((item) => {
            const cell = buildVirtualCell(item, scale);
            cellsLocal.push(cell);
        });

        setVirtualChart(cellsLocal);
        setIsPartialTree(removedCFDAs.length > 0);
    };

    const messaging = () => {
        if (!virtualChart.length) {
            return (<NoResultsMessage
                title="Chart Not Available"
                message="No available data to display." />);
        }
        return null;
    };

    useEffect(() => {
        buildVirtualChart();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, width, height]);

    if (width <= 0) {
        return null;
    }

    const cells = virtualChart.map((cell) => (
        <TreemapCell
            {...cell}
            highlightColor="#f49c20"
            key={`${cell.data.cfdaNumber}`}
            selectedCell={onTreeClick}
            showTooltip={showTooltip}
            hideTooltip={hideTooltip} />
    ));

    return (
        <div>
            <div className="results-table-message-container">
                {messaging()}
            </div>
            <div className="cfda-section-treemap">
                {chartLength !== 0 &&
                    <svg
                        className="treemap"
                        width="100%"
                        height={height}>
                        {cells}
                    </svg>}
            </div>
            {chartLength !== 0 &&
            <div className="cfda-section-treemap-count">
                {`${virtualChart.length} ${naming}`}
            </div>}
            {isPartialTree &&
            <span className="cfda-section__note">
                <Note message={message} />
            </span>}
        </div>
    );
};

CFDATree.propTypes = propTypes;
export default CFDATree;
