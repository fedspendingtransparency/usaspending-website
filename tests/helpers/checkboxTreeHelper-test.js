import createCheckboxTreeDataStrucure from 'helpers/checkboxTreeHelper';
import {
    naicsMock2,
    naicsMockCleanData,
    naicsMockCleanDataInitialLoad
} from '../containers/search/filters/naics/mockNAICS';

describe('CheckboxTreeHelper', () => {
    const keysToBeMapped = {
        value: 'naics',
        label: 'naics_description'
    };
    it('should map API response to react-checkbox-tree structure', () => {
        const data = createCheckboxTreeDataStrucure(keysToBeMapped, naicsMock2);
        expect(data).toEqual(naicsMockCleanData);
    });
    // for initial load of data
    it('should map API response to react-checkbox-tree structure with empty children', () => {
        const newData = createCheckboxTreeDataStrucure(keysToBeMapped, naicsMock2, 'initial');
        expect(newData).toEqual(naicsMockCleanDataInitialLoad);
    });
});
