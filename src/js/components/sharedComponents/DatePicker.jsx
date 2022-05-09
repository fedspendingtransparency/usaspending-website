/**
  * DatePicker.jsx
  * Created by Kevin Li 7/25/16
  **/

import React from 'react';
import PropTypes from 'prop-types';
import DayPicker, { DateUtils } from 'react-day-picker';
import moment from 'moment';
import { uniqueId } from 'lodash';
import * as Icons from './icons/Icons';

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
    disabledDays: PropTypes.array
};

export default class DatePicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inputValue: '',
            selectedDay: new Date(),
            showDatePicker: false
        };

        this.delayedBlur = false;
        this.escapeEvent = '';

        // bind functions
        this.datePickerChangeEvent = this.datePickerChangeEvent.bind(this);
        this.handleTypedDate = this.handleTypedDate.bind(this);
        this.handleInputBlur = this.handleInputBlur.bind(this);
        this.toggleDatePicker = this.toggleDatePicker.bind(this);
        this.handleDatePick = this.handleDatePick.bind(this);
        this.handleDateFocus = this.handleDateFocus.bind(this);
        this.handleDateBlur = this.handleDateBlur.bind(this);
        this.escapeEvent = this.escapeDatePicker.bind(this);
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
            selectedDay: new Date(),
            showDatePicker: false
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

    toggleDatePicker(e) {
        e.preventDefault();

        this.setState({
            showDatePicker: !this.state.showDatePicker
        }, this.datePickerChangeEvent);
    }

    datePickerChangeEvent() {
        const selectedDay = this.datepicker.dayPicker.querySelector('.DayPicker-Day--selected');
        /**
         * Given a user updates the month in the date picker to a month that does not include the date selected,
         * there will not be a selected day class and will err, therefore if there is no selected day in the current
         * month in the day picker we will not focus it.
         */
        if (this.state.showDatePicker && selectedDay) {
            // focus on the date picker
            selectedDay.focus();

            // we want to close the date picker on escape key
            // have to hold a reference to the bound function in order to cancel the listener later
            window.addEventListener('keyup', this.escapeEvent);
        }
        else if (this.state.showDatePicker) {
            /**
             * Given a user updates the month in the date picker to a month that does not include the date selected,
             * we must focus on another element within the datepicker or a user will not be able to outside click to
             * hide the datepicker.
             */
            this.datepicker.focus();
            // we want to close the date picker on escape key
            // have to hold a reference to the bound function in order to cancel the listener later
            window.addEventListener('keyup', this.escapeEvent);
        }
        else {
            // date picker is now closed, stop listening for this event
            window.removeEventListener('keyup', this.escapeEvent);
            // return focus to the input field
            this.text.focus();
        }
    }

    escapeDatePicker(e) {
        if (e.keyCode === 27) {
            this.toggleDatePicker(e);
        }
    }

    handleDatePick(day) {
        this.props.onDateChange(day, this.props.type);
        this.props.hideError();
        // close the popup if is shown
        if (this.state.showDatePicker) {
            this.setState({
                showDatePicker: false
            }, this.datePickerChangeEvent.bind(this));
        }
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
            const date = moment(this.state.inputValue, format);
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
        let showDatePicker = ' hide';
        if (this.state.showDatePicker) {
            showDatePicker = '';
        }

        // handle null dates for the calendar default month and selecte date
        let pickedDay = null;
        if (this.props.value) {
            // convert the moment object to a JS date object
            pickedDay = this.props.value.toDate();
        }
        else if (this.props.opposite) {
            // a start/end date was already picked
            pickedDay = this.props.opposite.toDate();
        }
        else {
            // no dates have been chosen at all, default to the current date
            pickedDay = moment().toDate();
        }

        const inputId = `picker-${uniqueId()}`;

        return (
            <div className="generate-datepicker-wrap">
                <div className="generate-datepicker">
                    <label htmlFor={inputId}>
                        {this.props.title}
                        <input
                            id={inputId}
                            type="text"
                            placeholder="MM/DD/YYYY"
                            aria-label={this.props.title}
                            value={this.state.inputValue}
                            ref={(input) => {
                                this.text = input;
                            }}
                            onChange={this.handleTypedDate}
                            onBlur={this.handleInputBlur} />
                    </label>
                    <a
                        href="#null"
                        onClick={this.toggleDatePicker}
                        className="usa-da-icon picker-icon date">
                        <Icons.Calendar alt="Date picker" />
                    </a>
                </div>
                <div className={`floating-datepicker ${showDatePicker}`} role="dialog">
                    <DayPicker
                        ref={(daypicker) => {
                            this.datepicker = daypicker;
                        }}
                        month={pickedDay}
                        disabledDays={this.props.disabledDays}
                        selectedDays={(day) => DateUtils.isSameDay(pickedDay, day)}
                        onDayClick={this.handleDatePick}
                        onFocus={this.handleDateFocus}
                        onBlur={this.handleDateBlur} />
                </div>
            </div>
        );
    }
}
DatePicker.defaultProps = defaultProps;
DatePicker.propTypes = propTypes;
