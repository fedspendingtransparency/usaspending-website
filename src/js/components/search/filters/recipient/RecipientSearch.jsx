/**
 * Created by michaelbray on 2/16/17.
 */

import React from 'react';
import PropTypes from 'prop-types';

import RecipientNameDUNSContainer from
    'containers/search/filters/recipient/RecipientNameDUNSContainer';
import SubmitHint from 'components/sharedComponents/filterSidebar/SubmitHint';
import SelectedRecipients from './SelectedRecipients';

const propTypes = {
    toggleRecipient: PropTypes.func,
    selectedRecipients: PropTypes.object,
    dirtyFilters: PropTypes.symbol
};

export default class RecipientSearch extends React.Component {
    componentDidUpdate(prevProps) {
        if (this.props.dirtyFilters && prevProps.dirtyFilters !== this.props.dirtyFilters) {
            if (this.hint) {
                this.hint.showHint();
            }
        }
    }

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
                    <SubmitHint
                        ref={(component) => {
                            this.hint = component;
                        }} />
                </div>
            </div>
        );
    }
}

RecipientSearch.propTypes = propTypes;
