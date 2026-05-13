/**
 * Covid19LinkCardsSection.jsx
 * Created by JD House 5/11/2026
 */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEqual } from 'lodash-es';
import { clearAllFilters } from 'redux/actions/search/searchFilterActions';
import {
    resetAppliedFilters,
    applyStagedFilters,
    setAppliedFilterCompletion
} from 'redux/actions/search/appliedFilterActions';
import {
    initialState as defaultAdvancedSearchFilters,
    CheckboxTreeSelections
} from 'redux/reducers/search/searchFiltersReducer';
import Analytics from 'helpers/analytics/Analytics';
import {
    FlexGridRow,
    FlexGridCol,
    CardContainer,
    CardBody,
    CardButton
} from 'data-transparency-ui';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FooterCovid19LinkCardsSection = () => {
    const dispatch = useDispatch();
    const defCodes = useSelector((state) => state.covid19.defCodes, isEqual);

    const addDefCodesToAdvancedSearchFilter = () => {
        dispatch(setAppliedFilterCompletion(false));
        dispatch(applyStagedFilters(
            Object.assign(
                {}, defaultAdvancedSearchFilters,
                {
                    defCodes: new CheckboxTreeSelections({
                        require: defCodes.map((code) => code.code),
                        exclude: [],
                        counts: [{ value: "COVID-19", count: defCodes.length, label: "COVID-19 Response" }]
                    })
                }
            )
        ));
    };

    const clickedSearch = () => {
        dispatch(clearAllFilters());
        dispatch(resetAppliedFilters());
        addDefCodesToAdvancedSearchFilter();
        Analytics.event({
            event: 'covid-advanced-search-click',
            category: 'COVID-19 - More Information',
            action: 'advanced search click'
        });
    };

    const clickedCustomAcctData = () => {
        Analytics.event({
            event: 'covid-custom-account-click',
            category: 'COVID-19 - More Information',
            action: 'custom account data click'
        });
    };

    const cardObjects = [
        {
            icon: (
                <div className="covid__icon-container">
                    <FontAwesomeIcon icon="filter-list" color="#454545" size="lg" />
                </div>
            ),
            headline: 'Advanced Search',
            text: 'Search individual awards funded through COVID-19 response & keep an eye out for purple COVID-19 badges found  throughout the site.',
            buttonText: (
                <>
                    <div>View advanced search&nbsp;&nbsp;</div>
                    <FontAwesomeIcon icon="arrow-right" />
                </>
            ),
            buttonLink: '/search',
            action: clickedSearch
        },
        {
            icon: (
                <div className="covid__icon-container">
                    <FontAwesomeIcon icon="file-arrow-down" color="#454545" size="lg" />
                </div>
            ),
            headline: 'Custom Account Data',
            text: 'Download for COVID-19 award spending data with a higher degree of granularity.',
            buttonText: (
                <>
                    <div>View custom account data&nbsp;&nbsp;</div>
                    <FontAwesomeIcon icon="arrow-right" />
                </>
            ),
            buttonLink: '/download_center/custom_account_data',
            action: clickedCustomAcctData
        }
    ];

    return (
        <div className="more-information__container">
            <h4>More Information About COVID-19 Federal Awards</h4>
            <FlexGridRow className="covid__card-row" hasGutter gutterSize="sm">
                {cardObjects.map((card) => (
                    <FlexGridCol
                        className="covid__card-col"
                        key={card.headline}
                        mobile={12}
                        tablet={6}
                        desktop={6}>
                        <CardContainer>
                            {card.icon}
                            <CardBody
                                headline={card.headline}
                                text={card.text}>
                                <CardButton
                                    variant="text"
                                    backgroundColor="light"
                                    textAlignment="left"
                                    text={card.buttonText}
                                    link={card.buttonLink}
                                    action={card.action} />
                            </CardBody>
                        </CardContainer>
                    </FlexGridCol>
                ))}
            </FlexGridRow>
        </div>
    );
};

export default FooterCovid19LinkCardsSection;
