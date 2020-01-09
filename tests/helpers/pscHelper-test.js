import { deducePscType } from 'helpers/pscHelper';

describe('deducePscType', () => {
    it.each([
        ['RESEARCH AND DEVELOPMENT', 'A'],
        ['SERVICES', 'Z'],
        ['PRODUCTS', '1'],
    ])(
        ('psc.toptier_code.description should be %s when %s is the psc.toptier_code.code'),
        (result, code) => {
            const pscObj = deducePscType({}, ['toptier_code', { code }])
            expect(pscObj.pscType.description).toEqual(result);
        }
    );
    it('RESEARCH AND DEVELOPMENT PSC types do not display their toptier_code', () => {
        const rAndDPsc = deducePscType({}, ['toptier_code', { code: 'A' }]);
        const nonRandDPsc = deducePscType({}, ['toptier_code', { code: 'Z' }]);
        expect(rAndDPsc.pscType.description).toEqual('RESEARCH AND DEVELOPMENT');
        expect(nonRandDPsc.pscType.description).not.toEqual('RESEARCH AND DEVELOPMENT');
        expect(Object.keys(rAndDPsc).some((el) => el === 'toptier_code')).toEqual(false);
        expect(Object.keys(nonRandDPsc).some((el) => el === 'toptier_code')).toEqual(true);
    });
});
