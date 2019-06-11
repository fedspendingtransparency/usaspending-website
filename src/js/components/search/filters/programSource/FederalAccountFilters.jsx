/**
 * FederalAccountFilters.jsx
 * Created by Lizzie Salita 6/6/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import SourceSelectFilter from './SourceSelectFilter';

const propTypes = {
    updateComponent: PropTypes.func,
    components: PropTypes.object,
    createFilter: PropTypes.func
};

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

export default class FederalAccountFilters extends React.Component {
    render() {
        const federalFilters = filters.map((filter) =>
            (<SourceSelectFilter
                key={filter.code}
                updateComponent={this.props.updateComponent}
                {...filter} />));
        return (
            <div className="program-source-tab">
                <form className="program-source-components">
                    <div className="program-source-components__heading">
                        Federal Account Components
                    </div>
                    {federalFilters}
                    <button
                        disabled={!this.props.components.aid}
                        onClick={this.props.createFilter}
                        className="program-source-components__button">
                        Add Filter
                    </button>
                </form>
            </div>
        );
    }
}

FederalAccountFilters.propTypes = propTypes;
