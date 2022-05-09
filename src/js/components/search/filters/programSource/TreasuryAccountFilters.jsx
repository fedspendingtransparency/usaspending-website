/**
 * TreasuryAccountFilters.jsx
 * Created by Lizzie Salita 7/24/19
 */

import React from 'react';
import PropTypes from 'prop-types';

import EntityWarning from 'components/search/filters/location/EntityWarning';
import ProgramSourceAutocompleteContainer from 'containers/search/filters/programSource/ProgramSourceAutocompleteContainer';
import TASCheckboxTree from 'containers/search/filters/programSource/TASCheckboxTreeContainer';
import { treasuryAccountComponents } from 'dataMapping/search/programSourceComponents';

const propTypes = {
    updateComponent: PropTypes.func,
    components: PropTypes.object,
    applyFilter: PropTypes.func,
    dirtyFilters: PropTypes.symbol,
    clearSelection: PropTypes.func,
    activeTab: PropTypes.number
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
        if (!(this.props.components.aid && this.props.components.main)) {
            this.setState({ showWarning: true });
        }
    }

    hideWarning() {
        if (this.state.showWarning) {
            this.setState({ showWarning: false });
        }
    }

    generateFilters() {
        if (this.props.activeTab === 1) {
            return (
                <TASCheckboxTree />
            );
        }
        return treasuryAccountComponents.map((option) => (
            <ProgramSourceAutocompleteContainer
                dirtyFilters={this.props.dirtyFilters}
                key={option.code}
                component={option}
                selectedSources={this.props.components}
                updateComponent={this.props.updateComponent}
                clearSelection={this.props.clearSelection} />
        ));
    }

    render() {
        const { components, activeTab } = this.props;
        const enabled = components.aid && components.main;

        let message = "Enter values for AID and MAIN";
        if (components.aid && !components.main) {
            message = "Enter value for MAIN";
        }
        else if (!components.aid && components.main) {
            message = "Enter value for AID";
        }

        return (
            <div className="program-source-tab">
                <div className="program-source-components">
                    {activeTab === 2 && (
                        <div className="program-source-components__heading">
                            Treasury Account Components
                        </div>
                    )}
                    {this.generateFilters()}
                    <div
                        className="program-source-components__button-wrapper"
                        onFocus={this.showWarning}
                        onMouseEnter={this.showWarning}
                        onBlur={this.hideWarning}
                        onMouseLeave={this.hideWarning}>
                        {activeTab === 2 && (
                            <button
                                disabled={!enabled}
                                onClick={this.props.applyFilter}
                                className="program-source-components__button">
                                Add Filter
                            </button>
                        )}
                        <div
                            className={`program-source-warning ${this.state.showWarning ? '' : 'hide'}`}
                            aria-hidden={enabled}>
                            <EntityWarning message={message} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

TreasuryAccountFilters.propTypes = propTypes;
