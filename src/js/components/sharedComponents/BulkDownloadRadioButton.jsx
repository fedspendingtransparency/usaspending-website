import React from "react";
import PropTypes from "prop-types";

const propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    label: PropTypes.string,
    description: PropTypes.string,
    disabled: PropTypes.bool
}

const BulkDownloadRadioButton = ({
    name,
    value,
    checked,
    onChange = () => {},
    label,
    description = false,
    disabled = false
}) => {
    // prevents submission on enter keydown
    const onKeyDown = (e) => {
        if (e.keyCode === 13) e.preventDefault();
    };

    return (
        <div className="radio">
            <label className="radio-label" htmlFor={name}>
                <input
                    type="radio"
                    aria-label={value}
                    value={value}
                    name={name}
                    onKeyDown={onKeyDown}
                    checked={checked}
                    onChange={onChange}
                    disabled={disabled} />
                {description ?
                    <div className="radio-container">
                        {label}
                        <div className="radio-description">
                            {description}
                        </div>
                    </div> :
                    label
                }
            </label>
        </div>
    );
};

BulkDownloadRadioButton.propTypes = propTypes;
export default BulkDownloadRadioButton;
