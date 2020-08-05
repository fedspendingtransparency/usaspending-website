/**
 * SubmitButton.jsx
 * Created by Lizzie Salita 3/26/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';

import DownloadTooltip from './DownloadTooltip';


const propTypes = {
    validForm: PropTypes.bool,
    filters: PropTypes.object,
    validDates: PropTypes.bool,
    dataType: PropTypes.string,
    handleSubmit: PropTypes.func
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
        this.onClick = this.onClick.bind(this);
        this.measureOffset = throttle(this.measureOffset.bind(this), 16);
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

    onClick(e) {
        e.preventDefault();
        this.props.handleSubmit();
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
            const style = {
                top: this.state.offsetTop,
                right: this.state.offsetRight
            };

            tooltip = (
                <div
                    className="download-tooltip-spacer"
                    style={style}>
                    <DownloadTooltip
                        filters={this.props.filters}
                        validDates={this.props.validDates}
                        dataType={this.props.dataType} />
                </div>
            );
        }

        let submitButton = (
            <div
                className="submit-button submit-button_disabled"
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
                onFocus={this.onMouseEnter}
                onBlur={this.onMouseLeave}>
                <button disabled>Download</button>
            </div>
        );

        if (this.props.validForm && this.props.validDates) {
            submitButton = (
                <div className="submit-button">
                    <input type="submit" value="Download" onClick={this.props.handleSubmit} />
                </div>
            );
        }

        return (
            <div className="submit-wrapper">
                <div ref={(div) => {
                    this.referenceDiv = div;
                }}>
                    {submitButton}
                    {tooltip}
                </div>
            </div>
        );
    }
}

SubmitButton.propTypes = propTypes;
