/**
 * EntityDropdownAutocomplete.jsx
 * Created by Lizzie Salita 5/6/19
 */

import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ExclamationTriangle } from 'components/sharedComponents/icons/Icons';
import useEventListener from "../../../../hooks/useEventListener";

const propTypes = {
    searchString: PropTypes.string,
    placeholder: PropTypes.string,
    openDropdown: PropTypes.func,
    handleTextInputChange: PropTypes.func,
    handleOnKeyDown: PropTypes.func,
    handleOnKeyUp: PropTypes.func,
    toggleDropdown: PropTypes.func,
    enabled: PropTypes.bool,
    loading: PropTypes.bool,
    showDisclaimer: PropTypes.bool,
    onClear: PropTypes.func,
    isClearable: PropTypes.bool,
    searchIcon: PropTypes.bool
};

const EntityDropdownAutocomplete = ({
    searchString,
    enabled = true,
    openDropdown,
    handleTextInputChange,
    toggleDropdown,
    placeholder,
    loading,
    handleOnKeyDown,
    handleOnKeyUp,
    showDisclaimer,
    onClear,
    isClearable,
    searchIcon = false
}) => {
    const xRef = useRef(null);

    const onKeydownClear = (e) => {
        e.stopPropagation();
        if (e.type === 'change' || e?.key === 'Enter') {
            onClear();
        }
    };

    useEventListener('keydown', onKeydownClear, xRef);

    return (
        <div className="autocomplete__input">
            {searchIcon && <div className="search-icon"><FontAwesomeIcon icon="search" /></div>}
            <input
                className="geo-entity-dropdown__input"
                disabled={!enabled}
                type="text"
                value={searchString}
                onClick={openDropdown}
                onKeyDown={handleOnKeyDown}
                onKeyUp={handleOnKeyUp}
                onChange={handleTextInputChange}
                placeholder={placeholder} />
            <div className="icon">
                {loading && <FontAwesomeIcon onClick={toggleDropdown} icon="spinner" spin />}
                {!loading && showDisclaimer && <ExclamationTriangle alt="warning" />}
                {
                    isClearable &&
                    searchString &&
                    <FontAwesomeIcon tabIndex="0" onClick={onClear} icon="times" ref={xRef} />
                }
            </div>
        </div>
    );
};

EntityDropdownAutocomplete.propTypes = propTypes;

export default EntityDropdownAutocomplete;
