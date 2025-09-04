/**
 * StateTimeVisualizationSection.jsx
 * Created by David Trinh 5/15/18
 */

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash-es';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SectionHeader, NewPicker } from 'data-transparency-ui';

import StateTimeVisualizationChart from './StateTimeVisualizationChart';
import RoundedToggle from "../../sharedComponents/RoundedToggle";
import Accordion from "../../sharedComponents/accordion/Accordion";
import GlossaryLink from "../../sharedComponents/GlossaryLink";

const propTypes = {
    data: PropTypes.object,
    loading: PropTypes.bool,
    visualizationPeriod: PropTypes.string,
    updateVisualizationPeriod: PropTypes.func,
    outlayToggle: PropTypes.bool,
    onKeyOutlaysToggle: PropTypes.func,
    onOutlaysToggle: PropTypes.func
};


const StateTimeVisualizationSection = ({
    data,
    loading,
    visualizationPeriod,
    updateVisualizationPeriod,
    outlayToggle,
    onKeyOutlaysToggle,
    onOutlaysToggle
}) => {
    const [selected, setSelected] = useState(visualizationPeriod);
    const [windowWidth, setWindowWidth] = useState(0);
    const [visualizationWidth, setVisualizationWidth] = useState(0);
    const [outlayWhatOpen, setOutlayWhatOpen] = useState(false);
    const hrRef = useRef();


    const setWhatOpen = () => {
        setOutlayWhatOpen(!outlayWhatOpen);
    };

    const onClick = (e) => {
        setSelected(e);
        updateVisualizationPeriod(e);
    };

    const dropdownOptions = [
        {
            name: 'Year',
            value: 'fiscal_year',
            onClick
        },
        {
            name: 'Quarter',
            value: 'quarter',
            onClick
        },
        {
            name: 'Month',
            value: 'month',
            onClick
        }
    ];
    const sortFn = () => dropdownOptions;

    useEffect(() => {
        const handleResize = throttle(() => {
            const newWidth = window.innerWidth;
            if (windowWidth !== newWidth) {
                setWindowWidth(newWidth);
                if (hrRef.current) {
                    setVisualizationWidth(hrRef.current.offsetWidth);
                }
            }
        }, 50);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [windowWidth]);

    return (
        <section
            id="state-transactions-over-time"
            className="state-section transactions-over-time">
            <SectionHeader
                icon={<FontAwesomeIcon icon="chart-bar" size="2x" />}
                title="Awards Over Time"
                titleTooltip={{ component: false }}
                descTooltip={{ component: false }} />
            <hr
                className="results-divider"
                ref={hrRef} />
            <div className="state-section__description">
                The graph below shows trends over time for amounts awarded to this state. Break down the amounts by years, quarters, or months, and hover over the bars for more detailed information.
            </div>
            <div className="state__controls-desktop">
                <NewPicker
                    leftIcon=""
                    size="md"
                    options={dropdownOptions}
                    label="View by"
                    enabled
                    classname="state-dropdown__picker"
                    selectedOption={dropdownOptions?.length
                        ? dropdownOptions?.find((obj) => obj.value === selected)?.name
                        : `${selected}`}
                    sortFn={sortFn} />
                <div className="state__right">
                    <RoundedToggle toggle={outlayToggle} onKeyToggle={onKeyOutlaysToggle} onToggle={onOutlaysToggle} label="View Outlays" id="state__controls-toggle" />
                    <div className="state__line-div" />
                    <Accordion setOpen={setWhatOpen} closedIcon="chevron-down" openIcon="chevron-up" title="What is this?" />
                </div>
            </div>
            {outlayWhatOpen &&
                <div className="state__what-content">
                    <FontAwesomeIcon icon="info-circle" className="state__info-icon" />
                    <p className="state__what-heading">What is an outlay?</p>
                    <p className="state__what-text">An <span className="state__emphasis">outlay</span> <GlossaryLink term="outlay" /> is money that has been paid out from a federal account. This should not be confused with an <span className="state__emphasis">obligation&nbsp;<GlossaryLink term="obligation" /></span> , which is money the federal government has promised to pay (for example, when signing a contract or awarding a grant). Outlays are the transactions that pay off the federal government&apos;s obligations.</p>
                    <p className="state__what-second-heading">Why are the obligation and budgetary resource amounts no longer visible on the chart?</p>
                    <p className="state__what-text">Remember, the <span className="state__emphasis">budgetary resources</span> <GlossaryLink term="budgetary-resources" /> and obligations on this chart refer to available amounts and promised amounts for spending in your selected fiscal year. However, agencies may make outlays to pay off obligations made in your selected year or in previous years. This means outlays on this chart should <span className="state__emphasis">not</span> be compared to the obligations or budgetary resources within any single fiscal year.</p>
                </div>}
            <StateTimeVisualizationChart
                visualizationPeriod={visualizationPeriod}
                loading={loading}
                data={data}
                width={visualizationWidth}
                outlayToggle={outlayToggle} />
        </section>
    );
};

StateTimeVisualizationSection.propTypes = propTypes;
export default StateTimeVisualizationSection;
