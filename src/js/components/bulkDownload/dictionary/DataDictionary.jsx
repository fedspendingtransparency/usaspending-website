/**
 * DataDictionary.jsx
 * Created by Lizzie Salita 8/31/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import kGlobalConstants from 'GlobalConstants';

import DataDictionaryTable from './table/DataDictionaryTable';
import DataDictionarySearchBar from "./DataDictionarySearchBar";

const propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.bool,
    sections: PropTypes.array,
    columns: PropTypes.array,
    rows: PropTypes.array,
    sort: PropTypes.object,
    changeSort: PropTypes.func
};

export default class DataDictionary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: ''
        };
        this.setSearchString = this.setSearchString.bind(this);
    }

    setSearchString(searchTerm) {
        this.setState({
            searchTerm
        });
    }

    render() {
        // TODO - Lizzie: add spreadsheet icon
        return (
            <div className="data-dictionary">
                <h2 className="data-dictionary__title">Data Dictionary</h2>
                <p className="data-dictionary__intro">
                    The data dictionary below shows detailed information about the data available in our download
                    files, including the definition of each element and its element name on the legacy USAspending.gov
                    website.
                </p>
                <div className="data-dictionary__download">
                    <a
                        className="data-dictionary__download-link"
                        href={`https://files${kGlobalConstants.DEV ? '-nonprod' : ''}.usaspending.gov/docs/Custom+Account+Data+Dictionary.xlsx`}>
                        Download
                    </a>
                </div>
                <DataDictionarySearchBar
                    setSearchString={this.setSearchString} />
                <div className="data-dictionary__table-wrapper">
                    <DataDictionaryTable
                        searchTerm={this.state.searchTerm}
                        {...this.props} />
                </div>
            </div>
        );
    }
}

DataDictionary.propTypes = propTypes;
