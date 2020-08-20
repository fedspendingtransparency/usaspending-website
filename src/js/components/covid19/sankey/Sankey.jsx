/**
 * SankeyViz.jsx
 * Created By Jonathan Hill 06/05/20
 */

import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { uniqueId, uniq } from 'lodash';
import { TooltipWrapper } from 'data-transparency-ui';
import DateNote from 'components/covid19/DateNote';
import ResultsTableLoadingMessage from 'components/search/table/ResultsTableLoadingMessage';
// TODO - Uncomment this when tooltips and glossary content is ready
// import { Glossary } from 'components/sharedComponents/icons/Icons';
// TODO - Uncomment this when tooltips and glossary content is ready
// import { TooltipComponent } from 'containers/covid19/helpers/covid19';
import { calculateUnits, formatMoneyWithPrecision, formatMoney } from 'helpers/moneyFormatter';
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
    const [loading, setLoading] = useState(true);
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
    const [dateNoteStyles, setDateNoteStyles] = useState({ x: 0, y: 0 });
    const date = useSelector((state) => state.covid19.latestSubmissionDate);
    useEffect(() => setLoading(!sankeyNodes.length && !sankeyLinks.length), [sankeyNodes, sankeyLinks]);
    // TODO - Uncomment this when tooltips and glossary content is ready
    // const [tooltipsAndGlossaryIcons, setTooltipsAndGlossaryIcons] = useState(null);

    const defCodesSortedByValue = () => defCodes
        .map((code) => ({ ...code, value: overview[`_defCode_${code.code}_funding`] || 0 }))
        .sort((a, b) => b.value - a.value);
    const parsePublicLaws = (publicLawString) => uniq(publicLawString.replaceAll('Non-emergency', 'Non-Emergency').replaceAll('P.L.', publicLawString.includes('|') ? 'Public Laws' : 'Public Law').split(' ')).join(' ').replaceAll('|', 'and');
    // create data for def code nodes and add value to other nodes
    useEffect(() => {
        if (Object.keys(overview).length && defCodes.length) {
            const dataForNodes = defCodesSortedByValue().map((code) => ({
                name: `_defCode_${code.code}_funding`,
                publicLaw: parsePublicLaws(code.public_law),
                label: `DEF Code: ${code.code}`,
                color: defCodeColor,
                tooltip: <TooltipWrapper icon="info" />,
                textWidth: 63,
                textHeight: 29,
                value: code.value,
                description: `A rectangle representing ${formatMoney(overview[`_defCode_${code.code}_funding`])} in funding for ${parsePublicLaws(code.public_law)}, DEF Code: ${code.code}`
            })).concat(otherSankeyNodes.map((node) => ({
                ...node,
                value: overview[node.name],
                description: `A rectangle representing ${formatMoney(overview[node.name])} in spending for ${node.label}`
            })));
            if (isIE) {
                setNodeData(dataForNodes.filter((node) => node.name !== 'fakeData'));
            }
            else {
                setNodeData(dataForNodes);
            }
        }
    }, [defCodes, overview]);
    // create data for links
    useEffect(() => {
        if (Object.keys(overview).length && defCodes.length) {
            const data = nodeData.filter((node) => node.name !== '_totalBudgetAuthority');
            if (isIE) {
                setLinkData(dataForLinks.map((link, i) => ({ ...link, value: data[i]?.value })).filter((link) => link.name !== 'fakeData'));
            }
            else {
                setLinkData(dataForLinks.map((link, i) => ({ ...link, value: data[i]?.value })));
            }
        }
    }, [nodeData, overview, defCodes]);
    // set the data used for the d3 sankey method
    useEffect(() => {
        if (nodeData.length && linkData.length) setSankeyData(Object.assign({}, { nodes: nodeData, links: linkData }));
    }, [nodeData, linkData]);
    // create sankey data
    useEffect(() => {
        if (sankeyData.nodes.length && sankeyData.links.length) {
            if (!isIE) {
                const { nodes, links } = Sankey.sankey()
                    .nodeWidth(width / 5)
                    .nodePadding(60)
                    .extent([[1, startOfSankeyY], [width - 1, height - 5]])
                    .nodeSort(null)(sankeyData);
                setSankeyNodes(nodes);
                setSankeyLinks(links);
            }
            else {
                const { nodes, links } = Sankey.sankey()
                    .nodeWidth(width / 5)
                    .nodePadding(60)
                    .extent([[1, startOfSankeyY], [width - 1, height - 5]])(sankeyData);
                setSankeyNodes(nodes);
                setSankeyLinks(links);
            }
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

    // TODO - Uncomment this when tooltips and glossary content is ready
    // useEffect(() => {
    //     const ttAndGlossaryIcons = sankeyNodes.map((node) => {
    //         const {
    //             tooltip,
    //             label,
    //             glossary,
    //             x0,
    //             y0,
    //             textWidth,
    //             textHeight
    //         } = node;
    //         if (tooltip) {
    //             return (
    //                 <TooltipWrapper
    //                     key={uniqueId()}
    //                     icon="info"
    //                     styles={
    //                         {
    //                             position: 'abosolute',
    //                             transform: `translate(${x0 + textWidth}px,${(y0 - textHeight)}px)`
    //                         }
    //                     }

    //                     tooltipComponent={<TooltipComponent />}
    //                     className="covid19-tt sankey__tooltip" />
    //             );
    //         }
    //         return (
    //             <div
    //                 key={uniqueId()}
    //                 style={
    //                     {
    //                         position: 'absolute',
    //                         width: '1.2rem',
    //                         height: '1.2rem',
    //                         transform: `translate(${x0 + textWidth}px,${(y0 - textHeight)}px)`
    //                     }
    //                 }
    //                 className="sankey__glossary">
    //                 <a href={glossary}>
    //                     <Glossary alt={`View Glossary Definition of ${label}`} />
    //                 </a>
    //             </div>
    //         );
    //     });
    //     setTooltipsAndGlossaryIcons(ttAndGlossaryIcons);
    // }, [sankeyNodes, width]);

    const dateNoteRef = useCallback((div) => {
        if (div) {
            const dateNoteDiv = div.getBoundingClientRect();
            setDateNoteStyles({
                x: width - (dateNoteDiv?.width) || 0,
                y: sankeyNodes[sankeyNodes?.length - 2].y1 + 35
            });
        }
    }, [sankeyNodes, width]);

    return (
        <div className="sankey">
            {/* TODO - Uncomment this when tooltips and glossary content is ready */}
            {/* {tooltipsAndGlossaryIcons} */}
            {
                loading &&
                <div className="results-table-message-container">
                    <ResultsTableLoadingMessage />
                </div>
            }
            {
                !loading &&
                <svg height={height} width={width}>
                    <g style={{ mixBlendMode: 'multiply' }}>
                        {/* funding text and line */}
                        <g tabIndex="0" aria-label={`Data through ${date}`}>
                            <desc>{`Data through ${date}`}</desc>
                            { !isIE && <text className="sankey__date-note" ref={dateNoteRef} {...dateNoteStyles}>Data through {date}</text>}
                        </g>
                        <g tabIndex="0" aria-label="Funding, signifying the portion of funding for COVID-19">
                            <desc>FUNDING, signifying the portion of funding for COVID-19</desc>
                            <text
                                className="text"
                                x={fundingSpendingTextData.fundingTextStart}
                                y={20}>
                                FUNDING
                            </text>
                        </g>
                        <g tabIndex="0" aria-label="A line representing the funding portion of COVID-19">
                            <desc>A line representing the funding portion of COVID-19</desc>
                            <line
                                className="text__line"
                                x1={fundingSpendingTextData.fundingTextStart}
                                y1={25}
                                x2={fundingSpendingTextData.fundingTextEnd}
                                y2={25} />
                        </g>
                        {/* spending text and line */}
                        <g tabIndex="0" aria-label="Spending, signifying the portion of funding for COVID-19">
                            <text
                                className="text"
                                x={fundingSpendingTextData.spendingTextStart}
                                y={20}>
                                SPENDING
                            </text>
                        </g>
                        <g tabIndex="0" aria-label="A line representing the spending portion of COVID-19">
                            <line
                                className="text__line"
                                x1={fundingSpendingTextData.spendingTextStart}
                                y1={25}
                                x2={fundingSpendingTextData.spendingTextEnd}
                                y2={25} />
                        </g>
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
                                        <g tabIndex="0" aria-label={publicLaw}>
                                            <desc>{publicLaw}</desc>
                                            <text
                                                className="sankey__text sankey__text__title"
                                                x={x0}
                                                y={y0 - 36 || 0}>
                                                {publicLaw}
                                            </text>
                                        </g>
                                    }
                                    <g tabIndex="0" aria-label={node.label}>
                                        <desc>{node.label}</desc>
                                        <text
                                            className={node.publicLaw ? 'sankey__text' : 'sankey__text sankey__text__title'}
                                            x={x0}
                                            y={y0 - 20 || 0}>
                                            {node.label}
                                        </text>
                                    </g>
                                    <g tabIndex="0" aria-label={node.name === 'fakeData' ? '' : `${formatMoneyWithPrecision(value / units.unit, 1)} ${units.longLabel}`}>
                                        <desc>{node.name === 'fakeData' ? '' : `${formatMoneyWithPrecision(value / units.unit, 1)} ${units.longLabel}`}</desc>
                                        <text
                                            className="sankey__text sankey__text-money"
                                            x={x0}
                                            y={y0 - 4 || 0}>
                                            {node.name === 'fakeData' ? '' : `${formatMoneyWithPrecision(value / units.unit, 1)} ${units.longLabel}`}
                                        </text>
                                    </g>
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
            }
            { isIE && <DateNote />}
        </div>
    );
};

SankeyViz.propTypes = propTypes;
export default SankeyViz;
