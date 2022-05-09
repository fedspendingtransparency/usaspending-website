/**
 * RecipientInformation.jsx
 * Created by David Trinh 7/11/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { InfoCircle } from 'components/sharedComponents/icons/Icons';
import RecipientLandingTooltip from './RecipientLandingTooltip';

const propTypes = {
    message: PropTypes.string,
    placement: PropTypes.string
};

export default class RecipientInformation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showInfoTooltip: false
        };

        this.showTooltip = this.showTooltip.bind(this);
        this.closeTooltip = this.closeTooltip.bind(this);
    }

    showTooltip() {
        this.setState({
            showInfoTooltip: true
        });
    }

    closeTooltip() {
        this.setState({
            showInfoTooltip: false
        });
    }

    render() {
        let tooltip = null;
        if (this.state.showInfoTooltip) {
            tooltip = (
                <RecipientLandingTooltip
                    showInfoTooltip={this.state.showInfoTooltip}
                    placement={this.props.placement}
                    closeTooltip={this.closeTooltip}
                    message={this.props.message} />
            );
        }
        return (
            <div>
                <button
                    onBlur={this.closeTooltip}
                    className="recipient-labels__icon-info"
                    onFocus={this.showTooltip}
                    onMouseEnter={this.showTooltip}
                    onClick={this.showTooltip}>
                    <InfoCircle alt="Information" />
                </button>
                {tooltip}
            </div>
        );
    }
}

RecipientInformation.propTypes = propTypes;
