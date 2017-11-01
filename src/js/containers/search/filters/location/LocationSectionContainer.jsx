/**
 * LocationSection.jsx
 * Created by Kevin Li 10/30/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import POPFilterContainer from 'containers/search/filters/location/POPFilterContainer';
import RecipientFilterContainer from 'containers/search/filters/location/RecipientFilterContainer';

const propTypes = {
    selectedLocations: PropTypes.object,
    selectedRecipientLocations: PropTypes.object
};

export class LocationSectionContainer extends React.Component {
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
                <ul className="toggle-buttons">
                    <li>
                        <button
                            className={`date-toggle ${activePop}`}
                            value="pop"
                            onClick={this.toggleTab}>
                            Place of Performance
                        </button>
                    </li>
                    <li>
                        <button
                            className={`date-toggle ${activeRecipient}`}
                            value="recipient"
                            onClick={this.toggleTab}>
                            Recipient Location
                        </button>
                    </li>
                </ul>
                <div className="toggle-border" />
                {filter}
            </div>
        );
    }
}

LocationSectionContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        selectedLocations: state.filters.selectedLocations,
        selectedRecipientLocations: state.filters.selectedRecipientLocations
    })
)(LocationSectionContainer);
