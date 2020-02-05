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

import { agencyPageMetaTags } from 'helpers/metaTagHelper';
import { scrollToY } from 'helpers/scrollToHelper';

import MetaTags from 'components/sharedComponents/metaTags/MetaTags';
import Header from 'components/sharedComponents/header/Header';
import StickyHeader, { stickyHeaderHeight, useDynamicStickyClass } from 'components/sharedComponents/stickyHeader/StickyHeader';
import Footer from 'components/sharedComponents/Footer';
import { LoadingWrapper } from 'components/sharedComponents/Loading';

import { setAgencyOverview, resetAgency } from "../../redux/actions/agency/agencyActions";
import Sidebar from '../../components/sharedComponents/sidebar/Sidebar';

require('pages/agency/v2/index.scss');

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

const sankeyRef = createRef();

const sections = Object.keys(componentByAgencySection)
    .map((section, i) => ({
        section,
        label: startCase(section),
        // height in px of element's w/ a fixed position (sankey & header)
        stickyVerticalOffset: i === 0 ? 0 : 191
    }));

export const AgencyProfileV2 = ({
    agencyOverview,
    agencyId,
    clearAgency,
    setOverview
}) => {
    const [activeSection, setActiveSection] = useState(sections[0].section);
    const [
        isSankeySticky,
        ,
        ,
        handleScroll,
        measureScreen
    ] = useDynamicStickyClass(sankeyRef, 66);

    useEffect(() => {
        measureScreen();
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', measureScreen);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', measureScreen);
        };
    }, [handleScroll, measureScreen]);

    const jumpToSection = (section = '') => {
        // we've been provided a section to jump to
        // check if it's a valid section
        const matchedSection = find(sections, {
            section
        });
        if (!matchedSection) {
            // no matching section
            return;
        }

        // scroll to the correct section
        const sectionDom = document.querySelector(`#agency-v2-${snakeCase(section)}`);

        if (!sectionDom) {
            return;
        }

        if (matchedSection.section === 'overview') {
            scrollToY(40, 700);
        }
        else if (!isSankeySticky) {
            // cannot grasp why this is the right offset...
            scrollToY(sectionDom.offsetTop - (matchedSection.stickyVerticalOffset * 2), 700);
        }
        else {
            // scroll to top of section, subtracting the height of sticky elements + 20px of margin
            scrollToY(sectionDom.offsetTop - matchedSection.stickyVerticalOffset - 20, 700);
        }
        setActiveSection(matchedSection.section);
    };

    const stickyClass = isSankeySticky ? 'sticky-icky-icky' : '';

    return (
        <div className="usa-da-agency-page-v2">
            <MetaTags {...agencyPageMetaTags} />
            <Header />
            <StickyHeader>
                <div className="sticky-header__title">
                    <h1 tabIndex={-1} id="main-focus">
                        Agency Profile v2
                    </h1>
                    <div className="fy-picker">
                        FY Picker
                    </div>
                </div>
            </StickyHeader>
            <div className={`sankey ${stickyClass}`}>
                <h2>Agency Spending Snapshot</h2>
                <span>Overview</span>
                <div className="sankey__viz coming-soon">
                    Coming Soon
                </div>
            </div>
            <LoadingWrapper isLoading={false} >
                <main id="main-content" className="main-content usda__flex-row">
                    <div className="sidebar usda__flex-col">
                        <Sidebar
                            pageName="agency-v2"
                            fixedStickyBreakpoint={stickyHeaderHeight}
                            active={activeSection}
                            jumpToSection={jumpToSection}
                            detectActiveSection={setActiveSection}
                            sections={sections.map((section) => ({
                                ...section,
                                section: snakeCase(section.section),
                                label: section.label
                            }))} />
                    </div>
                    <div className="body usda__flex-col">
                        {sections.map((section) => (
                            componentByAgencySection[section.section]
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
