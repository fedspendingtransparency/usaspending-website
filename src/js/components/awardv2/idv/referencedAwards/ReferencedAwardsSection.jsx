/**
  * ReferencedAwardsSection.jsx
  * Created by Lizzie Salita 2/14/19
  **/

import React from 'react';
import PropTypes from 'prop-types';

import DetailsTabBar from 'components/award/details/DetailsTabBar';
import ReferencedAwardsTable from './ReferencedAwardsTable';

const propTypes = {
    results: PropTypes.array,
    totalItems: PropTypes.number,
    inFlight: PropTypes.bool,
    error: PropTypes.bool,
    page: PropTypes.number,
    limit: PropTypes.number,
    sort: PropTypes.string,
    order: PropTypes.string,
    tableType: PropTypes.string,
    tableTypes: PropTypes.array,
    switchTab: PropTypes.func,
    changePage: PropTypes.func,
    updateSort: PropTypes.func
};

export default class ReferencedAwardsSection extends React.Component {
    render() {
        console.log(this.props.results);
        return (
            <div id="idv-referenced-awards" className="referenced-awards">
                <div className="award-viz">
                    <div className="award-viz__heading">
                        <h3 className="award-viz__title">Awards that Reference this IDV</h3>
                    </div>
                    <hr />
                    <div className="referenced-awards__content">
                        <DetailsTabBar
                            activeTab={this.props.tableType}
                            clickTab={this.props.switchTab}
                            tabOptions={this.props.tableTypes} />
                        <ReferencedAwardsTable
                            {...this.props} />
                    </div>
                </div>
            </div>
        );
    }
}

ReferencedAwardsSection.propTypes = propTypes;
