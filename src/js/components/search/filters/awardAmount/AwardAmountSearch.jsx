/**
 * AwardAmountSearch.jsx
 * Created by michaelbray on 3/7/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { awardRanges, searchTypes } from 'dataMapping/search/awardAmount';

import * as AwardAmountHelper from 'helpers/awardAmountHelper';
import PrimaryCheckboxType from 'components/sharedComponents/checkbox/PrimaryCheckboxType';
import SubmitHint from 'components/sharedComponents/filterSidebar/SubmitHint';
import SpecificAwardAmountItem from './SpecificAwardAmountItem';

const propTypes = {
    selectAwardRange: PropTypes.func,
    awardAmountRanges: PropTypes.object,
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
        this.props.selectAwardRange(selection, searchTypes.RANGE);
    }

    searchSpecificRange(selections) {
        const min = AwardAmountHelper.ensureInputIsNumeric(selections[0]);
        const max = AwardAmountHelper.ensureInputIsNumeric(selections[1]);
        this.props.selectAwardRange([min, max], searchTypes.SPECIFIC);
    }

    render() {
        const awardAmountRangeItems = [];
        Object.keys(this.props.awardAmountRanges).forEach((key) => {
            awardAmountRangeItems.push(
                <PrimaryCheckboxType
                    {...this.props}
                    key={key}
                    id={`award-${key}`}
                    name={AwardAmountHelper.formatAwardAmountRange(
                        this.props.awardAmountRanges[key])}
                    value={key}
                    types={awardRanges}
                    code={key}
                    filterType="Award Amount"
                    selectedCheckboxes={this.props.awardAmounts}
                    toggleCheckboxType={this.toggleSelection} />);
        });

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
