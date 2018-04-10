/**
 * AwardLevelFilter.jsx
 * Created by Lizzie Salita 11/2/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { CheckCircle, ExclamationCircle } from 'components/sharedComponents/icons/Icons';
import DownloadCheckbox from '../../DownloadCheckbox';

const propTypes = {
    awardLevels: PropTypes.array,
    currentAwardLevels: PropTypes.object,
    updateAwardCheckbox: PropTypes.func
};

export default class AwardLevelFilter extends React.Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    onChange(name, value) {
        this.props.updateAwardCheckbox({
            filter: 'awardLevels',
            name,
            value
        });
    }

    render() {
        const isValid = (
            this.props.currentAwardLevels.primeAwards ||
            this.props.currentAwardLevels.subAwards
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

        const awardLevels = this.props.awardLevels.map((level) => (
            <DownloadCheckbox
                key={level.name}
                name={level.name}
                label={level.label}
                checked={this.props.currentAwardLevels[level.name]}
                onChange={this.onChange} />
        ));

        return (
            <div className="download-filter">
                <div className="download-filter__title">
                    {icon} Select the <span className="download-center-filter__title_em">award level</span> to include.
                </div>
                <div className="download-filter__content">
                    {awardLevels}
                </div>
            </div>
        );
    }
}

AwardLevelFilter.propTypes = propTypes;
