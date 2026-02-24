/**
 * ExplorerVisualization.jsx
 * Created by Kevin Li 8/17/17
 */

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import Analytics from 'helpers/analytics/Analytics';
import UnreportedErrorScreen from 'components/explorer/detail/UnreportedErrorScreen';
import ExplorerTable from 'containers/explorer/detail/table/ExplorerTable';
import Note, { dodNote } from 'components/sharedComponents/Note';
import BreakdownDropdown from './toolbar/BreakdownDropdown';
import ExplorerTreemap from './treemap/ExplorerTreemap';

const propTypes = {
    isRoot: PropTypes.bool,
    isLoading: PropTypes.bool,
    root: PropTypes.string,
    active: PropTypes.object,
    trail: PropTypes.array,
    data: PropTypes.object,
    total: PropTypes.number,
    goDeeper: PropTypes.func,
    changeSubdivisionType: PropTypes.func,
    showTooltip: PropTypes.func,
    hideTooltip: PropTypes.func,
    goToUnreported: PropTypes.func
};

const ExplorerVisualization = ({
    isRoot,
    isLoading,
    root,
    active,
    trail,
    data,
    total,
    goDeeper,
    changeSubdivisionType,
    showTooltip,
    hideTooltip,
    goToUnreported
}) => {
    const [width, setWidth] = useState(0);
    const [viewType, setViewType] = useState('treemap');
    const widthRef = useRef(null);

    const measureWidth = () => setWidth(widthRef.current.offsetWidth);

    const changeView = (type) => {
        setViewType(type);

        Analytics.event({
            event: 'Spending Explorer - Visualization Type',
            category: 'Spending Explorer - Visualization Type',
            action: type
        });
    };

    const loadingTreemapClass = isLoading ? '' : 'explorer-vis__treemap-transition__loading';
    const loadingTableClass = isLoading ? '' : 'explorer-vis__table-transition__loading';

    let visualization = (
        <div className={`treemap-loading-transition ${loadingTreemapClass}`}>
            <ExplorerTreemap
                activeSubdivision={active.subdivision}
                isLoading={isLoading}
                width={width}
                data={data}
                total={total}
                goDeeper={goDeeper}
                showTooltip={showTooltip}
                hideTooltip={hideTooltip}
                goToUnreported={goToUnreported}
                changeView={changeView} />
        </div>
    );
    if (viewType === 'table') {
        visualization = (
            <div className={`explorer-vis__table-transition ${loadingTableClass}`}>
                <ExplorerTable
                    isLoading={isLoading}
                    results={data}
                    total={total}
                    goDeeper={goDeeper}
                    goToUnreported={goToUnreported} />
            </div>
        );
    }

    let dropDown;
    let disclaimer;

    if (data.get(0).name === 'Unreported Data' && data.count() === 1) {
        visualization = (<div><UnreportedErrorScreen /></div>);
    }
    else {
        dropDown = (
            <div className="explorer-vis__toolbar">
                <BreakdownDropdown
                    root={root}
                    active={active}
                    trail={trail}
                    isRoot={isRoot}
                    changeSubdivisionType={changeSubdivisionType}
                    viewType={viewType}
                    changeView={changeView} />
            </div>);

        disclaimer = (
            <div className="explorer-vis__disclaimer">
                <p>All dollar amounts shown here represent agency reported obligated amounts</p>
                <Note
                    title="Unreported Data*:"
                    message={(
                        <>
                            Unreported amounts are calculated using the difference in the total obligated amount from the&nbsp;
                            <a
                                className="usa-bold-link"
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://portal.max.gov/portal/document/SF133/Budget/FACTS%20II%20-%20SF%20133%20Report%20on%20Budget%20Execution%20and%20Budgetary%20Resources.html">
                                Report on Budget Execution and Budgetary Resources
                            </a>
                            &nbsp;(excluding financing accounts) and the total obligated amount reported by agencies to USAspending.gov in 'Account Breakdown by Program Activity &amp; Object Class' data (also called 'File B' data).
                        </>
                    )} />
                <Note message={dodNote} />
            </div>
        );
    }

    useEffect(() => {
        measureWidth();
        window.addEventListener('resize', measureWidth);

        Analytics.event({
            event: 'Spending Explorer - Visualization Type',
            category: 'Spending Explorer - Visualization Type',
            action: viewType
        });

        return () => window.removeEventListener('resize', measureWidth);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="explorer-vis">
            {dropDown}
            <div
                className="explorer-vis__width-reference"
                ref={widthRef} />
            {visualization}
            {disclaimer}
        </div>
    );
};

ExplorerVisualization.propTypes = propTypes;
export default ExplorerVisualization;
