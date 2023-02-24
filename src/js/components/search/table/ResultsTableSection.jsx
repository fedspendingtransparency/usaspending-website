/**
  * ResultsTableSection.jsx
  * Created by Kevin Li 11/8/16
  **/

import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Tabs } from 'data-transparency-ui';
import ResultsTable from './ResultsTable';
import ResultsTableLoadingMessage from './ResultsTableLoadingMessage';
import ResultsTableNoResults from './ResultsTableNoResults';
import ResultsTableErrorMessage from './ResultsTableErrorMessage';
import GlossaryLink from '../../sharedComponents/GlossaryLink';
import ReadMore from '../../sharedComponents/ReadMore';

const propTypes = {
    inFlight: PropTypes.bool,
    error: PropTypes.bool,
    tableTypes: PropTypes.array,
    currentType: PropTypes.string,
    switchTab: PropTypes.func,
    results: PropTypes.array,
    columns: PropTypes.object,
    toggleColumnVisibility: PropTypes.func,
    updateSort: PropTypes.func,
    reorderColumns: PropTypes.func,
    subaward: PropTypes.bool,
    awardIdClick: PropTypes.func,
    subAwardIdClick: PropTypes.func
};

export default class ResultsTableSection extends React.Component {
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
        const tableWidth = this.tableWidthController.clientWidth - 1;
        this.setState({ tableWidth });
    }

    render() {
        const type = this.props.subaward ? 'Sub-Award' : 'Prime Award';
        const showTableMessage = (
            (!this.props.error && !this.props.inFlight && this.props.results.length === 0) ||
            this.props.inFlight ||
            this.props.error
        );
        const showDataTable = (
            (!this.props.error && !this.props.inFlight && this.props.results.length > 0) ||
            this.props.inFlight
        );
        const primeAwardText = (
            `The rows in the table below represent award summaries for prime awards.
        Award summaries contain all the individual transactions and modifications that share the same unique award ID.
        If you searched based on a Time Period filter, the award summaries below will overlap with your selected time period based on their
                ${<span className="award-search__glossary-term"> Prime Award Base Transaction Action Date</span>}${' '}${<GlossaryLink term="base-transaction-action-date" />} and
                ${<span className="award-search__glossary-term"> Prime Award Latest Transaction Action Date</span>}${' '}${<GlossaryLink term="latest-transaction-action-date" />},
        but individual transactions for any single award summary may not exist within the selected time period.`);

        const subAwardText = (
            `The rows in the table below represent${<span className="award-search__glossary-term"> sub-awards</span>}${' '}${<GlossaryLink term="sub-award" />} that meet the selected filter criteria. The results do not reflect sub-awards whose
            ${<span className="award-search__glossary-term"> prime awards</span>}${' '}${<GlossaryLink term="prime-award" />}
            meet the selected filter criteria. For example, if you filter by Fiscal Year 2019, you will see only sub-awards with Action Dates in Fiscal Year 2019, but you will not see all sub-awards whose prime award overlaps with Fiscal Year 2019.${<br />}
            Sub-award amounts are funded by prime award obligations and outlays. In theory, the total value of all sub-award amounts for any given prime award is a subset of the Current Award Amount for that prime award; sub-award amounts generally should not exceed the Current Award Amount for their associated prime award. To avoid double-counting the overall value of a prime award, do not sum up sub-award amounts and prime award obligations or outlays.
            `);
        return (
            <div className="search-results-table-section" id="results-section-table">
                <div className="table-section-header">
                    <h2 className="visualization-title">
                        {type === "Prime Award" ? `Spending by ${type} Summary` : `Spending by ${type}`}
                    </h2>
                </div>
                <hr className="results-divider" />
                {this.props.subaward === false ?
                    <ReadMore limit={330} openPrompt="read more" closePrompt="read less" text={primeAwardText} openIcon="" closeIcon="" /> :
                    <ReadMore limit={330} openPrompt="read more" closePrompt="read less" text={subAwardText} openIcon="" closeIcon="" />}
                <Tabs
                    types={this.props.tableTypes}
                    active={this.props.currentType}
                    switchTab={this.props.switchTab} />
                <div className="results-table-content">
                    <TransitionGroup>
                        {showTableMessage && (
                            <CSSTransition
                                classNames="table-message-fade"
                                timeout={{ exit: 225, enter: 195 }}
                                exit>
                                <>
                                    {this.props.inFlight && (
                                        <div className="results-table-message-container">
                                            <ResultsTableLoadingMessage />
                                        </div>
                                    )}
                                    {this.props.error && (
                                        <div className="results-table-message-container full">
                                            <ResultsTableErrorMessage />
                                        </div>
                                    )}
                                    {!this.props.error && !this.props.inFlight && this.props.results.length === 0 && (
                                        <div className="results-table-message-container full">
                                            <ResultsTableNoResults />
                                        </div>
                                    )}
                                </>
                            </CSSTransition>

                        )}
                    </TransitionGroup>
                    <div
                        className="results-table-width-master"
                        ref={(div) => {
                            // this is an empty div that scales via CSS
                            // the results table width will follow this div's width
                            this.tableWidthController = div;
                        }} />
                    {showDataTable && (
                        <ResultsTable
                            {...this.props}
                            visibleWidth={this.state.tableWidth}
                            awardIdClick={this.props.awardIdClick}
                            subAwardIdClick={this.props.subAwardIdClick} />
                    )}
                </div>
            </div>
        );
    }
}

ResultsTableSection.propTypes = propTypes;
