/**
 * VisualizationSection.jsx
 * Created by Lizzie Salita 10/29/21
 */

// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from 'prop-types';
import { Table } from 'data-transparency-ui';
import { formatMoneyWithPrecision } from 'helpers/moneyFormatter';
import { levels } from './StatusOfFunds';
import StatusOfFundsChart from '../visualizations/StatusOfFundsChart';
import RoundedToggle from "../../sharedComponents/RoundedToggle";
import Accordion from "../../sharedComponents/accordion/Accordion";
import GlossaryLink from "../../sharedComponents/GlossaryLink";
import ChartTableToggle from "../../sharedComponents/buttons/ChartTableToggle";

const propTypes = {
    toggle: PropTypes.bool,
    onToggle: PropTypes.func,
    onKeyToggle: PropTypes.func,
    level: PropTypes.number.isRequired,
    setLevel: PropTypes.func,
    loading: PropTypes.bool,
    setLoading: PropTypes.func,
    totalItems: PropTypes.number,
    setTotalItems: PropTypes.func,
    agencyName: PropTypes.string,
    fy: PropTypes.string,
    results: PropTypes.array,
    fetchFederalAccounts: PropTypes.func,
    selectedSubcomponent: PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.string,
        budgetaryResources: PropTypes.string,
        obligations: PropTypes.string
    }),
    isMobile: PropTypes.bool,
    viewType: PropTypes.string,
    setViewType: PropTypes.func
};

const VisualizationSection = ({
    toggle,
    onKeyToggle,
    onToggle,
    loading,
    setLoading,
    level,
    setLevel,
    totalItems,
    setTotalItems,
    agencyName,
    fy,
    results,
    selectedSubcomponent,
    fetchFederalAccounts,
    isMobile,
    viewType,
    setViewType
}) => {
    const [open, setOpen] = useState(false);
    const fyString = `FY${fy.slice(2)}`;
    const accordionTitle = (<span>What&nbsp;is&nbsp;this?</span>);
    const columns = toggle ?
        [
            {
                title: 'subComponent',
                displayName: levels[level]
            },
            {
                title: 'outlays',
                displayName: [`${fyString} Outlays`],
                right: true
            }
        ]
        :
        [
            {
                title: 'subComponent',
                displayName: levels[level]
            },
            {
                title: 'totalBudgetaryResources',
                displayName: isMobile ? `${fyString} Total Budgetary Resources` : [`${fyString} Total Budgetary`, <br />, 'Resources'],
                right: true
            },
            {
                title: 'obligations',
                displayName: `${fyString} Obligations`,
                right: true
            }
        ];

    const rows = results.map((data) => (toggle ?
        [
            (
                <div>
                    {data.name}
                </div>
            ),
            (
                <div>
                    {formatMoneyWithPrecision(data._outlays)}
                </div>
            )
        ]
        :
        [
            (
                <div>
                    {data.name}
                </div>
            ),
            (
                <div>
                    {formatMoneyWithPrecision(data._budgetaryResources)}
                </div>
            ),
            (
                <div>
                    {formatMoneyWithPrecision(data._obligations)}
                </div>
            )
        ]));

    const changeView = (label) => {
        setViewType(label);
    };

    const chartTableToggle = (
        <ChartTableToggle
            activeType={viewType}
            changeView={changeView} />
    );

    return (
        <div
            className="status-of-funds__visualization"
            onMouseLeave={() => {
                const el = document.querySelector("div.tooltip-wrapper.sof_chart-tt");
                if (el) {
                    el.style.display = "none";
                }
            }}>
            {isMobile ? (
                <>
                    <h6>{level === 1 ? selectedSubcomponent?.name : agencyName} by <span className="status-of-funds__emphasis">{levels[level]}</span> for FY {fy}
                    </h6>
                    <div className="status-of-funds__controls-mobile">
                        <div className="status-of-funds__controls-mobile-row-one">
                            <RoundedToggle toggle={toggle} onKeyToggle={onKeyToggle} onToggle={onToggle} label="View Outlays" />
                            {chartTableToggle}
                        </div>
                        <Accordion setOpen={setOpen} closedIcon="chevron-down" openIcon="chevron-up" title={accordionTitle} />
                    </div>
                </>
            )
                :
                (
                    <>
                        <div className="status-of-funds__controls">
                            <div className="status-of-funds__controls-desktop-row-one">
                                <h6>{level === 1 ? selectedSubcomponent?.name : agencyName} by <span className="status-of-funds__emphasis">{levels[level]}</span> for FY {fy}
                                </h6>
                                {chartTableToggle}
                            </div>
                            <div className="status-of-funds__controls-desktop-row-two">
                                <RoundedToggle toggle={toggle} onKeyToggle={onKeyToggle} onToggle={onToggle} label="View Outlays" />
                                <div className="status-of-funds__line-div" />
                                <Accordion setOpen={setOpen} closedIcon="chevron-down" openIcon="chevron-up" title="What is this?" />
                            </div>
                        </div>
                    </>
                )}
            {open &&
            <div className="status-of-funds__what-content">
                <FontAwesomeIcon icon="info-circle" className="status-of-funds__info-icon" />
                <p className="status-of-funds__what-heading">What is an <em>outlay</em>?</p>
                <p className="status-of-funds__what-text">An <span className="status-of-funds__emphasis">outlay</span> <GlossaryLink term="outlay" /> is money that has been paid out from a federal account. This should not be confused with an <span className="status-of-funds__emphasis">obligation&nbsp;<GlossaryLink term="obligation" /></span> , which is money the federal government has promised to pay (for example, when signing a contract or awarding a grant). <em>Outlays</em> are the transactions that pay off the federal government&apos;s <em>obligations</em>.</p>
                <p className="status-of-funds__what-second-heading">Why are the <em>obligation</em> and <em>budgetary resource</em> amounts no longer visible on the chart?</p>
                <p className="status-of-funds__what-text">Remember, the <span className="status-of-funds__emphasis">budgetary resources</span> <GlossaryLink term="budgetary-resources" /> and obligations on this chart refer to available amounts and promised amounts for spending <em>in your selected fiscal year</em>. However, agencies may make outlays to pay off obligations made in your selected year <em>or in previous years</em>. This means outlays on this chart should <span className="status-of-funds__emphasis">not</span> be compared to the obligations or budgetary resources within any single fiscal year.</p>
            </div>}
            {viewType === 'chart' ? (
                <div
                    className="status-of-funds__visualization-chart">
                    <StatusOfFundsChart
                        toggle={toggle}
                        fetchFederalAccounts={fetchFederalAccounts}
                        totalItems={totalItems}
                        setTotalItems={setTotalItems}
                        loading={loading}
                        setLoading={setLoading}
                        fy={fy}
                        results={results}
                        level={level}
                        setLevel={setLevel} />
                </div>
            )
                :
                (
                    <div className="status-of-funds__visualization-table-container">
                        <Table
                            classNames="award-type-tooltip__table"
                            columns={columns}
                            rows={rows}
                            isStacked />
                    </div>
                )}
        </div>
    );
};

VisualizationSection.propTypes = propTypes;
export default VisualizationSection;
