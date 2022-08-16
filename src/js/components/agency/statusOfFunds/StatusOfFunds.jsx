/**
 * StatusOfFunds.jsx
 * Created by Lizzie Salita 10/27/21
 */

import React, { useCallback, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { tabletScreen } from 'dataMapping/shared/mobileBreakpoints';
import { throttle } from "lodash";

import { FlexGridRow, FlexGridCol, Pagination, LoadingMessage } from 'data-transparency-ui';
import {
    setSelectedSubcomponent,
    setAgencySubcomponents,
    setDataThroughDates,
    resetAgencySubcomponents,
    setFederalAccountsList,
    resetFederalAccountsList
} from "redux/actions/agency/agencyActions";
import { fetchSubcomponentsList, fetchFederalAccountsList } from 'apis/agency';
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

export const levels = ['Sub-Component', 'Federal Account'];

const StatusOfFunds = ({ fy }) => {
    const dispatch = useDispatch();
    const [level, setLevel] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [resetPageChange, setResetPageChange] = useState(false);
    const [subcomponent, setSubcomponent] = useState({});
    const [prevPage, currentPage, changeCurrentPage] = useStateWithPrevious(1);
    const [pageSize, changePageSize] = useStateWithPrevious(10);
    const [totalItems, setTotalItems] = useState(0);
    const request = useRef(null);
    const [results, setResults] = useState([]);
    const { overview, selectedSubcomponent } = useSelector((state) => state.agency);
    const [toggle, setOnToggle] = useState(false);
    const [windowWidth, setWindowWidth] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < tabletScreen);
    const [viewType, setViewType] = useState(isMobile ? 'table' : 'chart');

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

    useEffect(() => {
        if (request.current) {
            request.current.cancel();
        }
        dispatch(resetAgencySubcomponents());
        dispatch(resetFederalAccountsList());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // eslint-disable-next-line eqeqeq
    let statusDataThroughDate = useLatestAccountData()[1].toArray().filter((i) => i.submission_fiscal_year == fy)[0].period_end_date;
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
                dispatch(setAgencySubcomponents(parsedData));
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
                setLevel(1, totalsData);
                setResults(parsedData);
                dispatch(setFederalAccountsList(parsedData));
                setTotalItems(res.data.page_metadata.total);
                setLoading(false);
            }).catch((err) => {
                setError(true);
                setLoading(false);
                console.error(err);
            });
    });

    useEffect(() => {
        if (Object.keys(subcomponent).length !== 0) {
            fetchFederalAccounts(subcomponent);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [subcomponent]);

    useEffect(() => {
        if (resetPageChange) {
            setResetPageChange(false);
        }
        else {
            if (prevPage !== currentPage && level === 0) {
                fetchAgencySubcomponents();
            }
            if (prevPage !== currentPage && level === 1) {
                fetchFederalAccounts(subcomponent);
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

    const onClick = (selectedLevel, data) => {
        // reset to page 1 on drilldown
        setResetPageChange(true);
        const subcomponentTotalData = Object.create(BaseStatusOfFundsLevel);
        subcomponentTotalData.populate(data);
        dispatch(setSelectedSubcomponent(subcomponentTotalData));
        setSubcomponent(subcomponentTotalData);
    };

    const goBack = () => {
        if (overview.toptierCode) {
            setLevel(0);
            fetchAgencySubcomponents();
            if (currentPage === 1) {
                setResetPageChange(false);
            }
            else {
                changeCurrentPage(1);
            }
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
                        agencyName={overview.name}
                        fy={fy}
                        selectedSubcomponent={selectedSubcomponent} />
                </FlexGridCol>
                <FlexGridCol className="status-of-funds__visualization" desktop={9}>
                    {level === 1 && !isMobile ?
                        <button title="Go up a level" className="drilldown-back-button" onClick={goBack}>
                            <FontAwesomeIcon icon="arrow-left" />
                            &nbsp;&nbsp;Back
                        </button> : <></>}
                    { !loading ?
                        <VisualizationSection
                            toggle={toggle}
                            onToggle={onToggle}
                            onKeyToggle={onKeyToggle}
                            fetchFederalAccounts={fetchFederalAccounts}
                            totalItems={totalItems}
                            setTotalItems={setTotalItems}
                            loading={loading}
                            setLoading={setLoading}
                            level={level}
                            setLevel={onClick}
                            selectedSubcomponent={selectedSubcomponent}
                            agencyId={overview.toptierCode}
                            agencyName={overview.name}
                            fy={fy}
                            results={results}
                            isMobile={isMobile}
                            viewType={viewType}
                            setViewType={setViewType} />
                        :
                        <LoadingMessage /> }
                    <Pagination
                        currentPage={currentPage}
                        changePage={changeCurrentPage}
                        changeLimit={changePageSize}
                        resultsText
                        pageSize={10}
                        totalItems={totalItems} />
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
