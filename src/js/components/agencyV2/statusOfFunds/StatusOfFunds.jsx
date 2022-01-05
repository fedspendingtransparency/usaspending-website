/**
 * StatusOfFunds.jsx
 * Created by Lizzie Salita 10/27/21
 */

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { FlexGridRow, FlexGridCol, Pagination, LoadingMessage } from 'data-transparency-ui';
import { setSelectedSubcomponent, setAgencySubcomponents, resetAgencySubcomponents } from 'redux/actions/agencyV2/agencyV2Actions';
import { fetchSubcomponentsList } from 'apis/agencyV2';
import { parseRows } from 'helpers/agencyV2/StatusOfFundsVizHelper';
import { useStateWithPrevious } from 'helpers';
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
    const [prevPage, currentPage, changeCurrentPage] = useStateWithPrevious(1);
    const [prevPageSize, pageSize, changePageSize] = useStateWithPrevious(10);
    const [totalItems, setTotalItems] = useState(0);
    const request = useRef(null);
    const [results, setResults] = useState([]);
    const { overview, selectedSubcomponent } = useSelector((state) => state.agencyV2);

    const updateResults = (resData) => {
        setResults(resData);
    };

    useEffect(() => {
        if (request.current) {
            request.current.cancel();
        }
        dispatch(resetAgencySubcomponents());
    }, []);

    const fetchAgencySubcomponents = async () => {
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
                setLoading(false);
            }).catch((err) => {
                setError(true);
                setLoading(false);
                console.error(err);
            });
    };

    useEffect(() => {
        const hasParamChanged = (
            prevPage !== currentPage || prevPageSize !== pageSize
        );
        if (hasParamChanged) {
            fetchAgencySubcomponents();
        }
    }, [currentPage]);

    useEffect(() => {
        if (fy && overview.toptierCode) {
            fetchAgencySubcomponents();
        }
    }, [fy, overview.toptierCode]);

    const onClick = (selectedLevel, data) => {
        // TODO DEV-8052 move this logic to the visualization
        const subcomponent = Object.create(BaseStatusOfFundsLevel);
        subcomponent.populate(data);
        dispatch(setSelectedSubcomponent(subcomponent));
        setLevel(selectedLevel);
    };
    const goBack = () => {
        setLevel(0);
        fetchAgencySubcomponents();
    };
    return (
        <div className="body__content status-of-funds">
            <IntroSection name={overview.name} fy={fy} totalItems={totalItems} />
            <FlexGridRow hasGutter>
                <FlexGridCol className="status-of-funds__drilldown-sidebar" desktop={3}>
                    <DrilldownSidebar
                        level={level}
                        setLevel={onClick}
                        agencyName={overview.name}
                        fy={fy}
                        selectedSubcomponent={selectedSubcomponent} />
                </FlexGridCol>
                <FlexGridCol className="status-of-funds__visualization" desktop={9}>
                    {level === 1 ?
                        <button onClick={goBack}>
                            Back
                        </button> : <></>}
                    { !loading ? <VisualizationSection loading={loading} setLoading={setLoading} level={level} setLevel={onClick} selectedSubcomponent={selectedSubcomponent} agencyId={overview.toptierCode} agencyName={overview.name} fy={fy} results={results} updateResults={updateResults} /> : <LoadingMessage /> }
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
                    added to provide greater transparency into the organization of agencies’
                    account data. These sub-components are based on the Bureau associated
                    with a federal account in OMB’s Master Accounts Title file.
                    Sub-components are identified using Agency Identifier (AID) codes.
                    Department of Defense (DoD) sub-components
                    correspond to the branches of the Armed Forces and accounts for the
                    agency are attributed to the appropriate branch/sub-component based on
                    the Agency Codes found at the bottom of{ ' ' }
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
