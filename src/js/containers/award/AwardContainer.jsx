/**
  * AwardContainer.jsx
  * Created by David Trinh 10/5/2018
  **/

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isCancel } from 'axios';
import { flowRight } from 'lodash-es';
import { useMatch } from 'react-router';

import Award from 'components/award/Award';
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
import withDefCodes from 'hooks/WithDefCodes';
import { getAwardHistoryCounts } from "helpers/awardHistoryHelper";
import Analytics from "helpers/analytics/Analytics";
import { fetchAwardV2 } from "../../helpers/searchHelper";

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
    const awardRequestRef = useRef(null);
    const downloadRequestRef = useRef(null);
    const countRequestRef = useRef(null);
    const [noAward, setNoAward] = useState(false);
    const [inFlight, setInFlight] = useState(true);
    const [unlinked, setUnlinked] = useState(false);
    const match = useMatch(`/award/:awardId`);
    const awardId  = encodeURIComponent(match.params.awardId);

    const parseAward = (data) => {
        countRequestRef.current = getAwardHistoryCounts(
            "federal_account", data.id, data.category === 'idv'
        );

        countRequestRef.current.promise
            .then((results) => {
                const countDataBool = (
                    results.data.federal_accounts === 0 ||
                    results.data.count === 0
                );

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
        if (awardRequestRef.current) {
            // A request is currently in-flight, cancel it
            awardRequestRef.current.cancel();
        }

        setInFlight(true);

        awardRequestRef.current = fetchAwardV2(encodeURIComponent(id));

        awardRequestRef.current.promise
            .then((results) => {
                const awardData = results.data;

                setInFlight(false);
                parseAward(awardData);

                // operation has resolved
                awardRequestRef.current = null;
            })
            .catch((error) => {
                console.log(error);
                if (isCancel(error)) {
                    // Got cancelled
                }
                else if (error.response) {
                    // Errored out but got response, toggle noAward flag
                    awardRequestRef.current = null;
                    setNoAward(true);
                    setInFlight(false);
                }
                else {
                    // Request failed
                    awardRequestRef.current = null;
                    console.log(error);
                    setInFlight(false);
                }
            });
    };

    const fetchAwardDownloadFile = (awardCategory = props.award.category) => {
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

    const downloadData = async (awardCategory = props.award.category) => {
        // don't show a modal about the download
        props.setDownloadCollapsed(true);

        if (downloadRequestRef.current) {
            downloadRequestRef.current.cancel();
        }

        downloadRequestRef.current = fetchAwardDownloadFile(awardCategory);

        try {
            const { data } = await downloadRequestRef.current.promise;
            props.setDownloadExpectedUrl(data.file_url);
            props.setDownloadExpectedFile(data.file_name);
            // disable download button
            props.setDownloadPending(true);
            downloadRequestRef.current = null;
        }
        catch (err) {
            console.log(err);
            downloadRequestRef.current = null;
        }
    };

    useEffect(() => {
        getSelectedAward(awardId);
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [awardId]);

    // eslint-disable-next-line arrow-body-style
    useEffect(() => {
        return () => {
            if (awardRequestRef.current) {
                awardRequestRef.current.cancel();
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
            awardId={awardId}
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
