/**
  * ReferencedAwardsSection.jsx
  * Created by Lizzie Salita 2/14/19
  **/

import React from 'react';
import PropTypes from 'prop-types';
import { TooltipWrapper } from 'data-transparency-ui';

import ResultsTableTabs from 'components/search/table/ResultsTableTabs';
import ReferencedAwardsTable from './ReferencedAwardsTable';
import { relatedAwardsInfo } from '../../shared/InfoTooltipContent';

const propTypes = {
    results: PropTypes.array,
    counts: PropTypes.object,
    inFlight: PropTypes.bool,
    error: PropTypes.bool,
    page: PropTypes.object,
    limit: PropTypes.number,
    sort: PropTypes.object,
    order: PropTypes.object,
    tableType: PropTypes.string,
    tableTypes: PropTypes.array,
    switchTab: PropTypes.func,
    changePage: PropTypes.func,
    updateSort: PropTypes.func
};

export default class ReferencedAwardsSection extends React.Component {
    render() {
        let tabs = null;
        if (this.props.counts) {
            tabs = (
                <ResultsTableTabs
                    active={this.props.tableType}
                    switchTab={this.props.switchTab}
                    types={this.props.tableTypes}
                    counts={this.props.counts} />
            );
        }
        return (
            <div id="award-referenced-awards" className="referenced-awards">
                <div className="award-viz">
                    <div className="award-viz__heading">
                        <div className="award-viz__icon">
                            <img src="img/icon-hierarchy.png" alt="pedigree chart" />
                        </div>
                        <h3 className="award-viz__title">Orders Made Under this IDV</h3>
                        <TooltipWrapper
                            className="award-section-tt"
                            icon="info"
                            tooltipPosition="left"
                            wide
                            tooltipComponent={relatedAwardsInfo} />
                    </div>
                    <hr />
                    <div className="referenced-awards__content">
                        {tabs}
                        <ReferencedAwardsTable
                            {...this.props} />
                    </div>
                </div>
            </div>
        );
    }
}

ReferencedAwardsSection.propTypes = propTypes;
