/**
 * AccountLevelFilter.jsx
 * Created by Lizzie Salita 4/23/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import FilterSectionTitle from 'components/bulkDownload/FilterSelectionTitle';

const propTypes = {
    accountLevels: PropTypes.array,
    currentAccountLevel: PropTypes.string,
    updateFilter: PropTypes.func
};

const AccountLevelFilter = ({
    accountLevels,
    currentAccountLevel,
    updateFilter
}) => {
    const onChange = (e) => {
        const target = e.target;
        updateFilter('accountLevel', target.value);
    }

    const accountLvls = accountLevels.map((level) => (
        <div className="radio" key={level.name}>
            <label  className="radio-label account" htmlFor="account-level">
                <input
                    type="radio"
                    aria-label={level.name}
                    value={level.name}
                    name="account-level"
                    checked={currentAccountLevel === level.name}
                    onChange={onChange} />
                <div className="radio-container"> 
                    {level.label}
                    <div className="radio-description">
                        {level.description}
                    </div>  
                </div>
            </label>
        </div>
    ));

    return (
        <div className="download-filter">
            <FilterSectionTitle type="account" />
            <div className="download-filter__content account">
                <div className="input-container">
                    {accountLvls}
                </div>
            </div>
        </div>
    );
}

AccountLevelFilter.propTypes = propTypes;
export default AccountLevelFilter;
