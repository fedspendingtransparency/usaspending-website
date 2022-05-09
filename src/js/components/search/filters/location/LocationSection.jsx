/**
 * LocationSection.jsx
 * Created by Kevin Li 11/1/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import POPFilterContainer from 'containers/search/filters/location/POPFilterContainer';
import RecipientFilterContainer from 'containers/search/filters/location/RecipientFilterContainer';

import SubmitHint from 'components/sharedComponents/filterSidebar/SubmitHint';

const propTypes = {
    selectedRecipientLocations: PropTypes.object,
    selectedLocations: PropTypes.object,
    dirtyFilters: PropTypes.symbol
};

export default class LocationSection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: 'pop'
        };

        this.toggleTab = this.toggleTab.bind(this);
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

    openDefaultTab() {
    // check if the recipient or place of performance (default) tab should be enabled based
    // on the currently selected filters
        if (this.props.selectedRecipientLocations.count() > 0 && this.props.selectedLocations.count() === 0) {
            // there are recipient locations and no place of performance locations
            this.setState({
                activeTab: 'recipient'
            });
        }
    }

    toggleTab(e) {
        const type = e.target.value;

        this.setState({
            activeTab: type
        });
    }

    render() {
        let activePop = '';
        if (this.state.activeTab !== 'pop') {
            activePop = 'inactive';
        }

        let activeRecipient = '';
        if (this.state.activeTab !== 'recipient') {
            activeRecipient = 'inactive';
        }

        let filter = <POPFilterContainer />;
        if (this.state.activeTab === 'recipient') {
            filter = <RecipientFilterContainer />;
        }

        return (
            <div className="location-filter search-filter">
                <ul
                    className="toggle-buttons"
                    role="menu">
                    <li>
                        <button
                            className={`tab-toggle ${activePop}`}
                            value="pop"
                            role="menuitemradio"
                            aria-checked={this.state.activeTab === 'pop'}
                            title="Place of Performance"
                            aria-label="Place of Performance"
                            onClick={this.toggleTab}>
                            Place of Performance
                        </button>
                    </li>
                    <li>
                        <button
                            className={`tab-toggle ${activeRecipient}`}
                            value="recipient"
                            role="menuitemradio"
                            aria-checked={this.state.activeTab === 'recipient'}
                            title="Recipient Location"
                            aria-label="Recipient Location"
                            onClick={this.toggleTab}>
                            Recipient Location
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

LocationSection.propTypes = propTypes;
