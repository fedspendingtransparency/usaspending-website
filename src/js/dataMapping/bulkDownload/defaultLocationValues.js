const defaultLocationValues = {
    country: {
        code: "",
        name: "",
        autoPopulated: false
    },
    state: {
        code: "",
        fips: "",
        name: "",
        autoPopulated: false // from city selection
    },
    county: {
        code: "",
        fips: "",
        state: "",
        name: ""
    },
    city: {
        name: "",
        code: ""
    },
    district_original: {
        code: "",
        district: "",
        name: ""
    },
    district_current: {
        code: "",
        district: "",
        name: ""
    },
    zip: {
        valid: "",
        invalid: ""
    }
};

export default defaultLocationValues;
