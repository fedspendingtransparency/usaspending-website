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


        return (
            <div className="download-filter">
                <h3 className="download-filter__title">
                    Select <span className="download-filter__title_em">Disaster Emergency Fund Codes (DEFCs).</span>.
                </h3>
                <div className="download-filter__content">
                    <p className="download-filter__content-note"><span className="download-filter__content-note_bold">*Note:</span> This file links agency financial data to award data. Columns related to award data will be blank when this linkage cannot be made.</p>
                </div>
            </div>
        );
    }
}

SubmissionTypeFilter.propTypes = propTypes;
