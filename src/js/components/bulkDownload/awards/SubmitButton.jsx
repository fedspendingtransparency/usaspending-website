/**
 * SubmitButton.jsx
 * Created by Lizzie Salita 3/26/18
 */

import React from 'react';
import PropTypes from 'prop-types';

import DownloadTooltip from './DownloadTooltip';

const propTypes = {
    validForm: PropTypes.bool,
    filters: PropTypes.object,
    validDates: PropTypes.bool
};

export default class SubmitButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showHover: false
        };

        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
    }

    onMouseEnter() {
        this.setState({
            showHover: true
        });
    }

    onMouseLeave() {
        this.setState({
            showHover: false
        });
    }

    render() {
        let tooltip = null;

        if (!this.props.validForm && this.state.showHover) {
            tooltip = (
                <DownloadTooltip
                    filters={this.props.filters}
                    validDates={this.props.validDates} />
            );
        }

        let submitButton = (
            <div className="submit-button submit-button_disabled">
                <button disabled>Download</button>
            </div>
        );

        if (this.props.validForm) {
            submitButton = (
                <div className="submit-button">
                    <input type="submit" value="Download" />
                </div>
            );
        }

        return (
            <div
                className="submit-wrapper"
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
                onFocus={this.onMouseEnter}
                onBlur={this.onMouseLeave}>
                {tooltip}
                {submitButton}
            </div>
        );
    }
}

SubmitButton.propTypes = propTypes;
