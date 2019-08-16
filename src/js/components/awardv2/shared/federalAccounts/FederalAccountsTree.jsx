/**
 * FederalAccountsTree.jsx
 * Created by Jonathan Hill 5/1/19
 */

import React from 'react';
import PropTypes from 'prop-types';

import { hierarchy, treemap, treemapBinary } from 'd3-hierarchy';
import { scaleLinear } from 'd3-scale';

import { measureTreemapHeader, measureTreemapValue } from 'helpers/textMeasurement';
import * as MoneyFormatter from 'helpers/moneyFormatter';
import TreemapCell from 'components/sharedComponents/TreemapCell';
import ResultsTableLoadingMessage from 'components/search/table/ResultsTableLoadingMessage';
import ResultsTableErrorMessage from 'components/search/table/ResultsTableErrorMessage';
import NoResultsMessage from 'components/sharedComponents/NoResultsMessage';

const propTypes = {
    data: PropTypes.array,
    width: PropTypes.number,
    height: PropTypes.number,
    goDeeper: PropTypes.func,
    showTooltip: PropTypes.func,
    hideTooltip: PropTypes.func,
    inFlight: PropTypes.bool,
    error: PropTypes.bool,
    allFederalAccounts: PropTypes.array
};

const defaultProps = {
    height: 185
};

export default class FederalAccountsTree extends React.Component {
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

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            this.buildVirtualChart(nextProps);
        }
        else if (nextProps.width !== this.props.width || nextProps.height !== this.props.height) {
            this.buildVirtualChart(nextProps);
        }
    }

    buildVirtualChart(props) {
        const data = props.data;

        // parse the inbound data into D3's treemap hierarchy structure
        const treemapData = hierarchy({
            children: data
        })
            // tell D3 how to extract the monetary value out of the object
            .sum((d) => d._obligatedAmount)
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
            const cell = this.buildVirtualCell(item, scale);
            cells.push(cell);
        });
        this.setState({
            virtualChart: cells
        });
    }

    buildVirtualCell(data, scale) {
        const height = data.y1 - data.y0;
        const width = data.x1 - data.x0;

        const amount = data.data._obligatedAmount;
        const units = MoneyFormatter.calculateUnitForSingleValue(amount, 1);
        const formattedSubtitle =
        `${MoneyFormatter.formatMoneyWithPrecision((amount / units.unit), 1)}${units.unitLabel}`;
        const usableWidth = width;
        const name = data.data._federalAccountName;
        const title = this.truncateText(name, 'title', usableWidth);
        const subtitle = this.truncateText(formattedSubtitle, 'subtitle', usableWidth);
        const color = scale(amount);

        const cell = {
            width,
            height,
            x: data.x0,
            y: data.y0,
            data: data.data,
            color,
            title: {
                text: title,
                x: (width / 2),
                // shift it up slightly so the full title + subtitle combo is vertically centered
                y: (height / 2) - 5
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
        if (this.props.goDeeper) {
            this.props.goDeeper(id, title);
        }
    }

    render() {
        if (this.props.width <= 0) {
            return null;
        }
        const { inFlight, error, allFederalAccounts } = this.props;

        const naming = allFederalAccounts.length === 1 ? 'result' : 'results';
        let loadingMessage = null;
        let errorMessage = null;
        let noResultsMessage = null;
        let resultsCount = null;
        let treeMap = null;

        const cells = this.state.virtualChart.map((cell) => (
            <TreemapCell
                {...cell}
                highlightColor="#f49c20"
                key={`${cell.data.federalAccount}${cell.data.fundingAgencyId}`}
                selectedCell={this.selectedCell}
                showTooltip={this.props.showTooltip}
                hideTooltip={this.props.hideTooltip} />
        ));

        if (inFlight) {
            loadingMessage = (<ResultsTableLoadingMessage />);
        }
        if (error) {
            errorMessage = (<ResultsTableErrorMessage />);
        }
        if ((allFederalAccounts.length === 0) && !error && !inFlight) {
            noResultsMessage = (<NoResultsMessage
                title="Chart Not Available"
                message="No available data to display." />);
        }
        if ((allFederalAccounts.length !== 0) && !error && !inFlight) {
            resultsCount = (
                <div className="federal-accounts-treemap-count">
                    {`${this.props.allFederalAccounts.length} ${naming}`}
                </div>
            );
        }
        if ((allFederalAccounts.length > 0) && !error && !inFlight) {
            treeMap = (
                <svg
                    className="treemap"
                    width="100%"
                    height={this.props.height}>
                    {cells}
                </svg>
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
    }
}

FederalAccountsTree.propTypes = propTypes;
FederalAccountsTree.defaultProps = defaultProps;
