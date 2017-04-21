/**
 * SankeyVisualizationHorizontal.jsx
 * Created by Kevin li 3/27/17
 */

import React from 'react';

import * as MoneyFormatter from 'helpers/moneyFormatter';

import SankeyBar from './components/SankeyBar';
import SankeyFlowVertical from './components/SankeyFlowVertical';
import ItemWrappableLabel from './components/ItemWrappableLabel';
import DirectionLabel from './components/DirectionLabel';
import SankeyDisclosures from './components/SankeyDisclosures';

const propTypes = {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    amounts: React.PropTypes.object
};

export default class SankeyVisualizationVertical extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            graphHeight: 0,
            graphWidth: 0,
            center: {
                width: 0,
                height: 0,
                x: 0,
                y: 0,
                description: ''
            },
            bottom: {
                height: 0,
                x: 0,
                y: 0,
                obligated: {
                    x: 0,
                    width: 0,
                    description: '',
                    label: ''
                },
                unobligated: {
                    x: 0,
                    width: 0,
                    description: '',
                    label: ''
                },
                flow: {
                    length: 0,
                    x: 0,
                    y: 0
                }
            },
            top: {
                height: 0,
                x: 0,
                y: 0,
                bbf: {
                    x: 0,
                    width: 0,
                    description: '',
                    label: ''
                },
                other: {
                    width: 0,
                    x: 0,
                    description: '',
                    label: ''
                },
                appropriations: {
                    width: 0,
                    x: 0,
                    description: '',
                    label: ''
                },
                flow: {
                    length: 0,
                    x: 0,
                    y: 0
                }
            },
            hidden: [],
            labelHeight: 0,
            labels: {
                inX: 0,
                outX: 0
            }
        };
    }

    componentDidMount() {
        this.generateChart(this.props);
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
        const hidden = [];

        const barHeight = 35;
        const labelHeight = 45;
        const flowHeight = barHeight * 3;
        const sideMargin = 75;
        const graphHeight = (3 * barHeight) + (2 * flowHeight) + (2 * labelHeight);
        const graphWidth = this.props.width - (2 * sideMargin);

        const budgetAuthority = props.amounts.budgetAuthority;

        // calculate the middle row
        const centerWidth = graphWidth * (2 / 3);
        // with 1/3 of the width unused, this means that 1/6 of the width is available on each side
        const centerX = (graphWidth / 6);
        const centerY = (graphHeight / 2) - (barHeight / 2);

        const center = {
            x: centerX + sideMargin,
            y: centerY,
            width: centerWidth,
            height: barHeight,
            description: `Total Budget Authority: \
${MoneyFormatter.formatMoney(props.amounts.budgetAuthority)}`
        };

        // calculate the top row
        const appropriations = props.amounts.in.appropriations;
        const appropWidth = (appropriations / budgetAuthority) * centerWidth;
        const appropString = MoneyFormatter.formatMoney(appropriations);
        const appropLabel = this.generateLabel(appropriations, budgetAuthority);

        const bbf = props.amounts.in.bbf;
        const bbfWidth = (bbf / budgetAuthority) * centerWidth;
        const bbfX = graphWidth - bbfWidth;
        const bbfString = MoneyFormatter.formatMoney(bbf);
        const bbfLabel = this.generateLabel(bbf, budgetAuthority);

        const other = props.amounts.in.other;
        const otherWidth = (other / budgetAuthority) * centerWidth;
        let otherX = bbfX - ((bbfX - appropWidth) / 2) - (otherWidth / 2);
        const otherString = MoneyFormatter.formatMoney(other);
        const otherLabel = this.generateLabel(other, budgetAuthority);

        // handle the block positioning when one of the three inputs is missing
        if (bbfWidth <= 0) {
            // when no balance brought forward are available, position it at the right
            otherX = graphWidth - otherWidth;
        }
        else if (appropWidth <= 0) {
            // when there is no appropriations, position it at the left
            otherX = 0;
        }

        // handle negative values
        if (props.amounts.in.bbf < 0) {
            hidden.push({
                value: MoneyFormatter.formatMoney(props.amounts.in.bbf),
                label: 'Balance Brought Forward'
            });
        }
        if (props.amounts.in.other < 0) {
            hidden.push({
                value: MoneyFormatter.formatMoney(props.amounts.in.other),
                label: 'Other Budgetary Resources'
            });
        }
        if (props.amounts.in.appropriations < 0) {
            hidden.push({
                value: MoneyFormatter.formatMoney(props.amounts.in.appropriations),
                label: 'New Appropriations'
            });
        }

        // finally determine the max widths for each of the labels

        const top = {
            height: barHeight,
            x: sideMargin,
            y: labelHeight,
            appropriations: {
                x: 0,
                width: appropWidth,
                description: `New Appropriations: ${appropString}`,
                label: appropLabel
            },
            other: {
                x: otherX,
                width: otherWidth,
                description: `Other Budgetary Resources: ${otherString}`,
                label: otherLabel
            },
            bbf: {
                x: bbfX,
                width: bbfWidth,
                description: `Balance Brought Forward: ${bbfString}`,
                label: bbfLabel
            },
            flow: {
                x: sideMargin,
                y: barHeight + labelHeight,
                length: flowHeight
            }
        };


        // calculate bottom row
        const obligated = props.amounts.out.obligated;
        const obligatedWidth = (obligated / budgetAuthority) * centerWidth;
        const obligatedString = MoneyFormatter.formatMoney(obligated);
        const obligatedLabel = this.generateLabel(obligated, budgetAuthority);

        const unobligated = props.amounts.out.unobligated;
        const unobligatedWidth = (unobligated / budgetAuthority) * centerWidth;
        const unobligatedX = graphWidth - unobligatedWidth;
        const unobligatedString = MoneyFormatter.formatMoney(unobligated);
        const unobligatedLabel = this.generateLabel(unobligated, budgetAuthority);

        // handle negative values
        if (props.amounts.out.obligated < 0) {
            hidden.push({
                value: MoneyFormatter.formatMoney(props.amounts.out.obligated),
                label: 'Obligated Amount'
            });
        }
        if (props.amounts.out.unobligated < 0) {
            hidden.push({
                value: MoneyFormatter.formatMoney(props.amounts.out.unobligated),
                label: 'Unobligated Balance'
            });
        }

        const bottom = {
            height: barHeight,
            y: graphHeight - barHeight - labelHeight,
            x: sideMargin,
            obligated: {
                x: 0,
                width: obligatedWidth,
                description: `Obligated Amount: ${obligatedString}`,
                label: obligatedLabel
            },
            unobligated: {
                x: unobligatedX,
                width: unobligatedWidth,
                description: `Unobligated Balance: ${unobligatedString}`,
                label: unobligatedLabel
            },
            flow: {
                x: sideMargin,
                y: centerY + barHeight,
                length: flowHeight
            }
        };

        this.setState({
            top,
            center,
            bottom,
            hidden,
            graphHeight,
            graphWidth,
            labelHeight: (labelHeight / 2)
        });
    }

    render() {
        let disclosures = null;
        if (this.state.hidden.length > 0) {
            disclosures = <SankeyDisclosures items={this.state.hidden} />;
        }

        return (
            <div>
                <svg
                    className="sankey"
                    width={this.props.width}
                    height={this.state.graphHeight}>

                    <g
                        className="top-flows"
                        transform={`translate(0,${this.state.top.flow.y})`}>
                        <SankeyFlowVertical
                            startX={this.state.top.appropriations.x + this.state.top.flow.x}
                            endX={this.state.center.x}
                            width={this.state.top.appropriations.width}
                            length={this.state.top.flow.length}
                            description={`Flow of money into total budget authority from new \
appropriations`}
                            style={{
                                fill: '#bfcfd4'
                            }} />
                        <SankeyFlowVertical
                            startX={this.state.top.other.x + this.state.top.flow.x}
                            endX={this.state.center.x + this.state.top.appropriations.width}
                            width={this.state.top.other.width}
                            length={this.state.top.flow.length}
                            description={`Flow of money into total budget authority from other \
budgetary resouces`}
                            style={{
                                fill: '#bfcfd4'
                            }} />
                        <SankeyFlowVertical
                            startX={this.state.top.bbf.x + this.state.top.flow.x}
                            endX={(this.state.center.x + this.state.center.width)
                                - this.state.top.bbf.width}
                            width={this.state.top.bbf.width}
                            length={this.state.top.flow.length}
                            description={`Flow of money into total budget authority from balance \
brought forward`}
                            style={{
                                fill: '#bfcfd4'
                            }} />
                    </g>

                    <g
                        className="bottom-flow"
                        transform={`translate(0,\
${this.state.center.y + this.state.center.height})`}>
                        <SankeyFlowVertical
                            startX={this.state.center.x}
                            endX={this.state.bottom.obligated.x + this.state.bottom.flow.x}
                            width={this.state.bottom.obligated.width}
                            length={this.state.bottom.flow.length}
                            description={`Flow of money out of total budget authority to obligated \
amount`}
                            style={{
                                fill: '#bfcfd4'
                            }} />
                        <SankeyFlowVertical
                            startX={this.state.center.x + this.state.bottom.obligated.width}
                            endX={this.state.bottom.unobligated.x + this.state.bottom.flow.x}
                            width={this.state.bottom.unobligated.width}
                            length={this.state.bottom.flow.length}
                            description={`Flow of money out of total budget authority to \
unobligated balance`}
                            style={{
                                fill: '#E1E7E9',
                                stroke: '#597785',
                                strokeWidth: '1',
                                strokeDasharray: '5'
                            }} />
                    </g>

                    <g
                        className="top-labels"
                        transform={`translate(${this.state.top.x},0)`}>
                        <g transform={`translate(${this.state.top.appropriations.x},0)`}>
                            <ItemWrappableLabel
                                y={this.state.labelHeight}
                                title="New Appropriations"
                                value={this.state.top.appropriations.label}
                                hide={this.state.top.appropriations.width <= 0}
                                maxWidth={this.state.top.other.x} />
                        </g>
                        <g transform={`translate(${this.state.top.other.x},0)`}>
                            <ItemWrappableLabel
                                y={this.state.labelHeight}
                                title="Other Budgetary Resources"
                                value={this.state.top.other.label}
                                hide={this.state.top.other.width <= 0}
                                maxWidth={this.state.top.bbf.x - this.state.top.other.x} />
                        </g>
                        <g transform={`translate(${this.state.top.bbf.x},0)`}>
                            <ItemWrappableLabel
                                y={this.state.labelHeight}
                                title="Balance Brought Forward"
                                value={this.state.top.bbf.label}
                                hide={this.state.top.bbf.width <= 0}
                                maxWidth={this.state.graphWidth - this.state.top.bbf.x} />
                        </g>
                    </g>

                    <g
                        className="top-row"
                        transform={`translate(${this.state.top.x},${this.state.top.y})`}>
                        <SankeyBar
                            color={"#597785"}
                            x={this.state.top.appropriations.x}
                            y={0}
                            width={this.state.top.appropriations.width}
                            height={this.state.top.height}
                            description={this.state.top.appropriations.description} />

                        <SankeyBar
                            color={"#597785"}
                            x={this.state.top.other.x}
                            y={0}
                            width={this.state.top.other.width}
                            height={this.state.top.height}
                            description={this.state.top.other.description} />

                        <SankeyBar
                            color={"#597785"}
                            x={this.state.top.bbf.x}
                            y={0}
                            width={this.state.top.bbf.width}
                            height={this.state.top.height}
                            description={this.state.top.bbf.description} />
                    </g>

                    <g
                        className="middle-row"
                        transform={`translate(${this.state.center.x},${this.state.center.y})`}>
                        <SankeyBar
                            color={"#597785"}
                            x={0}
                            y={0}
                            width={this.state.center.width}
                            height={this.state.center.height}
                            description={this.state.center.description} />
                    </g>


                    <g
                        className="bottom-row"
                        transform={`translate(${this.state.bottom.x},${this.state.bottom.y})`}>
                        <SankeyBar
                            color={"#083546"}
                            x={this.state.bottom.obligated.x}
                            y={0}
                            width={this.state.bottom.obligated.width}
                            height={this.state.bottom.height}
                            description={this.state.bottom.obligated.description} />
                        <SankeyBar
                            color={"#083546"}
                            x={this.state.bottom.unobligated.x}
                            y={0}
                            width={this.state.bottom.unobligated.width}
                            height={this.state.bottom.height}
                            description={this.state.bottom.unobligated.description} />
                    </g>
                </svg>
                {disclosures}
            </div>
        );
    }
}

SankeyVisualizationVertical.propTypes = propTypes;
