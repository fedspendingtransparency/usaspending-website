import React, { useEffect, useState } from "react";
import { CardBody, CardButton, CardContainer, CardHero, FlexGridCol } from "data-transparency-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { isCancel } from "axios";

import { REQUEST_VERSION } from "GlobalConstants";
import { InfoCircle } from "components/sharedComponents/icons/Icons";
import DetailsTooltip from "components/state/overview/DetailsTooltip";
import { initialState as defaultFilters } from "redux/reducers/search/searchFiltersReducer";
import { generateUrlHash } from "helpers/searchHelper";

const propTypes = {
    overview: PropTypes.object
};

const AwardBreakdownCard = ({ overview }) => {
    const [showInfoTooltip, setShowInfoTooltip] = useState(false);

    let populationSourceYearLabel = '';
    let incomeSourceYearLabel = '';
    const {
        code,
        name,
        type,
        population,
        populationSourceYear,
        incomeSourceYear,
        awardAmountPerCapita,
        medianHouseholdIncome
    } = overview;
    const usaCode = `USA_${code}`;

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

    const getSelectedHash = () => {
        const filterValue = {
            filters: {
                ...defaultFilters,
                selectedLocations: {
                    usaCode: {
                        filter: {
                            state: code,
                            country: "USA"
                        },
                        display: {
                            title: name,
                            entity: type.charAt(0).toUpperCase() +
                                type.slice(1),
                            standalone: name
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
        getSelectedHash(overview);
    };

    if ((population !== "--") && populationSourceYear) {
        populationSourceYearLabel = `(${populationSourceYear} est.)`;
    }
    if ((medianHouseholdIncome !== "--") && incomeSourceYear) {
        incomeSourceYearLabel = `(${incomeSourceYear} est.)`;
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
                                <div className="details-text">
                                    {population} {populationSourceYearLabel}
                                </div>
                                <div className="details-header">Obligations Per Capita</div>
                                <div className="details-text">
                                    {awardAmountPerCapita}
                                </div>
                                <div className="details-header">Median Household Income</div>
                                <div className="details-text">
                                    {medianHouseholdIncome} {incomeSourceYearLabel}
                                </div>
                            </div>
                        }>
                        <CardButton
                            customClassName="details-button"
                            onlyPerformAction
                            text={
                                <div>
                                View awards to this state <FontAwesomeIcon icon="arrow-right" />
                                </div>
                            }
                            variant="secondary"
                            textAlignment="center"
                            action={() => {
                                handleGoToAdvancedSearch();
                            }} />
                    </CardBody>
                </CardContainer>
            </div>
        </FlexGridCol>
    );
};

AwardBreakdownCard.propTypes = propTypes;
export default AwardBreakdownCard;
