/**
  * AwardContainer.jsx
  * Created by David Trinh 10/5/2018
  **/

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isCancel } from 'axios';
import { withRouter } from 'react-router-dom';
import { flowRight } from 'lodash';

import Award from 'components/award/Award';
import * as SearchHelper from 'helpers/searchHelper';
import { setAward, resetAward } from 'redux/actions/award/awardActions';
import {
    setDownloadCollapsed,
    setDownloadPending,
    setDownloadExpectedFile,
    setDownloadExpectedUrl
} from 'redux/actions/bulkDownload/bulkDownloadActions';
import { subAwardIdClicked } from 'redux/actions/search/searchSubAwardTableActions';
import { setDEFCodes } from 'redux/actions/covid19/covid19Actions';

import BaseContract from 'models/v2/award/BaseContract';
import BaseIdv from 'models/v2/award/BaseIdv';
import BaseFinancialAssistance from 'models/v2/award/BaseFinancialAssistance';
import {
    fetchIdvDownloadFile,
    fetchContractDownloadFile,
    fetchAssistanceDownloadFile
} from 'helpers/downloadHelper';
import withDefCodes from 'containers/covid19/WithDefCodes';
import { getAwardHistoryCounts } from "../../helpers/awardHistoryHelper";

require('pages/award/awardPage.scss');

const propTypes = {
    subAwardIdClicked: PropTypes.func,
    setAward: PropTypes.func,
    resetAward: PropTypes.func,
    handleDownloadRequest: PropTypes.func,
    setDownloadCollapsed: PropTypes.func,
    setDownloadPending: PropTypes.func,
    setDownloadExpectedFile: PropTypes.func,
    setDownloadExpectedUrl: PropTypes.func,
    award: PropTypes.object,
    isDownloadPending: PropTypes.bool,
    isSubAwardIdClicked: PropTypes.bool,
    match: PropTypes.object,
    defCodes: PropTypes.array,
    setDEFCodes: PropTypes.func
};

export class AwardContainer extends React.Component {
    constructor(props) {
        super(props);

        this.awardRequest = null;
        this.downloadRequest = null;
        this.countRequest = null;

        this.state = {
            noAward: false,
            inFlight: true,
            unlinked: false
        };
        this.downloadData = this.downloadData.bind(this);
        this.fetchAwardDownloadFile = this.fetchAwardDownloadFile.bind(this);
    }

    componentDidMount() {
        this.getSelectedAward(this.props.match.params.awardId);
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.awardId !== prevProps.match.params.awardId) {
            this.getSelectedAward(this.props.match.params.awardId);
        }
    }

    componentWillUnmount() {
        if (this.awardRequest) {
            this.awardRequest.cancel();
        }
        this.props.resetAward();
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
        this.countRequest = getAwardHistoryCounts("federal_account", data.id, data.category === 'idv');

        this.countRequest.promise
            .then((results) => {
                const countDataBool = (results.data.federal_accounts === 0 || results.data.count === 0);

                this.setState({
                    unlinked: countDataBool
                });
            });

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

    fetchAwardDownloadFile(awardCategory = this.props.award.category, awardId = this.props.match.params.awardId) {
        if (awardCategory === 'idv') {
            return fetchIdvDownloadFile(awardId);
        }
        else if (awardCategory === 'contract') {
            return fetchContractDownloadFile(awardId);
        }

        return fetchAssistanceDownloadFile(awardId);
    }

    async downloadData(awardCategory = this.props.award.category, awardId = this.props.match.params.awardId) {
    // don't show a modal about the download
        this.props.setDownloadCollapsed(true);

        if (this.downloadRequest) {
            this.downloadRequest.cancel();
        }

        this.downloadRequest = this.fetchAwardDownloadFile(awardCategory, awardId);

        try {
            const { data } = await this.downloadRequest.promise;
            this.props.setDownloadExpectedUrl(data.file_url);
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
        return (
            <Award
                subAwardIdClicked={this.props.subAwardIdClicked}
                isSubAwardIdClicked={this.props.isSubAwardIdClicked}
                isDownloadPending={this.props.isDownloadPending}
                downloadData={this.downloadData}
                awardId={this.props.match.params.awardId}
                award={this.props.award}
                isLoading={this.state.inFlight}
                noAward={this.state.noAward}
                defCodes={this.props.defCodes}
                unlinked={this.state.unlinked} />
        );
    }
}

AwardContainer.propTypes = propTypes;

export default flowRight(
    withDefCodes,
    connect(
        (state) => ({
            award: state.award,
            isDownloadPending: state.bulkDownload.download.pendingDownload,
            isSubAwardIdClicked: state.searchSubAwardTable.isSubAwardIdClicked,
            defCodes: state.covid19.defCodes
        }),
        (dispatch) => bindActionCreators({
            setDownloadExpectedUrl,
            setDownloadExpectedFile,
            setDownloadPending,
            setDownloadCollapsed,
            setAward,
            subAwardIdClicked,
            resetAward,
            setDEFCodes
        }, dispatch)
    ),
    withRouter
)(AwardContainer);
