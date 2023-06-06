/**
 * VisualizationSection.jsx
 * Created by Lizzie Salita 10/29/21
 */

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from 'prop-types';
import { Picker } from "data-transparency-ui";
import StatusOfFundsChart from '../visualizations/StatusOfFundsChart';
import RoundedToggle from "../../sharedComponents/RoundedToggle";
import Accordion from "../../sharedComponents/accordion/Accordion";
import GlossaryLink from "../../sharedComponents/GlossaryLink";
import ChartTableToggle from "../../sharedComponents/buttons/ChartTableToggle";
import StatusOfFundsTable from "../visualizations/StatusOfFundsTable";

const propTypes = {
    toggle: PropTypes.bool,
    onToggle: PropTypes.func,
    onKeyToggle: PropTypes.func,
    level: PropTypes.number.isRequired,
    setDrilldownLevel: PropTypes.func,
    fy: PropTypes.string,
    results: PropTypes.array,
    isMobile: PropTypes.bool,
    viewType: PropTypes.string,
    setViewType: PropTypes.func,
    maxLevel: PropTypes.number,
    dropdownSelection: PropTypes.string,
    setDropdownSelection: PropTypes.func
};

const VisualizationSection = ({
    toggle,
    onKeyToggle,
    onToggle,
    level,
    setDrilldownLevel,
    fy,
    results,
    isMobile,
    viewType,
    setViewType,
    maxLevel,
    dropdownSelection,
    setDropdownSelection
}) => {
    const [open, setOpen] = useState(false);
    const accordionTitle = (<span>What&nbsp;is&nbsp;this?</span>);
    // empty string here because level 4 shows the dropdown instead of one of these labels
    const levelsLabelArray = ['Sub-Component', 'Federal Account', 'Treasury Account Symbol', '', `${dropdownSelection === 'Program Activity' ? 'Object Class' : 'Program Activity'}`];

    const name = useSelector((state) => state.agency.currentLevelNameAndId.name);
    const id = useSelector((state) => state.agency.currentLevelNameAndId.id);
    const currentLevelData = {
        name,
        id
    };

    const tasName = useSelector((state) => state.agency.selectedTas?.name);
    const tasId = useSelector((state) => state.agency.selectedTas?.id);
    const tasObligation = useSelector((state) => state.agency.selectedTas?._obligations);
    const tasOutlays = useSelector((state) => state.agency.selectedTas?._outlays);
    const currentTasData = {
        name: tasName,
        id: tasId,
        _obligations: tasObligation,
        _outlays: tasOutlays
    };

    const changeView = (label) => {
        setViewType(label);
    };

    const chartTableToggle = (
        <ChartTableToggle
            activeType={viewType}
            changeView={changeView} />
    );

    const maxLevelClass = level !== maxLevel ? ' not-max-level' : '';

    const dropdownClickFunction = (value) => {
        setDropdownSelection(value);

        if (value === 'Object Class') {
            setDrilldownLevel(level, currentTasData, true);
        }
        else {
            setDrilldownLevel(level, currentTasData);
        }
    };

    const options = [{
        name: 'Program Activity',
        value: 'Program Activity',
        onClick: dropdownClickFunction
    },
    {
        name: 'Object Class',
        value: 'Object Class',
        onClick: dropdownClickFunction
    }];

    // the dtui picker component will put the options in alpha order if no sort fn is given
    // in this case we want the order to always be the same, hence...
    const sortButNotReally = () => options;

    const chartHeadingWithDropdown = (
        <div className="status-of-funds__controls-heading-container">
            <div className="status-of-funds__controls-heading">{currentLevelData.name} by&thinsp;</div>
            {level === 3 ? (
                <Picker
                    className="status-of-funds__chart-picker"
                    sortFn={sortButNotReally}
                    options={options}
                    dropdownDirection="right"
                    backgroundColor="#ffffff"
                    selectedOption={dropdownSelection} />
            ) :
                <div className="status-of-funds__controls-heading emphasis">
                    {levelsLabelArray[level]}&thinsp;
                </div>
            }
            <div className="status-of-funds__controls-heading">for FY {fy}</div>
        </div>
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
                    {chartHeadingWithDropdown}
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
                                {chartHeadingWithDropdown}
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
                        fy={fy}
                        results={results}
                        level={level}
                        setDrilldownLevel={setDrilldownLevel}
                        maxLevel={maxLevel} />
                </div>
            )
                :
                (
                    <div className={`status-of-funds__visualization-table-container${maxLevelClass}`}>
                        <StatusOfFundsTable
                            fy={fy}
                            results={results}
                            level={level}
                            setDrilldownLevel={setDrilldownLevel}
                            isMobile={isMobile}
                            toggle={toggle}
                            dropdownSelection={dropdownSelection}
                            maxLevel={maxLevel} />
                    </div>
                )}
        </div>
    );
};

VisualizationSection.propTypes = propTypes;
export default VisualizationSection;
