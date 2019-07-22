/**
 * FederalAccountFilters.jsx
 * Created by Lizzie Salita 6/6/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import EntityWarning from 'components/search/filters/location/EntityWarning';
import ProgramSourceAutocompleteContainer from 'containers/search/filters/programSource/ProgramSourceAutocompleteContainer';

const propTypes = {
    updateComponent: PropTypes.func,
    components: PropTypes.object,
    applyFilter: PropTypes.func,
    dirtyFilters: PropTypes.symbol
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
    constructor(props) {
        super(props);

        this.state = {
            showWarning: false
        };

        this.showWarning = this.showWarning.bind(this);
        this.hideWarning = this.hideWarning.bind(this);
    }

    showWarning() {
        if (!this.props.components.aid || !this.props.components.main) {
            this.setState({ showWarning: true });
        }
    }

    hideWarning() {
        if (this.state.showWarning) {
            this.setState({ showWarning: false });
        }
    }

    render() {
        const federalFilters = filters.map((option) => (
            <ProgramSourceAutocompleteContainer
                dirtyFilters={this.props.dirtyFilters}
                key={option.code}
                component={option.code}
                filters={this.props.components}
                updateComponent={this.props.updateComponent}
                selectedSources={[this.props.components[option.code]]}
                {...option} />
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
                    <div
                        className="program-source-components__button-wrapper"
                        onFocus={this.showWarning}
                        onMouseEnter={this.showWarning}
                        onBlur={this.hideWarning}
                        onMouseLeave={this.hideWarning}>
                        <button
                            disabled={!enabled}
                            onClick={this.props.applyFilter}
                            className="program-source-components__button">
                            Add Filter
                        </button>
                        <div
                            className={`program-source-warning ${this.state.showWarning ? '' : 'hide'}`}
                            aria-hidden={enabled}>
                            <EntityWarning message="Enter values for AID and MAIN" />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

FederalAccountFilters.propTypes = propTypes;
