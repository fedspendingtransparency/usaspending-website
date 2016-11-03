/**
 * AwardType.jsx
 * Created by Emily Gullo 11/01/2016
 **/

import React from 'react';
import PrimaryAwardType from './PrimaryAwardType';

const defaultProps = {
    awardTypes: [
        {
            name: 'Contracts',
            subValues: [
                'Subtype 1',
                'Subtype 2'
            ]
        },
        {
            name: 'Grants',
            subValues: [
                'Subtype 1',
                'Subtype 2'
            ]
        },
        {
            name: 'Direct Payments',
            subValues: [
                'Subtype 1',
                'Subtype 2'
            ]
        },
        {
            name: 'Loans',
            subValues: [
                'Subtype 1',
                'Subtype 2'
            ]
        }
    ]
};

const propTypes = {
    awardTypes: React.PropTypes.arrayOf(React.PropTypes.object)
};

export default class AwardType extends React.Component {

    render() {
        const awardTypes = this.props.awardTypes.map((type, index) =>
            <PrimaryAwardType name={type.name} subList={type.subValues} key={index} />
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
