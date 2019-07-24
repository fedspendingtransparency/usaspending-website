/**
 * TreasuryAccountFilters.jsx
 * Created by Lizzie Salita 7/24/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import EntityWarning from 'components/search/filters/location/EntityWarning';
import ProgramSourceAutocompleteContainer from 'containers/search/filters/programSource/ProgramSourceAutocompleteContainer';
import { treasuryAccountComponents } from 'dataMapping/search/programSourceComponents';

const propTypes = {
    updateComponent: PropTypes.func,
    components: PropTypes.object,
    applyFilter: PropTypes.func,
    dirtyFilters: PropTypes.symbol
};

export default class TreasuryAccountFilters extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showWarning: false
        };

        this.showWarning = this.showWarning.bind(this);
        this.hideWarning = this.hideWarning.bind(this);
    }

    showWarning() {
        if (!this.props.components.aid) {
            this.setState({ showWarning: true });
        }
    }

    hideWarning() {
        if (this.state.showWarning) {
            this.setState({ showWarning: false });
        }
    }

    render() {
        const treasuryFilters = treasuryAccountComponents.map((option) => (
            <ProgramSourceAutocompleteContainer
                dirtyFilters={this.props.dirtyFilters}
                key={option.code}
                component={option}
                selectedSources={this.props.components}
                updateComponent={this.props.updateComponent} />
        ));

        const components = this.props.components;
        const enabled = components.aid;

        return (
            <div className="program-source-tab">
                <form className="program-source-components">
                    <div className="program-source-components__heading">
                        Treasury Account Components
                    </div>
                    {treasuryFilters}
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
                            <EntityWarning message="Enter a value for AID" />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

TreasuryAccountFilters.propTypes = propTypes;
