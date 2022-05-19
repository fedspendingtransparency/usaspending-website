/**
 * Covid19Container.jsx
 * Created by Jonathan Hill 06/02/20
 */

import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import GlobalConstants from 'GlobalConstants';
import { useQueryParams } from 'helpers/queryParams';
import BaseOverview from 'models/v2/covid19/BaseOverview';
import { fetchOverview, fetchAwardAmounts } from 'apis/disaster';
import { useDefCodes } from 'containers/covid19/WithDefCodes';
import { useAgencySlugs } from 'containers/agency/WithAgencySlugs';
import { setOverview, setTotals, setDefcParams, resetOverview } from 'redux/actions/covid19/covid19Actions';
import { defcByPublicLaw } from 'dataMapping/covid19/covid19';
import Covid19Page from 'components/covid19/Covid19Page';

require('pages/covid19/index.scss');

const Covid19Container = () => {
    const [, areDefCodesLoading, defCodes] = useDefCodes();
    const { defcParams } = useSelector((state) => state.covid19);
    const [, , , slugsLoading] = useAgencySlugs();
    const overviewRequest = useRef(null);
    const [overviewLoading, setOverviewLoading] = useState(true);
    const awardAmountRequest = useRef(null);
    const [amountsLoading, setAmountsLoading] = useState(true);
    const dispatch = useDispatch();
    const history = useHistory();
    let { publicLaw } = useQueryParams();
    publicLaw = publicLaw && publicLaw.toLowerCase();

    useEffect(() => {
    /** Default to all DEFC if:
         * 1) no public law param is defined
         * 2) the public law param is invalid
         * 3) the public law param is for ARP, but the ARP filter is not yet released
         */

        if (!publicLaw ||
            !(publicLaw === 'all' || (publicLaw in defcByPublicLaw)) ||
            (publicLaw === 'american-rescue-plan')) {
            history.replace({
                pathname: '',
                search: '?publicLaw=all'
            });
        }
        else if (!areDefCodesLoading) {
            // set DEFC params based on the currently selected public law
            if (publicLaw === 'all') {
                // use all Covid 19 DEFC
                dispatch(setDefcParams(defCodes.filter((c) => c.disaster === 'covid_19').map((code) => code.code)));
            }
            else {
                // use codes for selected publicLaw
                dispatch(setDefcParams(defcByPublicLaw[publicLaw]));
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [publicLaw, areDefCodesLoading]);

    useEffect(() => {
        dispatch(resetOverview());
        const getOverviewData = async () => {
            const overviewDefc = defcParams || defCodes.filter((c) => c.disaster === 'covid_19').map((code) => code.code);
            overviewRequest.current = fetchOverview(overviewDefc);
            try {
                const { data } = await overviewRequest.current.promise;
                const newOverview = Object.create(BaseOverview);
                newOverview.populate(data);
                dispatch(setOverview(newOverview));
                setOverviewLoading(false);
            }
            catch (e) {
                console.error(' Error Overview : ', e.message);
                setOverviewLoading(false);
            }
        };
        const getAllAwardTypesAmount = async () => {
            const params = {
                filter: {
                    def_codes: defcParams
                }
            };
            awardAmountRequest.current = fetchAwardAmounts(params);
            try {
                const { data } = await awardAmountRequest.current.promise;
                // set totals in redux, we can use totals elsewhere to calculate unlinked data
                const totals = {
                    obligation: data.obligation,
                    outlay: data.outlay,
                    awardCount: data.award_count,
                    faceValueOfLoan: data.face_value_of_loan
                };
                dispatch(setTotals('', totals));
                setAmountsLoading(false);
            }
            catch (e) {
                console.error(' Error Amounts : ', e.message);
                setAmountsLoading(false);
            }
        };
        if (defcParams && defcParams.length) {
            getOverviewData();
            getAllAwardTypesAmount();
            overviewRequest.current = null;
            awardAmountRequest.current = null;
        }
        return () => {
            if (overviewRequest.current) {
                overviewRequest.cancel();
            }
            if (awardAmountRequest.current) {
                awardAmountRequest.cancel();
            }
        };
    }, [defCodes, defcParams, dispatch]);

    return (
        <Covid19Page loading={areDefCodesLoading || slugsLoading || overviewLoading || amountsLoading} />
    );
};

export default Covid19Container;
