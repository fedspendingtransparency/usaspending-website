/**
 * FileFormatFilter.jsx
 * Created by Lizzie Salita 11/3/17
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";
import { awardDownloadOptions } from '../../../../dataMapping/bulkDownload/bulkDownloadOptions';
import FilterSectionTitle from '../../../../components/bulkDownload/FilterSelectionTitle';

const propTypes = { updateFilter: PropTypes.func };

// eslint-disable-next-line prefer-arrow-callback
const FileFormatFilter = memo(function FileFormatFilter({ updateFilter }) {
    const currentFileFormat = useSelector((state) => state.bulkDownload.awards.fileFormat);

    const onChange = (e) => {
        const target = e.target;
        updateFilter('fileFormat', target.value);
    };

    const fileFormats = awardDownloadOptions.fileFormats.map((fileFormat) => (
        <div
            className="radio"
            key={fileFormat.name}>
            <label
                className={`radio-label ${fileFormat.disabled ? 'disabled' : ''}`}
                htmlFor="fileFormat">
                <input
                    type="radio"
                    aria-label={fileFormat.name}
                    value={fileFormat.name}
                    name="fileFormat"
                    checked={currentFileFormat === fileFormat.name}
                    onChange={onChange}
                    disabled={fileFormat.disabled} />
                {fileFormat.label}
            </label>
        </div>
    ));

    return (
        <div className="download-filter">
            <FilterSectionTitle type="file" />
            <div className="download-filter__content file-type">
                {fileFormats}
            </div>
        </div>
    );
});

FileFormatFilter.propTypes = propTypes;
export default FileFormatFilter;
