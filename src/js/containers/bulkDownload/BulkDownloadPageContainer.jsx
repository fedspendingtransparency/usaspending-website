/**
 * BulkDownloadPageContainer.jsx
 * Created by Lizzie Salita 10/30/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';

import Router from 'containers/router/Router';

import * as bulkDownloadActions from 'redux/actions/bulkDownload/bulkDownloadActions';
import * as BulkDownloadHelper from 'helpers/bulkDownloadHelper';
import { downloadOptions } from 'dataMapping/navigation/menuOptions';
import { awardDownloadOptions } from 'dataMapping/bulkDownload/bulkDownloadOptions';
import BulkDownloadPage from 'components/bulkDownload/BulkDownloadPage';

import { logAwardDownload } from './helpers/downloadAnalytics';

require('pages/bulkDownload/bulkDownloadPage.scss');

const propTypes = {
    params: PropTypes.object,
    bulkDownload: PropTypes.object,
    setDataType: PropTypes.func,
    setDownloadPending: PropTypes.func,
    setDownloadExpectedFile: PropTypes.func,
    setDownloadExpectedUrl: PropTypes.func
};

export class BulkDownloadPageContainer extends React.Component {
    constructor(props) {
        super(props);

        this.request = null;

        this.startAwardDownload = this.startAwardDownload.bind(this);
    }

    componentWillMount() {
        this.validateDataType(this.props.params.type);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.params.type !== this.props.params.type) {
            this.validateDataType(nextProps.params.type);
        }
    }

    validateDataType(typeUrl) {
        if (typeUrl) {
            const dataType = downloadOptions.find((type) => type.url === `#/download_center/${typeUrl}`);

            if (dataType) {
                this.props.setDataType(dataType.type);
            }

            else {
                // Invalid url, go to the error page
                Router.history.replace('/error');
            }
        }
        else {
            // If no type param is specified, default to award data
            Router.history.replace('/download_center/custom_award_data');
        }
    }

    startAwardDownload() {
        const formState = this.props.bulkDownload.awards;

        // Create the Award Levels array from the Redux state
        const awardLevels = [];
        for (let i = 0; i < awardDownloadOptions.awardLevels.length; i++) {
            if (formState.awardLevels[awardDownloadOptions.awardLevels[i].name]) {
                awardLevels.push(awardDownloadOptions.awardLevels[i].apiName);
            }
        }

        // Create the Award Types array from the Redux state
        const awardTypes = [];
        for (let j = 0; j < awardDownloadOptions.awardTypes.length; j++) {
            if (formState.awardTypes[awardDownloadOptions.awardTypes[j].name]) {
                awardTypes.push(awardDownloadOptions.awardTypes[j].apiName);
            }
        }

        // Create the recipient locations array
        const recipientLocations = {
            country: formState.location.country.code
        };
        // Add the state if it exists
        if (formState.location.state.code && formState.location.state.code !== 'all') {
            recipientLocations.state = formState.location.state.code;
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
            award_levels: awardLevels,
            filters: {
                award_types: awardTypes,
                agency: formState.agency.id,
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

        // Since the recipient location filter is optional, only add it if a country has been selected
        if (formState.location.country.code && formState.location.country.code !== 'all') {
            params.filters.recipient_locations = [recipientLocations];
        }

        this.requestDownload(params, 'awards');

        logAwardDownload(this.props.bulkDownload.awards);
    }

    requestDownload(params, type) {
        if (this.request) {
            this.request.cancel();
        }

        const bulkParams = params;
        // Need to check if sub_agency is set or not
        if (bulkParams.filters.sub_agency.toLowerCase() === "select a sub-agency") {
            delete bulkParams.filters.sub_agency;
        }

        this.request = BulkDownloadHelper.requestBulkDownload(bulkParams, type);

        this.request.promise
            .then((res) => {
                this.props.setDownloadExpectedUrl(res.data.url);
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
                startDownload={this.startAwardDownload}
                dataTypes={downloadOptions} />
        );
    }
}

BulkDownloadPageContainer.propTypes = propTypes;

export default connect(
    (state) => ({ bulkDownload: state.bulkDownload }),
    (dispatch) => bindActionCreators(bulkDownloadActions, dispatch)
)(BulkDownloadPageContainer);

