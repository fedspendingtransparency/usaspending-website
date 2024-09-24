/**
  * DatePicker.jsx
  * Created by Kevin Li 7/25/16
  **/

import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';

const dayjs = require('dayjs');

const defaultProps = {
    type: 'startDate',
    allowClearing: false,
    disabledDays: []
};

const propTypes = {
    value: PropTypes.object,
    type: PropTypes.string,
    onDateChange: PropTypes.func,
    showError: PropTypes.func,
    hideError: PropTypes.func,
    opposite: PropTypes.object,
    title: PropTypes.string,
    allowClearing: PropTypes.bool,
    disabledDays: PropTypes.array,
    onFocus: PropTypes.func,
    id: PropTypes.string
};

export default class DatePicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inputValue: '',
            selectedDay: new Date()
        };

        this.delayedBlur = false;
        this.escapeEvent = '';

        this.handleTypedDate = this.handleTypedDate.bind(this);
        this.handleInputBlur = this.handleInputBlur.bind(this);
        this.handleDatePick = this.handleDatePick.bind(this);
        this.handleDateFocus = this.handleDateFocus.bind(this);
        this.handleDateBlur = this.handleDateBlur.bind(this);
    }

    componentDidMount() {
        this.parseValueForInput();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.value !== this.props.value) {
            this.parseValueForInput();
        }
    }

    clearValue() {
        this.setState({
            inputValue: '',
            selectedDay: new Date()
        });
    }

    parseValueForInput() {
    // convert the date to something typeable
        if (this.props.value != null) {
            const iV = this.props.value.format('MM/DD/YYYY');
            this.setState({
                inputValue: iV
            });
        }
    }

    handleDatePick(day) {
        this.props.onDateChange(day, this.props.type);
        this.props.hideError();
    }

    handleTypedDate(e) {
    // update the string state of the input field
        this.setState({
            inputValue: e.target.value
        }, () => {
            if (this.state.inputValue === '') {
                // if the input is an empty string, this indicates the user wants to clear the date
                this.clearValue();
                this.handleDatePick(null);
                return;
            }
            // check if this meets the MM/DD/YYYY format requirement
            let format = 'MM/DD/YYYY';
            const primaryFormat = /[0-9]{2}\/[0-9]{2}\/[0-9]{4}/;
            // secretly check for a secondary format
            const secondaryFormat = /[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}/;

            const matchedFirst = primaryFormat.test(this.state.inputValue);
            const matchedSecond = secondaryFormat.test(this.state.inputValue);

            if (!matchedFirst && !matchedSecond) {
                // doesn't match either format, user may still be typing or just entered invalid data
                return;
            }
            else if (!matchedFirst && matchedSecond) {
                // only matched the second format
                format = 'M/D/YYYY';
            }

            // determine if this is a parseable date
            const date = dayjs(this.state.inputValue, format);
            if (date.isValid()) {
                // it's a valid date
                this.handleDatePick(date.toDate());
            }
        });
    }

    handleInputBlur() {
        if (this.state.inputValue.length > 0 && !this.props.value) {
            // user entered something into the input field and no date has been set yet,
            // input must have been invalid
            this.props.showError('Invalid Date', 'The date entered is not a valid date.');
            this.state.inputValue = '';
        }
        else if (this.state.inputValue.length > 0) {
            this.parseValueForInput();
        }
    }

    handleDateBlur() {
    // blur event gets triggered apparently by any child element
    // blur will trigger before focus per W3C, delay the blur logic
    // so that it can be cancelled if focus shifts to a child element
        this.delayedBlur = window.setTimeout(() => {
            this.setState({
                showDatePicker: false
            }, this.datePickerChangeEvent);
        }, 20);
    }

    handleDateFocus() {
    // check if we lost focus from the parent element, if so cancel that blur event
        if (this.delayedBlur) {
            window.clearTimeout(this.delayedBlur);
            this.delayedBlur = null;
        }
    }

    render() {
        const labelId = `picker-${uniqueId()}`;

        return (
            <div className="generate-datepicker-wrap">
                <div className="generate-datepicker">
                    <label htmlFor={labelId}>
                        <span className="generate-datepicker__label">{this.props.title}</span>
                        <input
                            id={this.props.id}
                            type="text"
                            placeholder="mm/dd/yyyy"
                            aria-label={this.props.title}
                            value={this.state.inputValue}
                            onFocus={this.props.onFocus}
                            ref={(input) => {
                                this.text = input;
                            }}
                            onChange={this.handleTypedDate}
                            onBlur={this.handleInputBlur} />
                    </label>
                </div>
            </div>
        );
    }
}
DatePicker.defaultProps = defaultProps;
DatePicker.propTypes = propTypes;
