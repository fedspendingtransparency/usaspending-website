/**
 * RecipientName.jsx
 * Created by Mike Bray 11/14/2017
 **/

import React from 'react';
import PropTypes from 'prop-types';

import Warning from 'components/sharedComponents/autocomplete/Warning';

const propTypes = {
    searchRecipient: PropTypes.func,
    changedInput: PropTypes.func,
    value: PropTypes.string,
    showWarning: PropTypes.bool,
    selectedRecipients: PropTypes.object
};

export default class RecipientName extends React.Component {
    constructor(props) {
        super(props);

        this.searchRecipient = this.searchRecipient.bind(this);
    }

    searchRecipient(e) {
        e.preventDefault();
        this.props.searchRecipient();
    }

    generateWarning() {
        if (this.props.showWarning) {
            let errorProps = {};

            if (this.props.value && this.props.value.length < 3) {
                errorProps = {
                    header: 'Error',
                    description: 'Please enter more than two characters.'
                };
            }
            else {
                errorProps = {
                    header: 'Duplicate Recipient',
                    description: 'You have already selected that recipient.'
                };
            }

            return <Warning {...errorProps} />;
        }

        return null;
    }

    render() {
        let disableButton = false;
        if (this.props.selectedRecipients.size !== 0) {
            disableButton = true;
        }
        return (
            <div className="recipient-filter search-filter">
                <form onSubmit={this.searchRecipient}>
                    <div className="recipient-filter-item-wrap">
                        <input
                            id="search"
                            type="text"
                            className="recipient-input"
                            placeholder="Recipient Name or DUNS"
                            value={this.props.value}
                            disabled={disableButton}
                            onChange={this.props.changedInput} />
                        <input
                            type="submit"
                            className="recipient-submit"
                            disabled={disableButton}
                            value="Submit" />
                    </div>
                </form>
                {this.generateWarning()}
            </div>
        );
    }
}

RecipientName.propTypes = propTypes;
