/**
 * StatusOfFunds.jsx
 * Created by Lizzie Salita 10/27/21
 */

import React, { useCallback, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch, connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { tabletScreen } from 'dataMapping/shared/mobileBreakpoints';
import { throttle } from "lodash";

import { FlexGridRow, FlexGridCol, Pagination, LoadingMessage, ErrorMessage } from 'data-transparency-ui';
import { setDataThroughDates,
    setSelectedSubcomponent,
    setSelectedFederalAccount,
    setSelectedTas,
    setSelectedPrgActivityOrObjectClass,
    setCurrentLevelNameAndId,
    setLevel4ApiResponse,
    setIsSofChartLoaded }
    from "redux/actions/agency/agencyActions";
import { fetchSubcomponentsList, fetchFederalAccountsList, fetchTasList, fetchProgramActivityByTas, fetchObjectClassByTas } from 'apis/agency';
import { parseRows, getLevel5Data } from 'helpers/agency/StatusOfFundsVizHelper';
import { useStateWithPrevious } from 'helpers';
import { useLatestAccountData } from 'containers/account/WithLatestFy';
import Note from 'components/sharedComponents/Note';

import DrilldownSidebar from './DrilldownSidebar';
import VisualizationSection from './VisualizationSection';
import IntroSection from './IntroSection';

const propTypes = {
    fy: PropTypes.string,
    onChartLoaded: PropTypes.func.isRequired
};

const StatusOfFunds = ({ fy, onChartLoaded }) => {
    const dispatch = useDispatch();
    const [level, setLevel] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [resetPageChange, setResetPageChange] = useState(false);
    const [prevPage, currentPage, changeCurrentPage] = useStateWithPrevious(1);
    const [pageSize, changePageSize] = useStateWithPrevious(10);
    const [totalItems, setTotalItems] = useState(0);
    const request = useRef(null);
    const [results, setResults] = useState([]);
    const { overview } = useSelector((state) => state.agency);
    const [toggle, setOnToggle] = useState(false);
    const [windowWidth, setWindowWidth] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < tabletScreen);
    const [viewType, setViewType] = useState(isMobile ? 'table' : 'chart');
    const [dropdownSelection, setDropdownSelection] = useState('Program Activity');

    // these are used for goBack fn and when changing pages in results
    const selectedSubComponentNameAndId = {
        id: useSelector((state) => state.agency.selectedSubcomponent?.id),
        name: useSelector((state) => state.agency.selectedSubcomponent?.name)
    };
    const selectedFederalAccountNameId = {
        id: useSelector((state) => state.agency.selectedFederalAccount?.id),
        name: useSelector((state) => state.agency.selectedFederalAccount?.name)
    };
    const selectedTasNameAndId = {
        id: useSelector((state) => state.agency.selectedTas?.id),
        name: useSelector((state) => state.agency.selectedTas?.name)
    };

    // this one is used to get level 5 data, which is sent as children array of level 4 data
    const level4ApiResponse = {
        res: useSelector((state) => state.agency.level4ApiResponse)
    };

    const maxLevel = 4;

    // eslint-disable-next-line eqeqeq
    let statusDataThroughDate = useLatestAccountData()[1].toArray().filter((i) => i.submission_fiscal_year == fy)[0].period_end_date;

    const paginatedTasList = (list) => {
        const cp = currentPage || 1;
        const startIndex = 10 * (cp - 1);
        const endIndex = startIndex + 10;
        list.slice(startIndex, endIndex);
        return list.slice(startIndex, endIndex);
    };

    useEffect(() => {
        const handleResize = throttle(() => {
            const newWidth = window.innerWidth;
            if (windowWidth !== newWidth) {
                setWindowWidth(newWidth);
                setIsMobile(newWidth < tabletScreen);
                setViewType(isMobile ? 'table' : viewType);
            }
        }, 50);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isMobile, viewType, windowWidth]);

    const fetchAgencySubcomponents = useCallback(() => {
        if (request.current) {
            request.current.cancel();
        }
        if (error) {
            setError(false);
        }
        if (!loading) {
            setLoading(true);
        }
        const params = {
            limit: pageSize,
            page: currentPage
        };
        request.current = fetchSubcomponentsList(overview.toptierCode, fy, params.page);
        const agencySubcomponentsListRequest = request.current;
        agencySubcomponentsListRequest.promise
            .then((res) => {
                const parsedData = parseRows(res.data.results);
                const nameAndId = {
                    name: `${overview.name}`,
                    id: `${overview.id}`
                };
                dispatch(setCurrentLevelNameAndId(nameAndId));
                setResults(parsedData);
                setTotalItems(res.data.page_metadata.total);

                if (parsedData.length === 0) {
                    statusDataThroughDate = 'no data';
                }
                dispatch(setDataThroughDates({
                    statusDataThroughDate
                }));

                setLoading(false);
            }).catch((err) => {
                setError(true);
                setLoading(false);
                console.error(err);
            });
    });

    const fetchFederalAccounts = useCallback((agencyData) => {
        if (request.current) {
            request.current.cancel();
        }
        if (error) {
            setError(false);
        }
        if (!loading) {
            setLoading(true);
        }
        const params = {
            limit: pageSize,
            page: currentPage
        };
        request.current = fetchFederalAccountsList(overview.toptierCode, agencyData.id, fy, params.page);
        const federalAccountsRequest = request.current;
        federalAccountsRequest.promise
            .then((res) => {
                const parsedData = parseRows(res.data.results);
                const nameAndId = {
                    name: `${agencyData.name}`,
                    id: `${agencyData.id}`
                };
                dispatch(setCurrentLevelNameAndId(nameAndId));
                setLevel(1);
                setResults(parsedData);
                setTotalItems(res.data.page_metadata.total);
                setLoading(false);
            }).catch((err) => {
                setError(true);
                setLoading(false);
                console.error(err);
            });
    });

    const fetchTas = useCallback((federalAccountData) => {
        if (request.current) {
            request.current.cancel();
        }
        if (error) {
            setError(false);
        }
        if (!loading) {
            setLoading(true);
        }

        request.current = fetchTasList(federalAccountData.id, fy);
        const tasRequest = request.current;
        tasRequest.promise
            .then((res) => {
                const parsedData = parseRows(res.data.children);
                const nameAndId = {
                    name: `${federalAccountData.id}: ${federalAccountData.name}`,
                    id: `${federalAccountData.id}`
                };
                dispatch(setCurrentLevelNameAndId(nameAndId));
                setLevel(2);
                setResults(paginatedTasList(parsedData));

                // Hack to make the status of funds chart show the labels per the mock
                // eslint-disable-next-line no-param-reassign,no-return-assign
                parsedData.map((item) => item.name = item.id);

                setTotalItems(parsedData.length);
                setLoading(false);
            }).catch((err) => {
                setError(true);
                setLoading(false);
                console.error(err);
            });
    });

    const fetchDataByTas = useCallback((tas, objectClassFlag) => {
        if (request.current) {
            request.current.cancel();
        }
        if (error) {
            setError(false);
        }
        if (!loading) {
            setLoading(true);
        }
        const params = {
            limit: pageSize,
            page: currentPage
        };

        if (objectClassFlag) {
            request.current = fetchObjectClassByTas(tas.id, fy, params.page);
        }
        else {
            request.current = fetchProgramActivityByTas(tas.id, fy, params.page);
        }
        const programActivityRequest = request.current;
        programActivityRequest.promise
            .then((res) => {
                // store the api res in redux so that when the user clicks one of the bars you can use the id
                // from that click to get the children of that id to set as results for level 5
                dispatch(setLevel4ApiResponse(res.data.results));
                const parsedData = parseRows(res.data.results, tas.id);
                const nameAndId = {
                    name: `${tas.name}`,
                    id: `${tas.id}`
                };
                dispatch(setCurrentLevelNameAndId(nameAndId));
                setLevel(3);
                setResults(parsedData);
                setTotalItems(res.data.page_metadata.total);
                setLoading(false);
            }).catch((err) => {
                setError(true);
                setLoading(false);
                console.error(err);
            });
    });

    const fetchLevel5Data = (prgActivityOrObjClass) => {
        const newData = getLevel5Data(prgActivityOrObjClass.name, level4ApiResponse);
        const parsedData = parseRows(newData, prgActivityOrObjClass.id);
        const nameAndId = {
            name: `${prgActivityOrObjClass.name}`,
            id: `${prgActivityOrObjClass.id}`
        };
        dispatch(setCurrentLevelNameAndId(nameAndId));
        setLevel(4);
        setResults(parsedData);
        setTotalItems(newData.length);
    };

    useEffect(() => {
        if (resetPageChange) {
            setResetPageChange(false);
        }
        else {
            if (prevPage !== currentPage && level === 0) {
                fetchAgencySubcomponents();
            }
            if (prevPage !== currentPage && level === 1) {
                fetchFederalAccounts(selectedSubComponentNameAndId);
            }
            if (prevPage !== currentPage && level === 2) {
                fetchTas(selectedFederalAccountNameId);
            }
            if (prevPage !== currentPage && level === 3) {
                fetchDataByTas(selectedTasNameAndId, dropdownSelection === 'Object Class');
            }
            if (prevPage !== currentPage && level === 4) {
                fetchLevel5Data(selectedTasNameAndId);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    useEffect(() => {
        if (resetPageChange) {
            setLoading(true);
            if (currentPage === 1) {
                setResetPageChange(false);
            }
            else {
                changeCurrentPage(1);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resetPageChange]);

    useEffect(() => {
        if (fy && overview.toptierCode) {
            fetchAgencySubcomponents();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fy, overview.toptierCode]);

    useEffect(() => {
        if (!loading && !error) {
            onChartLoaded(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error, loading]);

    const setDrilldownLevel = (selectedLevel, parentData, objectClassFlag) => {
        if (selectedLevel === 1) {
            fetchFederalAccounts(parentData);
            dispatch(setSelectedSubcomponent(parentData));
        }

        if (selectedLevel === 2) {
            fetchTas(parentData);
            dispatch(setSelectedFederalAccount(parentData));
        }

        if (selectedLevel === 3) {
            fetchDataByTas(parentData, objectClassFlag);
            dispatch(setSelectedTas(parentData));
        }

        if (selectedLevel === 4) {
            fetchLevel5Data(parentData);
            dispatch(setSelectedPrgActivityOrObjectClass(parentData));
            return;
        }

        setResetPageChange(true);
    };

    const goBack = () => {
        if (overview.toptierCode) {
            if (level === 1) {
                setLevel(0);
                if (currentPage === 1) {
                    fetchAgencySubcomponents();
                }
            }
            if (level === 2) {
                setLevel(1);
                if (currentPage === 1) {
                    fetchFederalAccounts(selectedSubComponentNameAndId);
                }
            }
            if (level === 3) {
                setLevel(2);
                setDropdownSelection('Program Activity');
                if (currentPage === 1) {
                    fetchTas(selectedFederalAccountNameId);
                }
            }
            if (level === 4) {
                setLevel(3);
                if (currentPage === 1) {
                    fetchDataByTas(selectedTasNameAndId, dropdownSelection === 'Object Class');
                }
            }

            // this is a convoluted way to handle back
            // if the currentPage is anything other than 1, we change it to 1 here
            // which kicks of a useEffect which just calls the fetch fns that we're calling above if currentLevel is 1
            // why don't we just call the fetch fn here no matter what currentPage is?
            // OR just set currentPage to 1 after setLevel and not call the apis here
            // i think we're calling the apis twice in these situations
            changeCurrentPage(1);
        }
    };

    const onToggle = () => {
        setOnToggle(!toggle);
    };

    const onKeyToggle = (event) => {
        if (event.key === 'Enter') {
            setOnToggle(!toggle);
        }
    };

    return (
        <div className="body__content status-of-funds">
            <IntroSection name={overview.name} fy={fy} totalItems={totalItems} />
            <FlexGridRow hasGutter>
                <FlexGridCol className="status-of-funds__drilldown-sidebar" desktop={3}>
                    <DrilldownSidebar
                        toggle={toggle}
                        level={level}
                        goBack={goBack}
                        dropdownSelection={dropdownSelection}
                        fy={fy} />
                </FlexGridCol>
                <FlexGridCol className="status-of-funds__visualization" desktop={9}>
                    {level > 0 && !isMobile ?
                        <button title="Go up a level" className="drilldown-back-button" onClick={goBack}>
                            <FontAwesomeIcon icon="arrow-left" />
                            &nbsp;&nbsp;Back
                        </button> : <></>}
                    {loading && <LoadingMessage />}
                    {error && <ErrorMessage />}
                    { !loading && !error &&
                        <>
                            <VisualizationSection
                                toggle={toggle}
                                onToggle={onToggle}
                                onKeyToggle={onKeyToggle}
                                level={level}
                                setDrilldownLevel={setDrilldownLevel}
                                fy={fy}
                                results={results}
                                isMobile={isMobile}
                                viewType={viewType}
                                setViewType={setViewType}
                                maxLevel={maxLevel}
                                dropdownSelection={dropdownSelection}
                                setDropdownSelection={setDropdownSelection} />
                            <Pagination
                                currentPage={currentPage}
                                changePage={changeCurrentPage}
                                changeLimit={changePageSize}
                                resultsText
                                pageSize={10}
                                totalItems={totalItems} />
                        </>
                    }
                </FlexGridCol>
            </FlexGridRow>
            <Note message={
                (<>The agency sub-components displayed in this section were
                 added to provide greater transparency into the organization of agencies’ account data.
                 These sub-components are based on the Bureau associated with a federal account in OMB’s
                 Master Accounts Title file. Sub-components are identified using Agency Identifier (AID)
                 and MAIN Account codes. Where possible, Department of Defense (DoD) sub-components
                 correspond to the branches of the Armed Forces and accounts for the agency are attributed
                 to the appropriate branch/sub-component based on the Agency Codes found at the bottom of{ ' ' }
                <a
                    href="https://www.whitehouse.gov/wp-content/uploads/2018/06/app_c.pdf"
                    target="_blank"
                    rel="noopener noreferrer">
                        OMB Circular A-11 Appendix C
                </a>.</>)} />
        </div>
    );
};

StatusOfFunds.propTypes = propTypes;

export default connect(
    (state) => ({
        isChartLoaded: state.agency.isStatusOfFundsChartLoaded
    }),
    (dispatch) => ({
        onChartLoaded: (bool) => dispatch(setIsSofChartLoaded(bool))
    })
)(StatusOfFunds);
