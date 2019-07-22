/**
 * ProgramSourceAutocompleteContainer.jsx
 * Created by Lizzie Salita 7/22/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import { isCancel } from 'axios';

import * as ProgramSourceHelper from 'helpers/programSourceHelper';

const propTypes = {
    component: PropTypes.string.isRequired,
    filters: PropTypes.object
};

export default class ProgramSourceAutocompleteContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inFlight: false,
            error: false,
            results: []
        };

        this.autocompleteRequest = null;
        this.fetchAutocompleteResults = this.fetchAutocompleteResults.bind(this);
    }

    fetchAutocompleteResults() {
        if (this.autocompleteRequest) {
            // a request is in-flight, cancel it
            this.agenciesRequest.cancel();
        }

        this.setState({
            inFlight: true,
            error: false
        });

        // create the params
        const params = {
            // TODO - Lizzie: use currentSelections to create the filters object
            filters: {},
            limit: 10
        };

        const helperFunction = `fetch${this.props.component.toUpperCase()}s`;
        this.autocompleteRequest = ProgramSourceHelper[helperFunction](params);

        this.autocompleteRequest.promise
            .then((res) => {
                this.setState({
                    inFlight: false,
                    results: res.data
                });
            })
            .catch((err) => {
                this.autocompleteRequest = null;
                if (!isCancel(err)) {
                    this.setState({
                        inFlight: false,
                        error: true
                    });
                    console.log(err);
                }
            });
    }
    render() {
        return (
            <div>
                <button onClick={this.fetchAutocompleteResults}>
                    {this.props.component.toUpperCase()}
                </button>
                {JSON.stringify(this.state.results)}
            </div>
        );
    }
}

ProgramSourceAutocompleteContainer.propTypes = propTypes;
