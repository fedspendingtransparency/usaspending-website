import React from "react";
import PropTypes from "prop-types";

const propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    label: PropTypes.string,
    description: PropTypes.string
}

const BulkDownloadRadioButton = ({
    name,
    value,
    checked,
    onChange,
    label,
    description = false
}) => {
    // prevents submission on enter keydown
    const onKeyDown = (e) => {
        if (e.keyCode === 13) e.preventDefault();
    };

    return (
        <div className="radio">
            <label className="radio-label" htmlFor="periodType">
                <input
                    type="radio"
                    aria-label={value}
                    value={value}
                    name={name}
                    onKeyDown={onKeyDown}
                    checked={checked}
                    onChange={onChange}/>
                <div className="radio-container">
                    {label}
                    {description &&
                        <div className="radio-description">
                            {description}
                        </div>
                    }
                </div>
            </label>
        </div>
    );
};

BulkDownloadRadioButton.propTypes = propTypes;
export default BulkDownloadRadioButton;
