/**
 * BulkDownloadPageContainer.jsx
 * Created by Lizzie Salita 10/30/17
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';
import { useHistory } from 'react-router-dom';
import * as bulkDownloadActions from 'redux/actions/bulkDownload/bulkDownloadActions';
import * as BulkDownloadHelper from 'helpers/bulkDownloadHelper';
import { downloadOptions } from 'dataMapping/navigation/menuOptions';
import { awardDownloadOptions, accountDownloadOptions } from 'dataMapping/bulkDownload/bulkDownloadOptions';
import BulkDownloadPage from 'components/bulkDownload/BulkDownloadPage';

import { logAwardDownload, logAccountDownload } from './helpers/downloadAnalytics';

require('pages/bulkDownload/bulkDownloadPage.scss');

const propTypes = {
    bulkDownload: PropTypes.object,
    setDataType: PropTypes.func,
    setDownloadPending: PropTypes.func,
    setDownloadExpectedFile: PropTypes.func,
    setDownloadExpectedUrl: PropTypes.func,
    match: PropTypes.object
};

const BulkDownloadPageContainer = (props) => {
    let request = null;
    const history = useHistory();

    const requestDownload = (params, type) => {
        if (request) {
            request.cancel();
        }

        const bulkParams = params;

        // Prevent empty arrays in the download request; empty array defaults are defined by the reducer
        for (const filterType in bulkParams.filters) {
            if (Array.isArray(bulkParams.filters[filterType]) && !bulkParams.filters[filterType].length) {
                delete bulkParams.filters[filterType];
            }
        }

        if (type === 'awards') {
            // Need to check if sub_agency is set or not
            if (bulkParams.filters.sub_agency && bulkParams.filters.sub_agency.toLowerCase() === 'select a sub-agency') {
                delete bulkParams.filters.sub_agency;
            }

            request = BulkDownloadHelper.requestAwardsDownload(bulkParams);
        }

        else if (type === 'accounts') {
            request = BulkDownloadHelper.requestAccountsDownload(bulkParams);
        }

        request.promise
            .then((res) => {
                props.setDownloadExpectedUrl(res.data.file_url);
                props.setDownloadExpectedFile(res.data.file_name);
                props.setDownloadPending(true);
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    // something went wrong
                    console.log(err);

                    if (err.response) {
                        console.log(err.response.data.message);
                    }
                    else {
                        console.log(err.message);
                    }
                }
            });
    };

    const validateDataType = (typeParam) => {
        if (typeParam) {
            const dataType = downloadOptions.find((type) => type.url === `/download_center/${typeParam}`);
            if (dataType) {
                props.setDataType(dataType.type);
            }

            else {
                // Invalid url, go to the error page
                history.replace('/error');
            }
        }
        else {
            // If no type param is specified, default to award data
            history.replace('/download_center/custom_award_data');
        }
    };

    const startAwardDownload = () => {
        const formState = props.bulkDownload.awards;

        // Create the Award Types array from the Redux state
        const primeAwardTypes = formState.awardTypes.primeAwards.toArray().reduce((acc, curr) => (
            acc.concat(awardDownloadOptions.awardTypeLookups[curr].apiValues)
        ), []);
        const subAwardTypes = formState.awardTypes.subAwards.toArray().reduce((acc, curr) => (
            acc.concat(awardDownloadOptions.awardTypeLookups[curr].apiValues)
        ), []);

        // Create the locations array
        const locations = {
            country: formState.location.country.code
        };
        // Add the state if it exists
        if (formState.location.state.code && formState.location.state.code !== 'all') {
            locations.state = formState.location.state.code;
        }

        // Convert undefined to the empty string for open-ended dates
        let startDate = '';
        if (formState.dateRange.startDate) {
            startDate = formState.dateRange.startDate;
        }
        let endDate = '';
        if (formState.dateRange.endDate) {
            endDate = formState.dateRange.endDate;
        }

        const params = {
            filters: {
                prime_award_types: primeAwardTypes,
                sub_award_types: subAwardTypes,
                sub_agency: formState.subAgency.name,
                date_type: formState.dateType,
                date_range: {
                    start_date: startDate,
                    end_date: endDate
                },
                def_codes: formState.defCodes
            },
            file_format: formState.fileFormat
        };

        // Since the location filter is optional, only add it if a country has been selected
        if (formState.location.country.code && formState.location.country.code !== 'all') {
            const locationType = awardDownloadOptions.locationTypes.find((type) => (
                type.name === formState.locationType
            ));
            // Since "FOREIGN" is not a country the scope filter is used instead
            if (formState.location.country.code === 'FOREIGN') {
                params.filters[locationType.apiScopeName] = "foreign";
            }
            else {
                params.filters[locationType.apiName] = [locations];
            }
        }

        const agencyParams = { type: formState.agencyType === 'awarding_agency' ? 'awarding' : 'funding', tier: "toptier", name: formState.agency.name };
        if (formState.subAgency.name && formState.subAgency.name !== 'Select a Sub-Agency') {
            agencyParams.name = formState.subAgency.name;
            agencyParams.tier = 'subtier';
            agencyParams.toptier_name = formState.agency.name;
        }
        params.filters.agencies = [agencyParams];

        requestDownload(params, 'awards');

        logAwardDownload(props.bulkDownload.awards);
    };

    const startAccountDownload = () => {
        const formState = props.bulkDownload.accounts;

        const accountLevels = accountDownloadOptions.accountLevels;
        const accountLevel = accountLevels.find((account) =>
            account.name === formState.accountLevel
        );

        // Get the submission type object
        const submissionTypes = accountDownloadOptions.submissionTypes
            .filter((type) => formState.submissionTypes.includes(type.name))
            .map((type) => type.apiName);

        const params = {
            account_level: accountLevel.apiName,
            filters: {
                budget_function: formState.budgetFunction.code,
                agency: formState.agency.id,
                submission_types: submissionTypes,
                fy: formState.fy,
                def_codes: formState.defCodes
            },
            file_format: 'csv'
        };

        if (formState.federalAccount.id !== '' && formState.federalAccount.id !== 'all') {
            params.filters.federal_account = formState.federalAccount.id;
        }

        if (formState.budgetSubfunction.code !== '' && formState.budgetSubfunction.code !== 'all') {
            params.filters.budget_subfunction = formState.budgetSubfunction.code;
        }

        if (formState.period !== 0 && !formState.period) {
            params.filters.quarter = formState.quarter;
        }
        else {
            params.filters.period = formState.period;
        }

        requestDownload(params, 'accounts');

        logAccountDownload(props.bulkDownload.accounts);
    };

    useEffect(() => {
        validateDataType(props.match.params.type);
    }, [props.match.params.type]);

    return (
        <BulkDownloadPage
            bulkDownload={props.bulkDownload}
            dataType={props.bulkDownload.dataType}
            startAwardDownload={startAwardDownload}
            startAccountDownload={startAccountDownload}
            dataTypes={downloadOptions} />
    );
};

BulkDownloadPageContainer.propTypes = propTypes;

export default connect(
    // connects reduxStore to component as props (props.bulkDownload === reduxStore.bulkdDownload)
    (state) => ({
        bulkDownload: state.bulkDownload
    }),
    // connects "action creator" fns which update the reduxStore via dispatch to the component as props (props.setDefcodes will invoke)
    (dispatch) => bindActionCreators(bulkDownloadActions, dispatch)
)(BulkDownloadPageContainer);
