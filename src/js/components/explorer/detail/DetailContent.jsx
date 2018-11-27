/**
 * DetailContent.jsx
 * Created by Kevin Li 8/16/17
 */

import React from 'react';
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

export default class DetailContent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showFakes: false,
            fakeDirection: 'below',
            showTooltip: false,
            tooltip: {
                x: 0,
                y: 0,
                title: '',
                amount: 0,
                percent: 0
            }
        };
    }

    componentDidMount() {
        this.updateChart(this.props.data);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.transitionSteps !== 0 && prevProps.transition !== this.props.transition) {
            if (this.props.transition === 'start') {
                this.startTransition(this.props.transitionSteps);
            }
            else if (this.props.transition === 'end') {
                this.finishTransition();
            }
        }
        else if (prevProps.data !== this.props.data) {
            this.updateChart(this.props.data);
        }
    }

    updateChart(data, callback) {
        this.setState({
            data,
            showFakes: false
        }, () => {
            if (callback) {
                callback();
            }
        });
    }

    startTransition(steps) {
        // measure how tall the wrapper div is; we'll use this as the height of each screen
        const wrapperHeight = this.wrapperDiv.offsetHeight;

        const absoluteSteps = Math.abs(steps);
        // we scroll upwards if the explorer is drilling down, and we scroll downwards if the
        // explorer is drilling up
        const direction = (steps / absoluteSteps) * -1;

        // the end point of the scroll operation is the height of each screen times the number
        // of screens we'll be passing through
        const scrollDestination = (direction * absoluteSteps * wrapperHeight);

        if (absoluteSteps > 1) {
            let fakeDirection = 'below';
            if (steps < 0) {
                fakeDirection = 'above';
            }

            this.setState({
                fakeDirection,
                showFakes: true // render the fake screens into the DOM
            }, () => {
                this.wrapperDiv.classList.add('detail-animate');
                this.wrapperDiv.style.transform = `translate(0px,${scrollDestination}px)`;
            });
        }
        else {
            // we don't have any fake screens, so just go straight to DOM animations
            this.wrapperDiv.classList.add('detail-animate');
            this.wrapperDiv.style.transform = `translate(0px,${scrollDestination}px)`;
        }

        // the detail-animate CSS class animates transform changes over 250ms, so we'll schedule
        // the next event for 250ms later
        setTimeout(() => {
            // the first "exit" animation has completed, now remove the animation class so
            // we can make DOM changes immediately without animations
            this.wrapperDiv.classList.remove('detail-animate');
            // position the screen below the bottom of the visible area
            // but, if we are scrolling downwards (negative step count), we should position it
            // above the visible area
            const secondScrollStart = -1 * direction * wrapperHeight;
            this.wrapperDiv.style.transform = `translate(0px,${secondScrollStart}px)`;
        }, 250);
    }

    finishTransition() {
        // re-render the screen with the updated data and without the fake screens
        this.setState({
            showFakes: false
        }, () => {
            // once the update is complete, restore the animation frame and animate the screen
            // back to its default position
            window.requestAnimationFrame(() => {
                this.wrapperDiv.classList.add('detail-animate');
                this.wrapperDiv.style.transform = `translate(0px,0px)`;
            });
        });
    }

    render() {
        if (this.props.isLoading && this.props.data.count() < 1) {
            return (
                <div
                    className="explorer-detail-content"
                    ref={(div) => {
                        this.wrapperDiv = div;
                    }}>
                    <div className="explorer-detail-content__loading">
                        <div className="explorer-detail-content__loading-message">
                            <LoadingSpinner />
                            <div className="explorer-detail-content__loading-title">Gathering your data...</div>
                            <div className="explorer-detail-content__loading-subtitle">Updating Spending Explorer.</div>
                            <div>This should only take a few moments...</div>
                        </div>
                    </div>
                </div>
            );
        }
        let header = (<RootHeader
            isLoading={this.props.isLoading}
            root={this.props.root}
            fy={this.props.fy}
            lastUpdate={this.props.lastUpdate}
            total={this.props.active.total} />);

        let lastFilter = null;

        if (!this.props.isRoot) {
            // when we're not at the root level, the header displays information about the
            // last filter chosen
            lastFilter = this.props.trail[this.props.trail.length - 1];
            // when we are more than one level past the root, the header subtitle displays the
            // relation to its parent filter
            let parentFilter = null;
            if (this.props.trail.length > 2) {
                parentFilter = this.props.trail[this.props.trail.length - 2].title;
            }

            // ID is used to build links to profile pages in DetailHeader
            // Use the account number for federal accounts
            let id = `${lastFilter.id}`;
            if (lastFilter.within === 'federal_account') {
                id = lastFilter.accountNumber;
            }

            header = (<DetailHeader
                isLoading={this.props.isLoading}
                within={lastFilter.within}
                title={lastFilter.title}
                id={id}
                fy={this.props.fy}
                lastUpdate={this.props.lastUpdate}
                total={this.props.active.total}
                parent={parentFilter}
                isTruncated={this.props.isTruncated} />);
        }

        let fakeScreenAbove = null;
        let fakeScreenBelow = null;
        if (this.state.showFakes && this.state.fakeDirection === 'below') {
            fakeScreenBelow = (<FakeScreens
                position="below"
                transitionSteps={this.props.transitionSteps} />);
        }
        else if (this.state.showFakes && this.state.fakeDirection === 'above') {
            fakeScreenAbove = (<FakeScreens
                position="above"
                transitionSteps={this.props.transitionSteps} />);
        }
        const currentIndex = this.props.trail.length - 1;
        let visualizationSection = (
            <NoAwardsScreen
                rewindToFilter={this.props.rewindToFilter}
                currentIndex={currentIndex} />);

        if (this.props.data.count() > 0) {
            visualizationSection = (
                <ExplorerVisualization
                    isRoot={this.props.isRoot}
                    isLoading={this.props.isLoading}
                    lastFilter={lastFilter}
                    root={this.props.root}
                    fy={this.props.fy}
                    active={this.props.active}
                    trail={this.props.trail}
                    total={this.props.total}
                    data={this.props.data}
                    goDeeper={this.props.goDeeper}
                    changeSubdivisionType={this.props.changeSubdivisionType}
                    goToUnreported={this.props.goToUnreported}
                    showTooltip={this.props.showTooltip}
                    hideTooltip={this.props.hideTooltip}
                    currentIndex={currentIndex}
                    rewindToFilter={this.props.rewindToFilter} />
            );
        }


        return (
            <div
                className="explorer-detail-content"
                ref={(div) => {
                    this.wrapperDiv = div;
                }}>

                {fakeScreenAbove}

                {header}

                {visualizationSection}

                {fakeScreenBelow}
            </div>
        );
    }
}

DetailContent.propTypes = propTypes;
