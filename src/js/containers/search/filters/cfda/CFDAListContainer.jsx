/**
* CFDAListContainer.jsx
* Created by Emily Gullo 07/10/2017
**/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isEqual, upperCase, omit, differenceWith } from 'lodash';
import { isCancel } from 'axios';

import * as SearchHelper from 'helpers/searchHelper';
import * as autocompleteActions from 'redux/actions/search/autocompleteActions';

import Autocomplete from 'components/sharedComponents/autocomplete/Autocomplete';

const propTypes = {
    selectCFDA: React.PropTypes.func,
    setAutocompleteCFDA: React.PropTypes.func,
    selectedCFDA: React.PropTypes.object,
    autocompleteCFDA: React.PropTypes.array
};

class CFDAListContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cfdaSearchString: '',
            autocompleteCFDA: [],
            noResults: false
        };

        this.handleTextInput = this.handleTextInput.bind(this);
        this.clearAutocompleteSuggestions = this.clearAutocompleteSuggestions.bind(this);
        this.timeout = null;
    }

    componentDidMount() {
        this.parseAutocompleteCFDA(this.props.autocompleteCFDA);
    }

    componentWillReceiveProps(nextProps) {
        if (!isEqual(nextProps.autocompleteCFDA, this.props.autocompleteCFDA)) {
            this.parseAutocompleteCFDA(nextProps.autocompleteCFDA);
        }
    }

    parseAutocompleteCFDA(cfda) {
        const values = [];
        if (cfda && cfda.length > 0) {
            cfda.forEach((item) => {
                const title = item.program_number;
                const subtitle = upperCase(item.program_title);

                values.push({
                    title,
                    subtitle,
                    data: item
                });
            });
        }

        this.setState({
            autocompleteCFDA: values
        });
    }

    queryAutocompleteCFDA(input) {
        this.setState({
            noResults: false
        });

        // Only search if input is 2 or more characters
        if (input.length >= 2) {
            this.setState({
                cfdaSearchString: input
            });

            if (this.cfdaSearchRequest) {
                // A request is currently in-flight, cancel it
                this.cfdaSearchRequest.cancel();
            }

            const cfdaSearchParams = {
                search_text: this.state.cfdaSearchString
            };

            this.cfdaSearchRequest = SearchHelper.fetchCFDA(cfdaSearchParams);

            this.cfdaSearchRequest.promise
                .then((res) => {
                    const data = res.data.results;
                    let autocompleteData = [];

                    // Remove 'identifier' from selected cfdas to enable comparison
                    const selectedCFDA = this.props.selectedCFDA.toArray()
                        .map((cfda) => omit(cfda, 'identifier'));

                    // Filter out any selected cfdas that may be in the result set
                    if (selectedCFDA && selectedCFDA.length > 0) {
                        autocompleteData = differenceWith(data, selectedCFDA, isEqual);
                    }
                    else {
                        autocompleteData = data;
                    }

                    this.setState({
                        noResults: autocompleteData.length === 0
                    });

                    // Add search results to Redux
                    this.props.setAutocompleteCFDA(autocompleteData);
                })
                .catch((err) => {
                    if (!isCancel(err)) {
                        this.setState({
                            noResults: true
                        });
                    }
                });
        }
        else if (this.cfdaSearchRequest) {
            // A request is currently in-flight, cancel it
            this.cfdaSearchRequest.cancel();
        }
    }

    clearAutocompleteSuggestions() {
        this.props.setAutocompleteCFDA([]);
    }

    handleTextInput(cfdaInput) {
        // Clear existing cfdas to ensure user can't select an old or existing one
        this.props.setAutocompleteCFDA([]);

        // Grab input, clear any exiting timeout
        const input = cfdaInput.target.value;
        window.clearTimeout(this.timeout);

        // Perform search if user doesn't type again for 300ms
        this.timeout = window.setTimeout(() => {
            this.queryAutocompleteCFDA(input);
        }, 300);
    }

    render() {
        return (
            <Autocomplete
                {...this.props}
                values={this.state.autocompleteCFDA}
                handleTextInput={this.handleTextInput}
                onSelect={this.props.selectCFDA}
                placeholder="eg: 10.553 - School Breakfast Program"
                errorHeader="Unknown CFDA"
                errorMessage="We were unable to find that CFDA."
                ref={(input) => {
                    this.cfdaList = input;
                }}
                clearAutocompleteSuggestions={this.clearAutocompleteSuggestions}
                noResults={this.state.noResults} />
        );
    }

}

export default connect(
    (state) => ({ autocompleteCFDA: state.autocompleteCFDA }),
    (dispatch) => bindActionCreators(autocompleteActions, dispatch)
)(CFDAListContainer);

CFDAListContainer.propTypes = propTypes;
