/**
 * AdditionalInfo.jsx
 * Created by Kwadwo Opoku-Debrah 10/11/2018
 **/

import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import additionalDetailsContract from 'dataMapping/award/additionalDetailsContract';
import additionalDetailsFinancialAssistance from 'dataMapping/award/additionalDetailsFinancialAssistance';
import additionalDetailsIdv from 'dataMapping/award/additionalDetailsIdv';
import AddInfoAccordion from './AddInfoAccordion';
import IdvPeriodOfPerformance from './IdvPeriodOfPerformance';

const propTypes = {
    overview: PropTypes.object
};

const AdditionalInfo = ({ overview }) => {
    const [open, setOpen] = useState(false);

    const onClick = () => {
        const accordionElements = document.querySelectorAll('.accordion.expand-all-trigger');

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
            const cdPOP = data.placeOfPerformance['Congressional District']?.data.pop().trim();
            const splitCDPOP = cdPOP?.split(': ');

            if (splitCDPOP?.length === 2) {
                newData.placeOfPerformance['Congressional District'] = splitCDPOP[1];
            }

            const cdRD = data.recipientDetails['Congressional District']?.data.pop().trim();
            const splitCDRD = cdRD?.split(': ');

            if (splitCDRD?.length === 2) {
                newData.recipientDetails['Congressional District'] = splitCDRD[1];
            }

            columnOne = [
                (<AddInfoAccordion
                    key="UniqueAwardKey"
                    accordionName="Unique Award Key"
                    accordionIcon="fingerprint"
                    accordionData={newData.uniqueAwardKey} />),
                (<AddInfoAccordion
                    key="AgencyDetails"
                    accordionName="Agency Details"
                    accordionIcon="landmark"
                    accordionData={newData.agencyDetails} />),
                (<AddInfoAccordion
                    key="PlaceOfPerformance"
                    accordionName="Place Of Performance"
                    accordionIcon="map-marker-alt"
                    accordionData={newData.placeOfPerformance} />),
                (<AddInfoAccordion
                    key="PeriodOfPerformance"
                    accordionName="Period Of Performance"
                    accordionIcon="calendar-alt"
                    iconClassName="accordion-icon-calendar-alt"
                    accordionData={newData.periodOfPerformance} />)
            ];

            columnTwo = [
                (<AddInfoAccordion
                    key="RecipientDetails"
                    accordionName="Recipient Details"
                    accordionIcon="building"
                    accordionData={newData.recipientDetails} />),
                (<AddInfoAccordion
                    key="ExecutiveCompensation"
                    accordionName="Executive Compensation"
                    accordionIcon="user-tie"
                    accordionData={overview.executiveDetails.officers} />)
            ];

            if (overview.category === 'grant') {
                columnTwo.push(
                    <AddInfoAccordion
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
            const cdPOP = data.placeOfPerformance['Congressional District']?.data.pop().trim();
            const splitCDPOP = cdPOP?.split(': ');

            if (splitCDPOP?.length === 2) {
                newData.placeOfPerformance['Congressional District'] = splitCDPOP[1];
            }
        }

        const cdRD = data.recipientDetails['Congressional District']?.data.pop().trim();

        const splitCDRD = cdRD?.split(': ');

        if (splitCDRD?.length === 2) {
            newData.recipientDetails['Congressional District'] = splitCDRD[1];
        }

        let periodOfPerformance = (
            <IdvPeriodOfPerformance
                key="IdvPeriodOfPerformance"
                accordionData={newData.periodOfPerformance} />
        );

        if (overview._category !== 'idv') {
            placeOfPerformance = (
                <AddInfoAccordion
                    key="PlaceOfPerformance"
                    accordionName="Place Of Performance"
                    accordionIcon="map-marker-alt"
                    accordionData={newData.placeOfPerformance} />
            );

            periodOfPerformance = (
                <AddInfoAccordion
                    key="PeriodOfPerformance"
                    accordionName="Period Of Performance"
                    accordionIcon="calendar-alt"
                    iconClassName="accordion-icon-calendar-alt"
                    accordionData={newData.periodOfPerformance} />
            );
        }

        columnOne = [
            (<AddInfoAccordion
                key="UniqueAwardKey"
                accordionName="Unique Award Key"
                accordionIcon="fingerprint"
                accordionData={newData.uniqueAwardKey} />),
            (<AddInfoAccordion
                key="AgencyDetails"
                accordionName="Agency Details"
                accordionIcon="landmark"
                accordionData={newData.agencyDetails} />),
            (<AddInfoAccordion
                key="ParentAwardDetails"
                accordionName="Parent Award Details"
                accordionIcon="sitemap"
                accordionData={newData.parentAwardDetails} />),
            (placeOfPerformance),
            (periodOfPerformance),
            (<AddInfoAccordion
                key="LegislativeMandates"
                accordionName="Legislative Mandates"
                accordionIcon="pencil-alt"
                accordionData={newData.legislativeMandates} />)
        ];

        columnTwo = [
            (<AddInfoAccordion
                key="RecipientDetails"
                accordionName="Recipient Details"
                accordionIcon="building"
                accordionData={newData.recipientDetails} />),
            (<AddInfoAccordion
                key="AcquisitionDetails"
                accordionName="Acquisition Details"
                accordionIcon="tag"
                accordionData={newData.acquisitionDetails} />),
            (<AddInfoAccordion
                key="CompetitionDetails"
                accordionName="Competition Details"
                accordionIcon="chart-bar"
                accordionData={newData.competitionDetails} />),
            (<AddInfoAccordion
                key="AdditionalDetails"
                accordionName="Additional Details"
                accordionIcon="ellipsis-h"
                accordionData={newData.additionalDetails} />),
            (<AddInfoAccordion
                key="ExecutiveCompensation"
                accordionName="Executive Compensation"
                accordionIcon="user-tie"
                accordionData={overview.executiveDetails.officers} />)
        ];

        return { firstColumn: columnOne, secondColumn: columnTwo };
    }, [overview, data]);

    useEffect(() => {
        const accordionElements = document.querySelectorAll('.accordion.expand-all-trigger');

        const listenerFunction = () => {
            setOpen(
                Array
                    .from(document.querySelectorAll('.accordion.expand-all-trigger'))
                    .some((el) => el.hasAttribute('open'))
            );
        };

        accordionElements.forEach((el) => {
            el.addEventListener('toggle', listenerFunction);
        });

        return () => {
            accordionElements.forEach((el) => {
                el.removeEventListener('toggle', listenerFunction);
            });
        };
    }, []);

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
                    onClick={onClick}>
                    {open ? 'Collapse All' : 'Expand All'}
                </button>
                <div className="award__row">
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
