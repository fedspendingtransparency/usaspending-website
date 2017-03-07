/**
 * AwardAmountSearch.jsx
 * Created by michaelbray on 3/7/17.
 */

import React from 'react';
import { awardRanges } from 'dataMapping/search/awardAmount';

import AwardAmountItem from './AwardAmountItem';
import SpecificAwardAmountItem from './SpecificAwardAmountItem';

const propTypes = {
    awardAmountRanges: React.PropTypes.object
};

const defaultProps = {
    awardAmountRanges: awardRanges
};

export default class AwardAmountSearch extends React.Component {
    render() {
        const awardAmountRangeItems = [];
        Object.keys(this.props.awardAmountRanges).forEach((key) => {
            awardAmountRangeItems.push(
                <AwardAmountItem
                    {...this.props}
                    values={this.props.awardAmountRanges[key]}
                    key={`award-range-${key}`}
                    rangeID={key} />);
        });

        return (
            <div className="award-amount-filter search-filter">
                <ul className="award-amounts">
                    {awardAmountRangeItems}
                    <SpecificAwardAmountItem />
                </ul>
            </div>
        );
    }
}

AwardAmountSearch.propTypes = propTypes;
AwardAmountSearch.defaultProps = defaultProps;
