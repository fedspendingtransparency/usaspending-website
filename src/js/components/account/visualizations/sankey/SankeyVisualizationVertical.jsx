/**
 * SankeyVisualizationHorizontal.jsx
 * Created by Kevin li 3/27/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import * as MoneyFormatter from 'helpers/moneyFormatter';

import SankeyBar from './components/SankeyBar';
import SankeyFlowVertical from './components/SankeyFlowVertical';
import ItemLegend from './components/ItemLegend';
import DirectionLabel from './components/DirectionLabel';
import SankeyDisclosures from './components/SankeyDisclosures';

const propTypes = {
    width: PropTypes.number,
    amounts: PropTypes.object
};

export default class SankeyVisualizationVertical extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            graphHeight: 0,
            graphWidth: 0,
            graphTop: 0,
            graphBottom: 0,
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
            legend: {
                x: 0,
                y: 0,
                appropriations: {
                    x: 0,
                    y: 0
                },
                other: {
                    x: 0,
                    y: 0
                },
                bbf: {
                    x: 0,
                    y: 0
                },
                budgetAuthority: {
                    x: 0,
                    y: 0
                },
                obligated: {
                    x: 0,
                    y: 0
                },
                unobligated: {
                    x: 0,
                    y: 0
                }
            }
        };
    }

    componentDidMount() {
        this.generateChart(this.props);
    }

    componentDidUpdate() {
        this.generateChart(this.props);
    }

    generateLabel(amount, total) {
        const formattedMoney = MoneyFormatter.formatMoney(amount);
        const percentValue = Math.round((amount / total) * 1000) / 10;

        return `${formattedMoney} (${percentValue}%)`;
    }

    generateChart(props) {
        const hidden = [];

        let labelCount = 1;
        // determine how much space for labels to put at the bottom of the graph by checking how
        // many non-zero positive values there are
        if (props.amounts.in.bbf >= 0) {
            labelCount += 1;
        }
        if (props.amounts.in.appropriations >= 0) {
            labelCount += 1;
        }
        if (props.amounts.in.other >= 0) {
            labelCount += 1;
        }
        if (props.amounts.out.obligated >= 0) {
            labelCount += 1;
        }
        if (props.amounts.out.unobligated >= 0) {
            labelCount += 1;
        }

        const barHeight = 35;
        const labelHeight = 40;
        const flowHeight = barHeight * 3;
        const leftMargin = 0;
        const rightMargin = 80;
        const graphTop = 0;
        const graphBottom = (labelCount + 0.5) * labelHeight;
        const graphHeight = graphTop + (3 * barHeight) + (2 * flowHeight) + graphBottom;
        const graphWidth = this.props.width - (leftMargin + rightMargin);

        const budgetAuthority = props.amounts.budgetAuthority;

        // calculate the middle row
        const centerWidth = graphWidth * (2 / 3);
        // with 1/3 of the width unused, this means that 1/6 of the width is available on each side
        const centerX = (graphWidth / 6);

        const center = {
            x: centerX + leftMargin,
            y: graphTop + barHeight + flowHeight,
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
            x: leftMargin,
            y: graphTop,
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
                x: leftMargin,
                y: barHeight + graphTop,
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
                label: 'Obligations Incurred'
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
            y: center.y + barHeight + flowHeight,
            x: leftMargin,
            obligated: {
                x: 0,
                width: obligatedWidth,
                description: `Obligations Incurred: ${obligatedString}`,
                label: obligatedLabel
            },
            unobligated: {
                x: unobligatedX,
                width: unobligatedWidth,
                description: `Unobligated Balance: ${unobligatedString}`,
                label: unobligatedLabel
            },
            flow: {
                x: leftMargin,
                y: center.y + barHeight,
                length: flowHeight
            }
        };

        // calculate label positions
        let validLabels = 1;
        const appropriationsLabelY = labelHeight / 2;
        if (props.amounts.in.appropriations >= 0) {
            validLabels += 1;
        }

        const otherLabelY = ((validLabels - 1) + 0.5) * labelHeight;
        if (props.amounts.in.other >= 0) {
            validLabels += 1;
        }

        const bbfLabelY = ((validLabels - 1) + 0.5) * labelHeight;
        if (props.amounts.in.bbf >= 0) {
            validLabels += 1;
        }

        // because the budget authority bar is always shown, we must always display the label
        const baLabelY = ((validLabels - 1) + 0.5) * labelHeight;
        validLabels += 1;

        const obligatedLabelY = ((validLabels - 1) + 0.5) * labelHeight;
        if (props.amounts.out.obligated >= 0) {
            validLabels += 1;
        }

        const unobligatedLabelY = ((validLabels - 1) + 0.5) * labelHeight;

        const legend = {
            x: leftMargin,
            y: graphHeight - graphBottom,
            appropriations: {
                x: 10,
                y: appropriationsLabelY
            },
            other: {
                x: 10,
                y: otherLabelY
            },
            bbf: {
                x: 10,
                y: bbfLabelY
            },
            budgetAuthority: {
                x: 10,
                y: baLabelY
            },
            obligated: {
                x: 10,
                y: obligatedLabelY
            },
            unobligated: {
                x: 10,
                y: unobligatedLabelY
            }
        };

        this.setState({
            top,
            center,
            bottom,
            hidden,
            graphHeight,
            graphWidth,
            graphTop,
            graphBottom,
            legend,
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
                            description={`Flow of money out of total budget authority to \
obligations incurred`}
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
                        className="legend"
                        transform={`translate(${this.state.legend.x},${this.state.legend.y})`}>
                        <g
                            transform={`translate(${this.state.legend.appropriations.x},\
${this.state.legend.appropriations.y})`}>
                            <ItemLegend
                                color="#135259"
                                y={this.state.labelHeight}
                                title="New Appropriations"
                                value={this.state.top.appropriations.label}
                                hide={this.props.amounts.in.appropriations < 0} />
                        </g>
                        <g
                            transform={`translate(${this.state.legend.other.x},\
${this.state.legend.other.y})`}>
                            <ItemLegend
                                color="#136f69"
                                y={this.state.labelHeight}
                                title="Other Budgetary Resources"
                                value={this.state.top.other.label}
                                hide={this.props.amounts.in.other < 0} />
                        </g>
                        <g
                            transform={`translate(${this.state.legend.bbf.x},\
${this.state.legend.bbf.y})`}>
                            <ItemLegend
                                color="#218e74"
                                y={this.state.labelHeight}
                                title="Balance Brought Forward"
                                value={this.state.top.bbf.label}
                                hide={this.props.amounts.in.bbf < 0} />
                        </g>
                        <g
                            transform={`translate(${this.state.legend.budgetAuthority.x},\
${this.state.legend.budgetAuthority.y})`}>
                            <ItemLegend
                                color="#3d9851"
                                y={this.state.labelHeight}
                                title="Total Budget Authority"
                                value={`\
${MoneyFormatter.formatMoney(this.props.amounts.budgetAuthority)} (100%)`} />
                        </g>
                        <g
                            transform={`translate(${this.state.legend.obligated.x},\
${this.state.legend.obligated.y})`}>
                            <ItemLegend
                                color="#6d8996"
                                y={this.state.labelHeight}
                                title="Obligations Incurred"
                                value={this.state.bottom.obligated.label}
                                hide={this.props.amounts.out.obligated < 0} />
                        </g>
                        <g
                            transform={`translate(${this.state.legend.unobligated.x},\
${this.state.legend.unobligated.y})`}>
                            <ItemLegend
                                color="#97b5be"
                                y={this.state.labelHeight}
                                title="Unobligated Balance"
                                value={this.state.bottom.unobligated.label}
                                hide={this.props.amounts.out.unobligated < 0} />
                        </g>
                    </g>

                    <g
                        className="top-row"
                        transform={`translate(${this.state.top.x},${this.state.top.y})`}>
                        <SankeyBar
                            color="#135259"
                            x={this.state.top.appropriations.x}
                            y={0}
                            width={this.state.top.appropriations.width}
                            height={this.state.top.height}
                            description={this.state.top.appropriations.description} />

                        <SankeyBar
                            color="#136f69"
                            x={this.state.top.other.x}
                            y={0}
                            width={this.state.top.other.width}
                            height={this.state.top.height}
                            description={this.state.top.other.description} />

                        <SankeyBar
                            color="#218e74"
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
                            color="#3d9851"
                            x={0}
                            y={0}
                            width={this.state.center.width}
                            height={this.state.center.height}
                            description={this.state.center.description} />
                    </g>
                    <g
                        transform={`translate(${this.props.width - 75},\
${this.state.top.height + (this.state.top.flow.length / 2)}) scale(0.7,0.7)`}>
                        <DirectionLabel
                            x={0}
                            y={0}
                            paddingX={85}
                            title="Money In">
                            <path
                                d={`M77.2 143L255 303.7l179.7-160.2 71.3-.4-250.5 \
225.4L6 143.7`} />
                        </DirectionLabel>
                    </g>
                    <g
                        transform={`translate(${this.props.width - 75},\
${this.state.center.y + this.state.center.height + (this.state.bottom.flow.length / 2)}) \
scale(0.7,0.7)`}>
                        <DirectionLabel
                            x={0}
                            y={0}
                            paddingX={100}
                            title="Money Out">
                            <path
                                d={`M77.2 143L255 303.7l179.7-160.2 71.3-.4-250.5 225.4L6 \
143.7`} />
                        </DirectionLabel>
                    </g>


                    <g
                        className="bottom-row"
                        transform={`translate(${this.state.bottom.x},${this.state.bottom.y})`}>
                        <SankeyBar
                            color="#6d8996"
                            x={this.state.bottom.obligated.x}
                            y={0}
                            width={this.state.bottom.obligated.width}
                            height={this.state.bottom.height}
                            description={this.state.bottom.obligated.description} />
                        <SankeyBar
                            color="#97b5be"
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
