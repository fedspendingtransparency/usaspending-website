/**
 * Created by michaelbray on 2/16/17.
 */

import React from 'react';
import PropTypes from 'prop-types';

import RecipientNameDUNSContainer from
    'containers/search/filters/recipient/RecipientNameDUNSContainer';
import RecipientLocationContainer from
    'containers/search/filters/recipient/RecipientLocationContainer';
import RecipientType from 'components/search/filters/recipient/RecipientType';
import RecipientToggle from './RecipientToggle';
import SelectedRecipients from './SelectedRecipients';
import SelectedRecipientLocations from './SelectedRecipientLocations';

const propTypes = {
    toggleRecipient: PropTypes.func,
    toggleDomesticForeign: PropTypes.func,
    toggleRecipientType: PropTypes.func,
    toggleRecipientLocation: PropTypes.func,
    selectedRecipients: PropTypes.object,
    selectedRecipientLocations: PropTypes.object
};

export default class RecipientSearch extends React.Component {
    render() {
        let selectedRecipients = null;
        let selectedRecipientLocations = null;

        if (this.props.selectedRecipients.size > 0) {
            selectedRecipients = (<SelectedRecipients
                selectedRecipients={this.props.selectedRecipients}
                toggleRecipient={this.props.toggleRecipient} />);
        }

        if (this.props.selectedRecipientLocations.size > 0) {
            selectedRecipientLocations = (<SelectedRecipientLocations
                selectedRecipientLocations={this.props.selectedRecipientLocations}
                toggleRecipientLocation={this.props.toggleRecipientLocation} />);
        }

        return (
            <div className="recipient-filter">
                <div className="filter-item-wrap">
                    <RecipientNameDUNSContainer
                        {...this.props}
                        toggleRecipient={this.props.toggleRecipient} />
                    {selectedRecipients}
                </div>
                <div className="filter-item-wrap">
                    <RecipientToggle
                        {...this.props}
                        toggleDomesticForeign={this.props.toggleDomesticForeign} />
                </div>
                <div className="filter-item-wrap">
                    <RecipientLocationContainer
                        {...this.props}
                        toggleRecipientLocation={this.props.toggleRecipientLocation} />
                    {selectedRecipientLocations}
                </div>
                <div className="filter-item-wrap">
                    <RecipientType
                        {...this.props}
                        toggleCheckboxType={this.props.toggleRecipientType} />
                </div>
            </div>
        );
    }
}

RecipientSearch.propTypes = propTypes;
