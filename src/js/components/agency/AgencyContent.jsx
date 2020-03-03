/**
 * AgencyContent.jsx
 * Created by Kevin Li 6/8/17
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { find } from 'lodash';
import { scrollToY } from 'helpers/scrollToHelper';
import moment from 'moment';
import { convertQuarterToDate } from 'helpers/fiscalYearHelper';
import * as StickyHeader from 'components/sharedComponents/stickyHeader/StickyHeader';

import GlossaryButtonWrapperContainer from 'containers/glossary/GlossaryButtonWrapperContainer';

import ObjectClassContainer from 'containers/agency/visualizations/ObjectClassContainer';
import ObligatedContainer from 'containers/agency/visualizations/ObligatedContainer';
import FederalAccountContainer from 'containers/agency/visualizations/FederalAccountContainer';
import AgencyFooterContainer from 'containers/agency/AgencyFooterContainer';

import Sidebar from '../sharedComponents/sidebar/Sidebar';
import AgencyOverview from './overview/AgencyOverview';
import TreasuryDisclaimer from './TreasuryDisclaimer';

const agencySections = [
    {
        section: 'overview',
        label: 'Overview'
    },
    {
        section: 'obligated-amount',
        label: 'Obligated Amount'
    },
    {
        section: 'object-classes',
        label: 'Object Classes'
    },
    {
        section: 'federal-accounts',
        label: 'Federal Accounts'
    }
];

const propTypes = {
    agency: PropTypes.object,
    isTreasury: PropTypes.bool
};

const AgencyContent = ({
    agency,
    isTreasury
}) => {
    const [activeSection, setActiveSection] = useState('overview');

    const jumpToSection = (section = '') => {
        // we've been provided a section to jump to
        // check if it's a valid section
        const matchedSection = find(agencySections, {
            section
        });

        if (!matchedSection) {
            // no matching section
            return;
        }
        // scroll to the correct section
        const sectionDom = document.querySelector(`#agency-${section}`);
        if (!sectionDom) {
            return;
        }

        const sectionTop = sectionDom.offsetTop - 10 - StickyHeader.stickyHeaderHeight;
        scrollToY(sectionTop, 700);
        setActiveSection(section);
    };

    const qtr = parseFloat(agency.overview.activeFQ);
    const endOfQuarter = convertQuarterToDate(qtr, agency.overview.activeFY);
    const asOfDate = moment(endOfQuarter, "YYYY-MM-DD").format("MMMM D, YYYY");

    let disclaimer = null;
    if (isTreasury) {
        disclaimer = (<TreasuryDisclaimer />);
    }

    return (
        <div className="agency-content-wrapper">
            <div className="agency-sidebar">
                <Sidebar
                    active={activeSection}
                    pageName="agency"
                    sections={agencySections}
                    detectActiveSection={setActiveSection}
                    jumpToSection={jumpToSection}
                    fixedStickyBreakpoint={StickyHeader.stickyHeaderHeight} />
            </div>
            <div className="agency-content">
                <div className="agency-padded-content overview">
                    <GlossaryButtonWrapperContainer
                        child={AgencyOverview}
                        agency={agency.overview} />
                </div>
                <div className="agency-padded-content data">
                    <ObligatedContainer
                        agencyName={agency.overview.name}
                        activeFY={agency.overview.activeFY}
                        activeQuarter={agency.overview.activeFQ}
                        id={agency.id}
                        asOfDate={asOfDate} />
                    <ObjectClassContainer
                        id={agency.id}
                        activeFY={agency.overview.activeFY}
                        displayedTotalObligation={agency.overview.obligatedAmount}
                        asOfDate={asOfDate} />
                    <FederalAccountContainer
                        id={agency.id}
                        activeFY={agency.overview.activeFY}
                        obligatedAmount={agency.overview.obligatedAmount}
                        asOfDate={asOfDate} />
                    {disclaimer}
                </div>
                <AgencyFooterContainer id={agency.id} />
            </div>
        </div>
    );
};

AgencyContent.propTypes = propTypes;

export default AgencyContent;
