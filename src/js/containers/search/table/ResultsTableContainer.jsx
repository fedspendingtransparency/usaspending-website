/**
  * ResultsTableContainer.jsx
  * Created by Kevin Li 11/8/16
  **/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import TableSearchFields from 'dataMapping/search/tableSearchFields';

import ResultsTable from 'components/search/table/ResultsTable';

import * as searchResultActions from 'redux/actions/search/searchResultActions';

class ResultsTableContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: []
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.meta !== this.props.meta) {
            console.log("UPDATE");
            this.parseResults();
        }
    }

    parseResults() {

        if (typeof Worker) {
            // web workers are supported
            window.start = performance.now();
            const stringValue = {
                results: this.props.records.awards.toObject(),
                type: this.props.meta.tableType
            };
            const ResultsParserWorker = require('worker-loader?inline!workers/ResultsParserWorker');
            const worker = new ResultsParserWorker();
            worker.postMessage(stringValue);
            worker.onmessage = (raw) => {
                this.setState({
                    results: raw.data
                }, () => {
                    console.log(performance.now() - window.start);
                });
            };
        }
        else {
            window.start = performance.now();
            const ResultsParserWorker = require('workers/ResultsParserWorker').default;

            const results = ResultsParserWorker({
                results: this.props.records.awards.toObject(),
                type: this.props.meta.tableType
            });
            this.setState({
                results
            }, () => {
                console.log(performance.now() - window.start);
            });
        }


        // const results = [];

        // const relevantKeys = TableSearchFields[this.props.meta.tableType]._order;
        // this.props.records.awards.forEach((award) => {
        //     const row = _.pick(award, relevantKeys);
        //     results.push(row);
        // });

        // console.log(results);
        // this.setState({
        //     results
        // });
    

        

        // const data = JSON.parse(stringValue);
        // const results = [];

        // const relevantKeys = TableSearchFields[data.type]._order;
        // relevantKeys.push('_jsid');

        // for (const awardKey of Object.keys(data.results)) {
        //     const row = _.pick(data.results[awardKey], relevantKeys);
        //     results.push(row);
        // }
        
        // this.setState({
        //     results
        // });

        // const results = [];
        // for (const award of this.props.records.awards) {

        //     // strip the award object to just the fields we care about

        //     results.push(award);
        // }

        // this.setState({
        //     results
        // });
    }

    render() {
        return (
            <ResultsTable results={this.state.results} />
        );
    }
}

export default connect(
    (state) => ({
        records: state.records,
        meta: state.resultsMeta
    }),
    (dispatch) => bindActionCreators(searchResultActions, dispatch)
)(ResultsTableContainer);
