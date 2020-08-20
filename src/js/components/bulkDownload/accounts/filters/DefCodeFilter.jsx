import React from 'react';
import PropTypes from 'prop-types';
import DEFCheckboxTreeDownload from './DEFCheckboxTreeDownload';
import { CheckCircle, ExclamationCircle } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    submissionTypes: PropTypes.array,
    currentSubmissionTypes: PropTypes.array,
    updateFilter: PropTypes.func,
    valid: PropTypes.bool,
    setDefCodes: PropTypes.func
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
                <p className="download-filter__info">The Federal Government tracks spending funded by supplemental appropriations bills targeting disasters and emergencies. You can select codes related to disaster spending here.</p>
                <DEFCheckboxTreeDownload setDefCodes={this.props.setDefCodes} />

                <p className="download-filter__content-note"><span className="download-filter__content-note_bold">*Note:</span> COVID-19 Spending account data is only available starting FY2020 P07.</p>
            </div>
        );
    }
}

SubmissionTypeFilter.propTypes = propTypes;
