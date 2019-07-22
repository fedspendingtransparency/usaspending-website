/**
 * ProgramSourceAutocompleteContainer.jsx
 * Created by Lizzie Salita 7/22/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import { isCancel } from 'axios';

import * as ProgramSourceHelper from 'helpers/programSourceHelper';
import SourceSelectFilter from 'components/search/filters/programSource/SourceSelectFilter';

const propTypes = {
    component: PropTypes.object,
    selectedSources: PropTypes.array,
    updateComponent: PropTypes.func,
    dirtyFilters: PropTypes.symbol
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

    componentWillUnmount() {
        if (this.autocompleteRequest) {
            this.autocompleteRequest.cancel();
        }
    }

    fetchAutocompleteResults(input) {
        if (this.autocompleteRequest) {
            // a request is in-flight, cancel it
            this.autocompleteRequest.cancel();
        }

        this.setState({
            inFlight: true,
            error: false
        });

        // create the params
        const params = {
            // TODO - Lizzie: use currentSelections to create the filters object
            filters: {
                [this.props.component.code]: input
            },
            limit: 10
        };

        const helperFunction = `fetch${this.props.component.code.toUpperCase()}s`;
        this.autocompleteRequest = ProgramSourceHelper[helperFunction](params);

        this.autocompleteRequest.promise
            .then((res) => {
                this.parseResults(res.data.results);
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

    parseResults(results) {
        let parsedResults = [];
        if (this.props.component.code === 'aid' || this.props.component.code === 'ata') {
            parsedResults = results.map((agency) => {
                const abbreviation = agency.agency_abbreviation ? ` (${agency.agency_abbreviation})` : '';
                return ({
                    code: agency.aid,
                    name: `${agency.agency_name}${abbreviation}`
                });
            });
        }
        else {
            parsedResults = results.map((option) => ({ code: option }));
        }
        this.setState({
            inFlight: false,
            results: parsedResults
        });
    }

    render() {
        return (
            <SourceSelectFilter
                {...this.props.component}
                options={this.state.results}
                selectedSources={this.props.selectedSources}
                updateComponent={this.props.updateComponent}
                fetchAutocompleteResults={this.fetchAutocompleteResults}
                dirtyFilters={this.props.dirtyFilters} />
        );
    }
}

ProgramSourceAutocompleteContainer.propTypes = propTypes;
