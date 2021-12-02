/**
 * BaseStatusOfFundsLevel-test.js
 * Created by Lizzie Salita 11/23/21
 */

import BaseStatusOfFundsLevel from 'models/v2/agency/BaseStatusOfFundsLevel';

// eslint-disable-next-line import/prefer-default-export
export const mockSubcomponent = {
    name: "Bureau of the Census",
    id: "bureau_of_the_census",
    total_budgetary_resources: 5000000,
    total_obligations: 3000000.72
};

const subcomponent = Object.create(BaseStatusOfFundsLevel);
subcomponent.populate(mockSubcomponent);

describe('BaseStatusOfFundsLevel', () => {
    it('should format the budgetary resources', () => {
        expect(subcomponent.budgetaryResources).toEqual('$5.00 M');
    });
    it('should format the obligations', () => {
        expect(subcomponent.obligations).toEqual('$3.00 M');
    });
});
