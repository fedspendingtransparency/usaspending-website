/**
 * Created by michaelbray on 2/16/17.
 */

import React from 'react';
import PropTypes from 'prop-types';

import RecipientNameDUNSContainer from
    'containers/search/filters/recipient/RecipientNameDUNSContainer';
import SelectedRecipients from './SelectedRecipients';

const propTypes = {
    toggleRecipient: PropTypes.func,
    selectedRecipients: PropTypes.object
};

export default class RecipientSearch extends React.Component {
    render() {
        let selectedRecipients = null;

        if (this.props.selectedRecipients.size > 0) {
            selectedRecipients = (<SelectedRecipients
                selectedRecipients={this.props.selectedRecipients}
                toggleRecipient={this.props.toggleRecipient} />);
        }

        return (
            <div className="recipient-filter">
                <div className="filter-item-wrap">
                    <RecipientNameDUNSContainer
                        {...this.props}
                        toggleRecipient={this.props.toggleRecipient} />
                    {selectedRecipients}
                </div>
            </div>
        );
    }
}

RecipientSearch.propTypes = propTypes;
