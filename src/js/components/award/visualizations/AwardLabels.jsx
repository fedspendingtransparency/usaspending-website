/**
 * AwardLabels.jsx
 * Created by Emily Gullo 03/02/2017
 **/

import React from 'react';
import _ from 'lodash';

import * as MoneyFormatter from 'helpers/moneyFormatter';

import AwardLabelsLine from './AwardLabelsLine';
import AwardLabelsPoly from './AwardLabelsPoly';

const propTypes = {
    name: React.PropTypes.string,
    amount: React.PropTypes.number,
    subtitle: React.PropTypes.string,
    line: React.PropTypes.string,
    labelDistance: React.PropTypes.number,
    groupTransform: React.PropTypes.string,
    singleTransform: React.PropTypes.string,
    labelPadding: React.PropTypes.number,
    currentY: React.PropTypes.number,
    graphHeight: React.PropTypes.number,
    labelWidth: React.PropTypes.number,
    currentMiddle: React.PropTypes.number,
    type: React.PropTypes.string
};

export default class AwardLabels extends React.Component {

    render() {
        let line = null;
        let anchor = "start";
        let labelY = [0, 18, 38];
        let labelX = 0;
        let labelType = _.capitalize(this.props.name);
        if (this.props.line === "line") {
            line = (<AwardLabelsLine
                labelDistance={this.props.labelDistance} />);
        }
        else if (this.props.line === "poly") {
            line = (<AwardLabelsPoly
                labelDistance={this.props.labelDistance}
                line="poly"
                labelWidth={this.props.labelWidth}
                labelPadding={this.props.labelPadding}
                currentY={this.props.currentY}
                graphHeight={this.props.graphHeight}
                currentMiddle={this.props.currentMiddle} />);
        }
        if (this.props.name === 'current') {
            anchor = "end";
            labelY = [-15, 3, 21];
            labelX = 150;
            if (this.props.type !== 'contract') {
                labelType = 'Total';
            }
        }

        return (
            <g
                className={`${this.props.name}-label-group`}
                transform={`translate(${this.props.groupTransform})`}>

                { line }

                <g
                    className={`${this.props.name}-label`}
                    transform={`translate(${this.props.singleTransform})`}>
                    <text
                        className="title"
                        x={labelX}
                        y={labelY[0]}
                        textAnchor={anchor}>
                        {labelType} Award Amount:
                    </text>
                    <text
                        className="subtitle"
                        x={labelX}
                        y={labelY[1]}
                        textAnchor={anchor}>
                        ({this.props.subtitle})
                    </text>
                    <text
                        className="value"
                        x={labelX}
                        y={labelY[2]}
                        textAnchor={anchor}>
                        {MoneyFormatter.formatMoney(this.props.amount)}
                    </text>
                </g>
            </g>
        );
    }
}
AwardLabels.propTypes = propTypes;
