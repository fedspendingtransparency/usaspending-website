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
    applyFilter: PropTypes.func
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
        required: true
    }
];

export default class FederalAccountFilters extends React.Component {
    render() {
        const federalFilters = filters.map((filter) => (
            <SourceSelectFilter
                key={filter.code}
                updateComponent={this.props.updateComponent}
                selectedSources={[this.props.components[filter.code]]}
                {...filter} />
        ));

        const components = this.props.components;
        const enabled = components.aid && components.main;

        return (
            <div className="program-source-tab">
                <form className="program-source-components">
                    <div className="program-source-components__heading">
                        Federal Account Components
                    </div>
                    {federalFilters}
                    <button
                        disabled={!enabled}
                        onClick={this.props.applyFilter}
                        className="program-source-components__button">
                        Add Filter
                    </button>
                </form>
            </div>
        );
    }
}

FederalAccountFilters.propTypes = propTypes;
