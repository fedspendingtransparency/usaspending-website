/**
 * Sankey.jsx
 * Created By Jonathan Hill 06/05/20
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { sankey } from 'd3-sankey';
import { uniqueId } from 'lodash';
import { formatMoney } from 'helpers/moneyFormatter';
import { TooltipWrapper } from 'data-transparency-ui';
import { Glossary } from 'components/sharedComponents/icons/Icons';
import SankeyNode from './SankeyNode';
import SankeyLink from './SankeyLink';

const mockNodes = [
    {
        name: 'totalBudgetAuthority',
        label: 'Total Budget Authority',
        color: '#AAC6E2',
        glossary: (
            <a href="/">
                <Glossary />
            </a>
        ),
        textWidth: 121,
        textHeight: 31
    },
    {
        name: 'awardObligations',
        label: 'Award Obligations',
        color: '#558EC6',
        glossary: (
            <a href="/">
                <Glossary />
            </a>
        ),
        textWidth: 99,
        textHeight: 31
    },
    {
        name: 'nonAwardObligations',
        label: 'Non-Award Obligations',
        color: '#558EC6',
        glossary: (
            <a href="/">
                <Glossary />
            </a>
        ),
        textWidth: 123,
        textHeight: 31
    },
    {
        name: 'awardOutlays',
        label: 'Award Outlays',
        color: '#0A2F5A',
        glossary: '/yellow',
        textWidth: 79,
        textHeight: 31
    },
    {
        name: 'notYetOutlayed',
        label: 'Not Yet Outlayed',
        stroke: '#0A2F5A',
        color: 'white',
        strokeWidth: 2,
        strokeOpacity: 0.4,
        glossary: (
            <a href="/">
                <Glossary />
            </a>
        ),
        textWidth: 91,
        textHeight: 31
    },
    {
        name: 'nonAwardOutlays',
        label: 'Non-Award Outlays',
        color: '#0A2F5A',
        glossary: (
            <a href="/">
                <Glossary />
            </a>
        ),
        textWidth: 104,
        textHeight: 31
    },
    {
        name: 'notYetOutlayed',
        label: 'Not Yet Outlayed',
        stroke: '#0A2F5A',
        color: 'white',
        strokeWidth: 2,
        strokeOpacity: 0.4,
        glossary: (
            <a href="/">
                <Glossary />
            </a>
        ),
        textWidth: 91,
        textHeight: 31
    },
    {
        name: 'unObligatedBalance',
        label: 'Unobligated Balance',
        color: 'white',
        stroke: '#558EC6',
        strokeWidth: 2,
        strokeOpacity: 0.4,
        glossary: (
            <a href="/">
                <Glossary />
            </a>
        ),
        textWidth: 111,
        textHeight: 31
    }
];
// total amount = 3500000
const mockLinks = [
    {
        source: 0, // O to total
        target: 5,
        value: 500000
    },
    {
        source: 1, // L to total
        target: 5,
        value: 600000
    },
    {
        source: 2, // M to total
        target: 5,
        value: 700000
    },
    {
        source: 3, // N to total
        target: 5,
        value: 800000
    },
    {
        source: 4, // P to total
        target: 5,
        value: 900000
    },
    {
        source: 5, // total to award obligations
        target: 6,
        value: 1100000
    },
    {
        source: 5, // total to non award obligations
        target: 7,
        value: 700000
    },
    {
        source: 6, // award to award outlays
        target: 8,
        value: 550000
    },
    {
        source: 6, // award to not yet outlayed
        target: 9,
        value: 550000
    },
    {
        source: 7, // non award to non award outlays
        target: 10,
        value: 350000
    },
    {
        source: 7, // non award to non award not yet outlayed
        target: 11,
        value: 350000
    },
    {
        source: 5, // total to unobligated balance
        target: 12,
        value: 1700000
    }
];

const defCodeColor = '#B699C6';

const propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    defCodes: PropTypes.array
};

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

const Sankey = ({ height, width, defCodes }) => {
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
        console.log(' Setting Data For Sankey to use ');
        setSankeyData(Object.assign({}, { nodes: nodeData, links: mockLinks }));
    }, [nodeData]);
    // create sankey data
    useEffect(() => {
        if (sankeyData.nodes.length && sankeyData.links.length) {
            const { nodes, links } = sankey()
                .nodeWidth(width / 5)
                .nodePadding(60)
                .extent([[1, 100], [width - 1, height - 5]])(sankeyData);
            setSankeyNodes(nodes);
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
            if (node.tooltip) {
                return (
                    <TooltipWrapper
                        key={uniqueId()}
                        icon="info"
                        styles={
                            {
                                position: 'abosolute',
                                transform: `translate(${node.x0 + node.textWidth}px,${(node.y0 - node.textHeight)}px)`
                            }
                        }
                        className="sankey__tooltip" />
                );
            }
            if (node.glossary) {
                return (
                    <div
                        key={uniqueId()}
                        // transform={`translate(${node.x0 + node.textWidth}px,${(node.y0 - node.textHeight)}px)`}
                        style={
                            {
                                position: 'absolute',
                                width: '1.2rem',
                                height: '1.2rem',
                                transform: `translate(${node.x0 + node.textWidth}px,${(node.y0 - node.textHeight)}px)`
                            }
                        }
                        className="sankey__glossary">
                        <a href="/">
                            <Glossary />
                        </a>
                    </div>
                );
            }
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
                    {sankeyNodes.map((node, i) => {
                        return (
                            <g key={`node-${node.name}${i}`}>
                                {
                                    node.publicLaw &&
                                    <text
                                        className="sankey__text sankey__text__public-law"
                                        x={node.x0}
                                        y={node.y0 - 34}>
                                        {node.publicLaw}
                                    </text>
                                }
                                <text
                                    className="sankey__text"
                                    x={node.x0}
                                    y={node.y0 - 19}>
                                    {node.label}
                                </text>
                                <text
                                    className="sankey__text sankey__text-money"
                                    x={node.x0}
                                    y={node.y0 - 4}>
                                    {formatMoney(node.value)}
                                </text>
                                <SankeyNode
                                    {...node}
                                    color={node.color} />
                            </g>
                        );
                    })}
                    {sankeyLinks.map((link, i) => {
                        return (
                            <SankeyLink
                                key={`link-${i}`}
                                link={link}
                                color={link.target.stroke || link.target.color} />
                        );
                    })}
                </g>
            </svg>
        </div>
    );
};

Sankey.propTypes = propTypes;
export default Sankey;
