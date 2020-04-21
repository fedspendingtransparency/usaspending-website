/**
 * ProgramSourceSection.jsx
 * Created by Lizzie Salita 6/6/19
 */

import React from 'react';
import PropTypes from 'prop-types';

import kGlobalConstants from 'GlobalConstants';
import SubmitHint from 'components/sharedComponents/filterSidebar/SubmitHint';
import TreasuryAccountFilters from './TreasuryAccountFilters';
import SelectedSources from './SelectedSources';
import ProgramSourceInfoTooltip from './ProgramSourceInfoTooltip';

const propTypes = {
    selectedFederalComponents: PropTypes.object,
    selectedTreasuryComponents: PropTypes.object,
    updateFederalAccountComponents: PropTypes.func,
    updateTreasuryAccountComponents: PropTypes.func,
    dirtyFilters: PropTypes.symbol
};

const isDev = kGlobalConstants.DEV;

export default class ProgramSourceSection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: 1,
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
                activeTab: 1
            });
        }
    }

    toggleTab(e) {
        const type = e.target.value;

        this.setState({
            activeTab: parseInt(type, 10)
        });
    }

    applyFilter(e) {
        e.preventDefault();
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
        const { activeTab, components } = this.state;
        const activeTreasury = activeTab === 1 ? '' : 'inactive';
        const activeFederal = activeTab === 2 ? '' : 'inactive';
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
        if (!isDev && activeTab === 2 && this.props.selectedFederalComponents) {
            selectedSources = (
                <SelectedSources
                    removeSource={this.removeFilter}
                    label="FA #"
                    selectedSources={this.props.selectedFederalComponents} />);
        }
        else if (
            (isDev && activeTab === 2 && this.props.selectedFederalComponents) ||
            (!isDev && activeTab === 1 && this.props.selectedTreasuryComponents)
        ) {
            selectedSources = (
                <SelectedSources
                    removeSource={this.removeFilter}
                    label="TAS #"
                    selectedSources={this.props.selectedTreasuryComponents} />
            );
        }
        const dataNote = (
            <React.Fragment>
                This filter uses Account Breakdown by Award data (available&nbsp;
                <a
                    href="/#/download_center/custom_account_data"
                    target="_blank"
                    rel="noopener noreferrer">
                    here
                </a>
                &nbsp;in full) submitted by agencies to Treasury under the requirements of the DATA Act of 2014, which went into effect in FY17Q2. As such, this data (and thus this filter) only covers award transactions from January 2017 onward. Awards that began prior to that point will only surface via this filter if they have financial modifications post-January 2017. Note that a subset of agency-submitted Account Breakdown by Award data is not definitively linkable to a single Federal Award; unlinked data cannot be and is not used by this filter, but is available along with the rest of the Account Breakdown by Award Data in the&nbsp;
                <a
                    href="/#/download_center/custom_account_data"
                    target="_blank"
                    rel="noopener noreferrer">
                    Custom Account Data
                </a>
                &nbsp;section.
            </React.Fragment>
        );

        const tab2Title = isDev ? 'TAS Components' : 'Federal Account';

        return (
            <div className="program-source-filter search-filter">
                <ul
                    className="toggle-buttons"
                    role="menu">
                    <li>
                        <button
                            className={`tab-toggle ${activeTreasury}`}
                            value="1"
                            role="menuitemradio"
                            aria-checked={this.state.activeTab === 1}
                            title="Treasury Account"
                            aria-label="Treasury Account"
                            onClick={this.toggleTab} >
                            Treasury Account
                        </button>
                    </li>
                    <li>
                        <button
                            className={`tab-toggle ${activeFederal}`}
                            value="2"
                            role="menuitemradio"
                            aria-checked={this.state.activeTab === 2}
                            title="Federal Account"
                            aria-label="Federal Account"
                            onClick={this.toggleTab}>
                            {tab2Title}
                        </button>
                    </li>
                </ul>
                <div className="toggle-border" />
                {filter}
                {selectedSources}
                <ProgramSourceInfoTooltip
                    definition={dataNote}
                    heading="A note about our TAS data sources"
                    description="A note about our TAS data sources." />
                <SubmitHint
                    ref={(component) => {
                        this.hint = component;
                    }} />
            </div>
        );
    }
}

ProgramSourceSection.propTypes = propTypes;
