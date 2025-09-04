import React, { useState } from "react";

import AccordionCheckbox from "../../src/js/components/sharedComponents/checkbox/AccordionCheckbox";
import { awardTypesData } from "../../src/js/helpers/search/filterCheckboxHelper";
import { awardTypeCodes } from "../../src/js/dataMapping/search/awardType";

export default {
    title: "Accordion Checkbox",
    component: AccordionCheckbox
};

const Template = (args) => {
    console.log(args);
    const awardType = new Set();

    return (
        <AccordionCheckbox selectedFilters={awardType} {...args} />
    )
};

export const Default = Template.bind({});

Default.args = {
    filterCategoryMapping: awardTypesData,
    filters: awardTypeCodes,
    singleFilterChange: () => console.log('single filter change'),
    bulkFilterChange: () => console.log('bulk filter change')
}
