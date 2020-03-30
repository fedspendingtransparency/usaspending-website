import React from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

import { cleanTasData } from 'helpers/checkboxTreeHelper';
import { fetchTas } from 'helpers/searchHelper';

import CheckboxTree from 'components/sharedComponents/CheckboxTree';
import { EntityDropdownAutocomplete } from 'components/search/filters/location/EntityDropdownAutocomplete';

const propTypes = {};

export default class TASCheckboxTree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: [],
            expanded: [],
            nodes: [],
            isLoading: true,
            searchString: '',
            isError: false,
            errorMessage: ''
        };
        this.request = null;
    }

    componentDidMount() {
        this.fetchTas('');
    }

    onExpand = () => console.log("expand");

    onCheck = () => console.log("check");

    onUncheck = () => console.log("uncheck");

    onSearchChange = debounce(() => {
        if (!this.state.searchString) return this.onClear();
        return this.setState({ requestType: 'search' }, this.fetchNAICS);
    }, 500);

    onClear = () => {
        if (this.request) this.request.cancel();
        this.setState({
            isSearch: false,
            searchString: '',
            isLoading: false,
            requestType: ''
        });
    }

    fetchTas = (id = '', depth = 0) => {
        if (this.request) this.request.cancel();
        this.request = fetchTas(id, depth);
        return this.request.promise
            .then(({ data }) => {
                const nodes = cleanTasData(data.results);
                this.setState({ nodes, isLoading: false });
            })
            .catch((e) => {
                console.log("error fetching TAS", e);
                this.setState({ isError: true, errorMessage: e });
            });
    }

    handleTextInputChange = (e) => {
        const text = e.target.value;
        if (!text) {
            return this.onClear();
        }
        return this.setState({
            searchString: text,
            isSearch: true,
            isLoading: true
        }, this.onSearchChange);
    }

    render() {
        const {
            nodes,
            checked,
            expanded,
            isLoading,
            searchString,
            isError,
            errorMessage
        } = this.state;
        return (
            <div className="tas-checkbox">
                <EntityDropdownAutocomplete
                    enabled
                    isClearable
                    placeholder="Type to filter results"
                    searchString={searchString}
                    handleTextInputChange={this.handleTextInputChange}
                    context={{}}
                    loading={false}
                    onClear={this.onClear} />
                <CheckboxTree
                    isError={isError}
                    errorMessage={errorMessage}
                    isLoading={isLoading}
                    data={nodes}
                    checked={checked}
                    expanded={expanded}
                    onUncheck={this.onUncheck}
                    onCheck={this.onCheck}
                    onExpand={this.onExpand} />
            </div>
        );
    }
}
