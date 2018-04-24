/**
 * SubmissionTypeFilter.jsx
 * Created by Lizzie Salita 4/24/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { CheckCircle, ExclamationCircle } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    submissionTypes: PropTypes.array,
    currentSubmissionType: PropTypes.string,
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
        this.props.updateFilter('submissionType', target.value);
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
                className="radio"
                key={type.name}>
                <input
                    type="radio"
                    value={type.apiName}
                    name="submission-type"
                    checked={this.props.currentSubmissionType === type.apiName}
                    onChange={this.onChange} />
                <label
                    className="radio-label"
                    htmlFor="submission-type">
                    {type.label}<span className="radio-label__file">&nbsp;({type.file})</span>
                </label>
            </div>
        ));

        return (
            <div className="download-filter">
                <div className="download-filter__title">
                    {icon} Select a <span className="download-filter__title_em">file submission type</span>.
                </div>
                <div className="download-filter__content">
                    {submissionTypes}
                </div>
            </div>
        );
    }
}

SubmissionTypeFilter.propTypes = propTypes;
