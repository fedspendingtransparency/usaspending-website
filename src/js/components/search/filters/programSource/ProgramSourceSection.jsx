/**
 * ProgramSourceSection.jsx
 * Created by Lizzie Salita 6/6/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import SubmitHint from 'components/sharedComponents/filterSidebar/SubmitHint';
import TreasuryAccountFilters from './TreasuryAccountFilters';
import SelectedSources from './SelectedSources';
import { CSSOnlyTooltip } from '../tooltips/AdvancedSearchTooltip';

const propTypes = {
    selectedTreasuryComponents: PropTypes.object,
    checkboxTreeSelections: PropTypes.arrayOf(PropTypes.string),
    appliedTreasuryComponents: PropTypes.object,
    appliedCheckboxTreeSelections: PropTypes.arrayOf(PropTypes.string),
    updateTreasuryAccountComponents: PropTypes.func,
    dirtyFilters: PropTypes.symbol
};

const dataNote = (
    <React.Fragment>
        This filter uses Account Breakdown by Award data (available&nbsp;
        <Link
            to="/download_center/custom_account_data"
            target="_blank"
            rel="noopener noreferrer">
            here
        </Link>
        &nbsp;in full) submitted by agencies to Treasury under the requirements of the DATA Act of 2014, which went into effect in FY17Q2. As such, this data (and thus this filter) only covers award transactions from January 2017 onward. Awards that began prior to that point will only surface via this filter if they have financial modifications post-January 2017. Note that a subset of agency-submitted Account Breakdown by Award data is not definitively linkable to a single Federal Award; unlinked data cannot be and is not used by this filter, but is available along with the rest of the Account Breakdown by Award Data in the&nbsp;
        <Link
            to="/download_center/custom_account_data"
            target="_blank"
            rel="noopener noreferrer">
            Custom Account Data
        </Link>
        &nbsp;section.
    </React.Fragment>
);

const treasuryAccountTab = (
    <p>Start here to see Treasury Accounts organized by Agency and Federal Account.</p>
);

const tasComponentsTab = (
    <p>Start here if you already know the code you want to find.</p>
);

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
    // switch to the autocomplete tab if it has a filter selected/applied and the checkbox tree does not
        if ((this.props.checkboxTreeSelections.length === 0 && this.props.selectedTreasuryComponents.size > 0) ||
            (this.props.appliedCheckboxTreeSelections.length === 0 && this.props.appliedTreasuryComponents.size > 0)) {
            this.setState({
                activeTab: 2
            });
        }
    }

    toggleTab(e) {
        e.preventDefault();
        this.setState({
            activeTab: this.state.activeTab === 1 ? 2 : 1
        });
    }

    applyFilter(e) {
        e.preventDefault();
        const { components } = this.state;
        if (this.state.activeTab === 2) {
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
        if (this.state.activeTab === 2) {
            this.props.updateTreasuryAccountComponents({
                identifier, values: {}
            });
        }
        this.clearInternalState();
    }

    render() {
        const { activeTab, components } = this.state;
        const checkboxTreeActiveClass = activeTab === 1 ? '' : 'inactive';
        const autoCompleteActiveClass = activeTab === 2 ? '' : 'inactive';

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
        if (activeTab === 2 && this.props.selectedTreasuryComponents.size > 0) {
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
                        <div
                            role="menuitemradio"
                            onKeyDown={this.toggleTab}
                            tabIndex="-1"
                            className={`tab-toggle ${checkboxTreeActiveClass}`}
                            value="1"
                            aria-checked={this.state.activeTab === 1}
                            title="Treasury Account"
                            aria-label="Treasury Account"
                            onClick={this.toggleTab} >
                            <span>Treasury Account</span>
                            <CSSOnlyTooltip definition={treasuryAccountTab} heading="Treasury Account" />
                        </div>
                    </li>
                    <li>
                        <div
                            role="menuitemradio"
                            onKeyDown={this.toggleTab}
                            tabIndex="-1"
                            className={`tab-toggle ${autoCompleteActiveClass}`}
                            value="2"
                            aria-checked={this.state.activeTab === 2}
                            title="Treasury Account Symbol Components"
                            aria-label="Treasury Account Symbol Components"
                            onClick={this.toggleTab}>
                            <span>TAS Components</span>
                            <CSSOnlyTooltip definition={tasComponentsTab} heading="TAS Components" />
                        </div>
                    </li>
                </ul>
                <div className="toggle-border" />
                {filter}
                {selectedSources}
                <CSSOnlyTooltip
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
