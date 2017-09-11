/**
  * ResultsTableSection.jsx
  * Created by Kevin Li 11/8/16
  **/

import React from 'react';
import PropTypes from 'prop-types';

import ResultsTableHeaderCellContainer from
    'containers/search/table/ResultsTableHeaderCellContainer';

import ExtraModalContainer from 'containers/search/modals/ExtraModalContainer';
import * as Icons from 'components/sharedComponents/icons/Icons';

import ResultsTable from './ResultsTable';
import ResultsTableTabs from './ResultsTableTabs';
import ResultsTableMessage from './ResultsTableMessage';
import ResultsTablePicker from './ResultsTablePicker';
import ResultsSelectColumns from './ResultsSelectColumns';

const propTypes = {
    inFlight: PropTypes.bool,
    tableTypes: PropTypes.array,
    currentType: PropTypes.string,
    switchTab: PropTypes.func,
    results: PropTypes.array,
    columns: PropTypes.object,
    counts: PropTypes.object,
    toggleColumnVisibility: PropTypes.func,
    reorderColumns: PropTypes.func,
    downloadParams: PropTypes.object
};

export default class ResultsTableSection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tableWidth: 0,
            showModal: false
        };

        this.setTableWidth = this.setTableWidth.bind(this);
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }
    componentDidMount() {
        // set the initial table width
        this.setTableWidth();
        // watch the window for size changes
        window.addEventListener('resize', this.setTableWidth);
    }

    componentWillUnmount() {
        // stop watching for size changes
        window.removeEventListener('resize', this.setTableWidth);
    }

    setTableWidth() {
        const tableWidth = this.tableWidthController.clientWidth - 2;
        this.setState({ tableWidth });
    }

    showModal() {
        this.setState({
            showModal: true
        });
    }

    hideModal() {
        this.setState({
            showModal: false
        });
    }

    render() {
        let loadingWrapper = 'loaded-table';
        let message = null;
        if (this.props.inFlight) {
            loadingWrapper = 'loading-table';
            message = <ResultsTableMessage message="Loading data..." />;
        }
        else if (this.props.results.length === 0) {
            // no results
            message = <ResultsTableMessage message="No results matched your criteria." />;
        }

        return (
            <div className="search-results-table-section" id="results-section-table">
                <div className="table-section-header">
                    <h3>Spending by Award</h3>
                    <button
                        className="action-modal"
                        aria-label="More options"
                        title="More options"
                        onClick={this.showModal}>
                        <Icons.MoreOptions alt="More options" />
                    </button>
                </div>
                <hr className="results-divider" />
                <div className="results-dropdown-picker-wrapper">
                    <ResultsTablePicker
                        types={this.props.tableTypes}
                        active={this.props.currentType}
                        switchTab={this.props.switchTab} />
                    <ResultsSelectColumns
                        columns={this.props.columns}
                        toggleColumnVisibility={this.props.toggleColumnVisibility}
                        reorderColumns={this.props.reorderColumns} />
                </div>
                <ResultsTableTabs
                    types={this.props.tableTypes}
                    active={this.props.currentType}
                    counts={this.props.counts}
                    switchTab={this.props.switchTab} />
                <div className={loadingWrapper}>
                    <div
                        className="results-table-width-master"
                        ref={(div) => {
                            // this is an empty div that scales via CSS
                            // the results table width will follow this div's width
                            this.tableWidthController = div;
                        }} />
                    <ResultsTable
                        {...this.props}
                        visibleWidth={this.state.tableWidth}
                        headerCellClass={ResultsTableHeaderCellContainer} />
                </div>
                {message}
                <ExtraModalContainer
                    downloadParams={this.props.downloadParams}
                    mounted={this.state.showModal}
                    hideModal={this.hideModal} />
            </div>
        );
    }
}

ResultsTableSection.propTypes = propTypes;
