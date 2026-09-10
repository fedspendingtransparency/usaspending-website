/**
 * AwardDataContainer.jsx
 * Created by Lizzie Salita 10/30/17
 */

import React, { useState, useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as BulkDownloadHelper from 'helpers/bulkDownloadHelper';
import * as bulkDownloadActions from 'redux/actions/bulkDownload/bulkDownloadActions';
import { useStateList } from "../../../hooks/useStateData";
import AwardDataContent from 'components/bulkDownload/awards/AwardDataContent';

const propTypes = {
    updateDownloadFilter: PropTypes.func,
    clearDownloadFilters: PropTypes.func,
    updateAwardDateRange: PropTypes.func,
    bulkDownload: PropTypes.object,
    clickedDownload: PropTypes.func
};

export const AwardDataContainer = ({
    updateDownloadFilter,
    clearDownloadFilters,
    updateAwardDateRange,
    bulkDownload,
    clickedDownload
}) => {
    const states = useStateList();
    const [, setInFlight] = useState(true);
    const [agencies, setAgencies] = useState({
        cfoAgencies: [],
        otherAgencies: []
    });
    const [subAgencies, setSubAgencies] = useState([]);

    const agencyListRequest = useRef(null);

    const updateFilter = useCallback((name, value) => {
        updateDownloadFilter({
            dataType: 'awards',
            name,
            value
        });
    }, [updateDownloadFilter]);

    const resetSubAgency = useCallback(() => {
        updateFilter('subAgency', {
            id: '',
            name: 'Select a Sub-Agency'
        });
    }, [updateFilter]);

    const setAgencyList = useCallback(() => {
        setInFlight(true);

        if (agencyListRequest.current) {
            agencyListRequest.current.cancel();
        }

        // perform the API request
        agencyListRequest.current = BulkDownloadHelper.requestAgenciesList({
            type: "award_agencies",
            agency: 0
        });

        agencyListRequest.current.promise
            .then((res) => {
                const cfoAgencies = res.data.agencies.cfo_agencies;
                const otherAgencies = res.data.agencies.other_agencies;
                setAgencies({
                    cfoAgencies,
                    otherAgencies
                });
            })
            .catch((err) => {
                console.log(err);
                agencyListRequest.current = null;
            });
    }, []);

    const setSubAgencyList = useCallback((id) => {
        if (id !== '') {
            setInFlight(true);

            if (agencyListRequest.current) {
                agencyListRequest.current.cancel();
            }

            // perform the API request
            agencyListRequest.current = BulkDownloadHelper.requestAgenciesList({
                type: "award_agencies",
                agency: parseInt(id, 10)
            });

            agencyListRequest.current.promise
                .then((res) => {
                    setSubAgencies(res.data.sub_agencies);
                    resetSubAgency();
                })
                .catch((err) => {
                    console.log(err);
                    agencyListRequest.current = null;
                });
        }
        else {
            setSubAgencies([]);
            resetSubAgency();
        }
    }, [resetSubAgency]);

    const updateStartDate = useCallback((date) => {
        updateAwardDateRange({
            date,
            dateType: 'startDate'
        });
    }, [updateAwardDateRange]);

    const updateEndDate = useCallback((date) => {
        updateAwardDateRange({
            date,
            dateType: 'endDate'
        });
    }, [updateAwardDateRange]);

    const clearAwardFilters = useCallback(() => {
        clearDownloadFilters('awards');
    }, [clearDownloadFilters]);

    useEffect(() => {
        setAgencyList();
        return () => {
            if (agencyListRequest.current) {
                agencyListRequest.current.cancel();
            }
        };
        // run once on mount/unmount, matching the previous componentDidMount/componentWillUnmount
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, []);

    return (
        <AwardDataContent
            awards={bulkDownload.awards}
            updateFilter={updateFilter}
            updateStartDate={updateStartDate}
            updateEndDate={updateEndDate}
            clearAwardFilters={clearAwardFilters}
            agencies={agencies}
            subAgencies={subAgencies}
            setSubAgencyList={setSubAgencyList}
            states={states}
            clickedDownload={clickedDownload} />
    );
};

AwardDataContainer.propTypes = propTypes;

export default connect(
    (state) => ({ bulkDownload: state.bulkDownload }),
    (dispatch) => bindActionCreators(bulkDownloadActions, dispatch)
)(AwardDataContainer);

