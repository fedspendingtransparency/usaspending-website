/**
 * AwardLabels.jsx
 * Created by Emily Gullo 03/02/2017
 **/

import React from 'react';
import _ from 'lodash';

import * as MoneyFormatter from 'helpers/moneyFormatter';

import AwardLabelsLine from './AwardLabelsLine';

const propTypes = {
    name: React.PropTypes.string,
    path: React.PropTypes.string,
    amount: React.PropTypes.number,
    subtitle: React.PropTypes.string,
    line: React.PropTypes.string,
    labelDistance: React.PropTypes.number,
    groupTransform: React.PropTypes.string,
    singleTransform: React.PropTypes.string
};

export default class AwardLabels extends React.Component {

    render() {
        return (
            <g
                className={`${this.props.name}-label-group`}
                transform={`translate(${this.props.groupTransform})`}>

                <AwardLabelsLine
                    type={this.props.line}
                    labelDistance={this.props.labelDistance}
                    path={this.props.path} />

                <g
                    className={`${this.props.name}-label`}
                    transform={`translate(${this.props.singleTransform})`}>
                    <text
                        className="title"
                        x={0}
                        y={0}>
                        {_.capitalize(this.props.name)} Award Amount:
                    </text>
                    <text
                        className="subtitle"
                        x={0}
                        y={18}>
                        ({this.props.subtitle})
                    </text>
                    <text
                        className="value"
                        x={0}
                        y={18 + 20}>
                        {MoneyFormatter.formatMoney(this.props.amount)}
                    </text>
                </g>
            </g>
        );
    }
}
AwardLabels.propTypes = propTypes;
