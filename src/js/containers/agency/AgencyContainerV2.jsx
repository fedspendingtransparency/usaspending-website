/**
 * AgencyPage.jsx
 * Created by Maxwell Kendall 01/31/2020
 */

/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useState, createRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { startCase, snakeCase, find } from "lodash";
import { TooltipWrapper } from 'data-transparency-ui';

import { setAgencyOverview, resetAgency } from 'redux/actions/agency/agencyActions';

import { agencyPageMetaTags } from 'helpers/metaTagHelper';
import { scrollToY } from 'helpers/scrollToHelper';
import * as FiscalYearHelper from 'helpers/fiscalYearHelper';

import MetaTags from 'components/sharedComponents/metaTags/MetaTags';
import Header from 'components/sharedComponents/header/Header';
import Sidebar from 'components/sharedComponents/sidebar/Sidebar';
import FYPicker from 'components/sharedComponents/pickers/FYPicker';
import StickyHeader, { useDynamicStickyClass } from 'components/sharedComponents/stickyHeader/StickyHeader';
import Footer from 'containers/Footer';
import { LoadingWrapper } from 'components/sharedComponents/Loading';

require('pages/agency/v2/index.scss');

// document.querySelector('.site-navigation').offsetHeight + document.querySelector('.site-navigation').offsetTop
const scrollPositionOfSiteHeader = 96;

const TooltipComponent = () => (
    <div className="agency-v2-tt">
        <h4 className="tooltip__title">Coming Soon</h4>
        <p className="tooltip__text">The tooltip content for this section is currently under review.</p>
    </div>
);

// eslint-disable-next-line react/prop-types
const ComingSoonSection = ({ section, icon = "chart-area" }) => (
    <section id={`agency-v2-${snakeCase(section)}`} className={`body__section ${snakeCase(section)}`}>
        <div className="body__header">
            <div className="body__header-icon">
                <FontAwesomeIcon size="lg" icon={icon} />
            </div>
            <h3>{startCase(section)}</h3>
            <TooltipWrapper className="agency-v2-tt" icon="info" tooltipComponent={<TooltipComponent />} />
        </div>
        <hr />
        <div className="coming-soon-section">
            <h4>Coming Soon</h4>
            <p>This feature is currently under development.</p>
        </div>
    </section>
);

const componentByAgencySection = {
    overview: <ComingSoonSection section="overview" />,
    account_spending: <ComingSoonSection section="account_spending" />,
    award_spending: <ComingSoonSection section="award_spending" />,
    sub_agency_spending: <ComingSoonSection section="sub-agency_spending" />,
    award_recipients: <ComingSoonSection section="award_recipients" />,
    top_5_award_dimensions: <ComingSoonSection section="top_5_award_dimensions" />
};

export const AgencyProfileV2 = ({
    agencyOverview,
    agencyId,
    clearAgency,
    setOverview
}) => {
    const [activeSection, setActiveSection] = useState('overview');
    // height in px of element's w/ a fixed position (sankey + header)
    const [selectedFy, setSelectedFy] = useState(`${FiscalYearHelper.defaultFiscalYear()}`);

    const sortFy = (a, b) => {
        if (a === selectedFy) return -1;
        if (b === selectedFy) return 1;
        if (b > a) return 1;
        if (a > b) return -1;
        return 0;
    };

    const jumpToSection = (section = '') => {
        // we've been provided a section to jump to
        // check if it's a valid section
        const matchedSection = Object.keys(componentByAgencySection).find((key) => key === section);

        if (!matchedSection) {
            // no matching section
            return;
        }

        // scroll to the correct section
        const sectionDom = document.querySelector(`#agency-v2-${snakeCase(section)}`);

        if (!sectionDom) {
            return;
        }
        if (activeSection === 'overview') {
            scrollToY(sectionDom.offsetTop - 150, 700);
        }
        else {
            // scrollY set to the top of the section, subtracting the height of sticky elements + 20px of margin
            scrollToY(sectionDom.offsetTop - 86, 700);
        }

        setActiveSection(matchedSection);
    };

    return (
        <div className="usa-da-agency-page-v2">
            <MetaTags {...agencyPageMetaTags} />
            <Header />
            <StickyHeader>
                <div className="sticky-header__title">
                    <h1 tabIndex={-1} id="main-focus">
                        Agency Profile v2
                    </h1>
                    <FYPicker fy={selectedFy} onClick={setSelectedFy} sortFn={sortFy} />
                </div>
            </StickyHeader>
            <LoadingWrapper isLoading={false} >
                <main id="main-content" className="main-content usda__flex-row">
                    <div className="sidebar usda__flex-col">
                        <Sidebar
                            pageName="agency-v2"
                            fixedStickyBreakpoint={scrollPositionOfSiteHeader}
                            active={activeSection}
                            jumpToSection={jumpToSection}
                            detectActiveSection={setActiveSection}
                            sections={Object.keys(componentByAgencySection).map((section) => ({
                                // stickyVerticalOffset: 20,
                                section: snakeCase(section),
                                label: startCase(section)
                            }))} />
                    </div>
                    <div className="body usda__flex-col">
                        {Object.keys(componentByAgencySection).map((section) => (
                            componentByAgencySection[section]
                        ))}
                    </div>
                </main>
            </LoadingWrapper>
            <Footer />
        </div>
    );
};

const mapStateToProps = (state) => ({
    agencyOverview: state.agency.overview,
    agencyId: state.agency.id
});

const mapDispatchToProps = (dispatch) => ({
    clearAgency: () => dispatch(resetAgency()),
    setOverview: (agency) => dispatch(setAgencyOverview(agency))
});

export default connect(mapStateToProps, mapDispatchToProps)(AgencyProfileV2);
