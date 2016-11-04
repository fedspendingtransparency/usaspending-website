/**
 * AwardType.jsx
 * Created by Emily Gullo 11/01/2016
 **/

import React from 'react';

import PrimaryAwardType from './PrimaryAwardType';

const defaultProps = {
    awardTypes: [
        {
            id: 'award-contracts',
            name: 'Contracts',
            filters: ['A', 'D', 'C', 'B'],
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
    ]
};

const propTypes = {
    awardTypes: React.PropTypes.arrayOf(React.PropTypes.object)
};

export default class AwardType extends React.Component {

    render() {
        const awardTypes = this.props.awardTypes.map((type, index) =>
            <PrimaryAwardType {...type} {...this.props} key={index} />
        );

        return (
            <div className="awardTypeFilter">
                <b>Award Type</b>
                <form>
                    {awardTypes}
                </form>
            </div>
        );
    }
}
AwardType.defaultProps = defaultProps;
AwardType.propTypes = propTypes;
