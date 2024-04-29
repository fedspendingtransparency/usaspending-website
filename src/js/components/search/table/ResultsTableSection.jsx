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
    subAwardIdClick: PropTypes.func,
    page: PropTypes.number,
    setPage: PropTypes.func,
    total: PropTypes.number
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

        const elem = document.querySelector(".read-more__preview-lines");
        elem.classList.add("line-clamp");
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

        const applyLineClamp = (elem) => {
            elem.classList.add("line-clamp");
        };

        const removeLineClamp = (elem) => {
            elem.classList.remove("line-clamp");
        };

        const additionalFunctionality = (expanded) => {
            const elem = document.querySelector(".read-more__preview-lines");

            if (!expanded) {
                removeLineClamp(elem);
            }
            else {
                applyLineClamp(elem);
            }
        };

        const primePreview = "View a list of award summaries based on your selected filters. Click the Award ID, Recipient Name, or Awarding Agency to find more detailed information on individual awards including transaction history, subawards, and more.";
        const primeAwardText = (
            <>
                <p className="award-search__body-text">The rows in the table below represent award summaries for {<span className="award-search__glossary-term"> prime awards</span>}{' '}{<GlossaryLink term="prime-award" />}.
                Award summaries contain all the individual transactions and modifications that share the same unique award ID.
                If you selected any Time Period filter, your results will include prime awards where the
                {<span className="award-search__glossary-term"> earliest</span>}{' '}{<GlossaryLink term="base-transaction-action-date" />} and
                {<span className="award-search__glossary-term"> latest</span>}{' '}{<GlossaryLink term="latest-transaction-action-date" />}{' '}
                transactions overlap with your selected time period (regardless of whether any transactions occur within that period).
                </p>
            </>);

        const subAwardPreview = ("View a list of sub-award transactions based on your selected filters. Click the Sub-Award ID or Prime Award ID for additional details on the prime award. You can also learn more about the prime award’s recipient by clicking the Prime Recipient Name.");
        const subAwardText = (
            <>
                <p className="award-search__body-text">The rows in the table below represent{<span className="award-search__glossary-term"> sub-awards</span>}{' '}{<GlossaryLink term="sub-award" />} that meet the selected filter criteria. The results do not reflect sub-awards whose
                    {<span className="award-search__glossary-term"> prime awards</span>}{' '}{<GlossaryLink term="prime-award" />}
                    {' '}meet the selected filter criteria. For example, if you filter by Fiscal Year 2019, you will see only sub-awards with Action Dates in Fiscal Year 2019, but you will not see all sub-awards whose prime award overlaps with Fiscal Year 2019.
                </p>
                <p className="award-search__body-text">Sub-award amounts are funded by prime award obligations and outlays. In theory, the total value of all sub-award amounts for any given prime award is a subset of the Current Award Amount for that prime award; sub-award amounts generally should not exceed the Current Award Amount for their associated prime award. To avoid double-counting the overall value of a prime award, do not sum up sub-award amounts and prime award obligations or outlays.
                </p>
            </>);

        return (
            <div className="search-results-table-section" id="results-section-table">
                <div className="table-section-header">
                    <h2 className="visualization-title">
                        Spending by {type}
                    </h2>
                </div>
                <hr className="results-divider" />
                <p className="award-search__what-title">What's included in this view of the data?</p>
                {this.props.subaward === false ?
                    <ReadMore
                        id="search-table-results__prime-body"
                        openPrompt="read more"
                        closePrompt="read less"
                        openIcon=""
                        closeIcon=""
                        showPreview
                        previewLines={primePreview}
                        additionalFunctionality={additionalFunctionality}>{primeAwardText}
                    </ReadMore> :
                    <ReadMore
                        id="search-table-results__sub-body"
                        openPrompt="read more"
                        closePrompt="read less"
                        openIcon=""
                        closeIcon=""
                        showPreview
                        previewLines={subAwardPreview}
                        additionalFunctionality={additionalFunctionality}>{subAwardText}
                    </ReadMore>}
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
