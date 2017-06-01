/**
 * AwardAmountSearch.jsx
 * Created by michaelbray on 3/7/17.
 */

import React from 'react';
import { awardRanges, searchTypes } from 'dataMapping/search/awardAmount';

import * as AwardAmountHelper from 'helpers/awardAmountHelper';
import PrimaryCheckboxType from 'components/sharedComponents/checkbox/PrimaryCheckboxType';
import SpecificAwardAmountItem from './SpecificAwardAmountItem';

const propTypes = {
    selectAwardRange: React.PropTypes.func,
    awardAmountRanges: React.PropTypes.object,
    awardAmounts: React.PropTypes.object
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
                    toggleCheckboxType={this.toggleSelection}
                    enableAnalytics />);
        });

        return (
            <div className="award-amount-filter search-filter checkbox-type-filter">
                <ul className="award-amounts checkbox-types">
                    {awardAmountRangeItems}
                    <SpecificAwardAmountItem
                        {...this.props}
                        searchSpecificRange={this.searchSpecificRange} />
                </ul>
            </div>
        );
    }
}

AwardAmountSearch.propTypes = propTypes;
AwardAmountSearch.defaultProps = defaultProps;
