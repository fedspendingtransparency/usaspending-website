/**
  * AwardContainer.jsx
  * Created by David Trinh 10/5/2018
  **/

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isCancel } from 'axios';

import Router from 'containers/router/Router';
import Award from 'components/awardv2/AwardV2';
import AwardV1Container from 'containers/award/AwardContainer';

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
import { fetchIdvDownloadFile } from '../../helpers/idvHelper';

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
                        noAward: true
                    });
                }
                else {
                    // Request failed
                    this.awardRequest = null;
                    console.log(error);
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

    async downloadData() {
        // don't show a modal about the download
        this.props.setDownloadCollapsed(true);

        if (this.downloadRequest) {
            this.downloadRequest.cancel();
        }

        this.downloadRequest = fetchIdvDownloadFile(this.props.params.awardId);

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
        const isV2url = Router.history.location.pathname.includes('award_v2');
        let content = null;
        if (!this.state.inFlight) {
            if (this.props.award.category === 'idv' || isV2url) {
                content = (
                    <Award
                        isV2url={isV2url}
                        isDownloadPending={this.props.isDownloadPending}
                        downloadData={this.downloadData}
                        awardId={this.props.params.awardId}
                        award={this.props.award}
                        noAward={this.state.noAward} />
                );
            }
            else {
                content = (<AwardV1Container awardId={this.props.params.awardId} />);
            }
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
