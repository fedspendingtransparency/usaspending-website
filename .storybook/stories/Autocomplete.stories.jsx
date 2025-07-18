import React, { useState } from "react";
import Autocomplete from "../../src/js/components/sharedComponents/autocomplete/Autocomplete";
import { autocompleteDummyValues } from "../../src/js/helpers/storybookHelper";

export default {
    title: "Autocomplete",
    component: Autocomplete,
};

const Template = (args) => {
    const [values, setValues] = useState([]);
    const [notice, setNotice] = useState(null);

    const handleTextInput = (e) => {
        if (e.target.value.length > 0) {
            const newValues = autocompleteDummyValues.filter(state => state.title.toLowerCase().includes(e.target.value.toLowerCase()))
            setValues(newValues);
        }
        else {
            setValues([])
        }
    };

    const clearAutocompleteSuggestions = () => {
        setValues([])
    };

    const onSelect = (e, valid) => {
       setNotice(`${valid.title} selected!`)
    }

    return (
        <>
            <div>{notice}</div>
            <Autocomplete
                values={values}
                handleTextInput={handleTextInput}
                clearAutocompleteSuggestions={clearAutocompleteSuggestions}
                onSelect={onSelect}
                {...args} />
        </>
        )
};

export const Primary = Template.bind({});

Primary.args = {
    placeholder: 'PLACEHOLDER',
    noResults: false,
    errorHeader: 'NO RESULTS FOUND',
    errorMessage: 'AN ERROR HAS OCCURRED',
    maxSuggestions: 1000,
    label: 'LABEL',
    characterLimit: 524288, // default for HTML input elements
    retainValue: false,
    minCharsToSearch: 3,
    icon: false,
    size: 'medium',
    id: '',
    minChar: false,
    isLoading: false,
    selectedItemsDisplayNames: false,
    type: null
};
