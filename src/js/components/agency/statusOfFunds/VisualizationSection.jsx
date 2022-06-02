/**
 * VisualizationSection.jsx
 * Created by Lizzie Salita 10/29/21
 */

// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from 'prop-types';
import { levels } from './StatusOfFunds';
import StatusOfFundsChart from '../visualizations/StatusOfFundsChart';
import RoundedToggle from "../../sharedComponents/RoundedToggle";
import Accordion from "../../sharedComponents/accordion/Accordion";
import GlossaryLink from "../../sharedComponents/GlossaryLink";

const propTypes = {
    toggle: PropTypes.bool,
    onToggle: PropTypes.func,
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
    })
};

const VisualizationSection = ({
    toggle,
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
    fetchFederalAccounts
}) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="status-of-funds__visualization">
            <h6>{level === 1 ? selectedSubcomponent?.name : agencyName} by <strong>{levels[level]}</strong> for FY {fy}</h6>
            <div className="status-of-funds__controls">
                <RoundedToggle toggle={toggle} onToggle={onToggle} label="View Outlays" />
                <div className="status-of-funds__line-div" />
                <Accordion className="status-of-funds__accordion" setOpen={setOpen} closedIcon="chevron-down" openIcon="chevron-up" title="What is this?">What is this?</Accordion>
            </div>
            {open &&
            <div className="status-of-funds__what-content">
                <FontAwesomeIcon icon="info-circle" className="status-of-funds__info-icon" />
                <p className="status-of-funds__what-heading">What is an outlay?</p>
                <p className="status-of-funds__what-text">An <strong>outlay</strong> <GlossaryLink term="outlay" /> is money that has been paid out from a federal account. This should not be confused with an <strong>obligation</strong> <GlossaryLink term="obligation" />, which is money the federal government has promised to pay (for example, when signing a contract or awarding a grant). <em>Outlays</em> are the transactions that pay off the federal government&apos;s <em>obligations</em>.</p>
                <p className="status-of-funds__what-second-heading">Why are the <em>obligation</em> and <em>budgetary resource</em> amounts no longer visible on the chart?</p>
                <p className="status-of-funds__what-text">Remember, the <strong>budgetary resources</strong> <GlossaryLink term="budgetary-resources" /> and obligations on this chart refer to available amounts and promised amounts for spending <em>in your selected fiscal year</em>. However, agencies may make outlays to pay off obligations made in your selected year <em>or in previous years</em>. This means outlays on this chart should <strong>not</strong> be compared to the obligations or budgetary resources within any single fiscal year.</p>
            </div>}
            <div className="status-of-funds__visualization-chart">
                <StatusOfFundsChart toggle={toggle} fetchFederalAccounts={fetchFederalAccounts} totalItems={totalItems} setTotalItems={setTotalItems} loading={loading} setLoading={setLoading} fy={fy} results={results} level={level} setLevel={setLevel} />
            </div>
        </div>
    );
};

VisualizationSection.propTypes = propTypes;
export default VisualizationSection;
