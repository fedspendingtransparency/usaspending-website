/**
 * SecondaryAwardType.jsx
 * Created by Emily Gullo 11/02/2016
 **/

import React from 'react';

const propTypes = {
    subList: React.PropTypes.array
};

export default class SecondaryAwardType extends React.Component {


    render() {
        const secondaryAwardList = (this.props.subList.map((subList, index) =>
            <div key={index} className="secondaryAwardTypeOption subList">
                <input type="checkbox" id={subList} value={subList} />
                <label htmlFor={subList}>{subList}</label>
            </div>));

        return (
            <div>
                { secondaryAwardList }
            </div>
        );
    }
}
SecondaryAwardType.propTypes = propTypes;
