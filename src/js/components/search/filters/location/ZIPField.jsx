/**
 * ZIPField.jsx
 * Created by Kevin Li 11/9/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import IndividualSubmit from 'components/search/filters/IndividualSubmit';
import Warning from 'components/sharedComponents/autocomplete/Warning';
import EntityWarning from 'components/search/filters/location/EntityWarning';

const propTypes = {
    zip: PropTypes.object,
    validateZip: PropTypes.func,
    generateDisclaimer: PropTypes.func,
    isUSA: PropTypes.bool
};

export default class ZIPField extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            zip: '',
            enabled: false,
            showNonUsWarning: false
        };

        this.changedText = this.changedText.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.pressedButton = this.pressedButton.bind(this);
        this.showWarning = this.showWarning.bind(this);
        this.hideWarning = this.hideWarning.bind(this);
    }

    changedText(e) {
        this.setState({
            zip: e.target.value,
            enabled: e.target.value.length === 5
        });
    }

    submitForm(e) {
        e.preventDefault();
    }

    pressedButton() {
        this.props.validateZip(this.state.zip);
    }

    showWarning() {
        if (!this.props.isUSA) {
            this.setState({ showNonUsWarning: true });
        }
    }

    hideWarning() {
        if (this.state.showNonUsWarning) {
            this.setState({ showNonUsWarning: false });
        }
    }

    render() {
        const disabledClass = this.props.isUSA ? '' : 'disabled';
        let error = null;
        if (this.props.zip.invalid !== '') {
            error = (<Warning
                header="Invalid ZIP Code"
                description={`${this.props.zip.invalid} is not a valid ZIP code.`} />);
        }

        return (
            <form
                className="location-filter-form geo-entity-item"
                onSubmit={this.submitForm}
                onFocus={this.showWarning}
                onMouseEnter={this.showWarning}
                onBlur={this.hideWarning}
                onMouseLeave={this.hideWarning}
                onChange={this.changedText}>
                <div className="zip-field">
                    <label
                        className={`location-label ${disabledClass}`}
                        htmlFor="location-picker-zip">
                        ZIP Code
                    </label>
                    <div className={`zip-content ${disabledClass}`}>
                        <input
                            id="location-picker-zip"
                            className="zip-input"
                            type="text"
                            placeholder="Enter a ZIP code"
                            maxLength={5}
                            disabled={!this.props.isUSA}
                            value={this.state.zip} />
                        <IndividualSubmit
                            className="zip-submit"
                            disabled={(!this.state.enabled || !this.props.isUSA)}
                            onClick={this.pressedButton}
                            label="Filter by ZIP code" />
                    </div>
                    {error}
                </div>
                <div
                    className={`geo-warning ${this.state.showNonUsWarning ? '' : 'hide'}`}
                    aria-hidden={!this.state.showNonUsWarning}>
                    <EntityWarning message={this.props.generateDisclaimer('ZIP CODE')} />
                </div>
            </form>
        );
    }
}

ZIPField.propTypes = propTypes;
