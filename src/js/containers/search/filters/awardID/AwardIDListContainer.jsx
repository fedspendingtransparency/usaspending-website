/**
 * AwardIDListContainer.jsx
 * Created by michaelbray on 3/2/17.
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';
import _ from 'lodash';

import * as SearchHelper from 'helpers/searchHelper';
import * as awardIDActions from 'redux/actions/search/awardIDActions';
import * as AwardIDFormatter from 'helpers/awardIDFormatter';

import Autocomplete from 'components/sharedComponents/autocomplete/Autocomplete';

const propTypes = {
    toggleAwardID: React.PropTypes.func,
    setAutocompleteAwardIDs: React.PropTypes.func,
    selectedAwardIDs: React.PropTypes.object,
    piid: React.PropTypes.array,
    fain: React.PropTypes.array,
    uri: React.PropTypes.array,
    parent_award__piid: React.PropTypes.array
};

export class AwardIDListContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            awardIDSearchString: '',
            autocompleteAwardIDs: [],
            noResults: false
        };

        this.handleTextInput = this.handleTextInput.bind(this);
        this.clearAutocompleteSuggestions = this.clearAutocompleteSuggestions.bind(this);
        this.timeout = null;
        this.fields = ['piid', 'fain', 'uri', 'parent_award__piid'];
    }

    componentDidMount() {
        this.parseAutocompleteAwardIDs(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (!_.isEqual(nextProps.piid, this.props.piid)
            || !_.isEqual(nextProps.fain, this.props.fain)
            || !_.isEqual(nextProps.uri, this.props.uri)
            || !_.isEqual(nextProps.parent_award__piid, this.props.parent_award__piid)) {
            this.parseAutocompleteAwardIDs(nextProps);
        }
    }

    parseAutocompleteAwardIDs(awardIDProps) {
        const values = [];
        const fieldMap = {
            piid: 'PIID',
            fain: 'FAIN',
            uri: 'URI',
            parent_award__piid: 'PIID'
        };

        Object.keys(fieldMap).forEach((key) => {
            const awardIDs = awardIDProps[key];
            if (awardIDs && awardIDs.length > 0) {
                awardIDs.forEach((item) => {
                    if (item) {
                        values.push({
                            title: AwardIDFormatter.formatAwardID(item, fieldMap[key]),
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
        this.setState({
            noResults: false
        });

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
                    this.setState({
                        noResults: !res.data.matched_objects.length
                    });

                    const data = res.data.matched_objects;
                    let autocompleteData = {};

                    // Remove custom awardIDType field from selectedAwardIDs
                    // to enable object comparison with result data
                    const selectedAwardIDs = [];
                    this.props.selectedAwardIDs.toArray().forEach((item) => {
                        selectedAwardIDs.push(_.omit(item, 'awardIDType'));
                    });

                    // Filter out any selectedAwardIDs that may be in the result set
                    if (selectedAwardIDs && selectedAwardIDs.length > 0) {
                        // We need to compare selectedAwardIDs to each result object,
                        // as we're receiving a result object with 4 keys:
                        // PIID, FAIN, URI, and PARENT_AWARD__PIID
                        Object.keys(data).forEach((key) => {
                            autocompleteData[key] =
                                _.differenceWith(data[key], selectedAwardIDs, _.isEqual);
                        });
                    }
                    else {
                        autocompleteData = data;
                    }

                    this.noResults = !autocompleteData.length;

                    // Add search results to Redux
                    this.props.setAutocompleteAwardIDs(autocompleteData);
                })
                .catch((err) => {
                    if (!isCancel(err)) {
                        this.setState({
                            noResults: true
                        });
                    }
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
                placeholder="PIID, FAIN, or URI"
                errorHeader="Unknown Award"
                errorMessage="We were unable to find that award."
                ref={(input) => {
                    this.awardIDList = input;
                }}
                clearAutocompleteSuggestions={this.clearAutocompleteSuggestions}
                noResults={this.state.noResults} />
        );
    }
}

AwardIDListContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        piid: state.autocompleteAwardIDs.piid,
        fain: state.autocompleteAwardIDs.fain,
        uri: state.autocompleteAwardIDs.uri,
        parent_award__piid: state.autocompleteAwardIDs.parent_award__piid
    }),
    (dispatch) => bindActionCreators(awardIDActions, dispatch)
)(AwardIDListContainer);
