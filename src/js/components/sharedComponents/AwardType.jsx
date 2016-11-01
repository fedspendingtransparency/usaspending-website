/**
 * AwardType.jsx
 * Created by Emily Gullo 11/01/2016
 **/

import React from 'react';

const defaultProps = {
    awardTypes: [
        {
            name: 'Contracts',
            subValues: [
                'Subtype1',
                'Subtype2'
            ]
        },
        {
            name: 'Grants',
            subValues: [
                'Subtype1',
                'Subtype2'
            ]
        },
        {
            name: 'Direct Payments',
            subValues: [
                'Subtype1',
                'Subtype2'
            ]
        },
        {
            name: 'Loans',
            subValues: [
                'Subtype1',
                'Subtype2'
            ]
        }
    ]
};

const propTypes = {
    awardTypes: React.PropTypes.arrayOf(React.PropTypes.object)
};

export default class AwardType extends React.Component {

    render() {
        const awardList = this.props.awardTypes.map((al, i) => {
            const subList = al.subValues.map((j, k) =>
                <div key={k} className="subList"><input type="checkbox" id={j} value={j} />
                    <label htmlFor={j}>{j}</label>
                </div>
            );
            return (<div key={i} className="awardTypeOption">
                <input type="checkbox" id={al.name} value={al.name} />
                <label htmlFor={al.name}>{al.name}</label>
                { subList }</div>);
        });

        return (
            <div>
                <b>Award Type</b>
                <form>
                    {awardList}
                </form>
            </div>
        );
    }
}
AwardType.defaultProps = defaultProps;
AwardType.propTypes = propTypes;
