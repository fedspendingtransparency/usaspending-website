/**
 * SankeyVisualizationHorizontal.jsx
 * Created by Kevin li 3/27/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';

import * as MoneyFormatter from 'helpers/moneyFormatter';

import SankeyBar from './components/SankeyBar';
import SankeyFlow from './components/SankeyFlow';
import ItemLabel from './components/ItemLabel';
import DirectionLabel from './components/DirectionLabel';
import SankeyDisclosures from './components/SankeyDisclosures';

const propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    amounts: PropTypes.object
};

export default class SankeyVisualizationHorizontal extends React.Component {
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
            },
            left: {
                width: 0,
                x: 0,
                bbf: {
                    height: 0,
                    description: '',
                    label: ''
                },
                other: {
                    height: 0,
                    y: 0,
                    description: '',
                    label: ''
                },
                appropriations: {
                    height: 0,
                    y: 0,
                    description: '',
                    label: ''
                },
                flow: {
                    length: 0,
                    x: 0
                }
            },
            hidden: [],
            labels: {
                inX: 0,
                outX: 0
            }
        };
    }

    componentDidMount() {
        this.generateChart(this.props);
    }

    componentDidUpdate(prevProps) {
        if (!isEqual(prevProps, this.props)) {
            this.generateChart(this.props);
        }
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

        const hidden = [];

        const budgetAuthority = props.amounts.budgetAuthority;

        // calculate the center column values
        const centerHeight = graphHeight * (2 / 3);
        const centerY = (graphHeight - centerHeight) / 2;
        const centerX = (props.width - barWidth) / 2;

        const center = {
            width: barWidth,
            height: centerHeight,
            x: centerX,
            y: centerY,
            description: `Total Budgetary Resources: \
${MoneyFormatter.formatMoney(props.amounts.budgetAuthority)}`
        };

        // calculate the left column values
        const bbf = props.amounts.in.bbf;
        const bbfHeight = (bbf / budgetAuthority) * centerHeight;
        const bbfString = MoneyFormatter.formatMoney(bbf);
        const bbfLabel = this.generateLabel(bbf, budgetAuthority);

        const appropriations = props.amounts.in.appropriations;
        const appropHeight = (appropriations / budgetAuthority) * centerHeight;
        const appropString = MoneyFormatter.formatMoney(appropriations);
        const appropLabel = this.generateLabel(appropriations, budgetAuthority);
        const appropY = graphHeight - appropHeight;

        const other = props.amounts.in.other;
        const otherHeight = (other / budgetAuthority) * centerHeight;
        const otherString = MoneyFormatter.formatMoney(other);
        const otherLabel = this.generateLabel(other, budgetAuthority);

        // to vertically center the other box, determine how much space is left between the two
        // blocks
        let otherY = ((bbfHeight + appropY) / 2) - (otherHeight / 2);
        if (appropHeight <= 0) {
            // when no appropriations are available, position it at the bottom
            otherY = graphHeight - otherHeight;
        }
        else if (bbfHeight <= 0) {
            // when there is no balance brought forward, position it at the top
            otherY = 0;
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

        const left = {
            width: barWidth,
            x: 0,
            bbf: {
                height: bbfHeight,
                description: `Balance Brought Forward: ${bbfString}`,
                label: bbfLabel
            },
            other: {
                height: otherHeight,
                y: otherY,
                description: `Other Budgetary Resouces: ${otherString}`,
                label: otherLabel
            },
            appropriations: {
                height: appropHeight,
                y: appropY,
                description: `New Appropriations: ${appropString}`,
                label: appropLabel
            },
            flow: {
                length: flowLength,
                x: barWidth
            }
        };

        // calculate the right column values
        const obligatedHeight = (props.amounts.out.obligated / props.amounts.budgetAuthority)
            * centerHeight;
        const unobligatedHeight = (props.amounts.out.unobligated / props.amounts.budgetAuthority)
            * centerHeight;

        const obligatedString = MoneyFormatter.formatMoney(props.amounts.out.obligated);
        const unobligatedString = MoneyFormatter.formatMoney(props.amounts.out.unobligated);

        const obligatedLabel = this.generateLabel(props.amounts.out.obligated, budgetAuthority);
        const unobligatedLabel = this.generateLabel(props.amounts.out.unobligated, budgetAuthority);

        // handle negative values
        if (props.amounts.out.obligated < 0) {
            hidden.push({
                value: MoneyFormatter.formatMoney(props.amounts.out.obligated),
                label: 'Obligations Incurred'
            });
        }
        if (props.amounts.out.unobligated < 0) {
            hidden.push({
                value: MoneyFormatter.formatMoney(props.amounts.out.unobligated),
                label: 'Unobligated Balance'
            });
        }

        const right = {
            width: barWidth,
            x: props.width - barWidth,
            obligated: {
                height: obligatedHeight,
                description: `Obligations Incurred: ${obligatedString}`,
                label: obligatedLabel
            },
            unobligated: {
                height: unobligatedHeight,
                y: graphHeight - unobligatedHeight,
                description: `Unobligated Balance: ${unobligatedString}`,
                label: unobligatedLabel
            },
            flow: {
                length: flowLength,
                x: centerX + barWidth
            }
        };

        // now calculate the money in and money out label positions
        // since the labels won't resize, we can assume 90px width on the In label and 110px on the
        // Out label
        // the In label will be left of the starting X position of the center column by half the
        // left-side flow length. To center the label at that position, adjust the label to the left
        // by half its own width
        const inX = center.x - (left.flow.length / 2) - 45;

        // the Out label will be left of the right column starting X positoin by half the right side
        // flow length. To center the label at that
        // position, adjust the label further to the left by half its own width
        const outX = right.x - (right.flow.length / 2) - 55;

        this.setState({
            center,
            left,
            right,
            hidden,
            labels: {
                inX,
                outX
            }
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
                    height={this.props.height + 2}>

                    <g
                        className="left-flows"
                        transform={`translate(${this.state.left.flow.x}, 40)`}>
                        <SankeyFlow
                            startY={0}
                            endY={this.state.center.y}
                            height={this.state.left.bbf.height}
                            length={this.state.left.flow.length}
                            description={`Flow of money into total budgetary resources from balance \
brought forward`}
                            style={{
                                fill: '#bfcfd4'
                            }} />
                        <SankeyFlow
                            startY={this.state.left.other.y}
                            endY={this.state.center.y + this.state.left.bbf.height}
                            height={this.state.left.other.height}
                            length={this.state.left.flow.length}
                            description={`Flow of money into total budgetary resources from other \
budgetary resources`}
                            style={{
                                fill: '#bfcfd4'
                            }} />
                        <SankeyFlow
                            startY={this.state.left.appropriations.y}
                            endY={(this.state.center.y + this.state.center.height)
                                - this.state.left.appropriations.height}
                            height={this.state.left.appropriations.height}
                            length={this.state.left.flow.length}
                            description={`Flow of money into total budgetary resources from new \
appropriations`}
                            style={{
                                fill: '#bfcfd4'
                            }} />
                    </g>

                    <g
                        className="left-col"
                        transform="translate(0,40)">
                        <ItemLabel
                            y={-25}
                            title="Balance Brought Forward"
                            value={this.state.left.bbf.label}
                            hide={this.state.left.bbf.height <= 0} />
                        <SankeyBar
                            color="#597785"
                            x={0}
                            y={0}
                            width={this.state.left.width}
                            height={this.state.left.bbf.height}
                            description={this.state.left.bbf.description} />
                        <ItemLabel
                            y={this.state.left.other.y - 25}
                            title="Other Budgetary Resources"
                            value={this.state.left.other.label}
                            hide={this.state.left.other.height <= 0} />
                        <SankeyBar
                            color="#597785"
                            x={0}
                            y={this.state.left.other.y}
                            width={this.state.left.width}
                            height={this.state.left.other.height}
                            description={this.state.left.other.description} />
                        <ItemLabel
                            y={this.state.left.appropriations.y - 25}
                            title="New Appropriations"
                            value={this.state.left.appropriations.label}
                            hide={this.state.left.appropriations.height <= 0} />
                        <SankeyBar
                            color="#597785"
                            x={0}
                            y={this.state.left.appropriations.y}
                            width={this.state.left.width}
                            height={this.state.left.appropriations.height}
                            description={this.state.left.appropriations.description} />
                    </g>

                    <g
                        className="right-flows"
                        transform={`translate(${this.state.right.flow.x}, 40)`}>
                        <SankeyFlow
                            startY={this.state.center.y}
                            endY={0}
                            height={this.state.right.obligated.height}
                            length={this.state.right.flow.length}
                            description={`Flow of money out of total budgetary resources to \
obligations incurred`}
                            style={{
                                fill: '#bfcfd4'
                            }} />
                        <SankeyFlow
                            startY={this.state.center.y + this.state.right.obligated.height}
                            endY={this.state.right.unobligated.y}
                            height={this.state.right.unobligated.height}
                            length={this.state.right.flow.length}
                            description={`Flow of money out of total budgetary resources to \
unobligated balance`}
                            style={{
                                fill: '#E1E7E9',
                                stroke: '#597785',
                                strokeWidth: '1',
                                strokeDasharray: '5'
                            }} />
                    </g>

                    <DirectionLabel
                        x={this.state.labels.inX}
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
                            title="Total Budgetary Resources"
                            value={`\
${MoneyFormatter.formatMoney(this.props.amounts.budgetAuthority)} (100%)`} />
                        <SankeyBar
                            color="#597785"
                            x={0}
                            y={this.state.center.y}
                            width={this.state.center.width}
                            height={this.state.center.height}
                            description={this.state.center.description} />
                    </g>

                    <DirectionLabel
                        x={this.state.labels.outX}
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
                            title="Obligations Incurred"
                            value={this.state.right.obligated.label}
                            hide={this.state.right.obligated.height <= 0} />
                        <SankeyBar
                            color="#083546"
                            x={0}
                            y={0}
                            width={this.state.right.width}
                            height={this.state.right.obligated.height}
                            description={this.state.right.obligated.description} />
                        <ItemLabel
                            y={this.state.right.unobligated.y - 25}
                            title="Unobligated Balance"
                            value={this.state.right.unobligated.label}
                            hide={this.state.right.unobligated.height <= 0} />
                        <SankeyBar
                            color="#083546"
                            x={0}
                            y={this.state.right.unobligated.y}
                            width={this.state.right.width}
                            height={this.state.right.unobligated.height}
                            description={this.state.right.unobligated.description} />
                    </g>
                </svg>
                {disclosures}
            </div>
        );
    }
}

SankeyVisualizationHorizontal.propTypes = propTypes;
