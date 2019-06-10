/**
 * ProgramSourceSection.jsx
 * Created by Lizzie Salita 6/6/19
 */

import React from 'react';
import PropTypes from 'prop-types';

import TreasuryAccountFilters from './TreasuryAccountFilters';
import AccountFilters from './FederalAccountFilters';

import SubmitHint from 'components/sharedComponents/filterSidebar/SubmitHint';

const propTypes = {
    selectedTreasurySources: PropTypes.object,
    selectedFederalSources: PropTypes.object,
    dirtyFilters: PropTypes.symbol
};

export default class ProgramSourceSection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // TODO - Lizzie: change to 'treasury' in final version
            activeTab: 'federal'
        };

        this.toggleTab = this.toggleTab.bind(this);
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

    // openDefaultTab() {
    //     // check if the federal account or treasury account (default) tab should be enabled
    //     // based on the currently selected filters
    //     if (this.props.selectedFederalSources.count() > 0 && this.props.selectedTreasurySources.count() === 0) {
    //         // there are Federal Account filters and no Treasury Account filters
    //         this.setState({
    //             activeTab: 'federal'
    //         });
    //     }
    // }

    toggleTab(e) {
        const type = e.target.value;

        this.setState({
            activeTab: type
        });
    }

    render() {
        const activeTreasury = this.state.activeTab === 'treasury' ? '' : 'inactive';
        const activeFederal = this.state.activeTab === 'federal' ? '' : 'inactive';
        const filter = this.state.activeTab === 'treasury' ? <TreasuryAccountFilters /> : <AccountFilters />;

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
                <SubmitHint
                    ref={(component) => {
                        this.hint = component;
                    }} />
            </div>
        );
    }
}

ProgramSourceSection.propTypes = propTypes;
