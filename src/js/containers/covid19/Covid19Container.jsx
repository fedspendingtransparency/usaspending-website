/**
 * Covid19Container.jsx
 * Created by Jonathan Hill 06/02/20
 */

import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import GlobalConstants from 'GlobalConstants';
import { getQueryParamString, useQueryParams } from 'helpers/queryParams';
import BaseOverview from 'models/v2/covid19/BaseOverview';
import { fetchOverview, fetchAwardAmounts } from 'apis/disaster';
import { useDefCodes } from 'containers/covid19/WithDefCodes';
import { setOverview, setTotals } from 'redux/actions/covid19/covid19Actions';
import { defcByPublicLaw } from 'dataMapping/covid19/covid19';
import Covid19Page from 'components/covid19/Covid19Page';

require('pages/covid19/index.scss');

const Covid19Container = () => {
    const [, areDefCodesLoading, defCodes] = useDefCodes();
    const overviewRequestForAllDefCodes = useRef(null);
    const overviewRequest = useRef(null);
    const awardAmountRequest = useRef(null);
    const dispatch = useDispatch();
    const history = useHistory();
    const query = useQueryParams();
    const { publicLaw } = query;
    const { overview } = useSelector((state) => state.covid19);

    useEffect(() => {
        /** Default to all DEFC if:
         * 1) no public law param is defined
         * 2) the public law param is invalid
         * 3) the public law param is for ARP, but the ARP filter is not yet released
         */

        if (!publicLaw ||
            !(publicLaw === 'all' || (publicLaw in defcByPublicLaw)) ||
            (publicLaw === 'american-rescue-plan' && !GlobalConstants.ARP_RELEASED)) {
            const newParams = getQueryParamString({ ...query, publicLaw: 'all' });
            history.replace({
                pathname: '',
                search: newParams
            });
        }
    }, [publicLaw]);

    const getOverviewData = async (request, law) => {
        try {
            const { data } = await request.current.promise;
            const newOverview = Object.create(BaseOverview);
            newOverview.populate(data);
            dispatch(setOverview(law, newOverview));
        }
        catch (e) {
            console.log(' Error Overview : ', e.message);
        }
    };
    // always get the overview for all def codes, given we do not have that data in redux
    useEffect(() => {
        if (defCodes.length && !overview?.all) {
            overviewRequestForAllDefCodes.current = fetchOverview(
                defCodes.filter((c) => c.disaster === 'covid_19').map((code) => code.code)
            );
            getOverviewData(overviewRequestForAllDefCodes, 'all');
        }
        return () => {
            if (overviewRequestForAllDefCodes.current) overviewRequestForAllDefCodes.current.cancel();
        };
    }, [defCodes, overview]);
    // get overview data by def code
    useEffect(() => {
        if (defCodes.length && publicLaw && publicLaw !== 'all') {
            overviewRequest.current = fetchOverview(defcByPublicLaw[publicLaw]);
            getOverviewData(overviewRequest, publicLaw);
        }
        return () => {
            if (overviewRequest.current) overviewRequest.current.cancel();
        };
    }, [defCodes, overview]);

    useEffect(() => {
        const getAllAwardTypesAmount = async () => {
            if (awardAmountRequest.current) awardAmountRequest.current = null;
            awardAmountRequest.current = fetchAwardAmounts({
                filter: {
                    def_codes: publicLaw && publicLaw !== 'all' ?
                        defcByPublicLaw[publicLaw] :
                        defCodes.filter((c) => c.disaster === 'covid_19').map((code) => code.code)
                }
            });
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
            }
            catch (e) {
                console.log(' Error Amounts : ', e.message);
            }
        };
        if (defCodes.length) {
            getAllAwardTypesAmount();
        }
        return () => {
            if (awardAmountRequest.current) {
                awardAmountRequest.current.cancel();
            }
        };
    }, [defCodes, dispatch, publicLaw]);

    return (
        <Covid19Page areDefCodesLoading={areDefCodesLoading} />
    );
};

export default Covid19Container;
