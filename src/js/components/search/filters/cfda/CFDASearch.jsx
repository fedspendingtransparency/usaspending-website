/**
 * CFDASearch.jsx
 * Created by Emily Gullo 07/10/2017
 **/

import React from 'react';
import PropTypes from 'prop-types';

import CFDAListContainer from 'containers/search/filters/cfda/CFDAListContainer';
import SubmitHint from 'components/sharedComponents/filterSidebar/SubmitHint';
import SelectedCFDA from './SelectedCFDA';

const propTypes = {
    selectCFDA: PropTypes.func,
    removeCFDA: PropTypes.func,
    selectedCFDA: PropTypes.object,
    dirtyFilters: PropTypes.symbol,
    searchV2: PropTypes.bool
};

const CFDASearch = ({
    selectCFDA, removeCFDA, selectedCFDA, dirtyFilters, searchV2
}) => {
    let CFDAComponent = null;

    if (selectedCFDA.size > 0) {
        CFDAComponent = (<SelectedCFDA
            selectedCFDA={selectedCFDA}
            removeCFDA={removeCFDA} />);
    }

    return (
        <div className={`cfda-filter ${searchV2 ? 'searchV2' : ''}`}>
            <div className="filter-item-wrap">
                <CFDAListContainer
                    selectCFDA={selectCFDA}
                    selectedCFDA={selectedCFDA}
                    dirtyFilters={dirtyFilters} />
                {CFDAComponent}
                { !searchV2 &&
                    <SubmitHint selectedFilters={dirtyFilters} />
                }
            </div>
        </div>
    );
};

CFDASearch.propTypes = propTypes;
export default CFDASearch;
