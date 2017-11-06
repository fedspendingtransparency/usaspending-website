/**
 * AwardLevelFilter.jsx
 * Created by Lizzie Salita 11/2/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import { CheckCircle, ExclamationTriangle } from 'components/sharedComponents/icons/Icons';
import { indexOf, remove, concat } from 'lodash';

import DownloadCheckbox from '../../DownloadCheckbox';

const propTypes = {
    awardLevels: PropTypes.array,
    currentAwardLevels: PropTypes.array,
    updateParam: PropTypes.func
};

export default class AwardLevelFilter extends React.Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    onChange(name, value) {
        if (value) {
            const updatedAwardLevels = concat(this.props.currentAwardLevels, [name]);
            this.props.updateParam('award_levels', updatedAwardLevels);
        }
        else {
            const updatedAwardLevels = remove(this.props.currentAwardLevels, (item) => item !== name);
            this.props.updateParam('award_levels', updatedAwardLevels);
        }
    }

    render() {
        const awardLevelsArray = this.props.currentAwardLevels;
        const currentAwardLevels = {
            prime_awards: (indexOf(awardLevelsArray, 'prime_awards') !== -1),
            sub_awards: (indexOf(awardLevelsArray, 'sub_awards') !== -1)
        };

        const isValid = (
            currentAwardLevels.prime_awards ||
            currentAwardLevels.sub_awards
        );

        let icon = (
            <div className="icon valid">
                <CheckCircle />
            </div>
        );

        if (!isValid) {
            icon = (
                <div className="icon invalid">
                    <ExclamationTriangle />
                </div>
            );
        }

        const awardLevels = this.props.awardLevels.map((level) => (
            <DownloadCheckbox
                key={level.name}
                name={level.name}
                label={level.label}
                checked={currentAwardLevels[level.name]}
                onChange={this.onChange} />
        ));

        return (
            <div className="filter-section">
                <h5 className="filter-section-title">
                    {icon} Select the <span>award level</span> to include.
                </h5>
                <div className="filter-section-content">
                    {awardLevels}
                </div>
            </div>
        );
    }
}

AwardLevelFilter.propTypes = propTypes;
