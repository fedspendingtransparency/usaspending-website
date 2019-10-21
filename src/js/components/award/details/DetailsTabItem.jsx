/**
 * DetailsTabItem.jsx
 * Created by Elizabeth Dabbs 2/22/17
 **/

import React from 'react';
import PropTypes from 'prop-types';

import { formatNumber } from 'helpers/moneyFormatter';

import ComingSoonLabel from 'components/sharedComponents/ComingSoonLabel';
import InfoTooltip from 'components/awardv2/shared/InfoTooltip';

const propTypes = {
    label: PropTypes.string,
    internal: PropTypes.string,
    active: PropTypes.bool,
    enabled: PropTypes.bool,
    clickTab: PropTypes.func,
    tooltipContent: PropTypes.node,
    tooltipProps: PropTypes.shape({ wide: PropTypes.bool }),
    count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]) // int or 'N/A'
};

export default class DetailsTabItem extends React.Component {
    constructor(props) {
        super(props);

        this.clickedButton = this.clickedButton.bind(this);
    }

    clickedButton() {
        this.props.clickTab(this.props.internal);
    }

    render() {
        const comingSoonModule = (<ComingSoonLabel />);
        let activeClass = '';
        let comingSoon = '';
        let disabledStatus = '';
        let status = '';
        if (this.props.active) {
            activeClass = ' active';
        }
        if (this.props.enabled === false) {
            comingSoon = comingSoonModule;
            status = ' coming-soon';
            disabledStatus = true;
        }
        else {
            status = '';
            disabledStatus = false;
        }
        let infoTooltip = null;
        if (this.props.tooltipContent) {
            infoTooltip = (
                <InfoTooltip {...this.props.tooltipProps}>
                    {this.props.tooltipContent}
                </InfoTooltip>);
        }

        let count = null;

        if (this.props.count || this.props.count === 0) {
            count = (
                <div className={`count-badge ${activeClass}`}>
                    {formatNumber(this.props.count)}
                </div>
            );
        }

        return (
            <button
                className={`table-type-toggle ${activeClass}${status}`}
                onClick={this.clickedButton}
                title={`Show ${this.props.label}`}
                disabled={disabledStatus}>
                <div className="tab-content">
                    <span>{this.props.label}</span>
                    {comingSoon}
                    {count}
                </div>
                {infoTooltip}
            </button>
        );
    }
}

DetailsTabItem.propTypes = propTypes;
