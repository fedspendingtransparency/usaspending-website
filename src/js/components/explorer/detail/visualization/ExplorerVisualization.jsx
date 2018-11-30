/**
 * ExplorerVisualization.jsx
 * Created by Kevin Li 8/17/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import Analytics from 'helpers/analytics/Analytics';
import * as redirectHelper from 'helpers/redirectHelper';

import UnreportedErrorScreen from 'components/explorer/detail/UnreportedErrorScreen';
import ExplorerTableContainer from 'containers/explorer/detail/table/ExplorerTableContainer';
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

export default class ExplorerVisualization extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            width: 0,
            viewType: 'treemap'
        };

        this.measureWidth = this.measureWidth.bind(this);
        this.changeView = this.changeView.bind(this);
    }

    componentDidMount() {
        this.measureWidth();
        window.addEventListener('resize', this.measureWidth);

        Analytics.event({
            category: 'Spending Explorer - Visualization Type',
            action: this.state.viewType
        });
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.measureWidth);
    }

    measureWidth() {
        const width = this.widthRef.offsetWidth;

        this.setState({
            width
        });
    }

    redirect() {
        redirectHelper.showRedirectModal("https://max.omb.gov/maxportal/document/SF133/Budget/FACTS%20II%20-%20SF%20133%20Report%20on%20Budget%20Execution%20and%20Budgetary%20Resources.html");
    }

    changeView(viewType) {
        this.setState({
            viewType
        });

        Analytics.event({
            category: 'Spending Explorer - Visualization Type',
            action: viewType
        });
    }

    render() {
        let loadingTreemapClass = '';
        let loadingTableClass = '';
        if (this.props.isLoading) {
            loadingTreemapClass = 'explorer-vis__treemap-transition__loading';
            loadingTableClass = 'explorer-vis__table-transition__loading';
        }

        let visualization = (
            <div className={`treemap-loading-transition ${loadingTreemapClass}`}>
                <ExplorerTreemap
                    isLoading={this.props.isLoading}
                    width={this.state.width}
                    data={this.props.data}
                    total={this.props.total}
                    goDeeper={this.props.goDeeper}
                    showTooltip={this.props.showTooltip}
                    hideTooltip={this.props.hideTooltip}
                    goToUnreported={this.props.goToUnreported}
                    changeView={this.changeView} />
            </div>
        );
        if (this.state.viewType === 'table') {
            visualization = (
                <div className={`explorer-vis__table-transition ${loadingTableClass}`}>
                    <ExplorerTableContainer
                        isLoading={this.props.isLoading}
                        results={this.props.data}
                        total={this.props.total}
                        goDeeper={this.props.goDeeper}
                        goToUnreported={this.props.goToUnreported} />
                </div>
            );
        }
        let dropDown;
        let disclaimer;
        if (this.props.data.get(0).name === 'Unreported Data' && this.props.data.count() === 1) {
            visualization = (
                <div>
                    <UnreportedErrorScreen />
                </div>
            );
        } else {
            dropDown = (
                <div className="explorer-vis__toolbar">
                    <BreakdownDropdown
                        root={this.props.root}
                        active={this.props.active}
                        trail={this.props.trail}
                        isRoot={this.props.isRoot}
                        changeSubdivisionType={this.props.changeSubdivisionType}
                        viewType={this.state.viewType}
                        changeView={this.changeView} />
                </div>);

            disclaimer = (
                <div className="explorer-vis__disclaimer">
                    <p>All dollar amounts shown here represent agency reported obligated amounts</p>
                    <p><span className="explorer-vis_bold">Unreported Data*:</span> Unreported amounts are calculated using the difference in the total obligated amount from the <button className="explorer-vis__link" onClick={this.redirect} >Report on Budget Execution and Budgetary Resources</button> and the total obligated amount reported by agencies to USAspending.gov.</p>
                </div>
            );
        }

        return (
            <div className="explorer-vis">
                {dropDown}

                <div
                    className="explorer-vis__width-reference"
                    ref={(div) => {
                        this.widthRef = div;
                    }} />

                {visualization}

                {disclaimer}
            </div>
        );
    }
}

ExplorerVisualization.propTypes = propTypes;
