/**
  * NAICSSearchContainer.jsx => NAICSContainer.jsx
  * Created by Emily Gullo 07/10/2017
  **/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    debounce,
    get,
    cloneDeep,
    clone,
    uniq,
    isEqual,
    difference,
    compact
} from 'lodash';
import { isCancel } from 'axios';
import CheckboxTree from 'containers/shared/checkboxTree/CheckboxTree';
import { naicsRequest } from 'helpers/naicsHelper';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { updateNaics } from 'redux/actions/search/searchFilterActions';
import { setNaics, setExpanded, setChecked } from 'redux/actions/search/naicsActions';
import { EntityDropdownAutocomplete } from 'components/search/filters/location/EntityDropdownAutocomplete';
import SelectedNaic from 'components/search/filters/naics/SelectNaic';
import { pathToNode, buildNodePath } from 'helpers/checkboxTreeHelper';

const propTypes = {
    updateNaics: PropTypes.func,
    setNaics: PropTypes.func,
    setExpanded: PropTypes.func,
    setChecked: PropTypes.func,
    nodes: PropTypes.object,
    expanded: PropTypes.object,
    checked: PropTypes.object
};

const nodeKeys = {
    value: 'naics',
    label: 'naics_description'
};

export class NAICSContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            naics: [],
            expanded: [],
            checked: [],
            isError: false,
            errorMessage: '',
            isLoading: false,
            isSearch: false,
            searchString: '',
            requestType: 'initial',
            selectedNaicsData: []
        };
    }

    componentDidMount() {
        const { nodes, expanded, checked } = this.props;
        if (nodes.size > 0) {
            return this.setStateFromRedux(nodes, expanded, checked);
        }
        return this.fetchNAICS();
    }

    componentDidUpdate(prevProps) {
        if (
            !isEqual(this.props.checked.toJS(), prevProps.checked.toJS())
            || !isEqual(this.props.nodes.toJS(), prevProps.nodes.toJS())
        ) {
            /**
             * get this difference since react-checkbox-tree is still sending checked data for
             * an unchecked node, will need to look into this further
             * */
            const diff = difference(prevProps.checked.toJS(), this.props.checked.toJS());

            this.selectNaicsData(diff);
        }
    }

    onSearchChange = debounce(() => {
        if (!this.state.searchString) return this.onClear();
        return this.setState({ requestType: 'search' }, this.fetchNAICS);
    }, 500);

    onClear = () => {
        const { nodes, expanded, checked } = this.props;
        if (this.request) this.request.cancel();
        this.setState({
            isSearch: false,
            searchString: '',
            naics: nodes.toJS(),
            expanded: expanded.toJS(),
            checked: checked.toJS(),
            isLoading: false,
            requestType: ''
        });
    }

    onExpand = (node, expanded, fetch) => {
        if (fetch) this.fetchNAICS(node.value);
        this.props.setExpanded(expanded);
    };

    onCollapse = (expanded) => {
        this.props.setExpanded(expanded);
    };
    /**
     * onCheck
     * - updates redux checked and updates naics search filters in redux
     * @param {string[]} checked - and array of checked values
     * @returns {null}
     */
    onCheck = async (checked) => {
        // sets checked in naics redux
        await this.props.setChecked(checked);
        // sets staged filters in search redux
        await this.props.updateNaics(checked);
    }

    setRedux = (naics) => this.props.setNaics(naics);

    setStateFromRedux = (naics, expanded, checked) => {
        this.setState({
            naics: naics.toJS(),
            expanded: expanded.toJS(),
            checked: checked.toJS(),
            requestType: ''
        });
    }
    /**
     * cleanCheckedValues
     * - removes and values that have childPlaceholder
     * @param {string[]} checked - array of strings
     * @returns {string[]} - an array of strings
     */
    cleanCheckedValues = (checked) => {
        const placeholder = 'childPlaceholder';
        return uniq(checked.map((value) => {
            if (value.includes(placeholder)) {
                return value.replace(placeholder, '');
            }
            return value;
        }));
    };
    handleTextInputChange = (e) => {
        const text = e.target.value;
        if (!text) {
            return this.onClear();
        }
        return this.setState({ searchString: text, isSearch: true }, this.onSearchChange);
    };

    request = null

    fetchNAICS = async (param) => {
        if (this.request) this.request.cancel();
        const {
            requestType,
            isSearch,
            searchString
        } = this.state;
        const searchParam = (isSearch && searchString)
            ? `?filter=${searchString}`
            : null;
        if (requestType === 'initial' || requestType === 'search') {
            this.setState({ isLoading: true });
        }

        this.request = naicsRequest(param || searchParam);
        try {
            const { data } = await this.request.promise;
            this.setState({
                naics: data.results,
                isLoading: false,
                isError: false,
                errorMessage: '',
                requestType: ''
            });
        }
        catch (e) {
            console.log(' Error NAICS Reponse : ', e);
            if (!isCancel(e)) {
                this.setState({
                    isError: true,
                    errorMessage: e.message,
                    naics: this.props.nodes.toJS(),
                    isLoading: false,
                    requestType: ''
                });
            }
        }
    };

    loadingDiv = () => {
        if (!this.state.isLoading) return null;
        return (
            <div className="naics-filter-message-container">
                <FontAwesomeIcon icon="spinner" spin />
                <div className="naics-filter-message-container__text">Loading your data...</div>
            </div>
        );
    }

    errorDiv = () => {
        const { isError, errorMessage } = this.state;
        if (!isError) return null;
        return (
            <div className="naics-filter-message-container">
                <div className="naics-filter-message-container__text">
                    {errorMessage}
                </div>
            </div>
        );
    }

    noResultsDiv = () => {
        const { isError, isLoading, naics } = this.state;
        if (isError || isLoading || naics.length > 0) return null;
        return (
            <div className="naics-filter-message-container">
                <FontAwesomeIcon icon="ban" />
                <div className="naics-filter-message-container__text">
                    No Results
                </div>
            </div>
        );
    }

    checkboxDiv() {
        const {
            isLoading,
            isError,
            isSearch,
            naics,
            expanded,
            checked,
            searchString
        } = this.state;
        if (isLoading || isError) return null;
        return (
            <CheckboxTree
                limit={3}
                data={naics}
                expanded={expanded}
                checked={checked}
                nodeKeys={nodeKeys}
                isSearch={isSearch}
                searchText={searchString}
                onExpand={this.onExpand}
                onCollapse={this.onCollapse}
                onCheck={this.onCheck}
                setRedux={this.setRedux}
                updateRedux={this.setRedux} />
        );
    }

    selectNaicsData = (removed) => {
        const cleanRemovedValues = compact(removed.map((data) => {
            if (data.includes('childPlaceholder')) {
                return this.cleanCheckedValues([data])[0];
            }
            return null;
        }));
        const nodes = cloneDeep(this.props.nodes.toJS());
        const checkedData = clone(this.cleanCheckedValues(this.props.checked.toJS()));
        // removing parents that are still in the checked array
        const cleanData = compact(checkedData.map((data) => ((removed.includes(data)) ? null : data)));
        const selectedNaicsData = cleanData.reduce((acc, value) => {
            /**
             * Ignores childPlaceholder values (a placeholder for nodes that are parents
             * but we do not have data for their children). We remove these values because when
             * a user checks a node and that node is a parent and we do not have child data we are
             * not going to count the child since the user could not have possibly checked that
             * child, we are only going to cound the parent.
             */
            if (cleanRemovedValues.includes(value)) return acc;
            // since we have the unchecked values
            // when we loop through and have the parent
            // if there is a code that matched the clean value
            // we will ignore it
            const nodePath = pathToNode(nodes, value);
            /**
             * Since the staged filters will always show the top level parent. The path to that node
             * will always be the first index.
             */
            const parentNodeSearch = [nodePath[0]];
            // accessing the parent node
            const parentNodePathString = buildNodePath(parentNodeSearch);
            const parentNode = get({ data: nodes }, parentNodePathString);
            // accessing the child node
            const nodePathString = buildNodePath(nodePath);
            // console.log(' Node Path String : ', nodePathString);
            const node = get({ data: nodes }, nodePathString);
            // find parent node in accumulator
            const foundParentNodeIndex = acc.findIndex((data) => data.value === parentNode.value);
            // if a parent node does not have a childPlaceholder
            // this means we have data for that parent
            // we also check if that parent is in the checked array
            // if it is in the checked array and it has children ignore it,
            // since we count children
            if (node.count && node.children.length) {
                const childValues = node.children.map((data) => data.value);
                const someChildrenArePlaceholders = childValues
                    .some((data) => data.includes('childPlaceholder'));
                if (
                    !someChildrenArePlaceholders
                    && this.props.checked.toJS().includes(node.value)
                ) {
                    return acc;
                }
            }
            // when a parent node already exists update count
            if (foundParentNodeIndex !== -1) {
                // adds the count of the child object to the parent node
                // when we are at the last level the count will be 0, so add 1
                if (node.count === 0) {
                    acc[foundParentNodeIndex].count++;
                }
                else {
                    acc[foundParentNodeIndex].count += node.count;
                }
            }
            else { // no parent node exists in accumulator, add parent to accumulator
                // this is the last possible child for this parent, add 1
                if (node.count === 0) {
                    parentNode.count = 1;
                }
                else {
                    // console.log(' Parent Node : ', parentNode);
                    // console.log(' Child Node : ', node);
                    parentNode.count = node.count;
                }
                acc.push(parentNode);
            }

            return acc;
        }, []);
        this.setState({ selectedNaicsData });
    }

    selectedNaics = () => {
        if (!this.props.checked.size === 0) return null;
        const { selectedNaicsData } = this.state;
        return (<SelectedNaic
            selectedNAICS={selectedNaicsData}
            removeNAICS={this.props.removeNAICS} />);
    }

    render() {
        const loadingDiv = this.loadingDiv();
        const noResultsDiv = this.noResultsDiv();
        const errorDiv = this.errorDiv();
        const { searchString } = this.state;
        return (
            <div>
                <div className="naics-search-container">
                    <EntityDropdownAutocomplete
                        placeholder="Type to find codes"
                        searchString={searchString}
                        enabled
                        openDropdown={this.onSearchClick}
                        toggleDropdown={this.toggleDropdown}
                        handleTextInputChange={this.handleTextInputChange}
                        context={{}}
                        loading={false}
                        handleOnKeyDown={this.handleOnKeyDown}
                        isClearable
                        onClear={this.onClear} />
                    {loadingDiv}
                    {noResultsDiv}
                    {errorDiv}
                    {this.checkboxDiv()}
                    {this.selectedNaics()}
                </div>
            </div>
        );
    }
}

NAICSContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        nodes: state.naics.naics,
        expanded: state.naics.expanded,
        checked: state.naics.checked
    }),
    (dispatch) => bindActionCreators(
        Object.assign(
            {},
            { updateNaics },
            { setNaics },
            { setExpanded },
            { setChecked }
        )
        ,
        dispatch
    ))(NAICSContainer);
