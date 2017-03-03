/**
 * AwardIDListContainer.jsx
 * Created by michaelbray on 3/2/17.
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import * as SearchHelper from 'helpers/searchHelper';
import * as awardIDActions from 'redux/actions/search/awardIDActions';

import Autocomplete from 'components/sharedComponents/autocomplete/Autocomplete';

const propTypes = {
    toggleAwardID: React.PropTypes.func,
    setAutocompleteAwardIDs: React.PropTypes.func,
    selectedAwardIDs: React.PropTypes.object,
    piid: React.PropTypes.array,
    fain: React.PropTypes.array,
    uri: React.PropTypes.array,
    parent_award__piid: React.PropTypes.array,
    transaction__contract_data__solicitation_identifier: React.PropTypes.array
};

export class AwardIDListContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            awardIDSearchString: '',
            autocompleteAwardIDs: []
        };

        this.handleTextInput = this.handleTextInput.bind(this);
        this.clearAutocompleteSuggestions = this.clearAutocompleteSuggestions.bind(this);
        this.timeout = null;
        this.noResults = false;
        this.fields = ['piid', 'fain', 'uri', 'parent_award__piid',
            'transaction__contract_data__solicitation_identifier'];
    }

    componentDidMount() {
        this.parseAutocompleteAwardIDs(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (!_.isEqual(nextProps.piid, this.props.piid)
            || !_.isEqual(nextProps.fain, this.props.fain)
            || !_.isEqual(nextProps.uri, this.props.uri)
            || !_.isEqual(nextProps.parent_award__piid, this.props.parent_award__piid)
            || !_.isEqual(nextProps.transaction__contract_data__solicitation_identifier
                , this.props.transaction__contract_data__solicitation_identifier)) {
            this.parseAutocompleteAwardIDs(nextProps);
        }
    }

    parseAutocompleteAwardIDs(awardIDProps) {
        const values = [];
        const fieldMap = {
            piid: 'PIID',
            fain: 'FAIN',
            uri: 'URI',
            parent_award__piid: 'PIID',
            transaction__contract_data__solicitation_identifier: 'Soliciation ID'
        };

        Object.keys(fieldMap).forEach((key) => {
            const awardIDs = awardIDProps[key];
            if (awardIDs && awardIDs.length > 0) {
                awardIDs.forEach((item) => {
                    if (item) {
                        values.push({
                            title: `${item.id}`,
                            subtitle: fieldMap[key],
                            data: Object.assign({}, item, {
                                awardIDType: fieldMap[key]
                            })
                        });
                    }
                });
            }
        });

        this.setState({
            autocompleteAwardIDs: values
        });
    }

    queryAutocompleteAwardIDs(input) {
        this.noResults = false;

        // Only search if input is 2 or more characters
        if (input.length >= 2) {
            this.setState({
                awardIDSearchString: input
            });

            if (this.awardIDSearchRequest) {
                // A request is currently in-flight, cancel it
                this.awardIDSearchRequest.cancel();
            }

            const awardIDSearchParams = {
                fields: this.fields,
                value: this.state.awardIDSearchString,
                matched_objects: true
            };

            this.awardIDSearchRequest = SearchHelper.fetchAwardIDs(awardIDSearchParams);

            this.awardIDSearchRequest.promise
                .then((res) => {
                    const data = res.data.matched_objects;
                    let autocompleteData = [];

                    // Filter out any selectedAwardIDs that may be in the result set
                    const selectedAwardIDs = this.props.selectedAwardIDs.toArray();
                    if (selectedAwardIDs && selectedAwardIDs.length > 0) {
                        autocompleteData = _.differenceWith(data, selectedAwardIDs, _.isEqual);
                    }
                    else {
                        autocompleteData = data;
                    }

                    this.noResults = !autocompleteData.length;

                    // Add search results to Redux
                    this.props.setAutocompleteAwardIDs(autocompleteData);
                })
                .catch(() => {
                    this.noResults = true;
                });
        }
        else if (this.awardIDSearchRequest) {
            // A request is currently in-flight, cancel it
            this.awardIDSearchRequest.cancel();
        }
    }

    clearAutocompleteSuggestions() {
        this.props.setAutocompleteAwardIDs([]);
    }

    handleTextInput(awardIDInput) {
        // Clear existing award IDs to ensure user can't select an old or existing one
        this.props.setAutocompleteAwardIDs([]);

        // Grab input, clear any exiting timeout
        const input = awardIDInput.target.value;
        window.clearTimeout(this.timeout);

        // Perform search if user doesn't type again for 300ms
        this.timeout = window.setTimeout(() => {
            this.queryAutocompleteAwardIDs(input);
        }, 300);
    }

    render() {
        return (
            <Autocomplete
                {...this.props}
                label=""
                values={this.state.autocompleteAwardIDs}
                handleTextInput={this.handleTextInput}
                onSelect={this.props.toggleAwardID}
                placeholder="PIID, FAIN, URI, or Solicitation ID"
                errorHeader="Unknown Award"
                errorMessage="We were unable to find that award."
                ref={(input) => {
                    this.awardIDList = input;
                }}
                clearAutocompleteSuggestions={this.clearAutocompleteSuggestions}
                noResults={this.noResults} />
        );
    }
}

export default connect(
    (state) => ({
        piid: state.autocompleteAwardIDs.piid,
        fain: state.autocompleteAwardIDs.fain,
        uri: state.autocompleteAwardIDs.uri,
        parent_award__piid: state.autocompleteAwardIDs.parent_award__piid,
        transaction__contract_data__solicitation_identifier:
            state.autocompleteAwardIDs.transaction__contract_data__solicitation_identifier
    }),
    (dispatch) => bindActionCreators(awardIDActions, dispatch)
)(AwardIDListContainer);

AwardIDListContainer.propTypes = propTypes;
