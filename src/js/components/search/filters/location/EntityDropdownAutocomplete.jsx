/**
 * EntityDropdownAutocomplete.jsx
 * Created by Lizzie Salita 5/6/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ExclamationTriangle } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    searchString: PropTypes.string,
    placeholder: PropTypes.string,
    openDropdown: PropTypes.func,
    handleTextInputChange: PropTypes.func,
    handleOnKeyDown: PropTypes.func,
    handleOnKeyUp: PropTypes.func,
    toggleDropdown: PropTypes.func,
    context: PropTypes.shape({}), // the $this variable of the parent, used to create a ref
    expanded: PropTypes.bool,
    enabled: PropTypes.bool,
    loading: PropTypes.bool,
    showDisclaimer: PropTypes.bool,
    onClear: PropTypes.func,
    isClearable: PropTypes.bool
};

const defaultProps = {
    enabled: true
};

// eslint-disable-next-line import/prefer-default-export
export const EntityDropdownAutocomplete = ({
    searchString,
    enabled,
    openDropdown,
    handleTextInputChange,
    toggleDropdown,
    placeholder,
    context, // the $this variable
    loading,
    handleOnKeyDown,
    handleOnKeyUp,
    showDisclaimer,
    onClear,
    isClearable
}) => (
    <div className="autocomplete__input">
        <input
            className="geo-entity-dropdown__input"
            disabled={!enabled}
            type="text"
            value={searchString}
            onClick={openDropdown}
            onKeyDown={handleOnKeyDown}
            onKeyUp={handleOnKeyUp}
            onChange={handleTextInputChange}
            placeholder={placeholder}
            ref={(dropdown) => {
                const self = context;
                self.dropdown = dropdown;
            }} />
        <div className="icon">
            {loading && <FontAwesomeIcon onClick={toggleDropdown} icon="spinner" spin />}
            {!loading && showDisclaimer && <ExclamationTriangle alt="warning" />}
            {isClearable && searchString && <FontAwesomeIcon tabIndex="0" onClick={onClear} icon="times" />}
        </div>
    </div>
);

EntityDropdownAutocomplete.propTypes = propTypes;
EntityDropdownAutocomplete.defaultProps = defaultProps;
