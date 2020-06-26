/**
 * Sankey.jsx
 * Created By Jonathan Hill 06/05/20
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';
import { formatMoney } from 'helpers/moneyFormatter';
import { TooltipWrapper } from 'data-transparency-ui';
import { Glossary } from 'components/sharedComponents/icons/Icons';
import { TooltipComponent } from 'containers/covid19/helpers/covid19';
import { mockNodes, mockLinks, defCodeColor } from 'dataMapping/covid19/covid19';
import SankeyNode from './SankeyNode';
import SankeyLink from './SankeyLink';

const isIE = !!document.documentMode;
const Sankey = isIE ? require('d3-sankey') : require('d3-sankey0.12.3');

const propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    defCodes: PropTypes.array
};

const startOfSankeyY = 100;

/**
 * Node Width
 * We set nodeWidth to the width of the div divided by 8.
 * Due to use have 4 separate nodes and we need space to
 * draw the links we double the nodes.
 */

/**
 * Node Padding - Space between nodes (rectangles)
 * We set the node height to be the height divided by 4.
 * Due to use having at most 4 nodes vertically due to the
 * DEF code L, M, N, O, and P.
 */

const SankeyChart = ({ height, width, defCodes }) => {
    const [nodeData, setNodeData] = useState([]);
    const [sankeyData, setSankeyData] = useState({ nodes: [], links: [] });
    const [sankeyNodes, setSankeyNodes] = useState([]);
    const [sankeyLinks, setSankeyLinks] = useState([]);
    const [fundingSpendingTextData, setFundingSpendingTextData] = useState({
        fundingTextStart: 0,
        fundingTextEnd: 0,
        spendingTextStart: 0,
        spendingTextEnd: 0
    });
    const [tooltipsAndGlossaryIcons, setTooltipsAndGlossaryIcons] = useState(null);
    const manuallyPositionOtherObligations = (nodes) => nodes.map((node, i, array) => {
        const newNode = node;
        if (node.name === 'unObligatedBalance') {
            const { x1, x0 } = array.find((n) => n.name === 'awardObligations');
            newNode.x0 = x0;
            newNode.x1 = x1;
            return newNode;
        }
        return newNode;
    });
    // create data for def code nodes
    useEffect(() => {
        const dataForNodes = defCodes.map((code) => {
            const emergencyText = code.public_law.startsWith('Emergency') ? 'Emergency' : 'Non-Emergency';
            const lawCode = code.public_law.split(' ').pop();
            const publicLaw = `${emergencyText} Public Law ${lawCode}`;
            return {
                name: code.code,
                publicLaw,
                label: `DEF Code: ${code.code}`,
                color: defCodeColor,
                tooltip: <TooltipWrapper icon="info" />,
                textWidth: 63,
                textHeight: 29
            };
        }).concat(mockNodes);
        // put O def code first
        const oDefCode = dataForNodes.splice(3, 1)[0];
        dataForNodes.unshift(oDefCode);
        setNodeData(dataForNodes);
    }, [defCodes]);
    // set the data used for the d3 sankey method
    useEffect(() => {
        setSankeyData(Object.assign({}, { nodes: nodeData, links: mockLinks }));
    }, [nodeData]);
    // create sankey data
    useEffect(() => {
        if (sankeyData.nodes.length && sankeyData.links.length) {
            const { nodes, links } = Sankey.sankey()
                .nodeWidth(width / 5)
                .nodePadding(60)
                .extent([[1, startOfSankeyY], [width - 1, height - 5]])(sankeyData);
            setSankeyNodes(manuallyPositionOtherObligations(nodes));
            setSankeyLinks(links);
        }
    }, [sankeyData, height, width]);

    useEffect(() => {
        if (sankeyNodes.length) {
            const fundingTextStart = sankeyNodes[0].x0;
            const fundingTextEnd = sankeyNodes.find((node) => node.name === 'totalBudgetAuthority').x1;
            const spendingTextStart = sankeyNodes.find((node) => node.name === 'awardObligations').x0;
            const spendingTextEnd = sankeyNodes.find((node) => node.name === 'awardOutlays').x1;
            setFundingSpendingTextData({
                fundingTextStart,
                fundingTextEnd,
                spendingTextStart,
                spendingTextEnd
            });
        }
    }, [sankeyNodes, width]);

    useEffect(() => {
        const data = sankeyNodes.map((node) => {
            const {
                tooltip,
                label,
                glossary,
                x0,
                y0,
                textWidth,
                textHeight
            } = node;
            if (tooltip) {
                return (
                    <TooltipWrapper
                        key={uniqueId()}
                        icon="info"
                        styles={
                            {
                                position: 'abosolute',
                                transform: `translate(${x0 + textWidth}px,${(y0 - textHeight)}px)`
                            }
                        }

                        tooltipComponent={<TooltipComponent />}
                        className="covid19-tt sankey__tooltip" />
                );
            }
            return (
                <div
                    key={uniqueId()}
                    style={
                        {
                            position: 'absolute',
                            width: '1.2rem',
                            height: '1.2rem',
                            transform: `translate(${x0 + textWidth}px,${(y0 - textHeight)}px)`
                        }
                    }
                    className="sankey__glossary">
                    <a href={glossary}>
                        <Glossary alt={`View Glossary Definition of ${label}`} />
                    </a>
                </div>
            );
        });
        setTooltipsAndGlossaryIcons(data);
    }, [sankeyNodes, width]);

    return (
        <div className="sankey">
            {tooltipsAndGlossaryIcons}
            <svg height={height} width={width}>
                <g style={{ mixBlendMode: 'multiply' }}>
                    {/* funding text and line */}
                    <text
                        className="text"
                        x={fundingSpendingTextData.fundingTextStart}
                        y={20}>
                        FUNDING
                    </text>
                    <line
                        className="text__line"
                        x1={fundingSpendingTextData.fundingTextStart}
                        y1={25}
                        x2={fundingSpendingTextData.fundingTextEnd}
                        y2={25} />
                    {/* spending text and line */}
                    <text
                        className="text"
                        x={fundingSpendingTextData.spendingTextStart}
                        y={20}>
                        SPENDING
                    </text>
                    <line
                        className="text__line"
                        x1={fundingSpendingTextData.spendingTextStart}
                        y1={25}
                        x2={fundingSpendingTextData.spendingTextEnd}
                        y2={25} />
                    {sankeyNodes.map((node) => {
                        const {
                            x0,
                            y0,
                            color,
                            value,
                            publicLaw
                        } = node;
                        return (
                            <g key={uniqueId()}>
                                {
                                    node.publicLaw &&
                                    <text
                                        className="sankey__text sankey__text__public-law"
                                        x={x0}
                                        y={y0 - 34}>
                                        {publicLaw}
                                    </text>
                                }
                                <text
                                    className="sankey__text"
                                    x={x0}
                                    y={y0 - 19}>
                                    {node.label}
                                </text>
                                <text
                                    className="sankey__text sankey__text-money"
                                    x={x0}
                                    y={y0 - 4}>
                                    {formatMoney(value)}
                                </text>
                                <SankeyNode
                                    {...node}
                                    color={color} />
                            </g>
                        );
                    })}
                    {sankeyLinks.map((link) => (
                        <SankeyLink
                            key={uniqueId()}
                            link={link}
                            color={link.target.color} />
                    ))}
                </g>
            </svg>
        </div>
    );
};

SankeyChart.propTypes = propTypes;
export default SankeyChart;
