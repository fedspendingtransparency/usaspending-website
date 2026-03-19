/**
 * DetailContent.jsx
 * Created by Kevin Li 8/16/17
 */

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import LoadingSpinner from 'components/sharedComponents/LoadingSpinner';
import RootHeader from './header/RootHeader';
import DetailHeader from './header/DetailHeader';
import ExplorerVisualization from './visualization/ExplorerVisualization';
import FakeScreens from './FakeScreens';
import NoAwardsScreen from './NoAwardsScreen';

const propTypes = {
    isRoot: PropTypes.bool,
    isLoading: PropTypes.bool,
    isTruncated: PropTypes.bool,
    data: PropTypes.object,
    root: PropTypes.string,
    fy: PropTypes.string,
    lastUpdate: PropTypes.string,
    total: PropTypes.number,
    active: PropTypes.object,
    trail: PropTypes.array,
    transitionSteps: PropTypes.number,
    transition: PropTypes.string,
    goDeeper: PropTypes.func,
    changeSubdivisionType: PropTypes.func,
    showTooltip: PropTypes.func,
    hideTooltip: PropTypes.func,
    rewindToFilter: PropTypes.func,
    goToUnreported: PropTypes.func
};

const DetailContent = ({
    isRoot,
    isLoading,
    isTruncated,
    data,
    root,
    fy,
    lastUpdate,
    total,
    active,
    trail,
    transitionSteps,
    transition,
    goDeeper,
    changeSubdivisionType,
    showTooltip,
    hideTooltip,
    rewindToFilter,
    goToUnreported
}) => {
    const [showFakes, setShowFakes] = useState(false);
    const [fakeDirection, setFakeDirection] = useState('below');
    const divRef = useRef(null);
    const scrollDestinationRef = useRef(null);

    const startTransition = (steps) => {
        // measure how tall the wrapper div is; we'll use this as the height of each screen
        const wrapperHeight = divRef.current.offsetHeight;

        const absoluteSteps = Math.abs(steps);
        // we scroll upwards if the explorer is drilling down, and we scroll downwards if the
        // explorer is drilling up
        const direction = (steps / absoluteSteps) * -1;

        // the end point of the scroll operation is the height of each screen times the number
        // of screens we'll be passing through
        scrollDestinationRef.current = (direction * absoluteSteps * wrapperHeight);

        if (absoluteSteps > 1) {
            const stepDirections = steps < 0 ? 'above' : 'below';

            setFakeDirection(stepDirections);
            setShowFakes(true);
        }
        else {
            // we don't have any fake screens, so just go straight to DOM animations
            divRef.current.classList.add('detail-animate');
            divRef.current.style.transform = `translate(0px,${scrollDestinationRef.current}px)`;
        }

        // the detail-animate CSS class animates transform changes over 250ms, so we'll schedule
        // the next event for 250ms later
        setTimeout(() => {
            // the first "exit" animation has completed, now remove the animation class so
            // we can make DOM changes immediately without animations
            divRef.current.classList.remove('detail-animate');
            // position the screen below the bottom of the visible area
            // but, if we are scrolling downwards (negative step count), we should position it
            // above the visible area
            const secondScrollStart = -1 * direction * wrapperHeight;
            divRef.current.style.transform = `translate(0px,${secondScrollStart}px)`;
        }, 250);
    };

    const finishTransition = () => {
        // re-render the screen with the updated data and without the fake screens
        setShowFakes(false);
        window.requestAnimationFrame(() => {
            divRef.current.classList.add('detail-animate');
            divRef.current.style.transform = `translate(0px,0px)`;
        });
    };

    useEffect(() => {
        if (transitionSteps !== 0) {
            if (transition === 'start') startTransition(transitionSteps);
            else if (transition === 'end') finishTransition();
            else setShowFakes(false);
        }
    }, [data, transition, transitionSteps]);

    useEffect(() => {
        if (showFakes) {
            divRef.current.classList.add('detail-animate');
            divRef.current.style.transform = `translate(0px,${scrollDestinationRef.current}px)`;
        }
    }, [showFakes]);

    if (isLoading && data.count() < 1) {
        return (
            <div
                className="explorer-detail-content"
                ref={divRef}>
                <div className="explorer-detail-content__loading">
                    <div className="explorer-detail-content__loading-message">
                        <LoadingSpinner />
                        <div className="explorer-detail-content__loading-title">
                            Gathering your data...
                        </div>
                        <div className="explorer-detail-content__loading-subtitle">
                            Updating Spending Explorer.
                        </div>
                        <div>This should only take a few moments...</div>
                    </div>
                </div>
            </div>
        );
    }

    let header = (
        <RootHeader
            isLoading={isLoading}
            root={root}
            fy={fy}
            lastUpdate={lastUpdate}
            total={active.total} />
    );

    let lastFilter = null;

    if (!isRoot) {
        // when we're not at the root level, the header displays information about the
        // last filter chosen
        lastFilter = trail[trail.length - 1];
        // when we are more than one level past the root, the header subtitle displays the
        // relation to its parent filter
        let parentFilter = null;
        if (trail.length > 2) {
            parentFilter = trail[trail.length - 2].title;
        }

        // ID is used to build links to profile pages in DetailHeader
        // Use the account number for federal accounts
        let id = `${lastFilter.id}`;
        if (lastFilter.within === 'federal_account') {
            id = lastFilter.accountNumber;
        }

        header = (
            <DetailHeader
                activeSubdivision={active.subdivision}
                isLoading={isLoading}
                within={lastFilter.within}
                title={lastFilter.title}
                link={lastFilter.link}
                id={id}
                fy={fy}
                lastUpdate={lastUpdate}
                total={active.total}
                parent={parentFilter}
                isTruncated={isTruncated} />
        );
    }

    let fakeScreenAbove = null;
    let fakeScreenBelow = null;

    if (showFakes && fakeDirection === 'below') {
        fakeScreenBelow = (
            <FakeScreens
                position="below"
                transitionSteps={transitionSteps} />);
    }
    else if (showFakes && fakeDirection === 'above') {
        fakeScreenAbove = (
            <FakeScreens
                position="above"
                transitionSteps={transitionSteps} />
        );
    }

    const currentIndex = trail.length - 1;

    let visualizationSection = (
        <NoAwardsScreen
            rewindToFilter={rewindToFilter}
            currentIndex={currentIndex} />
    );

    if (data.count() > 0) {
        visualizationSection = (
            <ExplorerVisualization
                isRoot={isRoot}
                isLoading={isLoading}
                lastFilter={lastFilter}
                root={root}
                fy={fy}
                active={active}
                trail={trail}
                total={total}
                data={data}
                goDeeper={goDeeper}
                changeSubdivisionType={changeSubdivisionType}
                goToUnreported={goToUnreported}
                showTooltip={showTooltip}
                hideTooltip={hideTooltip}
                currentIndex={currentIndex}
                rewindToFilter={rewindToFilter} />
        );
    }


    return (
        <div
            className="explorer-detail-content"
            ref={divRef}>
            {fakeScreenAbove}
            {header}
            {visualizationSection}
            {fakeScreenBelow}
        </div>
    );
};

DetailContent.propTypes = propTypes;
export default DetailContent;
