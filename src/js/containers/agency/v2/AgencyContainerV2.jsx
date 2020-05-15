/**
 * AgencyPage.jsx
 * Created by Maxwell Kendall 01/31/2020
 */

/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { startCase, snakeCase } from "lodash";
import {
    TooltipWrapper,
    Picker
} from 'data-transparency-ui';

import { setAgencyOverview, resetAgency } from 'redux/actions/agency/agencyActions';

import { agencyPageMetaTags } from 'helpers/metaTagHelper';
import { scrollToY } from 'helpers/scrollToHelper';
import * as FiscalYearHelper from 'helpers/fiscalYearHelper';
import { socialShareOptions, getSocialShareFn } from 'helpers/socialShare';

import MetaTags from 'components/sharedComponents/metaTags/MetaTags';
import Header from 'components/sharedComponents/header/Header';
import Sidebar from 'components/sharedComponents/sidebar/Sidebar';
import StickyHeader from 'components/sharedComponents/stickyHeader/StickyHeader';
import Footer from 'containers/Footer';
import { LoadingWrapper } from 'components/sharedComponents/Loading';
import { defaultSortFy } from 'components/sharedComponents/pickers/FYPicker';

import AccountSpending from 'components/agency/v2/accountSpending/AccountSpending';

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
const AgencySection = ({ section, icon = "chart-area", children }) => (
    <section id={`agency-v2-${snakeCase(section)}`} className={`body__section ${snakeCase(section)}`}>
        <div className="body__header">
            <div className="body__header-icon">
                <FontAwesomeIcon size="lg" icon={icon} />
            </div>
            <h3>{startCase(section)}</h3>
            <TooltipWrapper
                className="agency-v2-tt"
                icon="info"
                tooltipComponent={<TooltipComponent />} />
        </div>
        <hr />
        {children}
    </section>
);

const ComingSoon = () => (
    <div className="coming-soon-section">
        <h4>Coming Soon</h4>
        <p>This feature is currently under development.</p>
    </div>
);

let timeout;

export const AgencyProfileV2 = ({
    agencyOverview,
    agencyId,
    params,
    clearAgency,
    setOverview
}) => {
    const [activeSection, setActiveSection] = useState('overview');
    const [showConfirmationText, setConfirmationText] = useState(false);
    const [selectedFy, setSelectedFy] = useState(FiscalYearHelper.defaultFiscalYear());

    useEffect(() => () => {
        if (timeout && showConfirmationText) {
            window.clearTimeout(timeout);
        }
    });

    const getCopyFn = () => {
        document.getElementById('slug').select();
        document.execCommand("copy");
        setConfirmationText(true);
        timeout = window.setTimeout(() => {
            setConfirmationText(false);
        }, 1750);
    };

    const componentByAgencySection = {
        overview: <ComingSoon />,
        account_spending: <AccountSpending fy={`${selectedFy}`} agencyId={params.agencyId} />,
        award_spending: <ComingSoon />,
        sub_agency_spending: <ComingSoon />,
        award_recipients: <ComingSoon />,
        top_5_award_dimensions: <ComingSoon />
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

    const fyOptions = FiscalYearHelper.allFiscalYears(FiscalYearHelper.earliestExplorerYear)
        .map((year) => {
            const onClickHandler = () => setSelectedFy(year);
            return {
                name: `${year}`,
                value: year,
                onClick: onClickHandler
            };
        })
        .sort((a, b) => defaultSortFy(a.value, b.value));

    const url = `https://www.usaspending.gov/#/agency_v2/${params.agencyId}`;
    const slug = `agency_v2/${params.agencyId}`;

    const socialSharePickerOptions = socialShareOptions.map((option) => {
        if (option.name === 'copy') {
            return {
                ...option,
                onClick: getCopyFn
            };
        }
        if (option.name === 'email') {
            const onClick = getSocialShareFn(slug, option.name).bind(null, {
                subject: `Check out Agency ${params.agencyId} on USAspending.gov!`,
                body: `Here is the url: ${url}`
            });
            return {
                ...option,
                onClick
            };
        }
        return {
            ...option,
            onClick: getSocialShareFn(slug, option.name)
        };
    });

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
                        <input id="slug" type="text" className="text" style={{ position: 'absolute', right: '9999px', opacity: 0 }} value={url} />
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
                        <div className="sticky-header__toolbar-item">
                            <Picker
                                dropdownDirection="left"
                                options={socialSharePickerOptions}
                                selectedOption="copy"
                                backgroundColor="#4A4A4A"
                                sortFn={() => 1}>
                                <FontAwesomeIcon icon="share-alt" size="lg" />
                            </Picker>
                            <span>Share</span>
                            {showConfirmationText && (
                                <span className="copy-confirmation">
                                    <FontAwesomeIcon icon="check-circle" color="#3A8250" /> Copied!
                                </span>
                            )}
                        </div>
                        <div className="sticky-header__toolbar-item">
                            <button className="sticky-header__button">
                                <FontAwesomeIcon icon="download" />
                            </button>
                            <span>Download</span>
                        </div>
                    </div>
                </>
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
