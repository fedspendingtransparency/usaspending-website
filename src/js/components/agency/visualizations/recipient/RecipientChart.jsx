/**
 * RecipientChart.jsx
 * Created by Kevin Li 6/13/17
 */

import React from 'react';

import HorizontalChart from 'components/search/visualizations/rank/chart/HorizontalChart';

import RecipientTooltip from './RecipientTooltip';

const propTypes = {
    labelSeries: React.PropTypes.array,
    dataSeries: React.PropTypes.array,
    descriptions: React.PropTypes.array,
    width: React.PropTypes.number,
    labelWidth: React.PropTypes.number
};

const rowHeight = 60;
const axisHeight = 30;
const maxRows = 10;

export default class RecipientChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showTooltip: false,
            tooltip: {
                label: '',
                value: 0,
                x: 0,
                y: 0
            }
        };

        this.showTooltip = this.showTooltip.bind(this);
        this.hideTooltip = this.hideTooltip.bind(this);
    }

    showTooltip(data) {
        this.setState({
            showTooltip: true,
            tooltip: data
        });
    }

    hideTooltip() {
        this.setState({
            showTooltip: false
        });
    }

    render() {
        let hideTooltip = '';
        if (!this.state.showTooltip) {
            hideTooltip = 'hide';
        }

        return (
            <div>
                <HorizontalChart
                    labelSeries={this.props.labelSeries}
                    dataSeries={this.props.dataSeries}
                    descriptions={this.props.descriptions}
                    height={(maxRows * rowHeight) + axisHeight}
                    width={this.props.width}
                    labelWidth={this.props.labelWidth}
                    selectItem={this.showTooltip}
                    deselectItem={this.hideTooltip} />

                <div className={`tooltip-wrapper ${hideTooltip}`}>
                    <RecipientTooltip
                        {...this.state.tooltip} />
                </div>
            </div>
        );
    }
}

RecipientChart.propTypes = propTypes;
