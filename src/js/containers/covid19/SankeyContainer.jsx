/**
 * SankeyContainer.jsx
 * Created By Jonathan Hill 06/04/20
 */

import React from 'react';
import { sankey } from 'd3-sankey';
import { scaleLinear } from 'd3-scale';
import chroma from 'chroma-js';
import SankeyNode from './SankeyNode';
import SankeyLink from './SankeyLink';

const mockNodes = [
    {
        name: 'L'
    },
    {
        name: 'M'
    },
    {
        name: 'N'
    },
    {
        name: 'O'
    },
    {
        name: 'P'
    },
    {
        name: 'totalBudgetAuthority'
    },
    {
        name: 'awardObligations'
    },
    {
        name: 'nonAwardObligations'
    },
    {
        name: 'unObligatedBalance'
    },
    {
        name: 'awardOutlays'
    },
    {
        name: 'notYetOutlayed'
    },
    {
        name: 'nonAwardOutlays'
    },
    {
        name: 'notYetOutlayed'
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
        source: 5, // total to unobligated balance
        target: 8,
        value: 1700000
    },
    {
        source: 6,
        target: 9,
        value: 550000
    },
    {
        source: 6,
        target: 10,
        value: 550000
    },
    {
        source: 7,
        target: 11,
        value: 350000
    },
    {
        source: 7,
        target: 12,
        value: 350000
    }
];

const data = { nodes: mockNodes, links: mockLinks };
const width = 800;
const height = 400;

const SankeyContainer = () => {
    const { nodes, links } = sankey()
        .nodeWidth(15)
        .nodePadding(10)
        .extent([[1, 1], [width - 1, height - 5]])(data);
    const color = chroma.scale("Set3").classes(nodes.length);
    const colorScale = scaleLinear()
        .domain([0, nodes.length])
        .range([0, 1]);

    return (
        <svg height={height} width={width}>
            <g style={{ mixBlendMode: 'multiply' }}>
                {nodes.map((node, i) => (
                    <SankeyNode
                        {...node}
                        color={color(colorScale(i)).hex()}
                        key={`${node.name}${i}`} />
                ))}
                {links.map((link, i) => (
                    <SankeyLink
                        key={`link-${i}`}
                        link={link}
                        color={color(colorScale(link.source.index)).hex()} />
                ))}
            </g>
        </svg>
    );
};

export default SankeyContainer;
