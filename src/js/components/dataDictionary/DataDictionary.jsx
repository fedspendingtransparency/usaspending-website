/**
 * DataDictionary.jsx
 * Created by Lizzie Salita 8/31/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SearchBar } from 'data-transparency-ui';

import Analytics from 'helpers/analytics/Analytics';
import DataDictionaryTable from './table/DataDictionaryTable';

const propTypes = {
    inFlight: PropTypes.bool,
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

const handleDownloadClick = () => {
    Analytics.event({ category: 'Download Center - Data Dictionary', action: 'Download' });
};

export default class DataDictionary extends React.Component {
    render() {
        return (
            <div className="data-dictionary">
                <h2 className="data-dictionary__title">Data Dictionary</h2>
                <p className="data-dictionary__intro">
                    The data dictionary below shows detailed information about the data available in our download
                    files, including the definition of each element and its element name on the legacy USAspending.gov
                    website.
                </p>
                <div className="data-dictionary__search-download">
                    <SearchBar
                        onSearch={this.props.setSearchString}
                        placeholder="Search by Term" />
                    <div className="data-dictionary__download">
                        <a
                            className="data-dictionary__download-link"
                            onClick={handleDownloadClick}
                            href={this.props.downloadLocation}>
                            <div className="data-dictionary__download-icon">
                                <FontAwesomeIcon icon="file-excel" />
                            </div>
                        Download
                        </a>
                    </div>
                </div>
                <div className="data-dictionary__table-wrapper">
                    <DataDictionaryTable
                        {...this.props} />
                </div>
            </div>
        );
    }
}

DataDictionary.propTypes = propTypes;
