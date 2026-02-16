/**
 * AwardAmountSearch.jsx
 * Created by michaelbray on 3/7/17.
 */

import React from 'react';
import { reduce, each } from 'lodash-es';
import { useDispatch, useSelector } from "react-redux";

import { awardRanges } from 'dataMapping/search/awardAmount';
import { formatAwardAmountRange } from 'helpers/awardAmountHelper';
import SelectedAwardAmountBound from
    'components/search/filters/awardAmount/SelectedAwardAmountBound';
import PrimaryCheckboxType from 'components/sharedComponents/checkbox/PrimaryCheckboxType';
import { updateAwardAmounts, updateGenericFilter } from "redux/actions/search/searchFilterActions";
import SpecificAwardAmountItem from './SpecificAwardAmountItem';

const AwardAmountSearch = () => {
    const awardAmounts = useSelector((state) => state.filters.awardAmounts);
    const dispatch = useDispatch();

    const removeFilter = (key) => {
        const newValue = awardAmounts.delete(key);
        dispatch(updateGenericFilter({
            type: 'awardAmounts',
            value: newValue
        }));
    };

    const toggleSelection = (selection) => {
        dispatch(updateAwardAmounts(selection));
    };

    const searchSpecificRange = (selections) => {
        const min = selections[0];
        const max = selections[1];
        dispatch(updateAwardAmounts({ value: [min, max] }));
    };

    const awardAmountCheckboxes = () => reduce(awardRanges, (result, value, key) => {
        const name = formatAwardAmountRange(
            value, 0);
        result.push(
            <PrimaryCheckboxType
                id={`award-${key}`}
                name={name}
                value={key}
                filterType="Award Amount"
                types={awardRanges}
                selectedCheckboxes={awardAmounts}
                toggleCheckboxType={toggleSelection}
                key={key} />
        );
        return result;
    }, []);

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
                removeFilter={removeFilter}
                name={name}
                label={label} />
        );
    };

    const stagedFiltersResult = stagedFilters();
    const awardAmountRangeItems = awardAmountCheckboxes();

    return (
        <div className="award-amount-filter">
            <div className="search-filter checkbox-type-filter">
                <div className="filter-item-wrap">
                    <ul className="award-amounts checkbox-types">
                        {awardAmountRangeItems}
                        <SpecificAwardAmountItem searchSpecificRange={searchSpecificRange} />
                    </ul>
                    <div
                        className="selected-filters"
                        role="status">
                        {stagedFiltersResult}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AwardAmountSearch;
