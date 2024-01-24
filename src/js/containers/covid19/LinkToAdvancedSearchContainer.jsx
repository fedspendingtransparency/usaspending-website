/**
 * LinkToAdvancedSearchContainer.jsx
 * Created by Lizzie Salita 7/28/20
 */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { isEqual } from 'lodash';
import { clearAllFilters } from 'redux/actions/search/searchFilterActions';
import { resetAppliedFilters, applyStagedFilters, setAppliedFilterCompletion } from 'redux/actions/search/appliedFilterActions';
import { initialState as defaultAdvancedSearchFilters, CheckboxTreeSelections } from 'redux/reducers/search/searchFiltersReducer';
import Analytics from 'helpers/analytics/Analytics';

const FooterLinkToAdvancedSearchContainer = () => {
    const dispatch = useDispatch();
    const history = useHistory();
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
        history.push('/search');
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

    return (
        <div className="footerLinkToAdvancedSearch">
            <div className="footerLinkToAdvancedSearch__content footerLinkToAdvancedSearch__content_covid">
                <h2>Looking for more information about COVID-19 federal awards?</h2>
                <p>
                    Visit our <button onClick={clickedSearch}>Advanced Search</button> page to see individual awards funded through the COVID-19 response and keep an eye out for purple COVID-19 badges found throughout the site.
                </p>
                <p>
                    Visit our <Link onClick={clickedCustomAcctData} to="/download_center/custom_account_data">Custom Account Data</Link> download for COVID-19 award spending data with a higher degree of granularity.
                </p>
            </div>
        </div>
    );
};

export default FooterLinkToAdvancedSearchContainer;
