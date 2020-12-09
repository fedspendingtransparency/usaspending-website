import React, { useEffect, useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Table, Pagination } from 'data-transparency-ui';
import { throttle } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import DrilldownCell from 'components/aboutTheData/DrilldownCell';
import CellWithModal from 'components/aboutTheData/CellWithModal';
import { setTableData, setTableSort, setTotals } from 'redux/actions/aboutTheData';
import { getTotals, getDetails, getDates, usePagination } from 'helpers/aboutTheDataHelper';
import DetailsRow from 'models/v2/aboutTheData/BaseAgencyRow';
import DatesRow from 'models/v2/aboutTheData/DatesRow';
import { isPeriodSelectable } from 'components/aboutTheData/TimeFilters';

import { agenciesTableColumns } from './AgencyTableMapping';

const propTypes = {
    openModal: PropTypes.func.isRequired,
    activeTab: PropTypes.oneOf(['dates', 'details']).isRequired,
    selectedFy: PropTypes.string,
    selectedPeriod: PropTypes.string
};

const parsePeriods = (periods) => periods
    .map(({ publicationDate, showNotCertified, isQuarterly }) => (
        <div className="generic-cell-content">
            {(!isQuarterly && publicationDate) && publicationDate}
            {isQuarterly && "Submitted quarterly"}
            {!publicationDate && "Not submitted"}
            {showNotCertified && publicationDate && <span className="not-certified">NOT CERTIFIED</span>}
        </div>
    ));

const AgenciesContainer = ({
    activeTab,
    openModal,
    selectedFy,
    selectedPeriod
}) => {
    const {
        details, dates, datesSort, detailsSort, totals, submissionPeriods
    } = useSelector((state) => ({ ...state.aboutTheData, submissionPeriods: state.account.submissionPeriods }));
    const dispatch = useDispatch();
    const datesReq = useRef(null);
    const detailsReq = useRef(null);
    const totalsReq = useRef(null);
    const [
        [{ page: detailsPage, limit: detailsLimit }, updateDetailsPagination],
        [{ page: datesPage, limit: datesLimit }, updateDatesPagination]
    ] = [usePagination(), usePagination()];
    const [{ vertical: isVerticalSticky, horizontal: isHorizontalSticky }, setIsSticky] = useState({ vertical: false, horizontal: false });
    const [[, areDetailsLoading, areDatesLoading], setLoading] = useState([true, true, true]);
    const [error, setError] = useState(null);
    const tableRef = useRef(null);
    const verticalStickyClass = isVerticalSticky ? 'sticky-y-table' : '';
    const horizontalStickyClass = isHorizontalSticky ? 'sticky-x-table' : '';

    const handleScroll = throttle(() => {
        const { scrollLeft: horizontal, scrollTop: vertical } = tableRef.current;
        const shouldUpdate = (
            (vertical && !isVerticalSticky) ||
            (!vertical && isVerticalSticky) ||
            (horizontal && !isHorizontalSticky) ||
            (!horizontal && isHorizontalSticky)
        );
        if (shouldUpdate) setIsSticky({ vertical, horizontal });
    }, 100);

    const handleUpdateSort = (field, direction) => {
        dispatch(setTableSort(activeTab, field, direction));
    };

    const fetchTableData = useCallback(() => {
        if (activeTab === 'details') {
            const isPeriodValid = isPeriodSelectable(
                submissionPeriods.toJS().filter(({ submission_fiscal_year: y }) => `${y}` === selectedFy),
                selectedPeriod
            );
            if (!isPeriodValid) return Promise.resolve();
            setLoading([false, true, false]);
            detailsReq.current = getDetails(selectedFy, selectedPeriod, detailsSort[0], detailsSort[1], detailsPage, detailsLimit);
            return detailsReq.current.promise
                .then(({ data: { results } }) => {
                    const parsedResults = results.map((d) => {
                        const row = Object.create(DetailsRow);
                        const federalTotal = totals.find(({ fiscal_year: y, fiscal_period: p }) => (
                            y === parseInt(selectedFy, 10) &&
                            p === parseInt(selectedPeriod, 10)
                        ));
                        row.populate({ ...d, federalTotal });
                        return row;
                    });
                    dispatch(setTableData(activeTab, parsedResults));
                    setLoading([false, false, false]);
                    setError(false);
                })
                .catch((e) => {
                    console.error('Error: ', e);
                    setLoading([false, false, false]);
                    setError(true);
                });
        }
        setLoading([false, true, false]);
        datesReq.current = getDates(selectedFy, datesSort[0], datesSort[1], datesPage, datesLimit);
        return datesReq.current.promise
            .then(({ data: { results } }) => {
                const parsedResults = results.map((d) => {
                    const row = Object.create(DatesRow);
                    row.populate(parseInt(selectedFy, 10), d, totals);
                    return row;
                });
                dispatch(setTableData(activeTab, parsedResults));
                setLoading([false, false, false]);
                setError(false);
                datesReq.current = null;
            })
            .catch((e) => {
                console.error('Error: ', e);
                setLoading([false, false, false]);
                setError(true);
                datesReq.current = null;
            });
    });

    const fetchTotals = useCallback(() => {
        if (selectedFy && selectedPeriod && !totals.length) {
            if (totalsReq.current) totalsReq.current.cancel();
            if (detailsReq.current) detailsReq.current.cancel();
            setLoading([true, areDetailsLoading, areDatesLoading]);
            totalsReq.current = getTotals(selectedFy, selectedPeriod, true);
            return totalsReq.current.promise
                .then(({ data: { results } }) => {
                    dispatch(setTotals(results));
                    totalsReq.current = null;
                    return results;
                })
                .catch((e) => {
                    console.error('Error: ', e);
                    setLoading([false, false, false]);
                    setError(true);
                    totalsReq.current = null;
                    return [];
                });
        }
        return Promise.resolve([]);
    });

    useEffect(() => {
        if (datesReq.current) {
            console.info('canceling request on unmount');
            datesReq.current.cancel();
        }
        if (detailsReq.current) {
            console.info('canceling request on unmount');
            detailsReq.current.cancel();
        }
        if (totalsReq.current) {
            console.info('canceling request on unmount');
            totalsReq.current.cancel();
        }
    }, []);

    useEffect(() => {
        // FY or Period changes
        if (selectedFy && selectedPeriod && !totals.length) {
            fetchTotals();
        }
        else if (selectedFy && selectedPeriod) {
            fetchTableData();
        }
    }, [
        totals,
        activeTab,
        selectedFy,
        selectedPeriod,
        detailsSort,
        detailsPage,
        detailsLimit,
        datesSort,
        datesPage,
        datesLimit
    ]);

    const renderDates = (results = []) => results
        .map(({
            name,
            code,
            percentageOfTotalFederalBudget,
            periods
        }) => ([
            (<DrilldownCell data={name} id={code} />),
            (<div className="generic-cell-content">{percentageOfTotalFederalBudget}</div>),
            ...parsePeriods(periods)
        ]));

    const renderDetails = (results = []) => results
        .map((obj) => {
            const {
                name: agencyName,
                code,
                publicationDate,
                discrepancyCount: GtasNotInFileA,
                obligationDifference,
                tasTotals,
                percentageOfTotalFederalBudget
            } = obj;
            return [
                (<DrilldownCell data={agencyName} id={code} />),
                (<div className="generic-cell-content">{percentageOfTotalFederalBudget}</div>),
                (<CellWithModal data={publicationDate} openModal={openModal} modalType="publicationDates" agencyData={{ agencyName }} />),
                (<CellWithModal data={GtasNotInFileA} openModal={openModal} modalType="missingAccountBalance" agencyData={{ agencyName, gtasObligationTotal: tasTotals.gtas_obligation_total }} />),
                (<CellWithModal data={obligationDifference} openModal={openModal} modalType="reportingDifferences" agencyData={{ agencyName }} />)
            ];
        });

    const handlePageChange = (page) => {
        if (activeTab === 'details') {
            updateDetailsPagination({ page, limit: detailsLimit });
        }
        else {
            updateDatesPagination({ page, limit: detailsLimit });
        }
    };

    const handleLimitChange = (limit) => {
        if (activeTab === 'details') {
            updateDetailsPagination({ page: detailsPage, limit });
        }
        else {
            updateDatesPagination({ page: datesPage, limit });
        }
    };

    return (
        <>
            <div className="table-container" ref={tableRef} onScroll={handleScroll}>
                {activeTab === 'details' && (
                    <Table
                        rows={renderDetails(details)}
                        classNames={`usda-table-w-grid ${verticalStickyClass} ${horizontalStickyClass}`}
                        columns={agenciesTableColumns[activeTab]}
                        updateSort={handleUpdateSort}
                        currentSort={{
                            field: detailsSort[0],
                            direction: detailsSort[1]
                        }}
                        error={error}
                        loading={areDetailsLoading} />
                )}
                {activeTab === 'dates' && (
                    <Table
                        rows={renderDates(dates)}
                        classNames={`usda-table-w-grid ${verticalStickyClass} ${horizontalStickyClass}`}
                        columns={agenciesTableColumns[activeTab]}
                        updateSort={handleUpdateSort}
                        currentSort={{
                            field: datesSort[0],
                            direction: datesSort[1]
                        }}
                        error={error}
                        loading={areDatesLoading} />
                )}
            </div>
            {(details.length || dates.length) && (
                <Pagination
                    resultsText
                    limitSelector
                    changeLimit={handleLimitChange}
                    changePage={handlePageChange}
                    currentPage={activeTab === 'details' ? detailsPage : datesPage}
                    pageSize={activeTab === 'details' ? detailsLimit : datesLimit}
                    totalItems={activeTab === 'details' ? details.length : dates.length} />
            )}
        </>
    );
};

AgenciesContainer.propTypes = propTypes;
export default AgenciesContainer;
