import React from 'react';

import CheckboxTree from 'components/sharedComponents/checkboxTree/CheckboxTree';
import EntityDropdownAutocomplete from
    'components/sharedComponents/EntityDropdownAutocomplete';
import { autocompletePlaceholder } from 'helpers/search/filterCheckboxHelper';
import { useCheckboxTree } from 'hooks/useCheckboxTree';
import { tasTreeConfig } from './tasTreeConfig';

const TASCheckboxTree = () => {
    const {
        searchString, onClear, handleTextInputChange, treeProps
    } = useCheckboxTree(tasTreeConfig);

    return (
        <div className="tas-checkbox">
            <EntityDropdownAutocomplete
                placeholder={autocompletePlaceholder}
                searchString={searchString}
                enabled
                handleTextInputChange={handleTextInputChange}
                isClearable
                loading={false}
                onClear={onClear}
                searchIcon />
            <CheckboxTree {...treeProps} />
        </div>
    );
};

export default TASCheckboxTree;
