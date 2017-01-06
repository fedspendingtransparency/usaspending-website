import * as searchFilterActions from 'redux/actions/search/searchFilterActions';
import * as autocompleteActions from 'redux/actions/search/autocompleteActions';
import * as resultsMetaActions from 'redux/actions/resultsMeta/resultsMetaActions';
import * as resultsBatchActions from 'redux/actions/resultsMeta/resultsBatchActions';
import * as recordBulkActions from 'redux/actions/records/recordBulkActions';

// combine the filter and result Redux actions into one object for the React-Redux connector
const combinedActions = Object.assign({}, searchFilterActions, autocompleteActions,
    resultsMetaActions, resultsBatchActions, recordBulkActions);

export default combinedActions;
