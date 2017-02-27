/**
 * DetailsTableTabs.jsx
 * Created by Elizabeth Dabbs 2/22/17
 **/

import React from 'react';

import DetailsTableTabItem from './DetailsTableTabItem';

export default class DetailsTableTabs extends React.Component {
    render() {
        const tabs = <DetailsTableTabItem />;

        return (
            <div className="table-tabs">
                {tabs}
            </div>
        );
    }
}

