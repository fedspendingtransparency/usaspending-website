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
    removeFilter: PropTypes.func
};

const defaultProps = {
    awardAmountRanges: awardRanges
};

const AwardAmountSearch = (props) => {
    const [hint, setHint] = useState(null);


    const toggleSelection = (selection) => {
        props.selectAwardRange(selection);
    };

    const searchSpecificRange = (selections) => {
        const min = selections[0];
        const max = selections[1];
        props.selectAwardRange({ value: [min, max] });
    };

    const awardAmountCheckboxes = () => {
        const { awardAmountRanges, awardAmounts } = props;
        return reduce(awardAmountRanges, (result, value, key) => {
            const name = formatAwardAmountRange(
                value, 0);
            result.push(
                (<PrimaryCheckboxType
                    {...props}
                    key={key}
                    id={`award-${key}`}
                    name={name}
                    value={key}
                    types={awardRanges}
                    code={value}
                    filterType="Award Amount"
                    selectedCheckboxes={awardAmounts}
                    toggleCheckboxType={toggleSelection} />)
            );
            return result;
        }, []);
    };

    const removeFilter = (name) => {
        const { removeFilterProp } = props;
        removeFilterProp(name);
    };

    const stagedFilters = () => {
        const filterObject = props.awardAmounts.toObject();
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

    useEffect(() => {
        if (props.dirtyFilters && hint) {
            hint.showHint();
        }
    }, [props.dirtyFilters]);

    const stagedFiltersResult = stagedFilters();
    const awardAmountRangeItems = awardAmountCheckboxes();

    return (
        <div className="search-filter checkbox-type-filter">
            <div className="filter-item-wrap">
                <ul className="award-amounts checkbox-types">
                    {awardAmountRangeItems}
                    <SpecificAwardAmountItem
                        {...props}
                        searchSpecificRange={searchSpecificRange} />
                </ul>
                <SubmitHint
                    ref={(component) => {
                        setHint(component);
                    }} />
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
AwardAmountSearch.defaultProps = defaultProps;
export default AwardAmountSearch;
