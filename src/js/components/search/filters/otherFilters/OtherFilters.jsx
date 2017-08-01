/**
 * OtherFilters.jsx
 * Created by Emily GUllo on 6/23/17.
 */

import React from 'react';
import CFDASearchContainer from 'containers/search/filters/cfda/CFDASearchContainer';
import NAICSSearchContainer from 'containers/search/filters/naics/NAICSSearchContainer';
import PSCSearchContainer from 'containers/search/filters/psc/PSCSearchContainer';

export default class OtherFilters extends React.Component {

    render() {
        return (
            <div className="other-filters">
                <CFDASearchContainer />
                <NAICSSearchContainer />
                <PSCSearchContainer />
            </div>
        );
    }
}

