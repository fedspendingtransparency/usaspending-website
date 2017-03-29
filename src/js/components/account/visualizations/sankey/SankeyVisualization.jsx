/**
 * SankeyVisualization.jsx
 * Created by Kevin li 3/27/17
 */

import React from 'react';

import * as MoneyFormatter from 'helpers/moneyFormatter';

import SankeyBar from './components/SankeyBar';
import SankeyFlow from './components/SankeyFlow';
import ItemLabel from './components/ItemLabel';
import DirectionLabel from './components/DirectionLabel';

const propTypes = {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    amounts: React.PropTypes.object
};

export default class SankeyVisualization extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            center: {
                width: 0,
                height: 0,
                x: 0,
                y: 0,
                description: ''
            },
            right: {
                width: 0,
                x: 0,
                obligated: {
                    height: 0,
                    description: '',
                    label: ''
                },
                unobligated: {
                    height: 0,
                    y: 0,
                    description: '',
                    label: ''
                },
                flow: {
                    length: 0,
                    x: 0
                }
            }
        };
    }

    componentWillReceiveProps(nextProps) {
        this.generateChart(nextProps);
    }

    generateLabel(amount, total) {
        const formattedMoney = MoneyFormatter.formatMoney(amount);
        const percentValue = Math.round((amount / total) * 1000) / 10;

        return `${formattedMoney} (${percentValue}%)`;
    }

    generateChart(props) {
        const barWidth = props.width / 6;
        const flowLength = props.width / 4;
        const graphHeight = props.height - 40;

        // calculate the center column values
        const centerHeight = graphHeight * (2 / 3);
        const centerY = (graphHeight - centerHeight) / 2;
        const centerX = (props.width - barWidth) / 2;

        const center = {
            width: barWidth,
            height: centerHeight,
            x: centerX,
            y: centerY,
            description: `Total Budget Authority: \
${MoneyFormatter.formatMoney(props.amounts.budgetAuthority)}`
        };

        // calculate the right column values
        const obligatedHeight = (props.amounts.out.obligated / props.amounts.budgetAuthority) * centerHeight;
        const unobligatedHeight = (props.amounts.out.unobligated / props.amounts.budgetAuthority) * centerHeight;
        const budgetAuthority = props.amounts.budgetAuthority;
        
        const obligatedString = MoneyFormatter.formatMoney(props.amounts.out.obligated);
        const unobligatedString = MoneyFormatter.formatMoney(props.amounts.out.unobligated);

        const obligatedLabel = this.generateLabel(props.amounts.out.obligated, budgetAuthority);
        const unobligatedLabel = this.generateLabel(props.amounts.out.unobligated, budgetAuthority);

        const right = {
            width: barWidth,
            x: props.width - barWidth,
            obligated: {
                height: obligatedHeight,
                description: `Obligated Amount: ${obligatedString}`,
                label: obligatedLabel
            },
            unobligated: {
                height: unobligatedHeight,
                y: graphHeight - unobligatedHeight,
                description: `Unobligated Balance: ${unobligatedString}`,
                label: unobligatedLabel
            },
            flow: {
                length: flowLength + 4, // extend the length by 2px on each end so the borders are hidden
                x: (centerX + barWidth) - 2
            }
        };

        this.setState({
            center,
            right
        });
    }

    render() {
        return (
            <svg
                className="sankey"
                width={this.props.width}
                height={this.props.height + 2}>

                <g
                    className="right-flows"
                    transform={`translate(${this.state.right.flow.x}, 40)`}>
                    <SankeyFlow
                        startY={this.state.center.y}
                        endY={0}
                        height={this.state.right.obligated.height}
                        length={this.state.right.flow.length}
                        description="Flow of money out of total budget authority to obligated amount"
                        style={{
                            fill: '#A7C2CA'
                        }} />
                    <SankeyFlow
                        startY={this.state.center.y + this.state.right.obligated.height}
                        endY={this.state.right.unobligated.y}
                        height={this.state.right.unobligated.height}
                        length={this.state.right.flow.length}
                        description="Flow of money out of total budget authority to unobligated balance"
                        style={{
                            fill: '#E1E7E9',
                            stroke: '#597785',
                            strokeWidth: '1',
                            strokeDasharray: '5'
                        }} />
                </g>

                <DirectionLabel
                    x={(this.state.center.x / 2) + 40}
                    y={16}
                    paddingX={85}
                    title="Money In">
                    <path d="M143.5 434.8L304 257 143.8 77.3 143.4 6l225.2 250.5L144 506" />
                </DirectionLabel>


                <g
                    className="center-col"
                    transform={`translate(${this.state.center.x}, 40)`}>
                    <ItemLabel
                        y={this.state.center.y - 25}
                        title="Total Budget Authority"
                        value={`${MoneyFormatter.formatMoney(this.props.amounts.budgetAuthority)} (100%)`} />
                    <SankeyBar
                        color={"#597785"}
                        x={0}
                        y={this.state.center.y}
                        width={this.state.center.width}
                        height={this.state.center.height}
                        description={this.state.center.description} />
                </g>

                <DirectionLabel
                    x={this.state.center.x + ((this.state.right.x - this.state.center.x) / 2) + 40}
                    y={16}
                    paddingX={100}
                    title="Money Out">
                    <path d="M143.5 434.8L304 257 143.8 77.3 143.4 6l225.2 250.5L144 506" />
                </DirectionLabel>

                <g
                    className="right-col"
                    transform={`translate(${this.state.right.x}, 40)`}>
                    <ItemLabel
                        y={-25}
                        title="Obligated Amount"
                        value={this.state.right.obligated.label} />
                    <SankeyBar
                        color={"#083546"}
                        x={0}
                        y={0}
                        width={this.state.right.width}
                        height={this.state.right.obligated.height}
                        description={this.state.right.obligated.description} />
                    <ItemLabel
                        y={this.state.right.unobligated.y - 25}
                        title="Unobligated Balance"
                        value={this.state.right.unobligated.label} />
                    <SankeyBar
                        color={"#083546"}
                        x={0}
                        y={this.state.right.unobligated.y}
                        width={this.state.right.width}
                        height={this.state.right.unobligated.height}
                        description={this.state.right.unobligated.description} />
                </g>

            </svg>
        );
    }
}

SankeyVisualization.propTypes = propTypes;
