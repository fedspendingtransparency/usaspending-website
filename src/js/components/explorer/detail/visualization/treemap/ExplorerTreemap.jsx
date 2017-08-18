/**
 * ExplorerTreemap.jsx
 * Created by Kevin Li 8/17/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import { hierarchy, treemap, treemapBinary } from 'd3-hierarchy';
import { scaleLinear } from 'd3-scale';

import TreemapCell from './TreemapCell';

const propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    data: PropTypes.array
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
    }

    componentWillMount() {
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

        if (treeItems.length === 0) {
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

        const cell = {
            width,
            height,
            x: data.x0,
            y: data.y0,
            data: Object.assign({}, data.data, {
                percent
            }),
            color: scale(amount)
        };

        return cell;
    }

    render() {
        if (this.props.width <= 0) {
            return null;
        }

        const cells = this.state.virtualChart.map((cell) => (
            <TreemapCell
                {...cell}
                key={cell.data.id} />
        ));

        return (
            <div className="explorer-treemap">
                <svg
                    className="treemap"
                    width={this.props.width}
                    height={this.props.height}>

                    {cells}

                </svg>
            </div>
        );
    }
}

ExplorerTreemap.propTypes = propTypes;
ExplorerTreemap.defaultProps = defaultProps;
