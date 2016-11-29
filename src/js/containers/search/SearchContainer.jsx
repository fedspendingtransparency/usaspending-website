/**
  * SearchContainer.jsx
  * Created by Kevin Li 11/1/16
  **/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import _ from 'lodash';

import SearchPage from 'components/search/SearchPage';

import SearchOperation from 'models/search/SearchOperation';
import * as SearchHelper from 'helpers/searchHelper';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';
import * as searchResultActions from 'redux/actions/search/searchResultActions';
import * as recordBulkActions from 'redux/actions/records/recordBulkActions';

import AwardRecord from 'models/results/award/AwardRecord';
import FinAssistAwardRecord from 'models/results/finAssist/FinAssistAwardRecord';
import ProcurementRecord from 'models/results/procurement/ProcurementRecord';
import RecipientRecord from 'models/results/recipient/RecipientRecord';
import LocationRecord from 'models/results/location/LocationRecord';

// combine the filter and result Redux actions into one object for the React-Redux connector
const combinedActions = Object.assign(
    {}, searchFilterActions, searchResultActions, recordBulkActions);

const propTypes = {
    search: React.PropTypes.object,
    clearRecords: React.PropTypes.func,
    bulkInsertRecords: React.PropTypes.func,
    setSearchResultMeta: React.PropTypes.func
};

class SearchContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchParams: new SearchOperation(),
            page: 0
        };
    }
    componentDidMount() {
        this.updateFilters();
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps.search.filters, this.props.search.filters)) {
            // filters changed, update the search object
            this.updateFilters();
        }
    }

    updateFilters() {
        const newSearch = new SearchOperation();
        newSearch.fromState(this.props.search.filters);
        this.setState({
            searchParams: newSearch
        }, () => {
            this.performSearch();
        });
    }

    performSearch() {
        // worker.postMessage('b');
        // this.state.searchParams.timePeriodRange = ['2016-01-01', '2016-06-30'];
        // this.state.searchParams.timePeriodFY = ['2015', '2016'];
        SearchHelper.performPagedSearch(this.state.searchParams.toParams())
            .then((res) => {
                this.props.clearRecords();
                const data = res.data;
                this.saveData(data.results);

                this.props.setSearchResultMeta({
                    page: data.page_metadata,
                    total: data.total_metadata
                });
            })
            .catch((err) => {
                if (err.response) {
                    // server responded with something

                }
                else {
                    // request never made it out
                    console.log(err.message);
                }
            });
    }

    saveData(data) {
        // iterate through the result set and create model instances
        // save each model to Redux
        const awards = {};
        const finAssists = {};
        const procurements = {};
        const recipients = {};
        const locations = {};

        data.forEach((awardData) => {
            const award = new AwardRecord(awardData);

            const finIds = [];
            const procurementIds = [];
            awardData.financialassistanceaward_set.forEach((item) => {
                const finAssist = new FinAssistAwardRecord(item);
                finAssists[finAssist._jsid] = finAssist;
                finIds.push(finAssist._jsid);
            });

            awardData.procurement_set.forEach((item) => {
                const procurement = new ProcurementRecord(item);
                procurements[procurement._jsid] = procurement;
                procurementIds.push(procurement._jsid);
            });

            const recipient = new RecipientRecord(awardData.recipient);

            let rawLocation = null;
            if (awardData.recipient) {
                rawLocation = awardData.recipient.location;
            }
            const location = new LocationRecord(rawLocation);
            locations[location._jsid] = location;
            recipient.location = location._jsid;
            recipients[recipient._jsid] = recipient;

            award.financialassistanceaward_set = finIds;
            award.procurement_set = procurementIds;
            award.recipient = recipient._jsid;
            awards[award._jsid] = award;
        });

        // write all records into Redux
        this.props.bulkInsertRecords({
            type: 'awards',
            data: awards
        });
        this.props.bulkInsertRecords({
            type: 'finAssists',
            data: finAssists
        });
        this.props.bulkInsertRecords({
            type: 'procurements',
            data: procurements
        });
        this.props.bulkInsertRecords({
            type: 'recipients',
            data: recipients
        });
        this.props.bulkInsertRecords({
            type: 'locations',
            data: locations
        });
    }

    render() {
        return (
            <SearchPage {...this.props} />
        );
    }
}

export default connect(
    (state) => ({ search: state.search }),
    (dispatch) => bindActionCreators(combinedActions, dispatch)
)(SearchContainer);

SearchContainer.propTypes = propTypes;
