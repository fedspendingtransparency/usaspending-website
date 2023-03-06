
/**
 * StatusOfFunds.jsx
 * Created by Lizzie Salita 10/27/21
 */

import React, { useCallback, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import GlobalConstants from "GlobalConstants";
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { tabletScreen } from 'dataMapping/shared/mobileBreakpoints';
import { throttle } from "lodash";

import { FlexGridRow, FlexGridCol, Pagination, LoadingMessage, ErrorMessage } from 'data-transparency-ui';
import { setDataThroughDates } from "redux/actions/agency/agencyActions";
import { fetchSubcomponentsList, fetchFederalAccountsList, fetchTasList, fetchProgramActivityList } from 'apis/agency';
import { parseRows } from 'helpers/agency/StatusOfFundsVizHelper';
import { useStateWithPrevious } from 'helpers';
import { useLatestAccountData } from 'containers/account/WithLatestFy';
import BaseStatusOfFundsLevel from 'models/v2/agency/BaseStatusOfFundsLevel';
import Note from 'components/sharedComponents/Note';

import DrilldownSidebar from './DrilldownSidebar';
import VisualizationSection from './VisualizationSection';
import IntroSection from './IntroSection';

const propTypes = {
    fy: PropTypes.string
};

export const levels = ['Sub-Component', 'Federal Account', 'Treasury Account Symbol', 'Program Activity'];

const StatusOfFunds = ({ fy }) => {
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
    const [goBackEngaged, setGoBackEngaged] = useState(false);

    // TODO this should probably go in redux, maybe?
    const [selectedSubcomponent, setSelectedSubcomponent] = useState();
    const [selectedFederalAccount, setSelectedFederalAccount] = useState();
    const [selectedTas, setSelectedTas] = useState();
    const [drilldownSelection, setDrilldownSelection] = useState({});
    const [selectedDrilldownList, setSelectedDrilldownList] = useState([]);

    const selectedLevelsArray = [];
    // todo remove isQat and change to maxLevel = 3 after api work for program activity is done
    const isQAT = GlobalConstants.QAT;
    const maxLevel = isQAT ? 3 : 2;
    // TODO not sure if this is necessary
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
                const totalsData = {
                    name: `${agencyData.name}`,
                    id: `${agencyData.id}`,
                    total_budgetary_resources: `${agencyData.budgetaryResources}`,
                    total_obligations: `${agencyData.obligations}`
                };
                setLevel(1);
                setResults(parsedData);
                setTotalItems(res.data.page_metadata.total);
                setDrilldownSelection(totalsData);
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
                const totalsData = {
                    name: `${federalAccountData.id}: ${federalAccountData.name}`,
                    id: `${federalAccountData.id}`,
                    total_budgetary_resources: `${federalAccountData.budgetaryResources}`,
                    total_obligations: `${federalAccountData.obligations}`
                };
                setLevel(2);
                // Hack to make the status of funds chart show the labels per the mock
                // eslint-disable-next-line no-param-reassign,no-return-assign
                parsedData.map((item) => item.name = item.id);
                setResults(paginatedTasList(parsedData));
                setSelectedFederalAccount(federalAccountData);
                setDrilldownSelection(totalsData);
                setTotalItems(parsedData.length);
                setLoading(false);
            }).catch((err) => {
                setError(true);
                setLoading(false);
                console.error(err);
            });
    });

    const fetchProgramActivity = useCallback((tasData) => {
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

        request.current = fetchProgramActivityList(overview.toptierCode, fy, params.page);
        const programActivityRequest = request.current;
        programActivityRequest.promise
            .then((res) => {
                const parsedData = parseRows(res.data.results);
                const totalsData = {
                    // currently, in the data the id and name are the same string
                    // which is an alphanumeric code, not a 'name'
                    name: `${tasData.name}`,
                    id: `${tasData.id}`,
                    total_budgetary_resources: `${tasData._budgetaryResources}`,
                    total_obligations: `${tasData._obligations}`
                };

                setLevel(3);
                setResults(parsedData);
                setSelectedTas(tasData);
                setTotalItems(res.data.page_metadata.total);
                setDrilldownSelection(totalsData);
                setLoading(false);
            }).catch((err) => {
                setError(true);
                setLoading(false);
                console.error(err);
            });
    });

    useEffect(() => {
        if (resetPageChange) {
            setResetPageChange(false);
        }
        else {
            if (prevPage !== currentPage && level === 0) {
                fetchAgencySubcomponents();
            }
            if (prevPage !== currentPage && level === 1) {
                fetchFederalAccounts(selectedSubcomponent);
            }
            if (prevPage !== currentPage && level === 2) {
                fetchTas(selectedFederalAccount);
            }
            if (prevPage !== currentPage && level === 3) {
                fetchProgramActivity(selectedTas);
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

    const setDrilldownLevel = (selectedLevel, parentData) => {
        if (selectedLevel === 1) {
            fetchFederalAccounts(parentData);
            setSelectedSubcomponent(parentData);
        }

        if (selectedLevel === 2) {
            fetchTas(parentData);
            selectedLevelsArray.push(selectedSubcomponent);
        }

        if (selectedLevel === 3) {
            fetchProgramActivity(parentData);
            selectedLevelsArray.push(selectedSubcomponent);
            selectedLevelsArray.push(drilldownSelection);
        }

        selectedLevelsArray.push(parentData);

        setResetPageChange(true);
        const subcomponentTotalData = Object.create(BaseStatusOfFundsLevel);
        subcomponentTotalData.populate(parentData);
        setSelectedDrilldownList(selectedLevelsArray);
        setResults(subcomponentTotalData);
        setGoBackEngaged(false);
    };

    const goBack = () => {
        setGoBackEngaged(true);
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
                    fetchFederalAccounts(selectedSubcomponent);
                }
            }
            if (level === 3) {
                setLevel(2);
                if (currentPage === 1) {
                    fetchTas(selectedFederalAccount);
                }
            }

            changeCurrentPage(1);
        }
    };

    const onToggle = () => {
        setOnToggle(!toggle);
    };

    const onKeyToggle = (event) => {
        if (event.keyCode === 13) {
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
                        goBackEngaged={goBackEngaged}
                        agencyName={overview.name}
                        fy={fy}
                        selectedLevelDataList={selectedDrilldownList} />
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
                                selectedLevelData={drilldownSelection}
                                agencyName={overview.name}
                                fy={fy}
                                results={results}
                                isMobile={isMobile}
                                viewType={viewType}
                                setViewType={setViewType}
                                maxLevel={maxLevel} />
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
export default StatusOfFunds;
