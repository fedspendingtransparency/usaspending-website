import React, { memo, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

const propTypes = {
    inputValue: PropTypes.string.isRequired,
    setInputValue: PropTypes.func.isRequired,
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
    className: PropTypes.string
};

// eslint-disable-next-line prefer-arrow-callback
const ComboBox = memo(function ComboBox({
    inputValue,
    setInputValue,
    optionsArray,
    label,
    placeholder,
    formName,
    disabled,
    className
}) {
    const [openOptions, setOpenOptions] = useState(false);

    // 1) filter for inputValue 2) map to list item element
    const options = optionsArray
        .filter(({ text }) => text?.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1)
        .map(({ value, text }) => {
            const onClick = () => {
                setInputValue(text);
                setOpenOptions(false);
            };

            // primarily used for title options within dropdown
            const disabledOption = value.indexOf('disabled') !== -1;

            return (
                <li value={value} className="combo-box__options-item" key={value}>
                    <button
                        className="combo-box__option"
                        type="button"
                        aria-label={`${formName}-option-item`}
                        onClick={onClick}
                        disabled={disabledOption}>
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

    const chevron = openOptions ? "chevron-up" : "chevron-down";

    const isDisabledAndEmpty = disabled || optionsArray.length === 0;

    const inputValueEmpty = inputValue === '';

    const noSearchResults = options.length === 0 && !inputValueEmpty;

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
                        className="combo-box__input"
                        name={formName}
                        onChange={onChange}
                        placeholder={placeholder}
                        disabled={isDisabledAndEmpty} />
                    <div className={`combo-box__buttons-container${
                        inputValueEmpty ? ' empty' : ''
                    }`}>
                        { !inputValueEmpty && !disabled &&
                            <button
                                className="combo-box__button"
                                type="button"
                                name={`${formName}-on-clear`}
                                aria-label={`${formName}-on-clear`}
                                onClick={onClickClear}
                                disabled={isDisabledAndEmpty}>
                                <FontAwesomeIcon
                                    icon="times"
                                    className={`close-icon${disabled ? ' disabled' : ''}`} />
                            </button>
                        }
                        <div className="combo-box__vertical-line" />
                        <button
                            className="combo-box__button"
                            type="button"
                            name={`${formName}-on-toggle`}
                            aria-label={`${formName}-on-toggle`}
                            onClick={onClickToggle}
                            disabled={isDisabledAndEmpty}>
                            <FontAwesomeIcon
                                icon={chevron}
                                className={`chevron-icon${disabled ? ' disabled' : ''}`} />
                        </button>
                    </div>
                </div>
                <div className={`combo-box__options-container${label ? ' label' : ''}`}>
                    { openOptions &&
                        <ul className="combo-box__options" id={`${formName}-list`}>
                            { noSearchResults ?
                                <li
                                    value="no-result"
                                    className="combo-box__options-item"
                                    key="no-result">
                                    <div
                                        className="combo-box__option"
                                        aria-label={`${formName}-option-item`}>
                                        No results found
                                    </div>
                                </li>
                                :
                                options
                            }
                        </ul>
                    }
                </div>
            </label>
        </div>
    );
});

ComboBox.propTypes = propTypes;
export default ComboBox;
