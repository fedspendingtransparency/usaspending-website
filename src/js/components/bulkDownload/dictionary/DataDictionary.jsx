/**
 * DataDictionary.jsx
 * Created by Lizzie Salita 8/31/18
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Spreadsheet } from 'components/sharedComponents/icons/Icons';
import DataDictionaryTable from './table/DataDictionaryTable';
import DataDictionarySearchBar from "./DataDictionarySearchBar";

const propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.bool,
    sections: PropTypes.array,
    columns: PropTypes.array,
    rows: PropTypes.array,
    sort: PropTypes.object,
    changeSort: PropTypes.func,
    setSearchString: PropTypes.func,
    searchTerm: PropTypes.string,
    downloadLocation: PropTypes.string
};

export default class DataDictionary extends React.Component {
    scrollRightOne() {
        document.getElementById("testing2").scrollLeft = document.getElementById("testing1").scrollLeft;
    }
    scrollRightTwo() {
        document.getElementById("testing1").scrollLeft = document.getElementById("testing2").scrollLeft;
    }
    render() {
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
                        href={this.props.downloadLocation}>
                        <div className="data-dictionary__download-icon">
                            <Spreadsheet />
                        </div>
                        Download
                    </a>
                </div>
                <DataDictionarySearchBar
                    setSearchString={this.props.setSearchString} />
                <div className="data-dictionary__above-scroller" id="testing1" onScroll={this.scrollRightOne}>
                    <div className="data-dictionary__scroller" />
                </div>
                <div className="data-dictionary__table-wrapper">
                    <div id="testing2" className="testing2" onScroll={this.scrollRightTwo}>
                        <DataDictionaryTable
                            {...this.props} />
                    </div>
                </div>
            </div>
        );
    }
}

DataDictionary.propTypes = propTypes;
