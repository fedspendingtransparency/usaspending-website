import React from 'react';
import PropTypes from 'prop-types';
import DEFCheckboxTreeDownload from './DEFCheckboxTreeDownload';
import DEFCheckboxTreeLabel from 'components/search/filters/defc/DEFCheckboxTreeLabel';
import { CheckCircle, ExclamationCircle } from 'components/sharedComponents/icons/Icons';
import CheckboxTree from 'react-checkbox-tree';

const propTypes = {
    submissionTypes: PropTypes.array,
    currentSubmissionTypes: PropTypes.array,
    updateFilter: PropTypes.func,
    valid: PropTypes.bool,
    setDefCodes: PropTypes.func
};

export default class DefCodeFilter extends React.Component {
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

        return (
            <div className="download-filter">
                <h3 className="download-filter__title">
                    {icon} Filter by <span className="download-filter__title_em">Disaster Emergency Fund Codes (DEFCs).</span>
                </h3>
                <div className="download-filter__info">
                    <span>Filter your data with codes related to supplemental appropriation bills targeting disasters and emergencies. </span>
                </div>
                <div className="download-filter__content">
                    {/* <CheckboxTree /> */}
                    <p className="download-filter__content-note"><span className="download-filter__content-note_bold">Note:</span> COVID-19 Spending account data is only available starting FY2020 P07.</p>
                </div>
            </div>
        );
    }
}

DefCodeFilter.propTypes = propTypes;
