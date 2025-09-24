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

        if (awardType.has(value)) {
            awardType.forEach((item) => {
                if (item !== value) newAwardType.add(item);
            });

        }
        else {
            awardType.forEach((item) => newAwardType.add(item));
            newAwardType.add(value);
        }
        setAwardType(newAwardType);
    }

    useEffect(() => {
        console.log('awardType:', awardType.size);
    }, [awardType.size]);

    return (
        <AccordionCheckbox selectedFilters={awardType} singleFilterChange={singleFilterChange} {...args} />
    )
};

export const Default = Template.bind({});

Default.args = {
    filterCategoryMapping: awardTypesData,
    filters: awardTypeCodes,
    bulkFilterChange: () => console.log('bulk filter change')
}
