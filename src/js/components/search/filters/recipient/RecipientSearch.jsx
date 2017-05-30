/**
 * Created by michaelbray on 2/16/17.
 */

import React from 'react';

import RecipientNameDUNSContainer from
    'containers/search/filters/recipient/RecipientNameDUNSContainer';
import RecipientLocationContainer from
    'containers/search/filters/recipient/RecipientLocationContainer';
import RecipientType from 'components/search/filters/recipient/RecipientType';
import RecipientToggle from './RecipientToggle';
import SelectedRecipients from './SelectedRecipients';
import SelectedRecipientLocations from './SelectedRecipientLocations';

const propTypes = {
    toggleRecipient: React.PropTypes.func,
    toggleDomesticForeign: React.PropTypes.func,
    toggleRecipientType: React.PropTypes.func,
    toggleRecipientLocation: React.PropTypes.func,
    selectedRecipients: React.PropTypes.object,
    selectedRecipientLocations: React.PropTypes.object
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
            <div className="recipient-filter search-filter">
                <RecipientNameDUNSContainer
                    {...this.props}
                    toggleRecipient={this.props.toggleRecipient} />
                {selectedRecipients}
                <RecipientToggle
                    {...this.props}
                    toggleDomesticForeign={this.props.toggleDomesticForeign} />
                <RecipientLocationContainer
                    {...this.props}
                    toggleRecipientLocation={this.props.toggleRecipientLocation} />
                {selectedRecipientLocations}
                <RecipientType
                    {...this.props}
                    toggleCheckboxType={this.props.toggleRecipientType} />
            </div>
        );
    }
}

RecipientSearch.propTypes = propTypes;
