/**
 * AgencyPage.jsx
 * Created by Maxwell Kendall 01/31/2020
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { startCase, snakeCase } from 'lodash';
import {
    Picker,
    ComingSoon
} from 'data-transparency-ui';

import { agencyPageMetaTags } from 'helpers/metaTagHelper';
import { scrollToY } from 'helpers/scrollToHelper';
import { getBaseUrl } from 'helpers/socialShare';

import MetaTags from 'components/sharedComponents/metaTags/MetaTags';
import Header from 'containers/shared/HeaderContainer';
import Sidebar from 'components/sharedComponents/sidebar/Sidebar';
import StickyHeader from 'components/sharedComponents/stickyHeader/StickyHeader';
import Footer from 'containers/Footer';
import { defaultSortFy } from 'components/sharedComponents/pickers/FYPicker';
import ShareIcon from 'components/sharedComponents/stickyHeader/ShareIcon';
import AccountSpending from 'components/agencyV2/accountSpending/AccountSpending';
import AgencySection from './AgencySection';

require('pages/agency/v2/index.scss');

const scrollPositionOfSiteHeader = 96;

const propTypes = {
    agencyId: PropTypes.string,
    selectedFy: PropTypes.number,
    fyOptions: PropTypes.array
};

export const AgencyProfileV2 = ({ selectedFy, agencyId, fyOptions }) => {
    const [activeSection, setActiveSection] = useState('overview');

    const componentByAgencySection = {
        overview: <ComingSoon />,
        account_spending: <AccountSpending fy={`${selectedFy}`} agencyId={agencyId} />,
        sub_agency_spending: <ComingSoon />
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

    const slug = `agency_v2/${agencyId}`;

    return (
        <div className="usa-da-agency-page-v2">
            <MetaTags {...agencyPageMetaTags} />
            <Header />
            <StickyHeader>
                <>
                    <div className="sticky-header__title">
                        <h1 tabIndex={-1} id="main-focus">
                            Agency Profile v2
                        </h1>
                    </div>
                    <div className="sticky-header__toolbar">
                        <span className="fy-picker-label">Filter</span>
                        <div className="fiscal-year-container">
                            <Picker
                                sortFn={defaultSortFy}
                                icon={<FontAwesomeIcon icon="calendar-alt" />}
                                selectedOption={`${selectedFy}`}
                                options={fyOptions} />
                            <span>Fiscal Year</span>
                        </div>
                        <hr />
                        <ShareIcon
                            slug={slug}
                            email={{
                                // TODO - add agency name when the data is available
                                subject: 'USAspending.gov Agency Profile: ',
                                body: `View the spending activity of this agency on USAspending.gov: ${getBaseUrl(slug)}`
                            }} />
                        <div className="sticky-header__toolbar-item">
                            <button className="sticky-header__button">
                                <FontAwesomeIcon icon="download" />
                            </button>
                            <span>Download</span>
                        </div>
                    </div>
                </>
            </StickyHeader>
            <main id="main-content" className="main-content usda__flex-row">
                <div className="sidebar usda__flex-col">
                    <Sidebar
                        pageName="agency-v2"
                        fixedStickyBreakpoint={scrollPositionOfSiteHeader}
                        active={activeSection}
                        jumpToSection={jumpToSection}
                        detectActiveSection={setActiveSection}
                        sections={Object.keys(componentByAgencySection).map((section) => ({
                            section: snakeCase(section),
                            label: startCase(section)
                        }))} />
                </div>
                <div className="body usda__flex-col">
                    {Object.keys(componentByAgencySection).map((section) => (
                        <AgencySection key={section} section={section} >
                            {componentByAgencySection[section]}
                        </AgencySection>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
};

AgencyProfileV2.propTypes = propTypes;

export default AgencyProfileV2;
