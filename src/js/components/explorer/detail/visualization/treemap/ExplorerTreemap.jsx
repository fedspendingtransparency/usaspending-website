/**
 * ExplorerTreemap.jsx
 * Created by Kevin Li 8/17/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import { hierarchy, treemap, treemapBinary } from 'd3-hierarchy';
import { scaleLinear } from 'd3-scale';
import { remove } from 'lodash';

import { measureTreemapHeader, measureTreemapValue } from 'helpers/textMeasurement';

import LoadingSpinner from 'components/sharedComponents/LoadingSpinner';
import TreemapCell from './TreemapCell';

const propTypes = {
    isLoading: PropTypes.bool,
    width: PropTypes.number,
    height: PropTypes.number,
    data: PropTypes.object,
    goDeeper: PropTypes.func,
    showTooltip: PropTypes.func,
    hideTooltip: PropTypes.func,
    goToUnreported: PropTypes.func
};

const defaultProps = {
    height: 530
};

export default class ExplorerTreemap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chartReady: false,
            virtualChart: []
        };

        this.selectedCell = this.selectedCell.bind(this);
    }

    componentDidMount() {
        this.buildVirtualChart(this.props);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            this.buildVirtualChart(this.props);
        }
        else if (prevProps.width !== this.props.width || prevProps.height !== this.props.height) {
            this.buildVirtualChart(this.props);
        }
    }

    buildVirtualChart(props) {
        const data = props.data.toJS();

        // remove the negative values from the data because they can't be displayed in the treemap
        remove(data, (v) => v.amount <= 0);

        const total = props.total;

        // parse the inbound data into D3's treemap hierarchy structure
        const treemapData = hierarchy({
            children: data
        })
            .sum((d) => d.amount) // tell D3 how to extract the monetary value out of the object
            .sort((a, b) => b.height - a.height || b.value - a.value); // sort the objects

        // set up a function for generating the treemap of the specified size and style
        const tree = treemap()
            .size([props.width, props.height])
            .tile(treemapBinary)
            .paddingInner(5)
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
            const cell = this.buildVirtualCell(item, scale, total);
            cells.push(cell);
        });

        this.setState({
            virtualChart: cells
        });
    }

    buildVirtualCell(data, scale, total) {
        const height = data.y1 - data.y0;
        const width = data.x1 - data.x0;

        const amount = data.data.amount;
        const percent = amount / total;
        const percentString = `${(Math.round(percent * 1000) / 10)}%`;

        // the available width is 40px less than the box width to account for 20px of padding on
        // each side
        const usableWidth = width - 40;
        let name = data.data.name;
        const isUnreported = data.data.name === "Unreported Data";
        if (isUnreported) {
            name = "Unreported Data*";
        }
        const title = this.truncateText(name, 'title', usableWidth);
        const subtitle = this.truncateText(percentString, 'subtitle', usableWidth);
        let color = scale(amount);

        if (isUnreported) {
            // use the gray color for unreported data, instead of the usual calculated
            // color
            color = 'rgb(103,103,103)';
        }

        const cell = {
            width,
            height,
            x: data.x0,
            y: data.y0,
            data: Object.assign({}, data.data, {
                percent,
                percentString
            }),
            color,
            title: {
                text: title,
                x: (width / 2),
                y: (height / 2) - 5 // shift it up slightly so the full title + subtitle combo is vertically centered
            },
            subtitle: {
                text: subtitle,
                x: (width / 2),
                y: (height / 2) + 15 // to place the subtitle below the title
            }
        };

        return cell;
    }

    truncateText(text, type, maxWidth) {
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
    }

    selectedCell(id, title) {
        this.props.goDeeper(id, title);
    }

    render() {
        if (this.props.width <= 0) {
            return null;
        }

        const cells = this.state.virtualChart.map((cell) => (
            <TreemapCell
                {...cell}
                key={`${cell.data.name}-${cell.data.id}`}
                selectedCell={this.selectedCell}
                showTooltip={this.props.showTooltip}
                hideTooltip={this.props.hideTooltip}
                goToUnreported={this.props.goToUnreported} />
        ));

        let loadingMessage = null;
        if (this.props.isLoading) {
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
                    height={this.props.height}>
                    {cells}
                </svg>
            </div>
        );
    }
}

ExplorerTreemap.propTypes = propTypes;
ExplorerTreemap.defaultProps = defaultProps;
