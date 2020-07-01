/**
 * SankeyViz.jsx
 * Created By Jonathan Hill 06/05/20
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';
import { TooltipWrapper } from 'data-transparency-ui';
import { Glossary } from 'components/sharedComponents/icons/Icons';
import { TooltipComponent } from 'containers/covid19/helpers/covid19';
import { calculateUnits, formatMoneyWithPrecision } from 'helpers/moneyFormatter';
import {
    otherSankeyNodes,
    dataForLinks,
    defCodeColor
} from 'dataMapping/covid19/covid19';
import SankeyNode from './SankeyNode';
import SankeyLink from './SankeyLink';

const isIE = !!document.documentMode;
const Sankey = isIE ? require('d3-sankey') : require('d3-sankey0.12.3');

const propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    defCodes: PropTypes.array,
    overview: PropTypes.object
};

const startOfSankeyY = 100;

/**
 * Node Padding - Space between nodes (rectangles)
 */

const SankeyViz = ({
    height,
    width,
    defCodes,
    overview
}) => {
    const [nodeData, setNodeData] = useState([]);
    const [linkData, setLinkData] = useState([]);
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
        if (node.name === '_remainingBalance' && !isIE) {
            const { x1, x0 } = array.find((n) => n.name === '_awardObligations');
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
                name: `_defCode_${code.code}_funding`,
                publicLaw,
                label: `DEF Code: ${code.code}`,
                color: defCodeColor,
                tooltip: <TooltipWrapper icon="info" />,
                textWidth: 63,
                textHeight: 29
            };
        }).concat(otherSankeyNodes);
        // put O def code first
        const oDefCode = dataForNodes.splice(3, 1)[0];
        dataForNodes.unshift(oDefCode);
        setNodeData(dataForNodes);
    }, [defCodes]);
    // create data for links
    useEffect(() => {
        // TODO - once the over api is done use this code
        // const links = nodeData.reduce((acc, node, i) => {
        //     acc[i].value = overview[node.name];
        // }, [dataForLinks]);
        // setLinkData(links);
        setLinkData(dataForLinks);
    }, [nodeData, overview]);
    // set the data used for the d3 sankey method
    useEffect(() => {
        setSankeyData(Object.assign({}, { nodes: nodeData, links: linkData }));
    }, [nodeData, linkData]);
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
            const fundingTextEnd = sankeyNodes.find((node) => node.name === '_totalBudgetAuthority').x1;
            const spendingTextStart = sankeyNodes.find((node) => node.name === '_awardObligations').x0;
            const spendingTextEnd = sankeyNodes.find((node) => node.name === '_awardOutlays').x1;
            setFundingSpendingTextData({
                fundingTextStart,
                fundingTextEnd,
                spendingTextStart,
                spendingTextEnd
            });
        }
    }, [sankeyNodes, width]);

    useEffect(() => {
        const ttAndGlossaryIcons = sankeyNodes.map((node) => {
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
        setTooltipsAndGlossaryIcons(ttAndGlossaryIcons);
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
                        const units = calculateUnits([value]);
                        units.longLabel = units.longLabel.charAt(0).toUpperCase() + units.longLabel.slice(1);
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
                                    {`${formatMoneyWithPrecision(value / units.unit, units.precision)} ${units.longLabel}`}
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

SankeyViz.propTypes = propTypes;
export default SankeyViz;
