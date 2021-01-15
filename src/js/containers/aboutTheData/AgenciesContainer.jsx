import React, { useEffect, useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Table, Pagination } from 'data-transparency-ui';
import { throttle } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import DrilldownCell from 'components/aboutTheData/DrilldownCell';
import CellWithModal from 'components/aboutTheData/CellWithModal';
import { setTableData, setTableSort, setTotals, setSearchResults } from 'redux/actions/aboutTheData';
import { getTotalBudgetaryResources, getAgenciesReportingData, getSubmissionPublicationDates, usePagination, isPeriodSelectable } from 'helpers/aboutTheDataHelper';
import ReportingOverviewRow from 'models/v2/aboutTheData/ReportingOverviewRow';
import PublicationOverviewRow from 'models/v2/aboutTheData/PublicationOverviewRow';

import { agenciesTableColumns } from './AgencyTableMapping';

const propTypes = {
    openModal: PropTypes.func.isRequired,
    activeTab: PropTypes.oneOf(['publications', 'submissions']).isRequired,
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
        allSubmissions, allPublications, publicationsSort, submissionsSort, federalTotals, submissionPeriods, searchTerm, submissionsSearchResults, publicationsSearchResults
    } = useSelector((state) => ({ ...state.aboutTheData, submissionPeriods: state.account.submissionPeriods }));
    const dispatch = useDispatch();
    const publicationsReq = useRef(null);
    const submissionsReq = useRef(null);
    const totalsReq = useRef(null);
    const [
        [{ page: submissionsPage, totalItems: totalSubmissionItems, limit: submissionsLimit }, updateSubmissionsPagination],
        [{ page: publicationsPage, totalItems: totalPublicationItems, limit: publicationsLimit }, updatePublicationsPagination]
    ] = [usePagination(), usePagination()];
    const [{ vertical: isVerticalSticky, horizontal: isHorizontalSticky }, setIsSticky] = useState({ vertical: false, horizontal: false });
    const [[, areSubmissionsLoading, arePublicationsLoading], setLoading] = useState([true, true, true]);
    const [error, setError] = useState(null);
    const verticalStickyClass = isVerticalSticky ? 'sticky-y-table' : '';
    const horizontalStickyClass = isHorizontalSticky ? 'sticky-x-table' : '';
    const tableRef = useRef(null);
    const searchTermRef = useRef(null);
    const { current: previousSearchTerm } = searchTermRef;

    useEffect(() => {
        searchTermRef.current = searchTerm;
    }, [searchTerm]);

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

    const fetchTableData = useCallback((goToFirstPage = false) => {
        if (activeTab === 'submissions') {
            const newPage = goToFirstPage ? 1 : submissionsPage;
            const isPeriodValid = isPeriodSelectable(
                submissionPeriods.toJS().filter(({ submission_fiscal_year: y }) => `${y}` === selectedFy),
                selectedPeriod
            );
            if (!isPeriodValid) return Promise.resolve();
            setLoading([false, true, false]);
            submissionsReq.current = getAgenciesReportingData(selectedFy, selectedPeriod, submissionsSort[0], submissionsSort[1], newPage, submissionsLimit, searchTerm);
            return submissionsReq.current.promise
                .then(({ data: { results, page_metadata: { total: totalItems, page, limit } } }) => {
                    const parsedResults = results.map((d) => {
                        const row = Object.create(ReportingOverviewRow);
                        const federalTotal = federalTotals.find(({ fiscal_year: y, fiscal_period: p }) => (
                            y === parseInt(selectedFy, 10) &&
                            p === parseInt(selectedPeriod, 10)
                        ));
                        row.populate({ ...d, federalTotal });
                        return row;
                    });
                    if (searchTerm) {
                        dispatch(setSearchResults(activeTab, parsedResults));
                    }
                    else {
                        dispatch(setTableData(activeTab, parsedResults));
                    }
                    updateSubmissionsPagination({ totalItems, page, limit });
                    setLoading([false, false, false]);
                    setError(false);
                })
                .catch((e) => {
                    console.error('Error: ', e);
                    setLoading([false, false, false]);
                    setError(true);
                });
        }
        const newPage = goToFirstPage ? 1 : publicationsPage;
        setLoading([false, false, true]);
        publicationsReq.current = getSubmissionPublicationDates(selectedFy, publicationsSort[0], publicationsSort[1], newPage, publicationsLimit, searchTerm);
        return publicationsReq.current.promise
            .then(({ data: { results, page_metadata: { total: totalItems, page, limit } } }) => {
                const parsedResults = results.map((d) => {
                    const row = Object.create(PublicationOverviewRow);
                    row.populate(parseInt(selectedFy, 10), d, federalTotals);
                    return row;
                });
                updatePublicationsPagination({ totalItems, page, limit });
                if (searchTerm) {
                    dispatch(setSearchResults(activeTab, parsedResults));
                }
                else {
                    dispatch(setTableData(activeTab, parsedResults));
                }
                setLoading([false, false, false]);
                setError(false);
                publicationsReq.current = null;
            })
            .catch((e) => {
                console.error('Error: ', e);
                setLoading([false, false, false]);
                setError(true);
                publicationsReq.current = null;
            });
    });

    const fetchTotals = useCallback(() => {
        if (selectedFy && selectedPeriod && !federalTotals.length) {
            if (totalsReq.current) totalsReq.current.cancel();
            if (submissionsReq.current) submissionsReq.current.cancel();
            setLoading([true, areSubmissionsLoading, arePublicationsLoading]);
            totalsReq.current = getTotalBudgetaryResources();
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

    useEffect(() => () => {
        if (publicationsReq.current) {
            console.info('canceling request on unmount');
            publicationsReq.current.cancel();
        }
        if (submissionsReq.current) {
            console.info('canceling request on unmount');
            submissionsReq.current.cancel();
        }
        if (totalsReq.current) {
            console.info('canceling request on unmount');
            totalsReq.current.cancel();
        }
    }, []);

    useEffect(() => {
        // FY or Period changes
        if (!federalTotals.length) {
            fetchTotals();
        }
        else if (selectedFy && selectedPeriod) {
            if (previousSearchTerm !== searchTerm) {
                fetchTableData(true);
            }
            else {
                fetchTableData();
            }
        }
    }, [
        federalTotals,
        activeTab,
        selectedFy,
        selectedPeriod,
        submissionsSort,
        submissionsPage,
        submissionsLimit,
        publicationsSort,
        publicationsPage,
        publicationsLimit,
        searchTerm
    ]);

    const renderDates = (results = []) => results
        .map(({
            name,
            code,
            percentageOfTotalFederalBudget,
            periods
        }) => ([
            (<DrilldownCell data={name} id={code} searchTerm={searchTerm} />),
            (<div className="generic-cell-content">{percentageOfTotalFederalBudget}</div>),
            ...parsePeriods(periods)
        ]));

    const renderDetails = (results = []) => results
        .map(({
            name: agencyName,
            code,
            publicationDate,
            discrepancyCount: GtasNotInFileA,
            obligationDifference,
            tasTotals,
            percentageOfTotalFederalBudget,
            unlinkedContractAwards,
            unlinkedAssistanceAwards
        }) => [
            (<DrilldownCell data={agencyName} id={code} searchTerm={searchTerm} />),
            (<div className="generic-cell-content">{percentageOfTotalFederalBudget}</div>),
            (<CellWithModal
                data={publicationDate}
                openModal={openModal}
                modalType="publicationDates"
                agencyData={{
                    agencyName,
                    agencyCode: code,
                    fiscalYear: selectedFy,
                    fiscalPeriod: selectedPeriod?.id
                }} />),
            (<CellWithModal
                data={GtasNotInFileA}
                openModal={openModal}
                modalType="missingAccountBalance"
                agencyData={{
                    agencyName,
                    gtasObligationTotal: tasTotals.gtas_obligation_total,
                    agencyCode: code,
                    fiscalYear: selectedFy,
                    fiscalPeriod: selectedPeriod?.id
                }} />),
            (<CellWithModal
                data={obligationDifference}
                openModal={openModal}
                modalType="reportingDifferences"
                agencyData={{
                    agencyName,
                    agencyCode: code,
                    fiscalYear: selectedFy,
                    fiscalPeriod: selectedPeriod?.id
                }} />),
            (<div className="generic-cell-content">{unlinkedContractAwards}</div>),
            (<div className="generic-cell-content">{unlinkedAssistanceAwards}</div>)
        ]);

    const handlePageChange = (page) => {
        if (activeTab === 'submissions') {
            updateSubmissionsPagination({ totalItems: totalSubmissionItems, page, limit: submissionsLimit });
        }
        else {
            updatePublicationsPagination({ totalItems: totalPublicationItems, page, limit: publicationsLimit });
        }
    };

    const handleLimitChange = (limit) => {
        if (activeTab === 'submissions') {
            updateSubmissionsPagination({ totalItems: totalSubmissionItems, page: submissionsPage, limit });
        }
        else {
            updatePublicationsPagination({ totalItems: totalPublicationItems, page: publicationsPage, limit });
        }
    };

    return (
        <>
            <div className="table-container" ref={tableRef} onScroll={handleScroll}>
                {activeTab === 'submissions' && (
                    <Table
                        rows={searchTerm ? renderDetails(submissionsSearchResults) : renderDetails(allSubmissions)}
                        classNames={`usda-table-w-grid ${verticalStickyClass} ${horizontalStickyClass} ${areSubmissionsLoading ? 'table-loading' : ''}`}
                        columns={agenciesTableColumns[activeTab]}
                        updateSort={handleUpdateSort}
                        currentSort={{
                            field: submissionsSort[0],
                            direction: submissionsSort[1]
                        }}
                        error={error}
                        loading={areSubmissionsLoading} />
                )}
                {activeTab === 'publications' && (
                    <Table
                        rows={searchTerm ? renderDates(publicationsSearchResults) : renderDates(allPublications)}
                        classNames={`usda-table-w-grid ${verticalStickyClass} ${horizontalStickyClass} ${arePublicationsLoading ? 'table-loading' : ''}`}
                        columns={agenciesTableColumns[activeTab]}
                        updateSort={handleUpdateSort}
                        currentSort={{
                            field: publicationsSort[0],
                            direction: publicationsSort[1]
                        }}
                        error={error}
                        loading={arePublicationsLoading} />
                )}
            </div>
            <Pagination
                resultsText
                limitSelector
                changeLimit={handleLimitChange}
                changePage={handlePageChange}
                currentPage={activeTab === 'submissions' ? submissionsPage : publicationsPage}
                pageSize={activeTab === 'submissions' ? submissionsLimit : publicationsLimit}
                totalItems={activeTab === 'submissions' ? totalSubmissionItems : totalPublicationItems} />
        </>
    );
};

AgenciesContainer.propTypes = propTypes;
export default AgenciesContainer;
