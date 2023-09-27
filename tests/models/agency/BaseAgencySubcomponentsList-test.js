/**
 * @jest-environment jsdom
 */
import BaseAgencySubcomponentsList from 'models/v2/agency/BaseAgencySubcomponentsList';

// eslint-disable-next-line import/prefer-default-export
export const mockSubcomponent = {
    name: "Bureau of the Census",
    id: "bureau_of_the_census",
    total_budgetary_resources: 5000000,
    total_obligations: 3000000.72
};

const subcomponent = Object.create(BaseAgencySubcomponentsList);
subcomponent.populate(mockSubcomponent);

describe('BaseAgencySubcomponentsList', () => {
    it('should format the budgetary resources', () => {
        expect(subcomponent.budgetaryResources).toEqual('$5.00M');
    });
    it('should format the obligations', () => {
        expect(subcomponent.obligations).toEqual('$3.00M');
    });
});
