/**
 * AgencyLandingResultsSection.jsx
 * Created by Lizzie Salita 7/11/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import ResultsTableMessage from 'components/search/table/ResultsTableMessage';
import AgencyLandingHeaderCellContainer from 'containers/agencyLanding/table/AgencyLandingHeaderCellContainer';
import AgencyLandingTable from './table/AgencyLandingTable';

const propTypes = {
    inFlight: PropTypes.bool,
    results: PropTypes.array,
    columns: PropTypes.array,
    agencySearchString: PropTypes.string,
    searchHash: PropTypes.string
};

export default class AgencyLandingResultsSection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tableWidth: 0
        };

        this.setTableWidth = this.setTableWidth.bind(this);
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
        const tableWidth = this.tableWidthController.clientWidth;
        this.setState({ tableWidth });
    }

    render() {
        let loadingWrapper = '';
        let message = null;
        if (this.props.inFlight) {
            loadingWrapper = 'loading-table';
            message = <ResultsTableMessage message="Loading data..." />;
        }
        else if (this.props.results.length === 0) {
            // no results
            if (this.props.agencySearchString) {
                message = (
                    <div className="results-table-message">
                        No results found for &ldquo; <span>{this.props.agencySearchString}</span> &rdquo;.
                    </div>
                );
            }
            else {
                message = <ResultsTableMessage message="No results found." />;
            }
        }

        return (
            <div className="agency-landing-results" id="agency-landing-results">
                <div className={loadingWrapper}>
                    <div
                        className="agency-landing-table-width-master"
                        ref={(div) => {
                            // this is an empty div that scales via CSS
                            // the results table width will follow this div's width
                            this.tableWidthController = div;
                        }} />
                    <AgencyLandingTable
                        {...this.props}
                        visibleWidth={this.state.tableWidth}
                        headerCellClass={AgencyLandingHeaderCellContainer} />
                </div>
                {message}
            </div>
        );
    }
}

AgencyLandingResultsSection.propTypes = propTypes;
