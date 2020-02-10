/**
 * Base Parent Award Details test
 * Created by maxwell kendall 06/28/19
 */

import parentAwardDetails from "../../../src/js/models/v2/awardsV2/BaseParentAwardDetails";
import { mockIdv } from "./mockAwardApi";

describe('parentAwardDetails', () => {
    const mockData = mockIdv.parent_award;
    it('successfully populates the object with the expected shape and value', () => {
        const result = Object.create(parentAwardDetails);
        result.populateCore(mockIdv.parent_award);
        expect(result.awardId).toEqual(mockData.generated_unique_award_id);
        expect(result.idvType).toEqual(mockData.idv_type_description);
        expect(result.idcType).toEqual(mockData.type_of_idc_description);
        expect(result.agencyId).toEqual(mockData.agency_id);
        expect(result.agencyName).toEqual(mockData.agency_name);
        expect(result.multipleOrSingle).toEqual(mockData.multiple_or_single_aw_desc);
        expect(result.piid).toEqual(mockData.piid);
    });
});
