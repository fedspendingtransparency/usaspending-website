/**
 * AwardAmountSearch.jsx
 * Created by michaelbray on 3/7/17.
 */

import React from 'react';
import { awardRanges, searchTypes } from 'dataMapping/search/awardAmount';

import * as AwardAmountHelper from 'helpers/awardAmountHelper';
import AwardAmountItem from './AwardAmountItem';
import SpecificAwardAmountItem from './SpecificAwardAmountItem';

const propTypes = {
    selectAwardRange: React.PropTypes.func,
    awardAmountRanges: React.PropTypes.object
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
        this.props.selectAwardRange(selection.target.value, searchTypes.RANGE);
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
                <AwardAmountItem
                    {...this.props}
                    values={this.props.awardAmountRanges[key]}
                    key={`award-range-${key}`}
                    rangeID={key}
                    toggleSelection={this.toggleSelection} />);
        });

        return (
            <div className="award-amount-filter search-filter">
                <ul className="award-amounts">
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
