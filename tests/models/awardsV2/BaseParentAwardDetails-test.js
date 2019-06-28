/**
 * Base Parent Award Details test
 * Created by maxwell kendall 06/28/19
 */

import parentAwardDetails from "../../../src/js/models/v2/awardsV2/BaseParentAwardDetails";

const mockData = {
    award_id: 'test_award_id',
    idv_type_description: 'test_idv_type_description',
    type_of_idc_description: 'test_',
    agency_id: 'test_agency_id',
    agency_name: 'test_agency_name',
    multiple_or_single_aw_desc: 'test_multiple_or_single_aw_desc',
    piid: 'test_piid'
};

describe('parentAwardDetails', () => {
    it('successfully populates the object with the expected shape and value', () => {
        const result = Object.create(parentAwardDetails);
        result.populateCore(mockData);
        expect(result.awardId).toEqual(mockData.award_id);
        expect(result.idvType).toEqual(mockData.idv_type_description);
        expect(result.idcType).toEqual(mockData.type_of_idc_description);
        expect(result.agencyId).toEqual(mockData.agency_id);
        expect(result.agencyName).toEqual(mockData.agency_name);
        expect(result.multipleOrSingle).toEqual(mockData.multiple_or_single_aw_desc);
        expect(result.piid).toEqual(mockData.piid);
    });
});
