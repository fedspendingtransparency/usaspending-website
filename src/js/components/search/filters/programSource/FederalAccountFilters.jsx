/**
 * FederalAccountFilters.jsx
 * Created by Lizzie Salita 6/6/19
 */

import React from 'react';
import SourceSelectFilter from './SourceSelectFilter';

const filters = [
    {
        label: 'Agency Identifier',
        code: 'aid',
        characterLimit: 3,
        required: true
    },
    {
        label: 'Main Account Code',
        code: 'main',
        characterLimit: 4,
        required: false
    },
    {
        label: 'Sub-Account Code',
        code: 'sub',
        characterLimit: 3,
        required: false
    }
];
export class FederalAccountFilters extends React.Component {
    render() {
        const federalFilters = filters.map((filter) => <SourceSelectFilter {...filter} />);
        return (
            <div className="program-source-tab">
                <form className="program-source-components">
                    <div className="program-source-components__heading">
                        Federal Account Components
                    </div>
                    {federalFilters}
                </form>
            </div>
        );
    }
}

export default FederalAccountFilters;
