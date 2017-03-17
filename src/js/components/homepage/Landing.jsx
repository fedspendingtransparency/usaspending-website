/**
 * Landing.jsx
 * Created by Destin Frasier 03/17/2017
 **/

import React from 'react';

const propTypes = {
    budgetCategories: React.PropTypes.object
};

export default class Landing extends React.Component {

    render() {
        return (
            <div className="landingSectionWrap">
                In 2016, the U.S. government spent $3.85 Trillion Dollars 
            </div>
        );
    }
}
