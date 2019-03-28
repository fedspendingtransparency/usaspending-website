/**
 * AwardTypeFilter.jsx
 * Created by Lizzie Salita 11/2/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { CheckCircle, ExclamationCircle } from 'components/sharedComponents/icons/Icons';
import DownloadCheckbox from '../../DownloadCheckbox';

const propTypes = {
    awardTypes: PropTypes.array,
    currentAwardTypes: PropTypes.object,
    updateCheckbox: PropTypes.func
};

export default class AwardTypeFilter extends React.Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    onChange(name, value) {
        this.props.updateCheckbox({
            filter: 'awardTypes',
            name,
            value,
            dataType: 'awards'
        });
    }

    render() {
        const isValid = (
            this.props.currentAwardTypes.contracts ||
            this.props.currentAwardTypes.grants ||
            this.props.currentAwardTypes.directPayments ||
            this.props.currentAwardTypes.loans ||
            this.props.currentAwardTypes.otherFinancialAssistance ||
            this.props.currentAwardTypes.idvs
        );

        let icon = (
            <div className="icon valid">
                <CheckCircle />
            </div>
        );

        if (!isValid) {
            icon = (
                <div className="icon invalid">
                    <ExclamationCircle />
                </div>
            );
        }

        const awardTypes = this.props.awardTypes.map((type) => (
            <DownloadCheckbox
                key={type.name}
                name={type.name}
                label={type.label}
                checked={this.props.currentAwardTypes[type.name]}
                onChange={this.onChange} />
        ));

        return (
            <div className="download-filter">
                <h3 className="download-filter__title">
                    {icon} Select the <span className="download-filter__title_em">award types</span> to include.
                </h3>
                <div className="download-filter__content">
                    {awardTypes}
                </div>
            </div>
        );
    }
}

AwardTypeFilter.propTypes = propTypes;
