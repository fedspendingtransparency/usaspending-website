/**
 * RecipientName.jsx
 * Created by Mike Bray 11/14/2017
 **/

import React from 'react';
import PropTypes from 'prop-types';

import Warning from 'components/sharedComponents/autocomplete/Warning';
import IndividualSubmit from 'components/search/filters/IndividualSubmit';
import { DUNS_LABEL } from 'GlobalConstants';

const propTypes = {
    searchRecipient: PropTypes.func,
    changedInput: PropTypes.func,
    value: PropTypes.string,
    showWarning: PropTypes.bool
};

const RecipientName = ({
    searchRecipient, changedInput, value, showWarning
}) => {
    const generateWarning = () => {
        if (showWarning) {
            let errorProps = {};

            if (value && value.length < 3) {
                errorProps = {
                    header: 'Error',
                    description: 'Please enter more than two characters.'
                };
            }
            else {
                errorProps = {
                    header: 'Duplicate Recipient',
                    description: 'You have already selected that recipient.'
                };
            }

            return <Warning {...errorProps} />;
        }

        return null;
    };

    const localSearchRecipient = (e) => {
        e.preventDefault();
        searchRecipient();
    };

    return (
        <div className="recipient-filter search-filter">
            <form onSubmit={localSearchRecipient}>
                <div className="recipient-filter-item-wrap">
                    <input
                        id="search"
                        type="text"
                        className="recipient-input"
                        placeholder={`Recipient Name, UEI, or ${DUNS_LABEL}DUNS`}
                        value={value}
                        onChange={changedInput} />
                    <IndividualSubmit
                        className="recipient-submit"
                        onClick={localSearchRecipient}
                        label="Filter by recipient name" />
                </div>
            </form>
            {generateWarning()}
        </div>
    );
};

RecipientName.propTypes = propTypes;
export default RecipientName;
