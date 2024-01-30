/**
  * AwardContainer.jsx
  * Created by David Trinh 10/5/2018
  **/

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isCancel } from 'axios';
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
import Analytics from "../../helpers/analytics/Analytics";
import { usePrevious } from "../../helpers/";

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

const AwardContainer = (props) => {
    let awardRequest = null;
    let downloadRequest = null;
    let countRequest = null;
    const [noAward, setNoAward] = useState(false);
    const [inFlight, setInFlight] = useState(true);
    const [unlinked, setUnlinked] = useState(false);
    const prevProps = usePrevious(props);

    const parseAward = (data) => {
        countRequest = getAwardHistoryCounts("federal_account", data.id, data.category === 'idv');
        countRequest.promise
            .then((results) => {
                const countDataBool = (results.data.federal_accounts === 0 || results.data.count === 0);

                setUnlinked(countDataBool);
            });

        setNoAward(false);

        if (data.category === 'contract') {
            const contract = Object.create(BaseContract);
            contract.populate(data);
            props.setAward(contract);
        }
        else if (data.category === 'idv') {
            const idv = Object.create(BaseIdv);
            idv.populate(data);
            props.setAward(idv);
        }
        else {
            const financialAssistance = Object.create(BaseFinancialAssistance);
            financialAssistance.populate(data);
            props.setAward(financialAssistance);
        }
    };

    const getSelectedAward = (id) => {
        if (awardRequest) {
            // A request is currently in-flight, cancel it
            awardRequest.cancel();
        }

        setInFlight(true);

        awardRequest = SearchHelper.fetchAwardV2(id);

        awardRequest.promise
            .then((results) => {
                const awardData = results.data;

                setInFlight(false);
                parseAward(awardData);

                // operation has resolved
                awardRequest = null;
            })
            .catch((error) => {
                console.log(error);
                if (isCancel(error)) {
                    // Got cancelled
                }
                else if (error.response) {
                    // Errored out but got response, toggle noAward flag
                    awardRequest = null;
                    setNoAward(true);
                    setInFlight(false);
                }
                else {
                    // Request failed
                    awardRequest = null;
                    console.log(error);
                    setInFlight(false);
                }
            });
    };

    const fetchAwardDownloadFile = (awardCategory = props.award.category, awardId = props.match.params.awardId) => {
        Analytics.event({
            event: 'award-profile-download-initiated',
            category: 'Award Profile',
            action: 'Download Initiated',
            label: `Award Id ${awardId}`
        });

        if (awardCategory === 'idv') {
            return fetchIdvDownloadFile(awardId);
        }
        else if (awardCategory === 'contract') {
            return fetchContractDownloadFile(awardId);
        }

        return fetchAssistanceDownloadFile(awardId);
    };

    const downloadData = async (awardCategory = props.award.category, awardId = props.match.params.awardId) => {
        // don't show a modal about the download
        props.setDownloadCollapsed(true);

        if (downloadRequest) {
            downloadRequest.cancel();
        }

        downloadRequest = fetchAwardDownloadFile(awardCategory, awardId);

        try {
            const { data } = await downloadRequest.promise;
            props.setDownloadExpectedUrl(data.file_url);
            props.setDownloadExpectedFile(data.file_name);
            // disable download button
            props.setDownloadPending(true);
            downloadRequest = null;
        }
        catch (err) {
            console.log(err);
            downloadRequest = null;
        }
    };

    useEffect(() => {
        if (props.match.params.awardId !== prevProps?.match.params.awardId) {
            getSelectedAward(props.match.params.awardId);
        }
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [props.match.params.awardId]);

    // eslint-disable-next-line arrow-body-style
    useEffect(() => {
        return () => {
            if (awardRequest) {
                awardRequest.cancel();
            }
            props.resetAward();
        };
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, []);

    return (
        <Award
            subAwardIdClicked={props.subAwardIdClicked}
            isSubAwardIdClicked={props.isSubAwardIdClicked}
            isDownloadPending={props.isDownloadPending}
            downloadData={downloadData}
            awardId={props.match.params.awardId}
            award={props.award}
            isLoading={inFlight}
            noAward={noAward}
            defCodes={props.defCodes}
            unlinked={unlinked} />
    );
};

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
    ))(AwardContainer);
