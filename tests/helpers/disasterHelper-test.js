/**
 * @jest-environment jsdom
 *
 * disasterHelper-test.js
 * Created by Jonathan Hill 07/14/20
 */


import { defCodeQueryString, parseCodes } from "-helpers/disasterHelper";
import { validDefCodes } from '../mockData/helpers/disasterHelper';

const defCodes = ['O', 'M', 'P', 'N', 'L'];
describe('Disaster Helper', () => {
    it('should format an array of def codes to a string', () => {
        expect(defCodeQueryString(defCodes)).toEqual('L,M,N,O,P');
    });

    it('should parse array of codes by type and sort alphaNumberically to an array of strings of codes', () => {
        expect(parseCodes(validDefCodes, "covid_19")).toEqual(["L", "M", "N", "O", "P", "U", "V"]);
        expect(parseCodes(validDefCodes, "infrastructure")).toEqual(["Z", "1"]);
    });
});
