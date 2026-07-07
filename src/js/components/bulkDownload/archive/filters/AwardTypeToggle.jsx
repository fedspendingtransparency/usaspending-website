import React from 'react';
import PropTypes from "prop-types";

const propTypes = {
    filters: PropTypes.object,
    updateFilter: PropTypes.func
};

const AwardTypeToggle = ({ updateFilter, filters }) => {
    const onAwardTypeSelect = (e) => {
        e.preventDefault();
        const target = e.target;
        updateFilter('type', {
            name: target.value,
            display: target.name
        });
    }

    return (
        <div className="award-type__container">
            View Award Type:
            <div className="award-type__buttons">
                <button
                    className={`view-button${
                        filters.type.name === "contracts" ? " active" : ""
                    }`}
                    value={"contracts"}
                    title={"Contracts"}
                    aria-label={"Contracts"}
                    name={"Contracts"}
                    onClick={onAwardTypeSelect}>
                    Contracts
                </button>
                <button
                    className={`view-button${
                        filters.type.name === "assistance" ? " active" : ""
                    }`}
                    value={"assistance"}
                    title={"Financial Assistance"}
                    aria-label={"Financial Assistance"}
                    name={"Financial Assistance"}
                    onClick={onAwardTypeSelect}>
                    Financial Assistance
                </button>
            </div>
        </div>
    );
};

AwardTypeToggle.propTypes = propTypes;
export default AwardTypeToggle;
