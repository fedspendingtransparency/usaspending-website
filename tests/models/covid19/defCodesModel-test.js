/**
 * defCodesModel-test.js
 * Created by Jonathan Hill 06/19/20
 */

import defCodesModel from 'models/covid19/DefCodesModel';
import { defCodes } from './mockData';

const defCodesData = defCodes.map((code) => {
    const defCode = Object.create(defCodesModel);
    defCode.populate(code);
    return defCode;
});
describe('Def Codes', () => {
    it.each([
        ['L', 'Emergency Public Law'],
        ['M', 'Emergency Public Law'],
        ['N', 'Emergency Public Law'],
        ['O', 'Non-Emergency Public Law'],
        ['P', 'Emergency Public Law']
    ])(
        ('DEF Code %s should format public law'),
        (code, lawString) => {
            const { publicLaw } = defCodesData.find((defCode) => defCode._code === code);
            expect(publicLaw).toEqual(expect.stringContaining(lawString));
        }
    );
});
