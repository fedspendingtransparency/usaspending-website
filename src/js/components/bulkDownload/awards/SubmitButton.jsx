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
            showHover: false,
            offsetTop: 0,
            offsetRight: 0
        };

        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.measureOffset = this.measureOffset.bind(this);
    }

    componentDidMount() {
        this.measureOffset();
        window.addEventListener('scroll', this.measureOffset);
        window.addEventListener('resize', this.measureOffset);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.measureOffset);
        window.removeEventListener('resize', this.measureOffset);
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

    measureOffset() {
        const targetElement = this.referenceDiv;
        const offsetTop = targetElement.offsetTop - 15;
        const offsetRight = window.innerWidth - targetElement.offsetLeft - targetElement.clientWidth - 290;
        this.setState({
            offsetTop,
            offsetRight
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

        const style = {
            top: this.state.offsetTop,
            right: this.state.offsetRight
        };

        return (
            <div
                className="submit-wrapper"
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
                onFocus={this.onMouseEnter}
                onBlur={this.onMouseLeave}>
                <div ref={(div) => {
                    this.referenceDiv = div;
                }}>
                    <div
                        className="download-tooltip-spacer"
                        style={style}>
                        {tooltip}
                    </div>
                    {submitButton}
                </div>
            </div>
        );
    }
}

SubmitButton.propTypes = propTypes;
