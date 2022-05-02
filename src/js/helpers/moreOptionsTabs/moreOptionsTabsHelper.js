export const getIndexesToDelete = (shownTabs, tabs, containerWidth, moreOptionsWidth, setShowMoreOptions, setPickerOptions) => {
    const indexes = [];
    let stopWidth = moreOptionsWidth;

    // grab the indexes of tabs to delete
    shownTabs.forEach((_, i) => {
        const width = shownTabs[i].offsetWidth;
        if (width === 0) {
            setShowMoreOptions(true);
            setPickerOptions(tabs.map((col) => ({
                name: col.label,
                value: col.internal
            })));
        }

        if (width > 0 && Array.from(shownTabs).length === tabs.length) {
            setShowMoreOptions(false);
        }

        if (containerWidth > stopWidth) {
            stopWidth += width;
        }
        else {
            indexes.push(i);
        }
    });

    if (indexes.length > 0) {
    // set the tabs to delete off the screen
        return indexes.sort((a, b) => a - b);
    }
    return null;
};

export const adaptTabs = (indexesToDelete, tabTypes, tabs, setShowMoreOptions, setTabTypes, setPickerOptions) => {
    // if we have indexes to delete we want to delete them and add them to the picker options
    if (indexesToDelete && indexesToDelete.length > 0) {
        if (tabTypes.length - indexesToDelete.length <= 0) {
            // if we have a negative difference or a difference equaling zero, we can remove the last tab and just set the picker options to all options
            setShowMoreOptions(true);
            setTabTypes(tabTypes.slice(0, 0));
            setPickerOptions(tabs.map((col) => ({
                name: col.label,
                value: col.internal
            })));
        }
        else {
            // remove tabs and add the removed tabs to picker options dropdown
            setShowMoreOptions(true);
            setTabTypes(tabTypes.slice(0, (tabTypes.length - indexesToDelete.length) - 1));
            setPickerOptions(tabTypes.slice((tabTypes.length - indexesToDelete.length) - 1, tabTypes.length).map((col) => ({
                name: col.label,
                value: col.internal
            })));
        }
    }
};

export const selectOptionDecision = (filteredSelectedPickerOption, filteredSelectedOption, tabs, pickerOptions, activeTab, selectOption, pickerLabel) => {
    if (filteredSelectedPickerOption && filteredSelectedPickerOption.length > 0 && pickerOptions.length !== tabs.length) {
    // if picker options contains the active tab then show the active tab as selected in the picker
        const foundActiveTab = pickerOptions.filter((option) => option.value === activeTab);
        if (foundActiveTab && foundActiveTab.length > 0) {
            return selectOption(foundActiveTab[0].name, foundActiveTab[0].value);
        }
    }
    else if (filteredSelectedOption && filteredSelectedOption.length > 0 && pickerOptions.length !== tabs.length) {
        return selectOption(filteredSelectedOption[0].name, filteredSelectedOption[0].value);
    }
    else if (filteredSelectedOption && filteredSelectedOption.length > 0 && pickerOptions.length > 0 && pickerOptions.length === tabs.length) {
        if (pickerOptions[0] && pickerOptions[0].value === activeTab) {
            return selectOption(pickerOptions[0].name, pickerOptions[0].value);
        }
        return selectOption(filteredSelectedOption[0].name, filteredSelectedOption[0].value);
    }
    return pickerLabel || 'More Options';
};
