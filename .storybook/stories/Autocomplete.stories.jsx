import React, { useState } from "react";
import Autocomplete from "../../src/js/components/sharedComponents/autocomplete/Autocomplete";

const dummyValues = [
    "AL: Alabama",
    "AK: Alaska",
    "AZ: Arizona",
    "AR: Arkansas",
    "CA: California",
    "CO: Colorado",
    "CT: Connecticut",
    "DE: Delaware",
    "FL: Florida",
    "GA: Georgia",
    "HI: Hawaii",
    "ID: Idaho",
    "IL: Illinois",
    "IN: Indiana",
    "IA: Iowa",
    "KS: Kansas"
//     "KY: Kentucky",
//     "LA: Louisiana",
//     "ME: Maine",
//     "MD: Maryland",
//     "MA: Massachusetts",
//     "MI: Michigan",
//     "MN: Minnesota",
//     "MS: Mississippi",
//     "MO: Missouri",
//     "MT: Montana",
//     "NE: Nebraska",
//     "NV: Nevada",
//     "NH: New Hampshire",
//     "NJ: New Jersey",
//     "NM: New Mexico",
//     "NY: New York",
//     "NC: North Carolina",
//     "ND: North Dakota",
//     "OH: Ohio",
//     "OK: Oklahoma",
//     "OR: Oregon",
//     "PA: Pennsylvania",
//     "RI: Rhode Island",
//     "SC: South Carolina",
//     "SD: South Dakota",
//     "TN: Tennessee",
//     "TX: Texas",
//     "UT: Utah",
//     "VT: Vermont",
//     "VA: Virginia",
//     "WA: Washington",
//     "WV: West Virginia",
//     "WI: Wisconsin",
//     "WY: Wyoming",
//     "AS: American Samoa",
//     "DC: District of Columbia",
//     "FM: Federated States of Micronesia",
//     "GU: Guam",
//     "MH: Marshall Islands",
//     "MP: Northern Mariana Islands",
//     "PW: Palau",
//     "PR: Puerto Rico",
//     "VI: Virgin Islands",
//     "AE: Armed Forces Africa",
//     "AA: Armed Forces Americas",
//     "AE: Armed Forces Canada",
//     "AE: Armed Forces Europe",
//     "AE: Armed Forces Middle East",
//     "AP: Armed Forces Pacific"
]

export default {
    title: "Autocomplete",
    component: Autocomplete,
};

const Template = (args) => {
    const [values, setValues] = useState([]);
    const handleTextInput = (e) => {
        if (e.target.value.length > 0) {
            console.log(e.target.value);
            const newValues = dummyValues.filter(state => state.toLowerCase().includes(e.target.value.toLowerCase()))
            console.log(newValues);
            setValues(newValues);
        }
        else {
            setValues([])
        }
    };
    return <Autocomplete
        values={values}
        handleTextInput={handleTextInput}
        {...args} />;
};

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
    onSelect: () => console.log('select'),
    clearAutocompleteSuggestions: () => console.log('clear'),
    placeholder: 'PLACEHOLDER',
    errorHeader: 'NO RESULTS FOUND',
    errorMessage: 'AN ERROR HAS OCCURRED',
    maxSuggestions: 1000,
    label: 'LABEL',
    noResults: false,
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
