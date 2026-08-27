/**
 * SubmissionTypeFilter.jsx
 * Created by Lizzie Salita 4/24/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router";
import FilterSectionTitle from 'components/bulkDownload/FilterSelectionTitle';

const propTypes = {
    submissionTypes: PropTypes.array,
    currentSubmissionTypes: PropTypes.array,
    updateFilter: PropTypes.func
};

const SubmissionTypeFilter = ({
    submissionTypes,
    currentSubmissionTypes,
    updateFilter
}) => {
    const onChange = (e) => {
        const target = e.target;
        updateFilter('submissionTypes', target.value);
    };

    const submissions = submissionTypes.map((type) => (
        <div
            className="checkbox submission"
            key={type.name}>
            <input
                type="checkbox"
                aria-label={type.name}
                value={type.name}
                name="submission-type"
                checked={currentSubmissionTypes.includes(type.name)}
                onChange={onChange} />
            <label
                className="checkbox-label"
                htmlFor="submission-type">
                {type.label}
            </label>
        </div>
    ));

    return (
        <div className="download-filter">
            <FilterSectionTitle type="fileType" />
            <div className="download-filter__content">
                {submissions}
                <p className="download-filter__content-note">
                    <span className="download-filter__content-note_bold">*Note: </span>
                    To facilitate processing of these files for download, File C award records are separated into three buckets: contract awards (with linked awards between File C and File D1), financial assistance awards (with linked awards between File C and File D2), and unlinked awards (with awards in File C that are not linked to any award in Files D1 or D2). Each bucket will include one or more files, depending on the size of your download request.
                </p>
                <p className="download-filter__content-note">
                    Files with unlinked awards will include the same columns as files with linked awards; however, the columns that involve data from Files D1 and D2 will be blank in the files with unlinked awards. In addition, please note that files with unlinked awards will include award records with obligation activity or outlay activity, in order to show all agency File C award records that are unlinked to Files D1 or D2. (Note that in the{' '}
                    <Link className="usa-bold-link" to="/submission-statistics">
                        Agency Submission Statistics page
                    </Link>
                    , the counts of unlinked awards in File C use only awards with obligation activity.)
                </p>
            </div>
        </div>
    );
};

SubmissionTypeFilter.propTypes = propTypes;
export default SubmissionTypeFilter;
