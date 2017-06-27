/**
 * OtherFilters.jsx
 * Created by Emily GUllo on 6/23/17.
 */

import React from 'react';
import ContractFilterContainer from 'containers/search/filters/ContractFilterContainer';

export default class OtherFilters extends React.Component {

    render() {
        return (
            <div className="other-filters">
                <ContractFilterContainer />
            </div>
        );
    }
}

