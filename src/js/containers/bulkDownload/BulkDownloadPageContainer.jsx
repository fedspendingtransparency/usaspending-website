/**
 * BulkDownloadPageContainer.jsx
 * Created by Lizzie Salita 10/30/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';
import { withRouter } from 'react-router-dom';

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
    match: PropTypes.object,
    history: PropTypes.object
};

export class BulkDownloadPageContainer extends React.Component {
    constructor(props) {
        super(props);

        this.request = null;

        this.startAwardDownload = this.startAwardDownload.bind(this);
        this.startAccountDownload = this.startAccountDownload.bind(this);
    }

    componentDidMount() {
        this.validateDataType(this.props.match.params.type);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.type !== this.props.match.params.type) {
            this.validateDataType(this.props.match.params.type);
        }
    }

    validateDataType(typeParam) {
        if (typeParam) {
            const dataType = downloadOptions.find((type) => type.url === `/download_center/${typeParam}`);
            if (dataType) {
                this.props.setDataType(dataType.type);
            }

            else {
                // Invalid url, go to the error page
                this.props.history.replace('/error');
            }
        }
        else {
            // If no type param is specified, default to award data
            this.props.history.replace('/download_center/custom_award_data');
        }
    }

    startAwardDownload() {
        const formState = this.props.bulkDownload.awards;

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
                }
            },
            columns: [],
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
            } else {
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

        this.requestDownload(params, 'awards');

        logAwardDownload(this.props.bulkDownload.awards);
    }

    startAccountDownload() {
        const formState = this.props.bulkDownload.accounts;

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
                fy: formState.fy
            },
            file_format: 'csv'
        };

        if (formState.federalAccount.id !== '' && formState.federalAccount.id !== 'all') {
            params.filters.federal_account = formState.federalAccount.id;
        }

        if (formState.budgetSubfunction.code !== '' && formState.budgetSubfunction.code !== 'all') {
            params.filters.budget_subfunction = formState.budgetSubfunction.code;
        }

        if (formState.period !== '') {
            params.filters.period = formState.period;
        }
        else {
            params.filters.quarter = formState.quarter;
        }

        this.requestDownload(params, 'accounts');

        logAccountDownload(this.props.bulkDownload.accounts);
    }

    requestDownload(params, type) {
        if (this.request) {
            this.request.cancel();
        }

        if (type === 'awards') {
            const bulkParams = params;
            // Need to check if sub_agency is set or not
            if (bulkParams.filters.sub_agency && bulkParams.filters.sub_agency.toLowerCase() === 'select a sub-agency') {
                delete bulkParams.filters.sub_agency;
            }

            this.request = BulkDownloadHelper.requestAwardsDownload(bulkParams);
        }

        else if (type === 'accounts') {
            this.request = BulkDownloadHelper.requestAccountsDownload(params);
        }

        this.request.promise
            .then((res) => {
                this.props.setDownloadExpectedUrl(res.data.file_url);
                this.props.setDownloadExpectedFile(res.data.file_name);
                this.props.setDownloadPending(true);
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
    }

    render() {
        return (
            <BulkDownloadPage
                bulkDownload={this.props.bulkDownload}
                dataType={this.props.bulkDownload.dataType}
                startAwardDownload={this.startAwardDownload}
                startAccountDownload={this.startAccountDownload}
                dataTypes={downloadOptions} />
        );
    }
}

BulkDownloadPageContainer.propTypes = propTypes;
const BulkDownloadPageContainerWithRouter = withRouter(BulkDownloadPageContainer);

export default connect(
    (state) => ({ bulkDownload: state.bulkDownload }),
    (dispatch) => bindActionCreators(bulkDownloadActions, dispatch)
)(BulkDownloadPageContainerWithRouter);
