/**
 * AwardType.jsx
 * Created by Emily Gullo 11/01/2016
 **/

import React from 'react';

const defaultProps = {
    awardTypes: [
        'Contracts',
        'Grants',
        'Direct Payments',
        'Loans'
    ]
};

const propTypes = {
    awardTypes: React.PropTypes.arrayOf(React.PropTypes.string)
};

export default class AwardType extends React.Component {
    render() {
        const awardList = this.props.awardTypes.map((name, i) =>
            <checkbox type="checkbox" name={name} value={name} key={i} />
        );

        return (
            <div>
                <h4>Award Type</h4>
                <form>
                    {awardList}
                </form>
            </div>
        );
    }
}
AwardType.defaultProps = defaultProps;
AwardType.propTypes = propTypes;
