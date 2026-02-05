/**
 * AwardBreakdownCardHeadline.jsx
 * Created on 12/15/2025 by Josue Aguilar
 */

import React, { useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CardButton } from "data-transparency-ui";
import PropTypes from "prop-types";

import { initialState as defaultFilters } from "redux/reducers/search/searchFiltersReducer";
import { REQUEST_VERSION } from "GlobalConstants";
import { generateUrlHash } from "helpers/searchHelper";
import useQueryTemp from "hooks/useQueryTemp";

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
    const openWindow = useCallback(({ hash }) => {
        window.open(`/search/?hash=${hash}`, '_blank');
    }, []);
    const { fetchData } = useQueryTemp(openWindow);

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

        fetchData(generateUrlHash, filterValue);
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
            action={handleGoToAdvancedSearch} />
    );
};

AwardBreakdownCardButton.propTypes = propTypes;
export default AwardBreakdownCardButton;
