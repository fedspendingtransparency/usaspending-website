import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CardButton } from "data-transparency-ui";
import { isCancel } from "axios";
import PropTypes from "prop-types";

import { initialState as defaultFilters } from "redux/reducers/search/searchFiltersReducer";
import { REQUEST_VERSION } from "GlobalConstants";
import { generateUrlHash } from "helpers/searchHelper";

const propTypes = {
    code: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string
};

const AwardBreakdownCardButton = ({
    code,
    name,
    type
}) => {
    const usaCode = `USA_${code}`;

    const handleGoToAdvancedSearch = (e) => {
        e?.preventDefault();
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

    return (
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
    );
};

AwardBreakdownCardButton.propTypes = propTypes;
export default AwardBreakdownCardButton;
