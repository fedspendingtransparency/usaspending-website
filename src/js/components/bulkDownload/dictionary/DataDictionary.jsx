/**
 * DataDictionary.jsx
 * Created by Lizzie Salita 8/31/18
 */

import React from 'react';
import PropTypes from 'prop-types';

import DataDictionaryTable from './table/DataDictionaryTable';

const propTypes = {
    sections: PropTypes.array,
    columns: PropTypes.array,
    rows: PropTypes.array
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
                <div className="data-dictionary__download">
                    <a
                        className="data-dictionary__download-link"
                        href="#/download_center/data_dictionary">
                        Download
                    </a>
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
