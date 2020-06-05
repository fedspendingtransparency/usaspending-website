/**
 * Sankey.jsx
 * Created By Jonathan Hill 06/05/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import { sankey } from 'd3-sankey';
// import chroma from 'chroma-js';
import { formatMoney } from 'helpers/moneyFormatter';
import SankeyNode from './SankeyNode';
import SankeyLink from './SankeyLink';

const mockNodes = [
    {
        name: 'L',
        label: 'DEF Code: L',
        color: '#B699C6'
    },
    {
        name: 'M',
        label: 'DEF Code: M',
        color: '#B699C6'
    },
    {
        name: 'N',
        label: 'DEF Code: N',
        color: '#B699C6'
    },
    {
        name: 'O',
        label: 'DEF Code: O',
        color: '#B699C6'
    },
    {
        name: 'P',
        label: 'DEF Code: P',
        color: '#B699C6'
    },
    {
        name: 'totalBudgetAuthority',
        label: 'Total Budget Authority',
        color: '#AAC6E2'
    },
    {
        name: 'awardObligations',
        label: 'Award Obligations',
        color: '#558EC6'
    },
    {
        name: 'nonAwardObligations',
        label: 'Non-Award Obligations',
        color: '#558EC6'
    },
    {
        name: 'awardOutlays',
        label: 'Award Outlays',
        color: '#0A2F5A'
    },
    {
        name: 'notYetOutlayed',
        label: 'Not Yet Outlayed',
        stroke: '#0A2F5A',
        color: 'white',
        strokeWidth: 2,
        strokeOpacity: 0.4
    },
    {
        name: 'nonAwardOutlays',
        label: 'Non-Award Outlays',
        color: '#0A2F5A'
    },
    {
        name: 'notYetOutlayed',
        label: 'Not Yet Outlayed',
        stroke: '#0A2F5A',
        color: 'white',
        strokeWidth: 2,
        strokeOpacity: 0.4
    },
    {
        name: 'unObligatedBalance',
        label: 'Unobligated Balance',
        color: 'white',
        stroke: '#558EC6',
        strokeWidth: 2,
        strokeOpacity: 0.4
    }
];
// total amount = 3500000
const mockLinks = [
    {
        source: 0, // L to total
        target: 5,
        value: 500000
    },
    {
        source: 1, // M to total
        target: 5,
        value: 600000
    },
    {
        source: 2, // N to total
        target: 5,
        value: 700000
    },
    {
        source: 3, // O to total
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

const data = { nodes: mockNodes, links: mockLinks };

const propTypes = {
    height: PropTypes.number,
    width: PropTypes.number
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

const Sankey = ({ height, width }) => {
    const { nodes, links } = sankey()
        .nodeWidth(width / 8)
        .nodePadding(50)
        .extent([[1, 80], [width - 1, height - 5]])(data);
    const fundingTextStart = nodes[0].x0;
    const fundingTextEnd = nodes.find((node) => node.name === 'totalBudgetAuthority').x1;
    const spendingTextStart = nodes.find((node) => node.name === 'awardObligations').x0;
    const spendingTextEnd = nodes.find((node) => node.name === 'awardOutlays').x1;


    return (
        <svg height={height} width={width}>
            <g style={{ mixBlendMode: 'multiply' }}>
                {/* funding text and line */}
                <text
                    className="text"
                    x={fundingTextStart}
                    y={20}>
                    FUNDING
                </text>
                <line
                    className="text__line"
                    x1={fundingTextStart}
                    y1={25}
                    x2={fundingTextEnd}
                    y2={25} />
                {/* spending text and line */}
                <text
                    className="text"
                    x={spendingTextStart}
                    y={20}>
                    SPENDING
                </text>
                <line
                    className="text__line"
                    x1={spendingTextStart}
                    y1={25}
                    x2={spendingTextEnd}
                    y2={25} />
                {nodes.map((node, i) => {
                    return (
                        <g key={`node-${node.name}${i}`}>
                            <text
                                className="sankey__text"
                                x={node.x0}
                                y={node.y0 - 19}>
                                {node.label}
                            </text>
                            <text
                                className="sankey__text-money"
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
                {links.map((link, i) => {
                    return (
                        <SankeyLink
                            key={`link-${i}`}
                            link={link}
                            color={link.target.stroke || link.target.color} />
                    );
                })}
            </g>
        </svg>
    );
};

Sankey.propTypes = propTypes;
export default Sankey;
