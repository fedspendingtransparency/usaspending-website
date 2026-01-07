/**
* CFDAViz.jsx
* Created by Jonathan Hill 03/17/20
**/

import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Picker } from 'data-transparency-ui';
import { cloneDeep } from 'lodash-es';
import ViewTypeButton from 'components/sharedComponents/buttons/ViewTypeButton';
import SingleCFDA from 'components/award/financialAssistance/SingleCFDA';
import CFDATree from './CFDATree';
import CFDATable from './CFDATable';
import CFDATreeTooltip from './CFDATreeTooltip';
import useEventListener from "../../../hooks/useEventListener";

const propTypes = {
    inFlight: PropTypes.bool,
    error: PropTypes.bool,
    page: PropTypes.number,
    limit: PropTypes.number,
    sort: PropTypes.string,
    order: PropTypes.string,
    total: PropTypes.number,
    allCFDAs: PropTypes.array,
    currentPageCFDAs: PropTypes.array,
    cfda: PropTypes.object,
    view: PropTypes.string,
    changePage: PropTypes.func,
    updateSort: PropTypes.func,
    changeView: PropTypes.func,
    onTableClick: PropTypes.func,
    onBackClick: PropTypes.func,
    onTreeClick: PropTypes.func,
    onDropdownClick: PropTypes.func
};

const sortFunction = (a, b) => parseFloat(a.cfdaNumber) - parseFloat(b.cfdaNumber);

const CFDAViz = ({
    inFlight,
    error,
    page,
    limit,
    sort,
    order,
    total,
    allCFDAs,
    currentPageCFDAs,
    cfda,
    view,
    changePage,
    updateSort,
    changeView,
    onTableClick,
    onBackClick,
    onTreeClick,
    onDropdownClick
}) => {
    const [width, setWidth] = useState(0);
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltip, setTooltip] = useState({
        x: 0,
        y: 0,
        cfdaNumber: 0,
        cfdaTitle: '',
        federalActionOblicationAmount: 0,
        percentOfTotal: 0,
        cfdaFederalAgency: ''
    });
    const widthRef = useRef(null);

    const measureWidth = () => {
        setWidth(widthRef.current.offsetWidth);
    };

    useEffect(() => {
        setWidth(widthRef.current.offsetWidth);
    }, []);

    useEventListener('resize', measureWidth);

    const showTooltipFunc = useCallback((position, data) => {
        setShowTooltip(true);
        if (data.id !== tooltip?.id) {
            setTooltip({ ...position, ...data });
        }
    }, [tooltip.id]);

    const hideTooltip = useCallback(() => {
        setShowTooltip(false);
    }, []);

    const tree = () => {
        if (view === 'tree') {
            return (
                <CFDATree
                    error={error}
                    inFlight={inFlight}
                    width={width}
                    data={allCFDAs}
                    showTooltip={showTooltipFunc}
                    hideTooltip={hideTooltip}
                    onTreeClick={onTreeClick} />
            );
        }
        return null;
    };

    const content = () => {
        if (view === 'table') {
            return (
                <CFDATable
                    page={page}
                    limit={limit}
                    sort={sort}
                    order={order}
                    total={total}
                    currentPageCFDAs={currentPageCFDAs}
                    changePage={changePage}
                    onTableClick={onTableClick}
                    updateSort={updateSort}
                    inFlight={inFlight}
                    error={error} />
            );
        }
        if (view === 'single' || !view) return (<SingleCFDA currentCfda={cfda} />);
        return null;
    };

    const title = () => {
        if (view === 'single' || !view) {
            if (allCFDAs.length > 1) {
                const options = cloneDeep(allCFDAs)
                    .sort((a, b) => parseFloat(a.cfdaNumber) - parseFloat(b.cfdaNumber))
                    .map((x) => ({
                        name: `${x.cfdaNumber} ${x.cfdaTitle}`,
                        onClick: onDropdownClick
                    }));
                return (
                    <Picker
                        options={options}
                        dropdownDirection="right"
                        backgroundColor="#215493"
                        selectedOption={`${cfda.cfdaNumber} ${cfda.cfdaTitle}`}
                        sortFn={sortFunction} />
                );
            }
            return (
                <h4 className="cfda-section-single-title">
                    {`${cfda.cfdaNumber}: ${cfda.cfdaTitle.toUpperCase()}`}
                </h4>
            );
        }
        return null;
    };

    const buttons = () => {
        const isTreeView = view === 'tree';
        if (view === 'tree' || view === 'table') {
            return (
                <div className="view-buttons-section">
                    <div className="view-buttons-section__text">
                        {`Click on a program ${isTreeView ? 'tile' : 'title'} to see its details.`}
                    </div>
                    <div className="view-buttons-section__buttons">
                        <ViewTypeButton
                            value="table"
                            label="Table"
                            icon="table"
                            changeView={changeView}
                            active={!isTreeView} />
                        <ViewTypeButton
                            value="tree"
                            label="Treemap"
                            icon="th-large"
                            changeView={changeView}
                            active={isTreeView} />
                    </div>
                </div>
            );
        }
        if (view === 'single' && allCFDAs.length) {
            return (
                <div className="view-buttons-section">
                    <button
                        onClick={onBackClick}
                        className="view-buttons-section__back award-viz__button">
                        <div className="view-buttons-section__back-icon">
                            <FontAwesomeIcon icon="arrow-circle-left" />
                        </div>
                        <div className="view-buttons-section__back-text">
                            Back to all CFDA programs
                        </div>
                    </button>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="cfda-section__viz">
            {showTooltip && (
                <CFDATreeTooltip
                    y={tooltip.y}
                    x={tooltip.x}
                    cfdaNumber={tooltip.cfdaNumber}
                    cfdaTitle={tooltip.cfdaTitle}
                    federalActionOblicationAmount={tooltip.federalActionOblicationAmount}
                    percentOfTotal={tooltip.percentOfTotal}
                    cfdaFederalAgency={tooltip.cfdaFederalAgency} />
            )}
            <div className="cfda-section-results">
                {buttons()}
                {title()}
                {content()}
                <div
                    className="cfda-section-vis__width-reference"
                    ref={widthRef} />
                {tree()}
            </div>
        </div>
    );
};

CFDAViz.propTypes = propTypes;
export default CFDAViz;
