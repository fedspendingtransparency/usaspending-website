/**
  * AwardContainer.jsx
  * Created by David Trinh 10/5/2018
  **/

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isCancel } from 'axios';
import Award from 'components/awardv2/AwardV2';

import * as SearchHelper from 'helpers/searchHelper';
import { setAward } from 'redux/actions/awardV2/awardActions';
import {
    setDownloadCollapsed,
    setDownloadPending,
    setDownloadExpectedFile,
    setDownloadExpectedUrl
} from 'redux/actions/bulkDownload/bulkDownloadActions';

import BaseContract from 'models/v2/awardsV2/BaseContract';
import BaseIdv from 'models/v2/awardsV2/BaseIdv';
import BaseFinancialAssistance from 'models/v2/awardsV2/BaseFinancialAssistance';
import {
    fetchIdvDownloadFile,
    fetchContractDownloadFile,
    fetchAssistanceDownloadFile
} from '../../helpers/downloadHelper';

require('pages/awardV2/awardPage.scss');

const propTypes = {
    setAward: PropTypes.func,
    handleDownloadRequest: PropTypes.func,
    setDownloadCollapsed: PropTypes.func,
    setDownloadPending: PropTypes.func,
    setDownloadExpectedFile: PropTypes.func,
    setDownloadExpectedUrl: PropTypes.func,
    params: PropTypes.object,
    award: PropTypes.object,
    isDownloadPending: PropTypes.bool
};

export class AwardContainer extends React.Component {
    constructor(props) {
        super(props);

        this.awardRequest = null;
        this.downloadRequest = null;

        this.state = {
            noAward: false,
            inFlight: false
        };
        this.downloadData = this.downloadData.bind(this);
        this.fetchAwardDownloadFile = this.fetchAwardDownloadFile.bind(this);
    }

    componentDidMount() {
        this.getSelectedAward(this.props.params.awardId);
    }

    componentDidUpdate(prevProps) {
        if (this.props.params.awardId !== prevProps.params.awardId) {
            this.getSelectedAward(this.props.params.awardId);
        }
    }

    componentWillUnmount() {
        if (this.awardRequest) {
            this.awardRequest.cancel();
        }
    }

    getSelectedAward(id) {
        if (this.awardRequest) {
            // A request is currently in-flight, cancel it
            this.awardRequest.cancel();
        }

        this.setState({
            inFlight: true
        });

        this.awardRequest = SearchHelper.fetchAwardV2(id);

        this.awardRequest.promise
            .then((results) => {
                const awardData = results.data;

                this.setState({
                    inFlight: false
                });

                this.parseAward(awardData);

                // operation has resolved
                this.awardRequest = null;
            })
            .catch((error) => {
                console.log(error);
                if (isCancel(error)) {
                    // Got cancelled
                }
                else if (error.response) {
                    // Errored out but got response, toggle noAward flag
                    this.awardRequest = null;
                    this.setState({
                        noAward: true,
                        inFlight: false
                    });
                }
                else {
                    // Request failed
                    this.awardRequest = null;
                    console.log(error);
                    this.setState({ inFlight: false });
                }
            });
    }

    parseAward(data) {
        this.setState({
            noAward: false
        });

        if (data.category === 'contract') {
            const contract = Object.create(BaseContract);
            contract.populate(data);
            this.props.setAward(contract);
        }
        else if (data.category === 'idv') {
            const idv = Object.create(BaseIdv);
            idv.populate(data);
            this.props.setAward(idv);
        }
        else {
            const financialAssistance = Object.create(BaseFinancialAssistance);
            financialAssistance.populate(data);
            this.props.setAward(financialAssistance);
        }
    }

    fetchAwardDownloadFile(awardCategory = this.props.award.category, awardId = this.props.params.awardId) {
        if (awardCategory === 'idv') {
            return fetchIdvDownloadFile(awardId);
        }
        else if (awardCategory === 'contract') {
            return fetchContractDownloadFile(awardId);
        }

        return fetchAssistanceDownloadFile(awardId);
    }

    async downloadData(awardCategory = this.props.award.category, awardId = this.props.params.awardId) {
        // don't show a modal about the download
        this.props.setDownloadCollapsed(true);

        if (this.downloadRequest) {
            this.downloadRequest.cancel();
        }

        this.downloadRequest = this.fetchAwardDownloadFile(awardCategory, awardId);

        try {
            const { data } = await this.downloadRequest.promise;
            this.props.setDownloadExpectedUrl(data.url);
            this.props.setDownloadExpectedFile(data.file_name);
            // disable download button
            this.props.setDownloadPending(true);
            this.downloadRequest = null;
        }
        catch (err) {
            console.log(err);
            this.downloadRequest = null;
        }
    }

    render() {
        let content = null;
        if (!this.state.inFlight) {
            content = (
                <Award
                    isDownloadPending={this.props.isDownloadPending}
                    downloadData={this.downloadData}
                    awardId={this.props.params.awardId}
                    award={this.props.award}
                    noAward={this.state.noAward} />
            );
        }
        return content;
    }
}

AwardContainer.propTypes = propTypes;

export default connect(
    (state) => ({ award: state.awardV2, isDownloadPending: state.bulkDownload.download.pendingDownload }),
    (dispatch) => bindActionCreators({
        setDownloadExpectedUrl,
        setDownloadExpectedFile,
        setDownloadPending,
        setDownloadCollapsed,
        setAward
    }, dispatch)
)(AwardContainer);
