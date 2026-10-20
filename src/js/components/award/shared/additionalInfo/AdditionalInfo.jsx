/**
 * AdditionalInfo.jsx
 * Created by Kwadwo Opoku-Debrah 10/11/2018
 **/

import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import additionalDetailsContract from 'dataMapping/award/additionalDetailsContract';
import additionalDetailsFinancialAssistance from 'dataMapping/award/additionalDetailsFinancialAssistance';
import additionalDetailsIdv from 'dataMapping/award/additionalDetailsIdv';
import Accordion from './Accordion';
import IdvPeriodOfPerformance from './IdvPeriodOfPerformance';

const propTypes = {
    overview: PropTypes.object
};

const AdditionalInfo = ({ overview }) => {
    const [open, setOpen] = useState(false);

    const onClick = () => setOpen((prevState) => !prevState);

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
                (<Accordion
                    key="UniqueAwardKey"
                    globalToggle={open}
                    accordionName="Unique Award Key"
                    accordionIcon="fingerprint"
                    accordionData={newData.uniqueAwardKey} />),
                (<Accordion
                    key="AgencyDetails"
                    globalToggle={open}
                    accordionName="Agency Details"
                    accordionIcon="landmark"
                    accordionData={newData.agencyDetails} />),
                (<Accordion
                    key="PlaceOfPerformance"
                    globalToggle={open}
                    accordionName="Place Of Performance"
                    accordionIcon="map-marker-alt"
                    accordionData={newData.placeOfPerformance} />),
                (<Accordion
                    key="PeriodOfPerformance"
                    globalToggle={open}
                    accordionName="Period Of Performance"
                    accordionIcon="calendar-alt"
                    iconClassName="accordion-icon-calendar-alt"
                    accordionData={newData.periodOfPerformance} />)
            ];

            columnTwo = [
                (<Accordion
                    key="RecipientDetails"
                    globalToggle={open}
                    accordionName="Recipient Details"
                    accordionIcon="building"
                    accordionData={newData.recipientDetails} />),
                (<Accordion
                    key="ExecutiveCompensation"
                    globalToggle={open}
                    accordionName="Executive Compensation"
                    accordionIcon="user-tie"
                    accordionData={overview.executiveDetails.officers} />)
            ];

            if (overview.category === 'grant') {
                columnTwo.push(
                    <Accordion
                        key="PreAwardDetails"
                        globalToggle={open}
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
                accordionData={newData.periodOfPerformance}
                globalToggle={open} />
        );

        if (overview._category !== 'idv') {
            placeOfPerformance = (
                <Accordion
                    key="PlaceOfPerformance"
                    globalToggle={open}
                    accordionName="Place Of Performance"
                    accordionIcon="map-marker-alt"
                    accordionData={newData.placeOfPerformance} />
            );

            periodOfPerformance = (
                <Accordion
                    key="PeriodOfPerformance"
                    globalToggle={open}
                    accordionName="Period Of Performance"
                    accordionIcon="calendar-alt"
                    iconClassName="accordion-icon-calendar-alt"
                    accordionData={newData.periodOfPerformance} />
            );
        }

        columnOne = [
            (<Accordion
                key="UniqueAwardKey"
                globalToggle={open}
                accordionName="Unique Award Key"
                accordionIcon="fingerprint"
                accordionData={newData.uniqueAwardKey} />),
            (<Accordion
                key="AgencyDetails"
                globalToggle={open}
                accordionName="Agency Details"
                accordionIcon="landmark"
                accordionData={newData.agencyDetails} />),
            (<Accordion
                key="ParentAwardDetails"
                globalToggle={open}
                accordionName="Parent Award Details"
                accordionIcon="sitemap"
                accordionData={newData.parentAwardDetails} />),
            (placeOfPerformance),
            (periodOfPerformance),
            (<Accordion
                key="LegislativeMandates"
                globalToggle={open}
                accordionName="Legislative Mandates"
                accordionIcon="pencil-alt"
                accordionData={newData.legislativeMandates} />)
        ];

        columnTwo = [
            (<Accordion
                key="RecipientDetails"
                globalToggle={open}
                accordionName="Recipient Details"
                accordionIcon="building"
                accordionData={newData.recipientDetails} />),
            (<Accordion
                key="AcquisitionDetails"
                globalToggle={open}
                accordionName="Acquisition Details"
                accordionIcon="tag"
                accordionData={newData.acquisitionDetails} />),
            (<Accordion
                key="CompetitionDetails"
                globalToggle={open}
                accordionName="Competition Details"
                accordionIcon="chart-bar"
                accordionData={newData.competitionDetails} />),
            (<Accordion
                key="AdditionalDetails"
                globalToggle={open}
                accordionName="Additional Details"
                accordionIcon="ellipsis-h"
                accordionData={newData.additionalDetails} />),
            (<Accordion
                key="ExecutiveCompensation"
                globalToggle={open}
                accordionName="Executive Compensation"
                accordionIcon="user-tie"
                accordionData={overview.executiveDetails.officers} />)
        ];

        return { firstColumn: columnOne, secondColumn: columnTwo };
    }, [overview, data, open]);

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
