/**
 * AwardAmountSearch.jsx
 * Created by michaelbray on 3/7/17.
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { awardRanges } from 'dataMapping/search/awardAmount';
import { reduce, each } from 'lodash';
import { formatAwardAmountRange } from 'helpers/awardAmountHelper';
import SelectedAwardAmountBound from
    'components/search/filters/awardAmount/SelectedAwardAmountBound';
import PrimaryCheckboxType from 'components/sharedComponents/checkbox/PrimaryCheckboxType';
import SubmitHint from 'components/sharedComponents/filterSidebar/SubmitHint';
import SpecificAwardAmountItem from './SpecificAwardAmountItem';

const propTypes = {
    selectAwardRange: PropTypes.func,
    awardAmountRanges: PropTypes.object,
    awardAmounts: PropTypes.object,
    dirtyFilters: PropTypes.symbol,
    removeFilter: PropTypes.func,
    searchV2: PropTypes.bool
};

const AwardAmountSearch = ({
    selectAwardRange,
    awardAmountRanges = awardRanges,
    awardAmounts,
    dirtyFilters,
    removeFilter,
    searchV2
}) => {
    const [hint, setHint] = useState(null);


    const toggleSelection = (selection) => {
        selectAwardRange(selection);
    };

    const searchSpecificRange = (selections) => {
        const min = selections[0];
        const max = selections[1];
        selectAwardRange({ value: [min, max] });
    };

    const awardAmountCheckboxes = () => reduce(awardAmountRanges, (result, value, key) => {
        const name = formatAwardAmountRange(
            value, 0);
        result.push(
            (<PrimaryCheckboxType
                id={`award-${key}`}
                name={name}
                value={key}
                filterType="Award Amount"
                types={awardRanges}
                selectedCheckboxes={awardAmounts}
                toggleCheckboxType={toggleSelection} />)
        );
        return result;
    }, []);

    const removeFilterFn = (name) => {
        removeFilter(name);
    };

    const stagedFilters = () => {
        const filterObject = awardAmounts.toObject();
        let stagedFilter;
        let name;
        each(filterObject, (val, key) => {
            stagedFilter = val;
            name = key;
        });
        if (!stagedFilter) return null;
        const label = formatAwardAmountRange(stagedFilter);
        return (
            <SelectedAwardAmountBound
                removeFilter={removeFilterFn}
                name={name}
                label={label} />
        );
    };

    useEffect(() => {
        if (dirtyFilters && hint) {
            hint.showHint();
        }
    }, [dirtyFilters, hint]);

    const stagedFiltersResult = stagedFilters();
    const awardAmountRangeItems = awardAmountCheckboxes();

    return (
        <div className="search-filter checkbox-type-filter">
            <div className="filter-item-wrap">
                <ul className="award-amounts checkbox-types">
                    {awardAmountRangeItems}
                    <SpecificAwardAmountItem searchSpecificRange={searchSpecificRange} />
                </ul>
                { !searchV2 &&
                    <SubmitHint
                        ref={(component) => {
                            setHint(component);
                        }} />
                }
                <div
                    className="selected-filters"
                    role="status">
                    {stagedFiltersResult}
                </div>
            </div>
        </div>
    );
};

AwardAmountSearch.propTypes = propTypes;
export default AwardAmountSearch;
