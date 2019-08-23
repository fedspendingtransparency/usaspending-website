/**
 * ProgramSourceSection.jsx
 * Created by Lizzie Salita 6/6/19
 */

import React from 'react';
import PropTypes from 'prop-types';

import SubmitHint from 'components/sharedComponents/filterSidebar/SubmitHint';
import TreasuryAccountFilters from './TreasuryAccountFilters';
import SelectedSources from './SelectedSources';

const propTypes = {
    selectedFederalComponents: PropTypes.object,
    selectedTreasuryComponents: PropTypes.object,
    updateFederalAccountComponents: PropTypes.func,
    updateTreasuryAccountComponents: PropTypes.func,
    dirtyFilters: PropTypes.symbol
};

export default class ProgramSourceSection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: 'treasury',
            components: {
                ata: '',
                aid: '',
                bpoa: '',
                epoa: '',
                a: '',
                main: '',
                sub: ''
            }
        };

        this.toggleTab = this.toggleTab.bind(this);
        this.updateComponent = this.updateComponent.bind(this);
        this.applyFilter = this.applyFilter.bind(this);
        this.removeFilter = this.removeFilter.bind(this);
        this.clearSelection = this.clearSelection.bind(this);
    }

    componentDidMount() {
        this.openDefaultTab();
    }

    componentDidUpdate(prevProps) {
        if (this.props.dirtyFilters && prevProps.dirtyFilters !== this.props.dirtyFilters) {
            if (this.hint) {
                this.hint.showHint();
            }
        }
    }

    updateComponent(field, value) {
        // Updates the component state
        const updatedComponents = Object.assign({}, this.state.components, {
            [field]: value
        });
        this.setState({
            components: updatedComponents
        });
    }

    clearSelection(field) {
        const updatedComponents = Object.assign({}, this.state.components, {
            [field]: ''
        });
        this.setState({
            components: updatedComponents
        });
    }

    openDefaultTab() {
        // switch to the federal account tab if it has a filter applied and TAS does not
        if (this.props.selectedFederalComponents.size > 0 && this.props.selectedTreasuryComponents.size === 0) {
            this.setState({
                activeTab: 'federal'
            });
        }
    }

    toggleTab(e) {
        const type = e.target.value;

        this.setState({
            activeTab: type
        });
    }

    applyFilter() {
        const components = this.state.components;
        if (this.state.activeTab === 'federal') {
            const identifier = `${components.aid}-${components.main}`;
            this.props.updateFederalAccountComponents({
                identifier,
                values: components
            });
        }
        else {
            const identifier = `${components.ata || '***'}-${components.aid}-${components.bpoa || '****'}/${components.epoa || '****'}-${components.a || '*'}-${components.main || '****'}-${components.sub || '***'}`;
            this.props.updateTreasuryAccountComponents({
                identifier,
                values: components
            });
        }
        // Clear the values after they have been applied
        this.clearInternalState();
    }

    clearInternalState() {
        this.setState({
            components: {
                ata: '',
                aid: '',
                bpoa: '',
                epoa: '',
                a: '',
                main: '',
                sub: ''
            }
        });
    }

    removeFilter(identifier) {
        if (this.state.activeTab === 'federal') {
            this.props.updateFederalAccountComponents({
                identifier, values: {}
            });
        }
        else {
            this.props.updateTreasuryAccountComponents({
                identifier, values: {}
            });
        }
        this.clearInternalState();
    }

    render() {
        const activeTab = this.state.activeTab;
        const activeTreasury = activeTab === 'treasury' ? '' : 'inactive';
        const activeFederal = activeTab === 'federal' ? '' : 'inactive';
        const components = this.state.components;
        const filter = (
            <TreasuryAccountFilters
                updateComponent={this.updateComponent}
                applyFilter={this.applyFilter}
                components={components}
                dirtyFilters={this.props.dirtyFilters}
                clearSelection={this.clearSelection}
                activeTab={activeTab} />
        );

        let selectedSources = null;
        if (activeTab === 'federal' && this.props.selectedFederalComponents) {
            selectedSources = (
                <SelectedSources
                    removeSource={this.removeFilter}
                    label="FA #"
                    selectedSources={this.props.selectedFederalComponents} />);
        }
        else if (activeTab === 'treasury' && this.props.selectedTreasuryComponents) {
            selectedSources = (
                <SelectedSources
                    removeSource={this.removeFilter}
                    label="TAS #"
                    selectedSources={this.props.selectedTreasuryComponents} />
            );
        }

        return (
            <div className="program-source-filter search-filter">
                <ul
                    className="toggle-buttons"
                    role="menu">
                    <li>
                        <button
                            className={`tab-toggle ${activeTreasury}`}
                            value="treasury"
                            role="menuitemradio"
                            aria-checked={this.state.activeTab === 'treasury'}
                            title="Treasury Account"
                            aria-label="Treasury Account"
                            onClick={this.toggleTab} >
                            Treasury Account
                        </button>
                    </li>
                    <li>
                        <button
                            className={`tab-toggle ${activeFederal}`}
                            value="federal"
                            role="menuitemradio"
                            aria-checked={this.state.activeTab === 'federal'}
                            title="Federal Account"
                            aria-label="Federal Account"
                            onClick={this.toggleTab}>
                            Federal Account
                        </button>
                    </li>
                </ul>
                <div className="toggle-border" />
                {filter}
                {selectedSources}
                <SubmitHint
                    ref={(component) => {
                        this.hint = component;
                    }} />
            </div>
        );
    }
}

ProgramSourceSection.propTypes = propTypes;
