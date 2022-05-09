/**
 * AwardAmountSearch.jsx
 * Created by michaelbray on 3/7/17.
 */

import React from 'react';
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

export default class AwardAmountSearch extends React.Component {
    constructor(props) {
        super(props);

        this.toggleSelection = this.toggleSelection.bind(this);
        this.searchSpecificRange = this.searchSpecificRange.bind(this);
        this.removeFilter = this.removeFilter.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.dirtyFilters && prevProps.dirtyFilters !== this.props.dirtyFilters) {
            if (this.hint) {
                this.hint.showHint();
            }
        }
    }

    toggleSelection(selection) {
        this.props.selectAwardRange(selection);
    }

    searchSpecificRange(selections) {
        const min = selections[0];
        const max = selections[1];
        this.props.selectAwardRange({ value: [min, max] });
    }

    awardAmountCheckboxes() {
        const { awardAmountRanges, awardAmounts } = this.props;
        return reduce(awardAmountRanges, (result, value, key) => {
            const name = formatAwardAmountRange(
                value, 0);
            result.push(
                (<PrimaryCheckboxType
                    {...this.props}
                    key={key}
                    id={`award-${key}`}
                    name={name}
                    value={key}
                    types={awardRanges}
                    code={value}
                    filterType="Award Amount"
                    selectedCheckboxes={awardAmounts}
                    toggleCheckboxType={this.toggleSelection} />)
            );
            return result;
        }, []);
    }

    stagedFilters() {
        const filterObject = this.props.awardAmounts.toObject();
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
                removeFilter={this.removeFilter}
                name={name}
                label={label} />
        );
    }

    removeFilter(name) {
        const { removeFilter } = this.props;
        removeFilter(name);
    }

    render() {
        const awardAmountRangeItems = this.awardAmountCheckboxes();
        const stagedFilters = this.stagedFilters();
        return (
            <div className="search-filter checkbox-type-filter">
                <div className="filter-item-wrap">
                    <ul className="award-amounts checkbox-types">
                        {awardAmountRangeItems}
                        <SpecificAwardAmountItem
                            {...this.props}
                            searchSpecificRange={this.searchSpecificRange} />
                    </ul>
                    <SubmitHint
                        ref={(component) => {
                            this.hint = component;
                        }} />
                    <div
                        className="selected-filters"
                        role="status">
                        {stagedFilters}
                    </div>
                </div>
            </div>
        );
    }
}

AwardAmountSearch.propTypes = propTypes;
AwardAmountSearch.defaultProps = defaultProps;
