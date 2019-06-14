/**
 * FederalAccountFilters.jsx
 * Created by Lizzie Salita 6/6/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import SourceSelectFilter from './SourceSelectFilter';
import SourceTextFilter from './SourceTextFilter';

const propTypes = {
    updateComponent: PropTypes.func,
    components: PropTypes.object,
    createFilters: PropTypes.func
};

const filters = [
    {
        label: 'Agency Identifier',
        code: 'aid',
        characterLimit: 3,
        required: true,
        autocomplete: true
    },
    {
        label: 'Main Account Code',
        code: 'main',
        characterLimit: 4,
        required: false,
        autocomplete: false
    },
    {
        label: 'Sub-Account Code',
        code: 'sub',
        characterLimit: 3,
        required: false,
        autocomplete: false
    }
];

export default class FederalAccountFilters extends React.Component {
    render() {
        const federalFilters = filters.map((filter) => {
            if (filter.autocomplete) {
                return (
                    <SourceSelectFilter
                        key={filter.code}
                        updateComponent={this.props.updateComponent}
                        selectedSources={[this.props.components[filter.code]]}
                        createFilters={this.props.createFilters}
                        {...filter} />
                );
            }
            return (
                <SourceTextFilter
                    key={filter.code}
                    updateComponent={this.props.updateComponent}
                    value={this.props.components[filter.code]}
                    {...filter} />
            );
        });

        const components = this.props.components;
        const enabled = components.aid || components.main || components.sub;

        return (
            <div className="program-source-tab">
                <form className="program-source-components">
                    <div className="program-source-components__heading">
                        Federal Account Components
                    </div>
                    {federalFilters}
                    <button
                        disabled={!enabled}
                        onClick={this.props.createFilters}
                        className="program-source-components__button">
                        Add Filter(s)
                    </button>
                </form>
            </div>
        );
    }
}

FederalAccountFilters.propTypes = propTypes;
