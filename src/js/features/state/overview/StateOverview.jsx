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
import AwardBreakdownHeader from "./AwardBreakdownHeader";

const propTypes = {
    stateProfile: PropTypes.object
};

const StateOverview = ({ stateProfile }) => {
    const [hideFlag, setHideFlag] = useState(true);
    const [flag, setFlag] = useState('');
    const [showInfoTooltip, setShowInfoTooltip] = useState(false);
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
                <AwardBreakdownHeader toggle={toggle} setToggle={setToggle} />
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
