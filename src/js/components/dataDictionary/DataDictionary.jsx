/**
 * DataDictionary.jsx
 * Created by Lizzie Salita 8/31/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SearchBar } from 'data-transparency-ui';

import Analytics from '../../helpers/analytics/Analytics';
import DataDictionaryTable from './table/DataDictionaryTable';
import H2PageHeader from '../sharedComponents/header/H2PageHeader';

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
    Analytics.event({
        event: 'download_data_dictionary',
        category: 'Download Center - Data Dictionary',
        action: 'Download',
        gtm: true
    });
};

const DataDictionary = ({
    inFlight,
    error,
    sections,
    columns,
    rows,
    sort,
    changeSort,
    setSearchString,
    searchTerm,
    downloadLocation

}) => {
    // eslint-disable-next-line max-len
    const subtitle = (<p>The data dictionary below shows detailed information about the data available in our download files, including the definition of each element and its element name on the legacy USAspending.gov website.</p>);

    return (
        <div className="data-dictionary">
            <H2PageHeader title="Data Dictionary" subtitle={subtitle} />
            <div className="data-dictionary__search-download">
                <SearchBar
                    onSearch={setSearchString}
                    placeholder="Search by Term" />
                <div className="data-dictionary__download">
                    <a
                        className="data-dictionary__download-link"
                        onClick={handleDownloadClick}
                        href={downloadLocation}>
                        <div className="data-dictionary__download-icon">
                            <FontAwesomeIcon icon="file-excel" />
                        </div>
                    Download
                    </a>
                </div>
            </div>
            <div className="data-dictionary__table-wrapper">
                <DataDictionaryTable
                    searchTerm={searchTerm}
                    inFlight={inFlight}
                    error={error}
                    sections={sections}
                    columns={columns}
                    rows={rows}
                    sort={sort}
                    changeSort={changeSort} />
            </div>
        </div>
    );
};

DataDictionary.propTypes = propTypes;
export default DataDictionary;
