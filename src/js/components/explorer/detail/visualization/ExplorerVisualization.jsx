/**
 * ExplorerVisualization.jsx
 * Created by Kevin Li 8/17/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import Analytics from 'helpers/analytics/Analytics';

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
    hideTooltip: PropTypes.func
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
        let loadingTextClass = '';
        let loadingTreemapClass = '';
        let loadingTableClass = '';
        let loadingText = '';
        if (this.props.isLoading) {
            loadingTextClass = 'explorer-vis__loading-text_loading';
            loadingTreemapClass = 'explorer-vis__treemap-transition__loading';
            loadingTableClass = 'explorer-vis__table-transition__loading';
            loadingText = 'Loading data...';
        }

        let visualization = (
            <div className={`treemap-loading-transition ${loadingTreemapClass}`}>
                <ExplorerTreemap
                    width={this.state.width}
                    data={this.props.data}
                    total={this.props.total}
                    goDeeper={this.props.goDeeper}
                    showTooltip={this.props.showTooltip}
                    hideTooltip={this.props.hideTooltip} />
            </div>
        );
        if (this.state.viewType === 'table') {
            visualization = (
                <div className={`explorer-vis__table-transition ${loadingTableClass}`}>
                    <ExplorerTableContainer
                        results={this.props.data}
                        total={this.props.total}
                        goDeeper={this.props.goDeeper} />
                </div>
            );
        }

        return (
            <div className="explorer-vis">
                <div className={`explorer-vis__loading-text ${loadingTextClass}`}>{loadingText}</div>
                <div className="explorer-vis__toolbar">
                    <BreakdownDropdown
                        root={this.props.root}
                        active={this.props.active}
                        trail={this.props.trail}
                        isRoot={this.props.isRoot}
                        changeSubdivisionType={this.props.changeSubdivisionType}
                        viewType={this.state.viewType}
                        changeView={this.changeView} />
                </div>

                <div
                    className="explorer-vis__width-reference"
                    ref={(div) => {
                        this.widthRef = div;
                    }} />

                {visualization}

                <div className="explorer-vis__disclaimer">
                    All dollar amounts shown here represent agency reported obligated amounts
                </div>
            </div>
        );
    }
}

ExplorerVisualization.propTypes = propTypes;
