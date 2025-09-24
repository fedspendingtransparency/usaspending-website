import React, { useState } from "react";
import { within, userEvent, expect } from "storybook/test"

import AccordionCheckbox from "../../src/js/components/sharedComponents/checkbox/AccordionCheckbox";
import { awardTypesData } from "../../src/js/helpers/search/filterCheckboxHelper";
import { awardTypeCodes } from "../../src/js/dataMapping/search/awardType";

export default {
    title: "Accordion Checkbox",
    component: AccordionCheckbox
};

const delay = 100;

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

Default.play = async({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Open accordion, check boxes, and uncheck boxes', async () => {
        // Arrange
        const parentCheckbox = document.getElementById('primary-checkbox__award-contracts');

        // Act: Click on Contracts checkbox and open accordion
        await userEvent.click(parentCheckbox, { delay })
        await userEvent.click(document.getElementsByClassName('fa-chevron-right')[0], { delay });

        // Assert: 'Definitive Contracts' should be visible and all checkboxes checked
        await expect(canvas.getByText('Definitive', { exact: false })).toBeTruthy();
        await expect(document.getElementById('primary-checkbox-0')).toBeChecked();
        await expect(document.getElementById('primary-checkbox-1')).toBeChecked();
        await expect(document.getElementById('primary-checkbox-2')).toBeChecked();
        await expect(document.getElementById('primary-checkbox-3')).toBeChecked();

        // Act: uncheck 'Definitive Contracts'
        await userEvent.click(document.getElementById('primary-checkbox-3'), { delay })

        // Assert: Expect the 'Contracts' checkbox to be unchecked
        await expect(parentCheckbox).not.toBeChecked();

        // Act: Uncheck the rest of the child checkboxes
        await userEvent.click(document.getElementById('primary-checkbox-0'), { delay })
        await userEvent.click(document.getElementById('primary-checkbox-1'), { delay })
        await userEvent.click(document.getElementById('primary-checkbox-2'), { delay })

        // Assert: 'Contracts' should still be unchecked
        await expect(parentCheckbox).not.toBeChecked();
    })

    await step('Search for Definitive Contracts and check/uncheck', async () => {
        // Arrange & Act: type 'contacts' into search bar
        await userEvent.type(canvas.getByPlaceholderText('Search filters...'), 'contracts', { delay });

        // Assert: 'Definitive contracts should be available
        await expect(canvas.getByText('Definitive')).toBeTruthy();

        // Arrange
        const parentCheckbox = document.getElementById('primary-checkbox__award-contracts');
        const definitiveContractsCheckbox = document.getElementById('primary-checkbox-0');
        const clearOutButton = document.getElementsByClassName('fa-times');

        // Act: click on definitive contracts checkbox
        await userEvent.click(definitiveContractsCheckbox, { delay });

        // Assert: 'Definitive Contracts' and 'Contracts' should both be checked
        await expect(definitiveContractsCheckbox).toBeChecked();
        await expect(parentCheckbox).toBeChecked();

        // Act: uncheck 'Contracts' checkbox and clear out search bar
        await userEvent.click(parentCheckbox, { delay });
        await userEvent.click(clearOutButton[0], { delay });

        // Assert: 'Contracts' should be unchecked and 'Other' accordions should be visible
        await expect(parentCheckbox).not.toBeChecked();
        await expect(document.getElementById('primary-checkbox__award-other')).toBeTruthy();
    })
}
