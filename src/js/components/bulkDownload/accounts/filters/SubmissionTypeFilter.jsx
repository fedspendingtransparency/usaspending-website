/**
 * SubmissionTypeFilter.jsx
 * Created by Lizzie Salita 4/24/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { CheckCircle, ExclamationCircle } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    submissionTypes: PropTypes.array,
    currentSubmissionTypes: PropTypes.array,
    updateFilter: PropTypes.func,
    valid: PropTypes.bool
};

export default class SubmissionTypeFilter extends React.Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        const target = e.target;
        this.props.updateFilter('submissionTypes', target.value);
    }

    render() {
        let icon = (
            <div className="icon valid">
                <CheckCircle />
            </div>
        );

        if (!this.props.valid) {
            icon = (
                <div className="icon invalid">
                    <ExclamationCircle />
                </div>
            );
        }

        const submissionTypes = this.props.submissionTypes.map((type) => (
            <div
                className="checkbox"
                key={type.name}>
                <input
                    type="checkbox"
                    aria-label={type.name}
                    value={type.name}
                    name="submission-type"
                    checked={this.props.currentSubmissionTypes.includes(type.name)}
                    onChange={this.onChange} />
                <label
                    className="checkbox-label"
                    htmlFor="submission-type">
                    {type.label}
                </label>
            </div>
        ));

        return (
            <div className="download-filter">
                <h3 className="download-filter__title">
                    {icon} Select a <span className="download-filter__title_em">file type</span>.
                </h3>
                <div className="download-filter__content">
                    {submissionTypes}
                    <p className="download-filter__content-note"><span className="download-filter__content-note_bold">*Note:</span> This file links agency financial data to award data. Columns related to award data will be blank when this linkage cannot be made.</p>
                </div>
            </div>
        );
    }
}

SubmissionTypeFilter.propTypes = propTypes;
