import React, { useEffect, useState } from "react";

import AccordionCheckbox from "../../src/js/components/sharedComponents/checkbox/AccordionCheckbox";
import { awardTypesData } from "../../src/js/helpers/search/filterCheckboxHelper";
import { awardTypeCodes } from "../../src/js/dataMapping/search/awardType";

export default {
    title: "Accordion Checkbox",
    component: AccordionCheckbox
};

const Template = (args) => {
    const [awardType, setAwardType] = useState(new Set());
    const singleFilterChange = ({ value }) => {
        const newAwardType = new Set();

        awardType.forEach((item) => {
            if (item !== value) newAwardType.add(item);
        });

        if (!awardType.has(value)) newAwardType.add(value);

        setAwardType(newAwardType);
    }

    const bulkFilterChange = ({ direction, types }) => {
        const newAwardType = new Set();

        awardType.forEach((item) => {
            newAwardType.add(item);
        });

        if (direction === 'add') {
            types.forEach((type) => newAwardType.add(type))
        }
        else {
            types.forEach((type) => newAwardType.delete(type))
        }

        setAwardType(newAwardType);
    }

    return (
        <AccordionCheckbox
            selectedFilters={awardType}
            singleFilterChange={singleFilterChange}
            bulkFilterChange={bulkFilterChange}
            {...args} />
    )
};

export const Default = Template.bind({});

Default.args = {
    filterCategoryMapping: awardTypesData,
    filters: awardTypeCodes
}
