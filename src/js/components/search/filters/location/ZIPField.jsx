/**
 * ZIPField.jsx
 * Created by Kevin Li 11/9/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import IndividualSubmit from 'components/search/filters/IndividualSubmit';
import Warning from 'components/sharedComponents/autocomplete/Warning';

const propTypes = {
    zip: PropTypes.object,
    validateZip: PropTypes.func
};

export default class ZIPField extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            zip: '',
            enabled: false
        };

        this.changedText = this.changedText.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.pressedButton = this.pressedButton.bind(this);
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

    render() {
        let error = null;
        if (this.props.zip.invalid !== '') {
            error = (<Warning
                header="Invalid ZIP Code"
                description={`${this.props.zip.invalid} is not a valid ZIP code.`} />);
        }

        return (
            <form
                className="location-filter-form"
                onSubmit={this.submitForm}>
                <div className="zip-field">
                    <label
                        className="location-label"
                        htmlFor="location-picker-zip">
                        ZIP Code
                    </label>
                    <div className="zip-content">
                        <input
                            id="location-picker-zip"
                            className="zip-input"
                            type="text"
                            placeholder="Enter a ZIP code"
                            maxLength={5}
                            value={this.state.zip}
                            onChange={this.changedText} />
                        <IndividualSubmit
                            className="zip-submit"
                            disabled={!this.state.enabled}
                            onClick={this.pressedButton}
                            label="Filter by ZIP code" />
                    </div>
                    {error}
                </div>
            </form>
        );
    }
}

ZIPField.propTypes = propTypes;
