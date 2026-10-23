/**
 * AdditionalInfo.jsx
 * Created by Kwadwo Opoku-Debrah 10/11/2018
 **/

import React, { useState, useMemo, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import additionalDetailsContract from 'dataMapping/award/additionalDetailsContract';
import additionalDetailsFinancialAssistance from 'dataMapping/award/additionalDetailsFinancialAssistance';
import additionalDetailsIdv from 'dataMapping/award/additionalDetailsIdv';
import AddInfoAccordion from './AddInfoAccordion';
import IdvPeriodOfPerformance from './IdvPeriodOfPerformance';

const splitCongressionalDistrict = (section) => {
    const cd = section?.['Congressional District']?.data.pop().trim();
    const split = cd?.split(': ');
    return split?.length === 2 ? split[1] : section?.['Congressional District'];
};

const propTypes = {
    overview: PropTypes.object
};

const AdditionalInfo = ({ overview }) => {
    const [open, setOpen] = useState(false);

    const ref = useRef(null);

    const handleClick = () => {
        const accordionElements = ref.current.querySelectorAll('.accordion.expand-all-trigger');

        if (open) accordionElements.forEach((el) => el.removeAttribute('open'));
        else accordionElements.forEach((el) => el.setAttribute('open', ''));
    };

    const data = useMemo(() => {
        const category = overview._category;

        if (category === 'idv') return additionalDetailsIdv(overview);
        if (category === 'contract') return additionalDetailsContract(overview);
        if (category === 'definitive contract') return additionalDetailsContract(overview);
        if (category === 'grant') return additionalDetailsFinancialAssistance(overview);
        if (category === 'loans') return additionalDetailsFinancialAssistance(overview);
        if (category === 'direct payment') return additionalDetailsFinancialAssistance(overview);
        if (category === 'insurance') return additionalDetailsFinancialAssistance(overview);
        if (category === 'other') return additionalDetailsFinancialAssistance(overview);

        return {};
    }, [overview]);

    const onToggle = useCallback(() => setOpen(
        Array
            .from(ref.current.querySelectorAll('.accordion.expand-all-trigger'))
            .some((el) => el.hasAttribute('open'))
    ), []);

    const { firstColumn, secondColumn } = useMemo(() => {
        let columnOne;
        let columnTwo;
        const newData = { ...data };
        const category = overview._category;

        if (
            category === 'grant' ||
            category === 'loans' ||
            category === 'direct payment' ||
            category === 'insurance' ||
            category === 'other'
        ) {
            newData.placeOfPerformance = {
                ...data.placeOfPerformance,
                'Congressional District': splitCongressionalDistrict(data.placeOfPerformance)
            };

            newData.recipientDetails = {
                ...data.recipientDetails,
                'Congressional District': splitCongressionalDistrict(data.recipientDetails)
            };

            columnOne = [
                (<AddInfoAccordion
                    onToggle={onToggle}
                    key="UniqueAwardKey"
                    accordionName="Unique Award Key"
                    accordionIcon="fingerprint"
                    accordionData={newData.uniqueAwardKey} />),
                (<AddInfoAccordion
                    onToggle={onToggle}
                    key="AgencyDetails"
                    accordionName="Agency Details"
                    accordionIcon="landmark"
                    accordionData={newData.agencyDetails} />),
                (<AddInfoAccordion
                    onToggle={onToggle}
                    key="PlaceOfPerformance"
                    accordionName="Place Of Performance"
                    accordionIcon="map-marker-alt"
                    accordionData={newData.placeOfPerformance} />),
                (<AddInfoAccordion
                    onToggle={onToggle}
                    key="PeriodOfPerformance"
                    accordionName="Period Of Performance"
                    accordionIcon="calendar-alt"
                    iconClassName="accordion-icon-calendar-alt"
                    accordionData={newData.periodOfPerformance} />)
            ];

            columnTwo = [
                (<AddInfoAccordion
                    onToggle={onToggle}
                    key="RecipientDetails"
                    accordionName="Recipient Details"
                    accordionIcon="building"
                    accordionData={newData.recipientDetails} />),
                (<AddInfoAccordion
                    onToggle={onToggle}
                    key="ExecutiveCompensation"
                    accordionName="Executive Compensation"
                    accordionIcon="user-tie"
                    accordionData={overview.executiveDetails.officers} />)
            ];

            if (overview.category === 'grant') {
                columnTwo.push(
                    <AddInfoAccordion
                        onToggle={onToggle}
                        key="PreAwardDetails"
                        accordionName="Pre-Award Details"
                        accordionIcon="clipboard-list"
                        accordionData={overview?.preAwardDetails} />
                );
            }
            return { firstColumn: columnOne, secondColumn: columnTwo };
        }

        // Do not display the Place of Performance section for IDVs
        let placeOfPerformance = null;

        if (data.placeOfPerformance) {
            newData.placeOfPerformance = {
                ...data.placeOfPerformance,
                'Congressional District': splitCongressionalDistrict(data.placeOfPerformance)
            };
        }

        newData.recipientDetails = {
            ...data.recipientDetails,
            'Congressional District': splitCongressionalDistrict(data.recipientDetails)
        };

        let periodOfPerformance = (
            <IdvPeriodOfPerformance
                onToggle={onToggle}
                accordionData={newData.periodOfPerformance}
                key="IdvPeriodOfPerformance" />
        );

        if (overview._category !== 'idv') {
            placeOfPerformance = (
                <AddInfoAccordion
                    onToggle={onToggle}
                    key="PlaceOfPerformance"
                    accordionName="Place Of Performance"
                    accordionIcon="map-marker-alt"
                    accordionData={newData.placeOfPerformance} />
            );

            periodOfPerformance = (
                <AddInfoAccordion
                    onToggle={onToggle}
                    key="PeriodOfPerformance"
                    accordionName="Period Of Performance"
                    accordionIcon="calendar-alt"
                    iconClassName="accordion-icon-calendar-alt"
                    accordionData={newData.periodOfPerformance} />
            );
        }

        columnOne = [
            (<AddInfoAccordion
                onToggle={onToggle}
                key="UniqueAwardKey"
                accordionName="Unique Award Key"
                accordionIcon="fingerprint"
                accordionData={newData.uniqueAwardKey} />),
            (<AddInfoAccordion
                onToggle={onToggle}
                key="AgencyDetails"
                accordionName="Agency Details"
                accordionIcon="landmark"
                accordionData={newData.agencyDetails} />),
            (<AddInfoAccordion
                onToggle={onToggle}
                key="ParentAwardDetails"
                accordionName="Parent Award Details"
                accordionIcon="sitemap"
                accordionData={newData.parentAwardDetails} />),
            (placeOfPerformance),
            (periodOfPerformance),
            (<AddInfoAccordion
                onToggle={onToggle}
                key="LegislativeMandates"
                accordionName="Legislative Mandates"
                accordionIcon="pencil-alt"
                accordionData={newData.legislativeMandates} />)
        ];

        columnTwo = [
            (<AddInfoAccordion
                onToggle={onToggle}
                key="RecipientDetails"
                accordionName="Recipient Details"
                accordionIcon="building"
                accordionData={newData.recipientDetails} />),
            (<AddInfoAccordion
                onToggle={onToggle}
                key="AcquisitionDetails"
                accordionName="Acquisition Details"
                accordionIcon="tag"
                accordionData={newData.acquisitionDetails} />),
            (<AddInfoAccordion
                onToggle={onToggle}
                key="CompetitionDetails"
                accordionName="Competition Details"
                accordionIcon="chart-bar"
                accordionData={newData.competitionDetails} />),
            (<AddInfoAccordion
                onToggle={onToggle}
                key="AdditionalDetails"
                accordionName="Additional Details"
                accordionIcon="ellipsis-h"
                accordionData={newData.additionalDetails} />),
            (<AddInfoAccordion
                onToggle={onToggle}
                key="ExecutiveCompensation"
                accordionName="Executive Compensation"
                accordionIcon="user-tie"
                accordionData={overview.executiveDetails.officers} />)
        ];

        return { firstColumn: columnOne, secondColumn: columnTwo };
    }, [overview, data, onToggle]);

    return (
        <div id="award-additional-information" className="additional-info">
            <div className="award-viz">
                <div className="award-viz__heading">
                    <div className="award-viz__icon">
                        <FontAwesomeIcon size="lg" icon="info" />
                    </div>
                    <h3 className="award-viz__title">Additional Information</h3>
                </div>
                <button
                    className="award-viz__button"
                    onClick={handleClick}>
                    {open ? 'Collapse All' : 'Expand All'}
                </button>
                <div className="award__row" ref={ref}>
                    <div className="award__col">
                        {firstColumn}
                    </div>
                    <div className="award__col">
                        {secondColumn}
                    </div>
                </div>
            </div>
        </div>
    );
};

AdditionalInfo.propTypes = propTypes;
export default AdditionalInfo;
