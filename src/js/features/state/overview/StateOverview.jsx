/**
 * StateOverview.jsx
 * Created by Lizzie Salita 5/2/18
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { REQUEST_VERSION } from "GlobalConstants";
import { isCancel } from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    CardContainer, SectionHeader, CardBody, CardButton, CardHero, FlexGridRow, FlexGridCol
} from "data-transparency-ui";

import { InfoCircle } from 'components/sharedComponents/icons/Icons';
import { initialState as defaultFilters } from 'redux/reducers/search/searchFiltersReducer';
import AwardBreakdownContainer from
    'containers/state/visualizations/awardBreakdown/AwardBreakdownContainer';
import GeoVisualizationSectionContainer from
    'containers/state/visualizations/geo/GeoVisualizationSectionContainer';
import DetailsTooltip from 'components/state/overview/DetailsTooltip';
import SummaryStats from 'features/state/overview/SummaryStats';
import { generateUrlHash } from "helpers/searchHelper";
import RoundedToggle from "components/sharedComponents/RoundedToggle";
import Accordion from "components/sharedComponents/accordion/Accordion";
import GlossaryLink from "components/sharedComponents/GlossaryLink";

const propTypes = {
    stateProfile: PropTypes.object
};

const StateOverview = ({ stateProfile }) => {
    const [hideFlag, setHideFlag] = useState(true);
    const [flag, setFlag] = useState('');
    const [showInfoTooltip, setShowInfoTooltip] = useState(false);
    const [open, setOpen] = useState(false);
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        let flagPrep = null;
        let hideFlagPrep = 'hide';

        if (stateProfile.flag !== '') {
            hideFlagPrep = '';
            flagPrep = (
                <img src={stateProfile.flag} alt={stateProfile.name} />
            );
        }

        setFlag(flagPrep);
        setHideFlag(hideFlagPrep);
    }, [stateProfile.flag, stateProfile.name, stateProfile.id]);

    useEffect(() => {
        if (showInfoTooltip) {
            const closeButton = document.querySelector('#state-overview-tooltip__close_icon');
            if (closeButton) {
                closeButton.focus();
            }
        }
    }, [showInfoTooltip]);

    const onToggle = () => {
        setToggle(!toggle);
    };

    const onKeyToggle = (event) => {
        if (event.key === 'Enter') {
            setToggle(!toggle);
        }
    };

    const showTooltip = () => {
        setShowInfoTooltip(true);
    };

    const closeTooltip = () => {
        setShowInfoTooltip(false);
    };

    let populationSourceYear = '';
    let incomeSourceYear = '';

    const usaCode = `USA_${stateProfile.code}`;
    const getSelectedHash = () => {
        const filterValue = {
            filters: {
                ...defaultFilters,
                selectedLocations: {
                    usaCode: {
                        filter: {
                            state: stateProfile.code,
                            country: "USA"
                        },
                        display: {
                            title: stateProfile.name,
                            entity: stateProfile.type.charAt(0).toUpperCase() +
                                stateProfile.type.slice(1),
                            standalone: stateProfile.name
                        },
                        identifier: usaCode
                    }
                }
            },
            version: REQUEST_VERSION
        };

        let tempHash = generateUrlHash(filterValue);
        tempHash.promise
            .then((results) => {
                const hashData = results.data;
                window.open(`/search/?hash=${hashData.hash}`, '_blank');
                // operation has resolved
                tempHash = null;
            })
            .catch((error) => {
                console.log(error);
                if (isCancel(error)) {
                    // Got cancelled
                }
                else if (error.response) {
                    // Errored out but got response, toggle noAward flag
                    tempHash = null;
                }
                else {
                    // Request failed
                    tempHash = null;
                    console.log(error);
                }
            });
    };
    const handleGoToAdvancedSearch = (e) => {
        e?.preventDefault();
        getSelectedHash(stateProfile);
    };

    if ((stateProfile.population !== "--") && stateProfile.populationSourceYear) {
        populationSourceYear = `(${stateProfile.populationSourceYear} est.)`;
    }
    if ((stateProfile.medianHouseholdIncome !== "--") && stateProfile.incomeSourceYear) {
        incomeSourceYear = `(${stateProfile.incomeSourceYear} est.)`;
    }

    let tooltip = null;
    if (showInfoTooltip) {
        tooltip = (
            <DetailsTooltip
                showInfoTooltip={showInfoTooltip}
                closeTooltip={closeTooltip} />
        );
    }

    return (
        <div
            id="state-overview"
            className="state-section state-overview">
            <div className="state-overview__title-wrapper">
                <div className={`state-overview__flag ${hideFlag}`}>
                    {flag}
                </div>
                <h2 className="state-overview__title">{stateProfile.name}</h2>
            </div>
            <SectionHeader
                icon={<FontAwesomeIcon icon="map-marker-alt" size="2x" />}
                title="Overview"
                titleTooltip={{ component: false }}
                descTooltip={{ component: false }} />
            <hr className="results-divider" />
            <div className="state-overview__content">
                <div className="state-overview__note">
                    <strong>Note:</strong> All data on this page is based on Primary Place of Performance.
                </div>
                <SummaryStats stateProfile={stateProfile} />
                <FlexGridRow>
                    <FlexGridCol width={8} desktop={8} tablet={12} mobile={12}>
                        <div className="state-section__viz award-breakdown" id="award">
                            <div className="award-breakdown__heading-row">
                                <h3 className="state-overview__heading">
                                    Award Breakdown
                                </h3>
                                <div className="state-overview__heading-right-side">
                                    <RoundedToggle toggle={toggle} onKeyToggle={onKeyToggle} onToggle={onToggle} label="View Outlays" />
                                    <div className="state-overview__line-div" />
                                    <Accordion setOpen={setOpen} closedIcon="chevron-down" openIcon="chevron-up" title="About Outlays" />
                                </div>
                            </div>
                            {open &&
                                <div className="state-overview__what-content">
                                    <FontAwesomeIcon icon="info-circle" className="state-overview__info-icon" />
                                    <p className="state-overview__what-heading">What is an outlay?</p>
                                    <p className="state-overview__what-text">An <span className="state-overview__emphasis">outlay</span> <GlossaryLink term="outlay" /> is money that has been paid out from a federal account. This should not be confused with an <span className="state-overview__emphasis">obligation&nbsp;<GlossaryLink term="obligation" /></span> , which is money the federal government has promised to pay (for example, when signing a contract or awarding a grant). Outlays are the transactions that pay off the federal government&apos;s obligations.</p>
                                    <p className="state-overview__what-second-heading">
                                        How do outlays relate to the chart below?
                                    </p>
                                    <p className="state-overview__what-text">
                                        The chart below can be filtered to view outlayed amounts for each award type.
                                        Outlay amounts displayed below may have been paying off obligations that
                                        occurred in a prior year, which is why obligations and outlays from a single year
                                        are not comparable.
                                        The award types above add up to more than 100% due to negative values not
                                        shown here.
                                    </p>
                                </div>}
                        </div>
                    </FlexGridCol>
                </FlexGridRow>
                <FlexGridRow>
                    <FlexGridCol width={8} desktop={8} tablet={12} mobile={12}>
                        <div className="state-section__viz award-breakdown" id="award">
                            <AwardBreakdownContainer toggleState={toggle} />
                        </div>
                    </FlexGridCol>
                    <FlexGridCol width={4} desktop={4} tablet={12} mobile={12}l>
                        <div className="state-section__viz details state-overview__heading">
                            <CardContainer variant="outline" size="md">
                                <CardHero fill="#005ea2" />
                                <CardBody
                                    customClassName="details-card-body"
                                    headline={
                                        <div className="state-section__viz">
                                            <h3 className="state-overview__heading">
                                                Details
                                                <span className="details__info_icon_holder">
                                                    <button
                                                        id="details__info_icon"
                                                        className="details__info_icon"
                                                        onFocus={showTooltip}
                                                        onBlur={closeTooltip}
                                                        onMouseEnter={showTooltip}
                                                        onClick={showTooltip}>
                                                        <InfoCircle />
                                                    </button>
                                                </span>
                                            </h3>
                                            {tooltip}
                                        </div>
                                    }
                                    text={
                                        <div className="details-info">
                                            <div className="details-header">Count</div>
                                            <div className="details-text">{stateProfile.population} {populationSourceYear}</div>
                                            <div className="details-header">Obligations Per Capita</div>
                                            <div className="details-text">{stateProfile.awardAmountPerCapita}</div>
                                            <div className="details-header">Median Household Income</div>
                                            <div className="details-text">{stateProfile.medianHouseholdIncome} {incomeSourceYear}</div>
                                        </div>
                                    }>
                                    <CardButton
                                        customClassName="details-button"
                                        onlyPerformAction
                                        text={<div>View awards to this state <FontAwesomeIcon icon="arrow-right" /></div>}
                                        variant="secondary"
                                        textAlignment="center"
                                        action={() => {
                                            handleGoToAdvancedSearch();
                                        }} />
                                </CardBody>
                            </CardContainer>
                        </div>
                    </FlexGridCol>
                </FlexGridRow>
                <div className="state-section__viz geo">
                    <h3 className="state-overview__heading">
                        Primary Place of Performance
                    </h3>
                    <GeoVisualizationSectionContainer className="state-profile__map-toggle" />
                </div>
            </div>
        </div>
    );
};

StateOverview.propTypes = propTypes;
export default StateOverview;
