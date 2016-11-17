/**
 * AwardType.jsx
 * Created by Emily Gullo 11/01/2016
 **/

import React from 'react';

import PrimaryAwardType from './PrimaryAwardType';
import FilterExpandButton from '../../FilterExpandButton';

const defaultProps = {
    awardTypes: [
        {
            id: 'award-contracts',
            name: 'Contracts',
            filters: ['A', 'D', 'C', 'B']
        },
        {
            id: 'award-grants',
            name: 'Grants',
            filters: ['02', '03', '04', '05']
        },
        {
            id: 'award-direct-payments',
            name: 'Direct Payments',
            filters: ['06', '10']
        },
        {
            id: 'award-loans',
            name: 'Loans',
            filters: ['07', '08']
        },
        {
            id: 'award-insurance',
            name: 'Insurance',
            filters: [],
            value: '09'
        }
    ],
    hideArrow: true,
    arrowState: 'collapsed'
};

const propTypes = {
    awardTypes: React.PropTypes.arrayOf(React.PropTypes.object),
    toggleFilter: React.PropTypes.func,
    hideArrow: React.PropTypes.bool,
    arrowState: React.PropTypes.string,
    showFilter: React.PropTypes.bool
};

export default class AwardType extends React.Component {

    render() {
        let awardTypes = null;
        if (this.props.showFilter === true) {
            awardTypes = (
                this.props.awardTypes.map((type, index) =>
                    <PrimaryAwardType {...type} {...this.props} key={index} />
            ));
        }


        return (
            <div className="award-type-filter search-filter">
                <FilterExpandButton
                    hidden={this.props.hideArrow}
                    toggleFilter={this.props.toggleFilter}
                    arrowState={this.props.arrowState} />
                <h6 className="filter-header">Award Type</h6>
                <form>
                    <ul className="award-types">
                        {awardTypes}
                    </ul>
                </form>
            </div>
        );
    }
}
AwardType.defaultProps = defaultProps;
AwardType.propTypes = propTypes;
