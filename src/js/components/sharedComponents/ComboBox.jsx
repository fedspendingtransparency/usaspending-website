import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

const propTypes = {
    optionsArray: PropTypes.arrayOf(
        PropTypes.shape(
            {
                value: PropTypes.string.isRequired,
                text: PropTypes.string.isRequired
            }
        )).isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    placeholder: PropTypes.string,
    formName: PropTypes.string,
    disabled: PropTypes.bool,
    defaultValue: PropTypes.string,
    className: PropTypes.string
};

const ComboBox = ({
    optionsArray,
    label,
    placeholder,
    formName,
    disabled,
    defaultValue = '',
    className
}) => {
    const [inputValue, setInputValue] = useState(defaultValue);
    const [openOptions, setOpenOptions] = useState(false);

    // 1) filter for inputValue 2) map to list item element
    const options = optionsArray
        .filter(({ value }) => value.indexOf(inputValue.toLowerCase()) !== -1)
        .map(({ value, text }) => {
            const onClick = () => {
                setInputValue(text);
                setOpenOptions(false);
            };

            return (
                <li value={value} className="combo-box__options-item">
                    <button
                        type="button"
                        aria-label={`${formName}-option-item`}
                        onClick={onClick}>
                        {text}
                    </button>
                </li>
            );
        });

    const onChange = (e) => {
        setInputValue(e.target.value);
        setOpenOptions(e.target.value !== 0);
    };

    const onClickClear = () => {
        setInputValue('');
        setOpenOptions(false);
    };

    const onClickToggle = () => setOpenOptions((prevState) => !prevState);

    const chevron = openOptions ? "chevron-down" : "chevron-up";

    const isDisabled = disabled || optionsArray.length === 0;

    return (
        <div className={`combo-box${className ? ` ${className}` : ''}`}>
            <label
                className="combo-box__label"
                id={`${formName}-label`}
                htmlFor={formName}>
                {label}
                <div className="combo-box__input-container">
                    <input
                        value={inputValue}
                        type="text"
                        name={formName}
                        onChange={onChange}
                        placeholder={placeholder}
                        disabled={isDisabled} />
                    <div className="combo-box__buttons-container">
                        <button
                            className="combo-box__button"
                            type="button"
                            name={`${formName}-on-clear`}
                            aria-label={`${formName}-on-clear`}
                            onClick={onClickClear}
                            disabled={isDisabled}>
                            <FontAwesomeIcon icon="times" />
                        </button>
                        <div className="combo-box__vertical-line" />
                        <button
                            className="combo-box__button"
                            type="button"
                            name={`${formName}-on-toggle`}
                            aria-label={`${formName}-on-toggle`}
                            onClick={onClickToggle}
                            disabled={isDisabled}>
                            <FontAwesomeIcon icon={chevron} />
                        </button>
                    </div>
                </div>
                <div className="combo-box__options-container">
                    <ul className="combo-box__options" id={`${formName}-list`}>
                        { openOptions && options }
                    </ul>
                </div>
            </label>
        </div>
    );
};

ComboBox.propTypes = propTypes;
export default ComboBox;
