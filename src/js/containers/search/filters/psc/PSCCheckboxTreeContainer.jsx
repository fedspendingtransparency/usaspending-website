import React from 'react';

import CheckboxTree from 'components/sharedComponents/checkboxTree/CheckboxTree';
import EntityDropdownAutocomplete from 'components/sharedComponents/EntityDropdownAutocomplete';
import { useCheckboxTree } from 'hooks/useCheckboxTree';
import { pscTreeConfig } from './pscTreeConfig';

const PSCCheckboxTreeContainer = () => {
    const {
        searchString, onClear, handleTextInputChange, treeProps
    } = useCheckboxTree(pscTreeConfig);

    return (
        <div className="search-option">
            <div className="psc-search-container">
                <EntityDropdownAutocomplete
                    placeholder="Type at least 2 letters..."
                    searchString={searchString}
                    enabled
                    handleTextInputChange={handleTextInputChange}
                    context={{}}
                    isClearable
                    loading={false}
                    onClear={onClear}
                    searchIcon />
                <CheckboxTree {...treeProps} />
            </div>
        </div>
    );
};

export default PSCCheckboxTreeContainer;
