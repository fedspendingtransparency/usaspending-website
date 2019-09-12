/**
 * AwardAmountSearch.jsx
 * Created by michaelbray on 3/7/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { awardRanges } from 'dataMapping/search/awardAmount';

import * as AwardAmountHelper from 'helpers/awardAmountHelper';
import PrimaryCheckboxType from 'components/sharedComponents/checkbox/PrimaryCheckboxType';
import SubmitHint from 'components/sharedComponents/filterSidebar/SubmitHint';
import SpecificAwardAmountItem from './SpecificAwardAmountItem';

const propTypes = {
    selectAwardRange: PropTypes.func,
    awardAmountRanges: PropTypes.array,
    awardAmounts: PropTypes.object,
    dirtyFilters: PropTypes.symbol
};

const defaultProps = {
    awardAmountRanges: awardRanges
};

export default class AwardAmountSearch extends React.Component {
    constructor(props) {
        super(props);

        this.toggleSelection = this.toggleSelection.bind(this);
        this.searchSpecificRange = this.searchSpecificRange.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.dirtyFilters && prevProps.dirtyFilters !== this.props.dirtyFilters) {
            if (this.hint) {
                this.hint.showHint();
            }
        }
    }

    toggleSelection(selection) {
        console.log(' Toggling : ', selection);
        this.props.selectAwardRange(selection);
    }

    searchSpecificRange(selections) {
        const min = AwardAmountHelper.ensureInputIsNumeric(selections[0]);
        const max = AwardAmountHelper.ensureInputIsNumeric(selections[1]);
        this.props.selectAwardRange([min, max]);
    }

    awareAmountCheckboxes() {
        const { awardAmountRanges, awardAmounts } = this.props;
        return awardAmountRanges.map((range) => {
            const { label, value } = range;
            const name = AwardAmountHelper.formatAwardAmountRange(
                value, { precision: 0 });
            return (
                <PrimaryCheckboxType
                    {...this.props}
                    key={label}
                    id={`award-${label}`}
                    name={name}
                    value={value}
                    types={awardRanges}
                    code={label}
                    filterType="Award Amount"
                    selectedCheckboxes={awardAmounts}
                    toggleCheckboxType={this.toggleSelection} />
            );
        });
    }

    render() {
        const awardAmountRangeItems = this.awareAmountCheckboxes();
        return (
            <div className="award-amount-filter search-filter checkbox-type-filter">
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
                </div>
            </div>
        );
    }
}

AwardAmountSearch.propTypes = propTypes;
AwardAmountSearch.defaultProps = defaultProps;
