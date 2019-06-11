/**
 * ProgramSourceSection.jsx
 * Created by Lizzie Salita 6/6/19
 */

import React from 'react';
import PropTypes from 'prop-types';

import SubmitHint from 'components/sharedComponents/filterSidebar/SubmitHint';
import TreasuryAccountFilters from './TreasuryAccountFilters';
import FederalAccountFilters from './FederalAccountFilters';
import SelectedSources from './SelectedSources';

const propTypes = {
    selectedSources: PropTypes.object,
    dirtyFilters: PropTypes.symbol
};

export default class ProgramSourceSection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // TODO - Lizzie: change to 'treasury' in final version
            activeTab: 'federal',
            federalAccountComponents: {
                aid: '',
                main: '',
                sub: ''
            }
        };

        this.toggleTab = this.toggleTab.bind(this);
        this.updateFederalAccountComponent = this.updateFederalAccountComponent.bind(this);
        this.createFederalAccountFilter = this.createFederalAccountFilter.bind(this);
    }

    componentDidMount() {
        // this.openDefaultTab();
    }

    componentDidUpdate(prevProps) {
        if (this.props.dirtyFilters && prevProps.dirtyFilters !== this.props.dirtyFilters) {
            if (this.hint) {
                this.hint.showHint();
            }
        }
    }

    updateFederalAccountComponent(field, value) {
        const updatedComponents = Object.assign({}, this.state.federalAccountComponents, {
            [field]: value
        });
        this.setState({
            federalAccountComponents: updatedComponents
        });
    }

    // TODO - Lizzie: implement openDefaultTab()

    toggleTab(e) {
        const type = e.target.value;

        this.setState({
            activeTab: type
        });
    }

    createFederalAccountFilter(e) {
        e.preventDefault();
        const components = this.state.federalAccountComponents;
        const filterId = `${components.aid}-${components.main || 'MAIN'}-${components.sub || 'SUB'}`;
        console.log(filterId);
        // TODO - Lizzie: Add filter to Redux
    }

    render() {
        const activeTab = this.state.activeTab;
        const activeTreasury = activeTab === 'treasury' ? '' : 'inactive';
        const activeFederal = activeTab === 'federal' ? '' : 'inactive';
        const filter = this.state.activeTab === 'treasury' ? <TreasuryAccountFilters /> : (
            <FederalAccountFilters
                updateComponent={this.updateFederalAccountComponent}
                components={this.state.federalAccountComponents}
                createFilter={this.createFederalAccountFilter} />);

        let selectedSources = null;
        if (this.props.selectedSources) {
            selectedSources = (
                <SelectedSources
                    selectedSources={this.props.selectedSources}
                    activeTab={activeTab} />);
        }

        return (
            <div className="program-source-filter search-filter">
                <ul
                    className="toggle-buttons"
                    role="menu">
                    <li>
                        <button
                            className={`date-toggle ${activeTreasury}`}
                            value="treasury"
                            role="menuitemradio"
                            aria-checked={this.state.activeTab === 'treasury'}
                            title="Treasury Account"
                            aria-label="Treasury Account"
                            onClick={this.toggleTab}>
                            Treasury Account
                        </button>
                    </li>
                    <li>
                        <button
                            className={`date-toggle ${activeFederal}`}
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
