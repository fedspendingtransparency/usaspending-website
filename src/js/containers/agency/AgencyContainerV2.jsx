/**
 * AgencyPage.jsx
 * Created by Maxwell Kendall 01/31/2020
 */

import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { startCase, snakeCase, find } from "lodash";

import { agencyPageMetaTags } from 'helpers/metaTagHelper';
import { scrollToY } from 'helpers/scrollToHelper';

import MetaTags from 'components/sharedComponents/metaTags/MetaTags';
import Header from 'components/sharedComponents/header/Header';
import StickyHeader, { stickyHeaderHeight } from 'components/sharedComponents/stickyHeader/StickyHeader';
import Footer from 'components/sharedComponents/Footer';
import { LoadingWrapper } from 'components/sharedComponents/Loading';

import { setAgencyOverview, resetAgency } from "../../redux/actions/agency/agencyActions";
import Sidebar from '../../components/sharedComponents/sidebar/Sidebar';

require('pages/agency/v2/index.scss');

const ComingSoonSection = ({ title }) => <div>{`${title}: Coming Soon`}</div>;

const componentByAgencySection = {
    overview: <ComingSoonSection title="Overview" />,
    account_spending: <ComingSoonSection title="Account Spending" />,
    award_spending: <ComingSoonSection title="Award Spending" />,
    'sub-agency_spending': <ComingSoonSection title="Sub-Agency Spending" />,
    award_recipients: <ComingSoonSection title="Award Recipients" />,
    'top_5:_award_dimensions': <ComingSoonSection title="Top 5: Award Dimensions" />
};

const sections = Object.keys(componentByAgencySection)
    .map((section) => ({
        section,
        label: startCase(section)
    }));

const AgencyProfileV2 = ({
    agencyOverview,
    agencyId,
    resetAgency,
    setAgencyOverview
}) => {
    const [activeSection, setActiveSection] = useState(sections[0].section);

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
        const sectionDom = document.querySelector(`#${snakeCase(section)}`);

        if (!sectionDom) {
            return;
        }

        const sectionTop = sectionDom.offsetTop - 145;
        scrollToY(sectionTop, 700);
        setActiveSection(matchedSection.section);
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
                    <div className="fy-picker">
                        FY Picker
                    </div>
                </div>
            </StickyHeader>
            <LoadingWrapper>
                <main id="main-content" className="main-content">
                    <div className="sankey">
                        <h2>Agency Spending Snapshot</h2>
                        <span>Overview</span>
                        <div className="sankey__viz coming-soon">
                            Coming Soon
                        </div>
                    </div>
                    <div className="sidebar">
                        <Sidebar
                            stickyHeaderHeight={stickyHeaderHeight}
                            sections={sections}
                            active={activeSection}
                            jumpToSection={jumpToSection}
                            pageName="agency-v2" />
                    </div>
                    <div className="body">
                        {sections.map((section) => (
                            <section id={snakeCase(section.section)} className={`body__section ${snakeCase(section.section)}`}>
                                {componentByAgencySection[section.section]}
                            </section>
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
    resetAgency: () => dispatch(resetAgency()),
    setAgencyOverview: (agency) => dispatch(setAgencyOverview(agency))
});

export default connect(mapStateToProps, mapDispatchToProps)(AgencyProfileV2);

// export default AgencyProfileV2;

